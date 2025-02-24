---
title: FortiGate 90D-POE with FortiAP on 5.4.1
description: Tutorial for configuring a FortiAP wireless access point on a FortiGate 90D-POE running FortiOS 5.4.1, including SSID setup
pubDate: 2016-07-08
updatedDate: 2016-07-08
tags: ["access point", "dhcp", "firewall", "firewall policy", "fortiap", "fortigate", "fortinet", "wifi", "wifi bridge", "wifi tunnel"]
---

Okay, I feel the need to write this because I just upgraded from FortiOS 5.4.0 to FortiOS 5.4.1 on my FortiGate 90D-POE, and my FortiAP couldn't handle it. I actually had to completely reconfigure my FortiGate from scratch, as I lost everything but console access whenever I would attempt to import my configuration.

## Before we begin

* You have two SSID types you can configure
* I chose "Bridge to FortiAP's local interface" for my main WiFi network for two reasons:
  * A) [This Fortinet doc](http://docs.fortinet.com/uploaded/files/1669/setting-up-a-network-using-a-FortiGate-unit-and-a-FortiAP-unit.pdf) says "Bridge mode is more efficient than Tunnel mode, as it uses the CAPWAP tunnel for authentication only"
  * B) A post in [this Reddit thread](https://www.reddit.com/r/fortinet/comments/31rftw/question_of_the_month_do_you_use_fortinet/) suggests that tunneled APs use more system resources than a bridged AP
* I chose "Tunnel to wireless controller" for my guest network because I want to apply different levels of UTM to guests than I do to my own WiFi traffic, and if I bridge both SSIDs to the FortiAP interface, I can't apply separate UTM policies.

## Step 1: Set up your POE interface

_Note: I use the term "bridged wireless clients" here for settings that specifically apply to devices connected to my private WiFi network that will have access to my wired devices through a firewall policy. If you create a guest network (tunnel to wireless controller), it will have its own subnet and DHCP server as explained in a later step. Even without a tunneled SSID, you still need a DHCP server on your POE interface for your FortiAP to receive an IP address._

1. Network > Interfaces
    1. Edit the POE interface where you connect your FortiAP.
    2. Select LAN role, Manual addressing mode, type an IP/Netmask that will act as a gateway for your bridged wireless clients (I chose 172.17.100.1/255.255.255.0), select only CAPWAP for administrative access, and create a DHCP server for your bridged wireless clients.
![Edit POE Interface](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-14_55_28-FortiGate-fortigate_hovh7z.png)

## Step 2: Create SSID(s)

1. WiFi & Switch Controller > SSID
   1. Create New > SSID
   2. Assign a name for the interface (never visible to public), type WiFi SSID, traffic mode "Local bridge with FortiAP's Interface", SSID name (visible to public by default but can be made private), security mode, security mode options, and click OK.
   3. If you wish to create a guest WiFi network, create a new SSID, choose traffic mode "Tunnel to Wireless Controller," and create a unique IP/Netmask for this subnet, a DHCP server, and finally name your SSID and configure security before clicking OK.

## Step 3: Create FortiAP Profile

1. WiFi & Switch Controller > FortiAP Profiles
   1. Create New, assign a name, **select your model of FortiAP next to platform (DO NOT SKIP THIS STEP)**, choose your radio settings, choose "Select SSIDs," and select both SSIDs you created in step 2.
   2. You are welcome to limit one or more SSIDs to specific bands if you wish.
![Create FortiAP Profile](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-15_44_08-FortiGate-fortigate_zgksas.png)

## Step 4: Assign FortiAP Profile to FortiAP

1. WiFi & Switch Controller > Managed FortiAPs
   1. By now, your FortiAP should have received an IP address from the DHCP server on the POE interface you configured in step 1. If it still does not have an IP address, wait. Periodically, click Refresh. Eventually, it will get an IP. This should not take more than 5 minutes, but the time can vary by model.
   2. Double click your FortiAP.
   3. Assign a name (optional), Authorize the AP, assign the FortiAP Profile you configured in step 2, and configure any override settings as you wish.
   4. With my FortiGate 90D-POE on firmware v5.4.1-build1064, a Fortinet support representative had me upgrade my FortiAP OS version to FP321C-v5.4-build0339.
   5. Click OK to finish.
![Assign FortiAP Profile to FortiAP](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-15_52_51-FortiGate-fortigate_mzl5iv.png)

## Step 5: Create addresses (subnets) to be used with firewall policies

1. Policy & Objects > Addresses
   1. Create New > Address.
   2. Create a name for your **bridged (private)** WLAN, put in the same subnet you created in step 1-1-B, and assign it to your POE interface. Click OK.
![Create Subnet](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_11_57-FortiGate-fortigate_a0coft.png)
   3. Create New > Address.
   4. Create a name for your **tunneled (guest)** WLAN, put in the same subnet you created in step 2-1-C, and assign it to your guest SSID. Click OK.
![Create Subnet](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_13_05-FortiGate-fortigate_xnqblq.png)
   5. Create an address for your internal hardware switch if you don't already have one!

## Step 6: Create firewall policy

1. Policy & Objects > IPv4 Policy
   1. Create New, assign a name, POE interface as incoming interface, internal hardware switch as outgoing interface, address you created in step 4-1-B as source, address you created in step 4-1-E as destination, service ALL, uncheck NAT if selected, ensure "Enable this policy" is checked and click OK.
![Create firewall policy](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_23_33-FortiGate-fortigate_pjvvhc.png)
_What this policy does: Allows devices on your private, bridged WiFi network to communicate with devices on your internal hardware switch._
1. Policy & Objects > IPv4 Policy
   1. Create another policy for the reverse direction (internal to WiFi). See screenshot.
![Create firewall policy](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_24_47-FortiGate-fortigate_w7q4sa.png)

## Step 7: Allow WiFi subnets access to the internet using firewall policy

Because you already have a firewall policy that allows devices physically connected to your internal hardware switch access to the internet, you can simply add your POE interface and guest SSID to this policy. Personally, I created a separate policy for my guest WiFi so I can apply more granular control in the future.

Below is my policy for all traffic from my wired devices and private WiFi clients to the internet

![Edit IPv4 Policy](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_29_55-FortiGate-fortigate_xniu8y.png)

_Below is my policy for all traffic from my guest WiFi clients to the internet_  

![Edit IPv4 Policy](http://res.cloudinary.com/loresec/image/upload/v1491957471/fortigate%20with%20fortiap/2016-07-08-16_33_10-FortiGate-fortigate_lr8hrl.png)

That's it! If this helped you, please consider a donation of any amount at all via the PayPal or Bitcoin buttons on the left side of the page. Comments and criticisms are welcome in the comment section.

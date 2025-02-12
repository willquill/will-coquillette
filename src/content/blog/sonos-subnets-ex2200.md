---
title: Sonos across subnets on Juniper EX2200
description: Tutorial for configuring a loopback interface on a Juniper EX2200 in order to allow multicast when Sonos clients and Sonos speakers are on different subnets
pubDate: 2021-12-09
updatedDate: 2025-02-08
hero: "~/assets/heros/sonos-logo.png"
heroAlt: "Sonos logo"
tags: ["sonos", "juniper", "junos", "networking", "layer2", "switching", "multicast", "ospf"]
---

Since I have a Juniper EX2200 performing my layer 3 routing for internal traffic and I have Sonos on a separate subnet than some Sonos clients, I needed to allow multicast across subnets. By creating a loopback interface and using it as my PIM rendezvous point, I was able to get my Windows desktop on 10.1.20.0/24 (Wired) find my Sonos speaker on 10.1.50.0/24 (WiFi).

This is pretty much taken directly from [this guide](https://3-4-5-6.blogspot.com/2012/02/configuring-multicasting-with-juniper.html).

First, I leave the default igmp-snooping configuration alone. If yours doesn't look like this, then you have modified the default configuration:

```sh
will@ex2200>  show configuration protocols igmp-snooping
vlan all;
```

Then I created a loopback interface to use for multicast:

```sh
will@ex2200>  show configuration interfaces lo0
unit 0 {
    description "Used for SSDP Multicast for Sonos";
    family inet {
        address 10.0.0.200/32;
    }
}
```

Next, I added the new loopback interface as passive in my OSPF configuration. The export and the other interfaces were already there for something unrelated to this multicast configuration:

```sh
will@ex2200>  show configuration protocols ospf
export exportdirect;
area 0.0.0.0 {
    interface vlan.100;
    interface vlan.2;
    interface lo0.0 {
        passive;
    }
}
```

Now I define the IP address of that loopback interface as the rendezvous point and add the necessary VLAN interfaces in sparse mode:

```sh
will@ex2200>  show configuration protocols pim
rp {
    local {
        address 10.0.0.200;
    }
}
interface lo0.0 {
    mode sparse;
}
interface vlan.20 {
    mode sparse;
}
interface vlan.40 {
    mode sparse;
}
interface vlan.50 {
    mode sparse;
}
```

I have subnet 10.1.20.0/24 on vlan.20 for trusted wired, 10.1.40.0/24 on vlan.40 for guest wifi, and 10.1.50.0/24 on vlan.50 for trusted wifi. Since Sonos is on vlan.50, I want all three VLANs to share multicast. You can block multicast from guest wifi to trusted wired via a firewall filter.

Note that because I did not specify a multicast range, the entire 224.0.0.0/4 range is allowed. Sonos only uses SSDP, or 239.255.255.250, so if you want to block all other multicasts, you can limit the range with the following:

```sh
set protocols rp local group-ranges 239.255.255.250/32
```

I hope this helps!

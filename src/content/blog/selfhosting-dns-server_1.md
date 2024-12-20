---
title: 'Blocking Ads in Your Network: Self-hosting your own DNS Server'
excerpt: "Learn how to block ads on your entire network by self-hosting your own DNS server using AdGuard Home."
publishDate: '2024-12-17'
tags: 
  - networking
  - dns
  - adguard-home
  - pi-hole
  - ad-blocking
  - tailscale
draft: false
isFeatured: true
---

We all can agree that adverts are annoying. They take up space, distracting, and sometimes even malicious, You've probably seen or heard one of those 'Download' buttons that lead you to a malware-infested site. That's why ad blockers are so popular, and they're available on almost every platform. But what if you want to block ads on your entire network? That's where DNS ad blocking comes in.

## What is DNS?

**DNS** or **Domain Name System** is like a phone book for the internet. When you type in a URL on your search bar (e.g., `https://google.com`), your browser sends a request to a DNS server to ask 'Whats the address for `google.com`?'. The DNS server then responds with the IP address of the server hosting `google.com`, and your browser connects to that IP address to load the website.

## How does DNS Ad Blocking work?

You probably know or even use an ad blocker extension on your browser such as  uBlock Origin or AdBlock Plus. These extensions work by blocking requests to known ad servers, preventing them from loading. DNS ad blocking works similarly, but instead of blocking requests on your browser, it blocks requests at the DNS level. When your device asks for the IP address of an ad server, the DNS server responds with a fake IP address (usually `0.0.0.0`) instead of the real one, effectively blocking the request.

## But public ad-blocking DNS servers already exist, right?

Well, yes, but where's the fun in that? Public ad-blocking DNS servers like [AdGuard DNS](https://adguard.com/en/adguard-dns/overview.html) and [NextDNS](https://nextdns.io/) are great, but they have limitations. Both services offers a free service, but with limitations such as the number of queries per month, the number of blocklists you can use, and the inability to customize blocklists. If you want to have full control over your DNS server, you can self-host one.

## Self-hosting your own DNS Server

There are several DNS servers that you can easily self-host, such as [Pi-hole](https://pi-hole.net/) and [AdGuard Home](https://adguard.com/en/adguard-home/overview.html). Both are great options, but for this guide, we'll be using AdGuard Home. (I personally prefer AdGuard Home because of its modern UI and ease of use).


Here's how to set up AdGuard Home on your network:

1. **Install AdGuard Home:**

   First, you need to install AdGuard Home on a device that's always on, like a Raspberry Pi or a remote server. You can find the installation instructions for AdGuard Home [here](https://github.com/AdguardTeam/AdGuardHome#getting-started). 

2. **Access the AdGuard Home dashboard:**

   After installing AdGuard Home, you can access the dashboard by visiting `http://<your-device-ip>:3000` on your browser. You'll be greeted with the AdGuard Home setup wizard.

3. **Set up AdGuard Home:**

   Follow the setup wizard to configure AdGuard Home. You can choose to use the default settings or customize them to your liking such as setting the Port of the dashboard and the binding address.

4. **Settting up Blocklists:**

   After finishing the setup wizard, you will be redirected to your AdGuard Home dashboard (by default, it's `http://<your-device-ip>:80`). Go to `Filters` > `DNS Blocklists` and add blocklists that you want to use by clicking the `Add Blocklist` > `Choose from the list` and select the blocklists you want to use.

5. **Set up your devices to use AdGuard Home:**

    To use AdGuard Home, you need to set your devices to use the AdGuard Home device as their DNS server. AdGuard Home has a guide on how to do this for various devices by clicking `Setup Guide` on the dashboard.


## Caveats

While DNS ad blocking is great, it's not perfect. Some ads might still slip through the cracks, especially if they're hosted on the same server as the content you're trying to access. Additionally, some websites might not load correctly if they rely on the same domain as the ad server. You can whitelist these domains in AdGuard Home to fix this issue.

YouTube ads can't be blocked using DNS due to how YouTube serves ads. You can use browser extensions like uBlock Origin to block YouTube ads. But, In-app ads, and browser ads can be blocked using DNS ad blocking.

## Conclusion

DNS ad blocking is a great way to block ads on your entire network. By self-hosting your own DNS server, you have full control over what gets blocked and what doesn't. AdGuard Home is a great option for self-hosting your DNS server, with its modern UI and ease of use. Give it a try and see how much cleaner your browsing experience can be!

## ✨ Bonus: Using Your DNS Server with Tailscale ✨

If you're using Tailscale to connect your devices, you can use your self-hosted DNS server for your whole Tailnet. You can set up your Tailscale DNS to use your DNS server by going to the [Tailscale admin console > DNS](https://login.tailscale.com/admin/dns) and adding a custom nameserver with your DNS server's IP address and checking `Override local DNS`. Be sure to enable `accept dns` in your devices by running `tailscale set --accept-dns=true`, or in mobile devices, enable `Use Tailscale DNS` in the Tailscale app settings.
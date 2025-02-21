---
title: 'I Built a Thing! TunnelDock: Automate Cloudflare Tunnels for Docker'
excerpt: 'Automate Cloudflare Tunnels for Docker'
publishDate: '2025-02-22'
tags: 
  - cloudflare
  - cloudflare tunnel
  - docker
  - automation
draft: false
isFeatured: true
---


Alright, so I built a little tool, mostly for myself, but I figured I'd share it in case it helps anyone else out there. It's called **TunnelDock**, and it's all about making my life easier when working with Cloudflare Tunnels and Docker containers. Think of it as my personal productivity hack for network configuration.

I'm a big fan of Cloudflare Tunnels. They let me expose my Dockerized apps to the internet without opening ports on my router or dealing with dynamic DNS. It's a secure and convenient way to access my projects from anywhere. The problem? Setting up tunnels manually for each container got *really* tedious, *really* fast. I'm all about automating repetitive tasks, so I decided to scratch my own itch.

## The Problem (My Problem, Specifically)

I frequently spin up new containers, test different configurations, and generally tinker with my setup. Each time, I'd have to go through this annoying process:

1.  Log into the Cloudflare dashboard.
2.  Find my tunnel.
3.  Manually add or update an ingress rule to point to the new container.
4.  Go to my DNS settings.
5.  Create or update a CNAME record.

It was a time-sink and, frankly, a pain. Plus, i wanted to make something anyway..

## TunnelDock: My Solution

TunnelDock is my answer to this problem. It's a small, self-contained application that automates the whole Cloudflare Tunnel configuration process for my Docker containers. It's like a tiny, personal DevOps assistant that lives on my server. It's *very* much tailored to *my* workflow, but I think the core idea is useful.

Here's what it does:

*   **Automatic Tunnel Config:** It listens for Docker events (containers starting, stopping, etc.). When it sees a container with specific Docker labels that *I've* added, it automatically updates the Cloudflare Tunnel's ingress rules. No more manual configuration!
*   **DNS Record Management:** It also handles creating and updating the CNAME records in Cloudflare DNS, so my chosen hostnames point to the right tunnel.
*   **Automatic Cleanup:** When I remove a container, it removes it's associated tunnel config and DNS records, keeping things tidy.

### How It Works (Under the Hood)

I built TunnelDock with a few of my favorite tools:

*   **Bun:** The Javascript runtime.
*   **Dockerode:** A Node.js library for interacting with the Docker API. This is how it "sees" what's happening with my containers.
*   **Cloudflare API:** This lets it talk to Cloudflare and make the necessary changes.
*   **Zod:** For schema validation. Keeps things predictable.
*   **Pino:** For nice, clean logging.
*   **Typescript:** Because types are my friends.

The basic flow is:

1.  **Monitor Docker:** It watches the Docker daemon for container events.
2.  **Check for My Labels:** When something happens, it looks for containers with *my* specific `tunneldock.*` labels.
3.  **Update Cloudflare:** If the labels are present and tell it to do something, it uses the Cloudflare API to update the tunnel and DNS records.
4.  **Remember Stuff:** It keeps track of what it's done in a local JSON file, so it knows the current state.
5.  **Clean Up:** Removes stale configurations for removed containers.

### Getting It Running

Because I built this primarily for myself, the setup is pretty straightforward (and assumes you're comfortable with Docker Compose):

1.  **Clone the Code:** Grab the code.
    ```bash
    git clone https://github.com/radityaharya/tunneldock.git
    ```
2.  **`.env` File:** Create a `.env` file with your Cloudflare API credentials. *Important:* You need to have *already* created a Cloudflare Tunnel. This tool manages the *configuration* of an existing tunnel.
3.  **`docker compose up -d`:** And it's running!

### Configuring My Containers

The key to making this work is adding specific Docker labels to the containers *I* want to expose. Here's what I use:

*   **`tunneldock.assign=true`:** This tells TunnelDock, "Hey, manage this container!"
*   **`tunneldock.hostname`:** The hostname I want (e.g., `test-app`). If I don't provide this, it uses the container name. It automatically adds my domain.
*   **`tunneldock.service.protocol`:** Usually `http` or `https`.
*   **`tunneldock.service.port`:** The port my app uses *inside* the container.
*   **`tunneldock.service.path`:** (Optional) For apps served from a specific path (like `/blog`).
*   **`tunneldock.originRequest.*`:** Advanced configuration for the tunnel. See the README.md file in the codebase.

### Example Configuration

**Example (in my `docker-compose.yml`):**

```yaml
services:
  my-test-service:
    image: my-test-service:latest
    labels:
      tunneldock.assign: "true"
      tunneldock.hostname: "test"
      tunneldock.service.protocol: "http"
      tunneldock.service.port: "3000"
```

This tells TunnelDock to create a CNAME record for `test.mydomain.com` and route traffic for that hostname to my container on port 3000.

And that's it! TunnelDock takes care of the rest.
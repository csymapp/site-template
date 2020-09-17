---
title: Processes
metadata:
    description: CSYCMS manages each site almost independently of the others. Restarting one site (due to upates or errors) does not have to necessarily affect other sites. Here is a very brief process of how this is managed.
    keywords: csycms, file-based content management system, knowledge base, static site generator, nodejs
    author: Brian Onang'o
---


## Processes

CSYCMS manages each site almost independently of the others. Restarting one site (due to upates or errors) does not have to necessarily affect other sites. Here is a very brief process of how this is managed.

`csycms.service` starts several process:

- `csystemUpdates` which checks for updates to the entire system and to themes.
- `monitors` which act as monitors for every site, restarting server instances for every site on failure. Each site has a monitor.

Each monitor starts:
- The node server: `PORT=$PORT SITE=$SITE DOMAIN=$DOMAIN node bin/app.js --SITE=$SITE &`. Each site has this process.
- `siteUpdates` which checks for updates for each specific site and restarts the node server for the specific site if updates have been done. Each site has a `siteUpdates` process.
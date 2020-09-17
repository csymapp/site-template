---
title: Requirements
metadata:
    description: CSYCMS is intentionally designed with few requirements. You can easily run CSYCMS on your local computer, as well on all nodejs Web hosting providers.  Here are a [list of services](https://github.com/nodejs/node-v0.x-archive/wiki/Node-Hosting) that provide Node hosting if you are looking to publish your site online without setting up your own server.
    keywords: csycms, file-based content management system, knowledge base, static site generator, nodejs, requirements
    author: Brian Onang'o
---


## Requirements 

CSYCMS is intentionally designed with few requirements. You can easily run CSYCMS on your local computer, as well on all nodejs Web hosting providers.  Here are a [list of services](https://github.com/nodejs/node-v0.x-archive/wiki/Node-Hosting) that provide Node hosting if you are looking to publish your site online without setting up your own server.

If you have a pen handy, jot down the following CSYCMS system requirements:

1. Server
2. Web Server (Apache, Nginx, etc.)
3. Nodejs v 8.x or higher
4. Domain name
5. ssh keys

CSYCMS is built with plain text files for your content. There is no database needed. In fact, you can copy your content from grav and use them here.

## Server

You will need a server to install and test or use csycms. Although you can use your local computer as this server, you will need a server hosted somewhere else for production. You can check out the cheap [upcloud servers with a month of free trial](https://upcloud.com/signup/?promo=6D7UU8) or any other that you know.


## Web Servers

CSYCMS is so simple and versatile that you don't even need a web server to run it. Its written in node and you can serve it directly. You will only need a webserver to profixy your own nodejs server to get it running on PORT 80 of a registered domain.

Even though technically you do not need a standalone web server, it is better to run one, even for local development. There are many great options available:

### Mac

* OS X 10.13 High Sierra already ships with the Apache Web server.
* [MAMP/MAMP Pro](http://mamp.info) comes with Apache. 
* [AMPPS](http://www.ampps.com/downloads) is a software stack from Softaculous enabling Apache, PHP, Perl, Python,..

You will have to check for yourself how to set the configurations you need.

### Windows

We have not tested on Windows yet

### Linux

* Many distributions of Linux already come with Apache. If they're not, the distribution usually provides a package manager through which you can install them without much hassle. More advanced configurations should be investigated with the help of a good search engine.
* Nginx. This is the server we would recommend as it utilizes system resources more efficiently than apache.

## Nodejs
You will need to install nodejs in your server. If you experience any problems with this, you can see [how to install nodejs](https://joshtronic.com/2018/05/07/how-to-install-the-latest-version-of-nodejs-8-on-ubuntu-1804-lts/).

Supported Node Versions:
- v10.x.x
- v8.x.x

## Domain Name
Although this is optional, it is good if have a domain name of your own so you can use it instead of the IP of your server.

## SSH Keys
If you use a private repo for your site content, then you will need to set-up the ssh keys for accessing the private repo. [See how you can create one](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html)

## Recommended Tools

### Text Editors

Although you can get away with Notepad, Textedit, Vi, or whatever default text editor comes with your platform, we recommend using a good text editor with syntax highlighting to make things easier. Here are some recommended options:

1. [SublimeText](http://www.sublimetext.com/) - OS X/Windows/Linux - A commercial developer's editor, but well worth the price. Very powerful especially combined with plugins such as [Markdown Extended](https://sublime.wbond.net/packages/Markdown%20Extended), [Pretty YAML](https://sublime.wbond.net/packages/Pretty%20YAML), and [PHP-Twig](https://sublime.wbond.net/packages/PHP-Twig).
2. [Atom](http://atom.io) - OS X/Windows/Linux - A new editor developed by Github. It's free and open source. It is similar to Sublime, but does not have the sheer depth of plugins available yet.
3. [Notepad++](http://notepad-plus-plus.org/) - Windows - A free and very popular developer's editor for Windows.
4. [Bluefish](http://bluefish.openoffice.nl/index.html) - OS X/Windows/Linux - A free, open source text editor geared towards programmers and web developers.
5. [Visual Studio Code](https://code.visualstudio.com/) - A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.

### Markdown Editors

Another option if you primarily work with just creating content, is to use a **Markdown Editor**. These often are very content-centric and usually provide a **live-preview** of your content rendered as HTML. There are literally hundreds of these, but some good options include:

1. [MacDown](http://macdown.uranusjr.com/) - OS X - Free, a simple, lightweight open source Markdown editor.
2. [LightPaper](http://lightpaper.42squares.in/) - OS X - $9.99, clean, powerful. Our markdown editor of choice on the Mac. **Get 25% OFF with Discount Code: GET_CSYCMS_25**
3. [MarkDrop](http://culturezoo.com/markdrop/) - OS X - $5, but super clean and Droplr support built-in.
4. [MarkdownPad](http://markdownpad.com/) - Windows - Free and Pro versions. Even has YAML front-matter support. An excellent solution for Windows users.
5. [Mark Text](https://marktext.github.io/website/) - Free, open source Markdown editor for Windows / Linux / OS X. 

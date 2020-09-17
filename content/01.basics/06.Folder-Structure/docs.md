---
title: Folder Structure
metadata:
    description: As has been mentioned, the CSYCMS folder structure can go upto 4 levels. You can refer to the directory structure below for an example of how to create your own. It does not have to go to the fourth level. One level is still enough if that is sufficient for your needs.
    keywords: csycms, file-based content management system, knowledge base, static site generator, nodejs
    author: Brian Onang'o
---


## Folder Structure 

As has been mentioned, the CSYCMS folder structure can go upto 4 levels. You can refer to the directory structure below for an example of how to create your own. It does not have to go to the fourth level. One level is still enough if that is sufficient for your needs.

```
- content
          | - Bible Site
            |- 01. Old-Testament
                |- chapter.md
                |- 01. The-Book-of-Genesis
                   | - chaper.md
                   |- 01. Before-the-flood
                      |- chapter.md
                      |- 01. Creation-Story
                        |- chapter.md
                        |- 01.chapter-1
                          |- docs.md 
                        |- 02.chapter-2
                          | - docs.md 
            |- 02. New-Testament
          | - site 2
          .
          .
          .
          | - site n
```
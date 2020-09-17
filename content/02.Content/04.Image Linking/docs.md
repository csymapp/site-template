---
title: Image Linking
metadata:
    description: CSYCMS has a variety of flexible linking options that allow you to link images from one page to another, and even from remote sources. If you have ever linked files using HTML or worked with a file system using a command line, a lot of this should be elementary to pick up.
    author: Brian Onang'o
---

## Image Linking
CSYCMS has a variety of flexible linking options that allow you to link images from one page to another, and even from remote sources. If you have ever linked files using HTML or worked with a file system using a command line, a lot of this should be elementary to pick up.

We will run to some easy examples using this very basic, trimmed down model of what a CSYCMS site's **Pages** directory might look like.

>>>>> Remember that images and other assets are loaded from `public/`


To get us started, here is a quick look at some of the standard components of a CSYCMS markdown-based image tag.

```
![Alt Text](../path/image.ext)
```

| String | Description                                                                                                              |
| :----- | :-----                                                                                                                   |
| `!`    | When placed at the beginning of a traditional markdown link tag, it indicates this is an image tag.                      |
| `[]`   | The square bracket is used to wrap the **optional** alt-text for the image.                                              |
| `()`   | The parenthesis is used to surround the reference to the image itself. This is placed directly after the square bracket. |
| `../`  | When used in the link, it indicates a move up a directory.                                                               |

>>>>>> You can combine a regular page link and an image link like to wrap an image in a link: `[![Alt text](/path/to/img.jpg)](http://example.net/)`

>>>>> Remember that images and other assets are loaded from `public/`
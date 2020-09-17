---
title: Page Linking
metadata:
    description: CSYCMS has a variety of flexible linking options that allow you to link from one page to another, and even to remote pages. If you have ever linked files using HTML or worked with a file system using a command line, a lot of this should be very easy to pick up.
    author: Brian Onang'o
---

## Page Linking

CSYCMS has a variety of flexible linking options that allow you to link from one page to another, and even to remote pages. If you have ever linked files using HTML or worked with a file system using a command line, a lot of this should be very easy to pick up.


To get us started, here is a quick look at some of the common components of a CSYCMS link, and what they mean.

```
[Linked Content](../path/slug/page)
```

| String | Description                                                                                                                                                      |
| :----- | :-----                                                                                                                                                           |
| `[]`   | The square bracket is used to wrap the text or alternate content that becomes linked. In HTML, this would be the content placed between `<a href="">` and `</a>` |
| `()`   | The parenthesis is used to surround the link itself. This is placed directly after the square bracket.                                                           |
| `../`  | When used in the link, it indicates a move up a directory.                                                                                                       |
### Directory/Slug relative

**Directory Relative** links use destinations set relative to the current page. This can be as simple as linking to another file in the current directory, such as an image file, or as complex as going up several directory levels and then back down to the specific folder/file you need to have displayed.

With relative links, the location of the source file is every bit as important as that of the destination. If either file in the mix is moved, changing the path between them, the link can be broken.

The advantage of this type of linking structure is that you can easily switch between a local development server and a live server with a different domain name and as long as the file structure remains consistent, the links should work without a problem.

```markdown
[link](../../green/grass/item)
```

This link moves up two folders, as indicated by `../../`, and then down two folders, pointing directly to `item` as the destination.

In writing the links, please remember to ignore the numerical part (chapter numbers) of the directories and pages.

Sometimes, you just want to direct the user up a single directory, loading the default page. Since an exact file is not indicated, CSYCMS is trusted to choose the right one to load. For a well-organized CSYCMS site, this should be no problem.


### Absolute

Absolute links are similar to relative links, but are relative to the root of the site. In **CSYCMS**, this is typically based in your **/user/pages/** directory. This type of link can be done in two different ways.

You can do it in a similar fashion to the **Slug Relative** style which uses the slug, or directory name in the path for simplicity. This method removes potential issues of order changes later on (changing the number at the beginning of the folder name) breaking the link. This would be the most commonly used method of absolute linking.

In an absolute link, the link opens with a `/`. Here is an example of an absolute link made to `pages/blue/sky/item` in the **Slug** style.

```markdown
[link](/blue/sky)
```

The second method is fashioned after the **Directory Relative** style detailed previously. This method leaves in elements like the ordering numbers at the beginning of directory names. While this does add the potential of a broken link when content is reordered, it is more reliable when used with services like [Github](http://github.com) where content links do not have the benefit of CSYCMS's flexibility. Here is an example of an absolute link made to `pages/01.blue/01.sky/item.md` using this style.

```markdown
[link](/01.blue/01.sky)
```

### Remote

Remote links enable you to link directly to pretty much any file or document out there via its URL. This doesn't have to include your own site's content, but it can. Here is an example of how you would link to Google's home page.

```markdown
[link](http://www.google.com)
```

You can link to pretty much any direct URL, including secured HTTPS links. For example:

```markdown
[link](https://github.com)
```

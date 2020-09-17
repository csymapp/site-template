---
title: Basic Tutorial
metadata:
    description: Assuming you successfully installed CSYCMS, we can continue and play around with CSYCMS a little to get you more comfortable. Because CSYCMS does not require a database, it is pretty easy to work with, without having to worry about causing issues between your CSYCMS installation and any other significant data source. If something goes awry, you can generally recover very easily.
    keywords: csycms, file-based content management system, knowledge base, static site generator, nodejs, configuration, tutorial
    author: Brian Onang'o
---


## Basic Tutorial 

Assuming you successfully [installed CSYCMS](/basics/Installation), we can continue and play around with CSYCMS a little to get you more comfortable.

Because CSYCMS does not require a database, it is pretty easy to work with, without having to worry about causing issues between your CSYCMS installation and any other significant data source. If something goes awry, you can generally recover very easily.

## Content Basics

>>> CSYCMS content folders can be stored in github and pulled from there. You will need to create a github repo and change the origin remote from the one for csycms-site to the one for your repo.

First, let us familiarize ourselves with where CSYCMS stores content.  We will go into more depth in [folder structure](/basics/Folder%20Structure), but for the time being, you need to be aware that all our user content, is stored in the `contents/*/` folder of your CSYCMS install. The contents folder has severall site folders and only the content in a given site folder can be accessed from that site.

The content folders are named starting with the chapter number then the name. eg `01.basics` But it is important to note that the numeric portion up to and including the `.` will be removed from URLs.

>>> Please use a hyphen to separate words in your directory and file names instead of spaces. This is good for SEO.

Each content folder defines a chapter and should have either a `chapter.md` or a `docs.md` file. `chapter.md` is the first page displayed for each chapter.

>>> You can have your content in a hierarchical directory structure of upto 4 levels. We do not know what happens after that. But pages in the fifth level will not be displaced on the left menu in the default layout that we have.

Note also that the numeric portion of the chapter can have any number of zeros preceeding the number.

## Home Page Configuration

No configuration needs to be done for the home page. The `chapter.md` page of the `01.` chapter will be displayed as the home page.

## Page Editing

Pages in **CSYCMS** are composed in **Markdown** syntax.  Markdown is a formatting syntax that is written in plain text and then converted automatically to HTML. It uses elementary text symbols to indicate key HTML tags making it very easy to write without having to know the complexities of HTML. There are numerous other benefits of using Markdown including: less errors, valid markup, very readable, simple to learn, transferable, etc.

You can read an [extensive write-up of available syntax](/Content/Markdown%20Syntax) with examples in the documentation, but for now, follow along.

Open the home page in your text editor. This is `chapter.md` in the folder you have named beginning with `01.`

When you edit the page in a text editor, the content will look something like this:

    ---
    title: Basics
    metadata:
        description: Discover CSYCMS.
    taxonomy:
        category: docs
    ---

    #### Chapter 1

    # Basics

    Discover what CSYCMS is all about and the core concepts behind it.

Let us break this down a little so you can see how easy it is to write in Markdown. The stuff between the `---` indicators are the [Page Headers](/Content/Headers), and these are written in a straightforward format called [YAML](/Advanced/YAML). This configuration block that sits in the `.md` file is commonly known as **YAML Front Matter**.

```ruby
title: Basics
```

This block sets the HTML title tag for the page (the text you see in the browser tab).  You can also access this from your themes via the `meta.title` attribute.  There are a [few standard headers](/Content/Headers) that let you configure a variety of options for this page. Another example is `layout: layout` that lets you override the layout used to display the page, etc.

```markdown
#### Chapter 1

# Basics
```

The `#` or `hashes` syntax in markdown indicates a title.  A single `#` with a space and then text converts into an `<h1>` header in HTML. `##` or double hash would convert into an `<h2>` tag.  Of course, this goes all the way up to the HTML valid `<h6>` tag which of course, would be six hashes: `###### My H6 Level Header`.

```markdown
Discover what CSYCMS is all about and the core concepts behind it.
```

This is a simple paragraph that would have been wrapped in regular `<p>` tags when converted to HTML.  `** **` markers indicate **bold** text or `<b>` in HTML.  Italic text is indicated by wrapping _text_ in `_` markers.

!! Ensure you save your `.md` files as `UTF8` files.  This will ensure they work with language-specific special characters.

## Adding a New Page

Creating a new page is a simple affair in **CSYCMS**.  Just follow these simple steps:

1. Navigate to your site pages folder, eg `content/csycmsdocs/` and create a new folder. Remember to preceed the folder name with a chapter number, and don't repeat the chapters numbers. There is not yet any provision to handle such kind of errors if you create them.

2. Launch your text editor, create a new file, and paste in the following sample code:

    ```markdown
    ---
    title: My New Page
    ---
    # My New Page!

    This is the body of **my new page** and I can easily use _Markdown_ syntax here.
    ```

3. Save this as `docs.md` in the folder that you created. This will tell **CSYCMS** to render the page using the **default** template.
4. That's it! Restart your server(no, this does not mean restart csycms service. This will overwrite your changes by pulling new content from the github repo set for the site. Just restart the node.js process which is running the site)  and reload your browser to see your new page in the menu.

The page will automatically show up in the Menu depending on the default theme that you have configured your site to use. You will have to restart your site once you create the new page.

**Congratulations**, you have now successfully created a new page in CSYCMS.  There is much more you can do with CSYCMS, so please continue reading to find out about more advanced capabilities and in-depth features.


## csycms-manage

There is a little commandline tool (a bash script to help you with some of the processes). The script in `src/csycms-manage.sh` will help you to:
- create new sites
- delete existing sites
- update sites (commit changes to github)
- run sites

It should have sufficient documentation to help you learn how to use it. Just go to the root directory of your installation and run

`./src/csycms-manage.sh`
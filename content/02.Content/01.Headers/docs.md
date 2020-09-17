---
title: Headers
metadata:
    description: The headers (alternatively known as frontmatter) at the top of a page are completely optional, you do not need them at all for a page to display within CSYCMS. Headers are also known as Page Frontmatter and are commonly referred to as such so as not to be confused with HTTP Headers.
    author: Brian Onang'o
response_code: 200
---

The headers (alternatively known as frontmatter) at the top of a page are completely optional, you do not need them at all for a page to display within CSYCMS.

>>> Headers are also known as **Page Frontmatter** and are commonly referred to as such so as not to be confused with HTTP Headers.

## Standard Page Frontmatter

### Title

If you have no headers at all, you will not have any control over the title of the page as it shows in the browser and search engines.  For this reason, it is recommended to _at least_ put the `title` variable in the header of the page:

```ruby
title: Title of my Page
```

If the `title` variable is not set, CSYCMS has a fallback solution, and will try to use the capitalized `slug` variable:

### Redirect

```ruby
redirect: '/some/custom/route'
```

or

```ruby
redirect: 'http://someexternalsite.com'
```

You can redirect to another internal or external page right from a page header.  Of course this means this page will not be displayed, but the page can still be in a collection, menu, etc because it will exist as a page within CSYCMS.

You can also append a redirect code to a URL by using square brackets:

```ruby
redirect: '/some/custom/route[303]'
```

### Layout

```ruby
layout: custom
```
The layout used to render the theme. This is optional and if it is not provided, the default theme is used.

If you would like to use no layout and just render your page as it is, you can give a name to a non-existent layout here.

### Theme

```ruby
theme: default
```
The theme to use for the page. Assets which be loaded from this theme. This is optional and if it is not provided, the default theme is used.

### Page

```ruby
page: custom
```
The page to be rendered. This is optional and if it is not provided, the default page for the route is used.

### HTTP Response Code

``` ruby
response_code: 404
```

Allows the dynamic setting of an HTTP Response Code.

### Table of Contents
``` ruby
TOC: true/false
```
Use this to set if you would like a table of contents to appear on the page. By default (without the TOC setting) there will be a table of contents. It accepts either of `true` or `false`.


## Meta Page Headers

Meta headers allow you to set the [standard set of HTML **<meta> tags**](http://www.w3schools.com/tags/tag_meta.asp) for each page as well as [OpenGraph](http://ogp.me/), [Facebook](https://developers.facebook.com/docs/sharing/best-practices), and [Twitter](https://dev.twitter.com/cards/overview).

### Standard Metatag examples

```ruby
metadata:
    refresh: 30
    generator: 'CSYCMS'
    description: 'Your page description goes here'
    keywords: 'HTML, CSS, XML, JavaScript'
    author: 'Brian Onang'o'
    robots: 'noindex, nofollow'
    my_key: 'my_value'
```

This will produce the HTML:

```
<meta name="generator" content="CSYCMS" />
<meta name="description" content="Your page description goes here" />
<meta http-equiv="refresh" content="30" />
<meta name="keywords" content="HTML, CSS, XML, JavaScript" />
<meta name="author" content="Brian Onang'o" />
<meta name="robots" content="noindex, nofollow" />
<meta name="my_key" content="my_value" />
```

All HTML5 metatags are supported.
<!-- text fomating -->
*This text will be italic*
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

~~This was mistaken text~~


<!-- headers -->
# This is an <h1> tag
## This is an <h2> tag
###### This is an <h6> tag

<!-- Horizontal Line -->
___
---


<!-- numered lists -->
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

<!-- bullet points -->
* Item 1
* Item 2
  * Item 2a
  * Item 2b

<!-- dashes lists -->
- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

<!-- images -->
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' width='100'>


<!-- links -->
http://github.com - automatic!

[GitHub](http://github.com)

or another way
[go here][link1]

and then [go here][link2]

[link1]: www.google.com
[link2]: www.github.com

<!-- images like links -->

[![link image](https://www.reviewpro.com/wp-content/uploads/2019/06/Google-logo.jpg)](https://www.google.com/)

<!-- blockquotes -->

As Termitanor said:

> I'll be back
> 
> Bye
>> inner blockquotes

<!-- Paragraphs soft-break -->
Do I contradict myself?(space)(space)
Very well then I contradict myself,(space)(space)
(I am large, I contain multitudes.)(space)(space)

<!-- Paragraphs hard-break -->
Do I contradict myself?

Very well then I contradict myself,

(I am large, I contain multitudes.)

<!-- inline code -->
I think you should use an
`<addr>` element here instead.

Some basic Git commands are:
```
git status
git add
git commit
```

<!-- task lists -->
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

<!-- You can tell GitHub to ignore (or escape) Markdown formatting by using \ before the Markdown character. -->
Let's rename \*our-new-project\* to \*our-old-project\*.

<!-- tables -->
First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

| Current color | Current State | Next State |
| :---- | :---- | :---- |
| green | yellow | red |

<!-- Details and summary  -->

<details>
  <summary>Section header</summary>
  Section body text.

  - list item
  - list item
</details>
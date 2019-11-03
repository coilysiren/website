---
path: "/posts/my-first-post"
date: "2019-10-26"
template-key: "blog-post"
title: Understanding Flexbox with Cats-- Part 1 Basics
description: The first part of "Flexbox with Cats" series covers how to work with containers and positioning. It will use an analogy of cats and boxes to teach Flexbox!
---

Everyone loves cats, right? They are adorable fluffy little beings that enjoy smashing things and not obeying anyone. Well, in this series we'll make an assumption that suddenly they will listen to all commands given the magical phrase, `display: flex;`. "Understanding Flexbox with Cats" will use the analogy of `cats and boxes` to teach concepts like the CSS box model, flexbox positioning, and provide some valuable tips on the use of containers. Please keep in mind that this series assumes that a reader already has some basic understanding of HTML and CSS.

In part one, we will mainly focus on a reader's thorough understanding of how flexbox positioning works with multiple containers. This part is for two types of people: those who never truly understood flexbox and those who love reading how someone can creatively use an analogy when connecting two seemingly unrelated things.

<center>~ Please enjoy this article full of kitten logic! ~</center>
<img src="https://github.com/kefimochi/Flexbox-with-cats/blob/master/MyCat.png?raw=true" height="200" width="200" alt="An illustration of a black cat staring at you">

### "Flexbox with Cats" Contests

* [Part 1: Flexbox basics](https://dev.to/kefimochi/understanding-flexbox-with-cats-part-1-basics-1532)
  * Beginner-friendly introduction to CSS's box model and positioning of divs
* Part 2: Think in "boxes"
  * An article describing how to recognize containers("divs") when working with a provided design and how to implement the desired positioning.
* Part 3: Advanced Flexbox and CSS
  * Covering everything from using flexbox in order to make a website responsive all the way to how to create your own designs. We'll also get to look at real-world implementations of everything learned throughout this series.

## Introduction to "Cats and Boxes"

![Cat's face looking deeply into your soul from inside of a box](https://thepracticaldev.s3.amazonaws.com/i/04tkt4ec6pmgu5zxv731.jpg)
<figcaption>Cat's face looking deeply into your soul from inside of a box</figcaption>

Let's imagine a situation where suddenly you found yourself being responsible for three little kittens. As you see your apartment slowly turning into a disordered mess due to those tiny energized cats walking all over the place—and scratching on surfaces they shouldn't be scratching—you slowly begin to panic. What's a possible solution to all this chaos? 🤔

If you thought about trying to limit cats' space, you were correct! Just like in real life, we first have to set up a `box`(also known as a `<div>` element) before putting any `cats`(representation for any content, like images, text, lists, etc) into it. It would not make sense to first put kittens on the ground and then add a box on top of them, so try to avoid doing that when using flexbox too!

## Setting up a Default Box

Keeping that in mind, lets set up our HTML. Right now it is important to notice that `cats`(3 images) were already placed in a `box`(div with a class of `cat-box`). You might wonder why are they all gathered in one place, well, it's time to introduce some kitten logic! 

You see— as their default behavior, cats *love* to cuddle. Especially considering that those kittens are in an unfamiliar environment where they were just placed seconds ago after ruining an entire apartment. They're not sure how to act, so they would just always stay close next to each other in the top left corner, warming each other up and feeling safe.

![All cat images are inside of a div container and are aligned in the top left corner](https://thepracticaldev.s3.amazonaws.com/i/gpa56eyvjawy3zy42y1o.png)
<figcaption>All cat images are inside of a div container and are aligned in the top left corner</figcaption>

## Introducing Flexbox

Cats generally consider themselves to be of high esteem, so in order for them to obey, we'll have to give a command of `display: flex;` to the box kittens are in. Someone might wonder, "why not give it to every single cat individually instead?" Well, this is because the box holds higher authority over cats due to restricting the space they can move in! And cats — being proud aristocrats — *only* listen to higher authority. Nothing will happen if you'll try to add `display: flex;` to any of the cat images; they're very stubborn (More on the `why` later, it is related to `thinking outside of the box`! *pun intended*)

What display flex will do is tell cat images to position themselves in a row and start listening to other commands. As you just thought, they were originally positioned in a row, so the only difference that will be noticed is a lack of space between pictures.

![On the left there's a small space between pictures of cats vs on the right there's no space between cat pictures](https://thepracticaldev.s3.amazonaws.com/i/g1ovqqyv19e7vxvwemda.png)
<figcaption>On the left there's a small space between pictures of cats vs on the right there's no space between cat pictures due to added `display: flex;`</figcaption>

Now, let's pretend that a perfectionist friend comes over to your apartment, and wants to align all kittens and the box according to the center of that room. There are two directions we'll have to align them in: horizontal(main axis) and vertical(cross axis). Here's a well-done visual representation of the axis:

![Cross(x) vs main(y) Axis when it comes to web development](https://thepracticaldev.s3.amazonaws.com/i/g27l033hgkwruldy3wlq.jpg)
<figcaption>Cross(x) vs main(y) Axis when it comes to web development</figcaption>

First, let's align them according to y-axis by attaching `align-items: center;` to the `.cat-box`. Then, let's also position them correctly on x-axis by adding `justify-content: center;`

![Cats that are aligned centrally on the y-axis](https://thepracticaldev.s3.amazonaws.com/i/1fe1y0tiu2ir8c56latc.png)
<figcaption>Cats that are aligned centrally on the y-axis</figcaption>

<figcaption>Cats that are aligned centrally on both y-axis and x-axis</figcaption>


At this point, these CSS properties were added to `.cat-box`:

<pre>
  display: flex;
  align-items: center;
  justify-content: center;
</pre>

As you have probably noticed, even though cats are now aligned centrally, the box holding them is still not where it needs to be. The perfectionist friend gets upset and, not trusting you anymore with such an "*important*" responsibility, starts to mess with cat positioning himself.

Here's what he gets by trying to align all containers on the `body` of CSS by attaching the same properties we just attached to `.cat-box`

![Despite using same properties on the `body`, the box only gets aligned centrally according to x-axis](https://thepracticaldev.s3.amazonaws.com/i/n2kvatihe14xrwyv9rw8.png)
<figcaption>Despite using same properties on the `body`, the box only gets aligned centrally according to x-axis</figcaption>

What he doesn't yet realize is that all furniture and other items like Nintendo Switch and MacBook Pro were suddenly centered in the apartment too, which is definitely an unwanted behavior! It is generally considered a bad practice to attach flexbox properties to the body.

![A MacBook on the left of kittens and Nintendo Switch on the right of the kittens get aligned centrally on y-axis](https://thepracticaldev.s3.amazonaws.com/i/luue5r1h4yn4tc5o0k90.png)
<figcaption>A MacBook on the left of kittens and Nintendo Switch on the right of the kittens get aligned centrally on y-axis</figcaption>

So in order to align both kittens *and* the box to the center of our screens, we'll have to create another `<div>` with a class of `.outer-container` and wrap it around the existing content. Why do we need that? Let's dive deeper into why by breaking down an example!

Take a look at this dev.to component that can be found on their main page. On the right side is a demonstration of how many containers(boxes) are currently used to make it work. Notice how they're nested — meaning inside each other. Light color that looks similar to a highlighter is there to portray inner padding of each container.

![Dev.to components with navigation links is broken down to several colored boxes](https://thepracticaldev.s3.amazonaws.com/i/0yn25gekow9k33tjrxnl.png)
<figcaption>Dev.to components with navigation links is broken down into several colored boxes</figcaption>

All flexbox manipulations are **always** one layer deep, meaning it only affects closest child boxes. For example, the purple container can only manipulate three inner containers but not any `<h>` or `<a>` elements inside of them. Whereas the the dark blue container has an ability to do something with it's anchors by attaching flexbox into itself(notice that `display: flex` would be attached to the *container* when you want to manipulate elements inside of it).

If you haven't noticed the pattern yet: we wanted to align kittens => gave a command to their closest outer box; desired to manipulate that same box => created a container outside of it that wraps the whole content. You would not be able to control cats from the `.outer-container`. Thus, try to remember a phrase **think outside of the box** since if you want to manipulate certain elements, you need to find the closest outer container in order to assign flexbox properties to it.

Keeping that in mind, the reason why all anchors in a dark blue container are positioned in a column is because they were given a flexbox property of `flex-direction: column;` through inheriting it from their purple parent container. Take a look at what happens to this dev.to component if flexbox direction is changed to row on the purple container. Can you still recognize the same boxes without lines and highlights? 😉

<img src="https://thepracticaldev.s3.amazonaws.com/i/zsmqxhuzmi79w3h0qlv6.png"  alt="Components look broken when flex-direction of the most outer container is changed to row" height="50%" width="50%">
<figcaption>Components look broken when flex-direction of the most outer container is changed to row</figcaption>

Going back to the visual example with cats, it now supposed to make sense why we need an extra wrapping container: otherwise there's no way to control the box that holds the cats. All there's left to do is add an extra `<div>` on HTML, give it a class, declare flexbox central positioning and add a *limited* size on that class. There are ways of making a container change it's size according to the stretching and squishing of content inside of it but we'll be diving into it more in Part 2 and 3 of this series. You're free to take a look at the finished code on this CodePen:

![Both cats and the box are positing in the center of the screen](https://thepracticaldev.s3.amazonaws.com/i/y3ajsb89jf9igo06s0iy.png)
<figcaption>Both cats and the box are positing in the center of the screen</figcaption>

We can have some fun playing with various others `justify-content`, here's a visual representation of how it changes things using this gif:

![A gif showing properties like `justify-content` flex-start, flex-end, space-evenly and space-between](https://thepracticaldev.s3.amazonaws.com/i/d1kvha5eo6zlu2zmchyi.gif)

<img src="https://thepracticaldev.s3.amazonaws.com/i/d1kvha5eo6zlu2zmchyi.gif"  alt="Demonstrates difference between various `justify-content` properties">
<figcaption>A gif showing properties like `justify-content` flex-start, flex-end, space-evenly and space-between</figcaption>

<img src="https://thepracticaldev.s3.amazonaws.com/i/gh7fdb1a4rssmr1c368a.png"  alt="Demonstrates difference between various `justify-content` properties" height="50%" width="50%">


## Conclusion

Hopefully an analogy of using `cats and boxes` helped you to grasp concepts of flexbox better. All terminology was on purpose simplified to focus solely on the importance of understanding. In addition, I'd love to hear your thoughts on Part 1: what did go well as well as what could have been done better? Do keep in mind that it is my *first ever* article written! Here's a repository with markdown of this article, you're welcome to create any and all pull requests!
https://github.com/kefimochi/Flexbox-with-cats/blob/master/Part%201/Basics.md

<center>~ Thank you for reading! ~</center>
---
layout: layouts/base.njk
title: Welcome
description: Welcome to WTFe(What The Frontend). In a world of infinite blog-verses, this is where frontend, AI, and chaos collide.
---

... In a world of infinite blog-verses, this is where Frontend, AI, and chaos collide 💥. From FE hacks to AI musings, let’s dive into cool stuff, share mad ideas, collaborate and laugh at how AI still can't figure out WTFe 😉 ...

<br />

# Welcome to WTFe(What The Frontend)
Here’s a mix of the newest ramblings, random things I’m trippinnn on, and all the wild ideas brewing in my head—fueled by way too much coffee ☕️. **Stay tuned, homies!**

## What’s Buzzing?

<div class="custom-list-wrapper">
    {% for post in collections.posts | reverse %}
        {% set postUrl = post.url.split('/') %}
        {% set subfolder = postUrl[2] %}
            {% if postUrl.length > 4 and subfolder and subfolder != '' %}
                **[{{ post.data.title }}]({{ post.url }})** / [#{{ subfolder }}](/tags/{{ subfolder }}/) / {{ post.date | readableDate }}
            {% else %}
                **[{{ post.data.title }}]({{ post.url }})** / {{ post.date | readableDate }}
            {% endif %}
    {% endfor %}
</div>

  <hr />

  <br />

  {% set discussionLink = "https://github.com/WTFe-dev/whatthefe/discussions/categories/wtfe-dev-posts?discussions_q=is%3Aopen+category%3A%22WTFe.dev+%7C%C2%A0Posts%22" %}
  <p><strong>Got thoughts on anything in the WTFe universe? 🤔</strong> </p>
  <p>Or maybe you’re up for collaborating on something cool? 🔥. I’m all ears and would love to hear from you! 😎</p>
  <a class="move-left-5px" href="{{ discussionLink }}" title="Join the discussion on WTFe.dev Github" target="_blank">Join the club !</a>
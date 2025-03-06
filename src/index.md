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

{% for post in collections.posts %}
    {% set postUrl = post.url.split('/') %}
    {% set subfolder = post.url.split('/')[2] %}
        {% if postUrl.length > 4 and subfolder and subfolder != '' %}
            - **[{{ post.data.title }}]({{ post.url }})** / {{ subfolder }} / {{ post.date | readableDate }}
        {% else %}
            - **[{{ post.data.title }}]({{ post.url }})** / {{ post.date | readableDate }}
        {% endif %}
{% endfor %}

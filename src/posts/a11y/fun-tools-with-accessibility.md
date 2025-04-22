---
title: Fun tools with accessibility!
description: Tools you can use to better understand your impact on accessibility attributes.
date: 2025-04-22
tags:
  - frontend
  - tools
  - a11y
  - accessibility
  - browsers
  - collab
---
# Fun tools with accessibility!

Have you ever been tasked with adding or **fixing accessibility in your websites?** It can be a bit frustrating at times to know what kind of changes your changes are making, and though learning how to use accessibility tools such as screen readers can be highly rewarding, perhaps you don't have the time, or you're just excited to see what the changes do faster. That's where some of the tools today come in!

**Hi! My name is [Byeongji Lim](https://www.linkedin.com/in/qudwl/), a frontend developer / accessibility advocate, and I'm here to tell you about some cool tips and tricks related to accessibility.**

> Accessibility (often abbreviated to A11y — as in, "a", then 11 characters, and then "y")

<br />

## Accessibility Tree

Just as browsers use browser engines to parse through HTML files and create a visual view, a similar technique is used to create what is known as **accessibility trees**. Accessibility trees are what are read by accessibility tools, **such as screen readers like NVDA, JAWS, VoiceOver, and more**.

!["Accessibility tree diagram"](/assets/images/accessibility-tree.png)

### Here's the tree described in code form

```
    A11Y  TREE:  Initial  subtree;  44:14.388  {  :  0x107077a00;  role:  document,  name:  'Example Domain',  idx:  0,  node:  0x105f84800,  #document  :  0x105fb8b30;  role:  heading,  name:  'Example Domain',  idx:  0,  node:  0x107b048b0,  h1  :  0x105fb8c90;  role:  text  leaf,  name:  'Example Domain',  idx:  0,  node:  0x107b05600,  #text  :  0x105fb8d40;  role:  paragraph,  idx:  1,  node:  0x107b04940,  p  :  0x105fb8df0;  role:  text  leaf,  name:  'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.',  idx:  0,  node:  0x107b05700,  #text  :  0x105fb8ea0;  role:  paragraph,  idx:  2,  node:  0x107b049d0,  p  :  0x107922030;  role:  link,  name:  'More information...',  idx:  0,  node:  0x107b030e0,  a  [  href="https://www.iana.org/domains/example"  ]  :  0x1079220e0;  role:  text  leaf,  name:  'More information...',  idx:  0,  node:  0x107b05800,  #text  }
```

<br />

## Accessibility Attributes Tab

| !["Chrome's accessibility attributes tab"](/assets/images/chrome-accessibility-attributes.png) | !["Firefox's accessibility attributes tab"](/assets/images/firefox-accessibility-attributes.png) |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Chrome                                                                                         | Firefox                                                                                          |

<br />

The first thing you might think to check if you looked for some accessibility tools in your browser is in the browser developer tools. And you'd be right! Google Chrome (and Chromium browsers) and Firefox both provide an **Accessibility** tab in the developer tools. They have different functions, but generally the things you could see from them are similar. They might show you different attributes an element might have, such as the role, name, level, and other aria-attributes. You can also see the accessibility tree in a visual way here!

<br />

## Full Accessibility Tree (Chrome)

On Chrome, you can make the experience of looking at the accessibility tree easier to view in comparison to the DOM by turning on the **Enable full-page accessibility tree** option in the elements tab.

!["Checkbox for enabling full accessibility tree"](/assets/images/enable-fp-tree.png)

Simply press the checkbox, and a little icon with the accessibility logo will pop up. Press on it, and you can see the DOM tree turn into the accessibility tree!

| !["Before clicking the checkbox elements tab"](/assets/images/before-elements-tab.png) | !["After clicking the checkbox elements tab"](/assets/images/after-elements-tab.png) |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Before                                                                                 | After                                                                                |

<br />

## View Source Order (Chrome)

As elements on the page will be read by a screen reader in terms of the DOM order, it might be helpful to know if the visual order is matching the DOM! Google Chrome has a feature called **View Source Order** in order to help with this. Simply click on the check box in the accessibility tab, and you will be able to see clearly.

!["Checkbox for source order viewer"](/assets/images/source-ov-checkbox.png)
!["Results of source order viewer"](/assets/images/result-sov.png)

<br />

## Focus Order View (Firefox)

All this talk about Chrome might make it feel that Firefox is lacking in terms of accessibility features, but it could be further from the truth! In Firefox you can also see the order of the focusable items in the way they will be presented. Instead of manually trying to keep track of all the focusable items, you can see visually where the focuses will go, and what order it will be.

!["Checkbox for focus order view"](/assets/images/show-tabbing-order.png)
!["Results of focus order view"](/assets/images/focus-order-view.png)

<br />

## Simulate Vision Issues (Firefox)

In Firefox, we also have a useful feature to simulate vision issues. Whether its color blindness in its various forms, or a reduction in contrast visibility, you can test them all out to make sure that your designs and code are visible to people of all abilities. 

!["Simulate vision issues checkbox"](/assets/images/simulate-vision-issues.png)
!["Vision issues simulations results"](/assets/images/results-of-svi.png)


### Wrapping Up

Improving accessibility **doesn’t have to be overwhelming**. With the right tools, you can quickly spot issues, understand their impact, and ship more inclusive experiences with confidence. Whether you're just getting started or refining an existing site, these tools can help make accessibility a more seamless part of your workflow. This isn’t the end of the list—there are many more tools, cool tips, and techniques out there. If you know of any, feel free to join the discussion and share!

[Giri]... here's a pic of Me and Byeongji from the Winter Party 2024. **You know, the one where we were definitely not talking about accessibility. 😆**
<img src="/assets/images/me+byeongji.jpg" width="25%" alt="Giri(left) Byeongji(right)" title="Giri(left) Byeongji(right)"/>
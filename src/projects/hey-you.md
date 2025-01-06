---
title: "Hey You"
description: "A subtle reminder to call your loved ones"
url: "https://hey-you-fullstack.github.io/hey-you-frontend"
year: 2020
tags: ["communication", "frontend"]
---

## The problem these days

...is that despite the million ways to communicate with friends and loved ones, it's harder and harder to do it. The importance of having a strong support network and regular social interaction is underscored especially now in the time of COVID-19 and work-from-home. That's why my friends David &amp; Johan decided to make Hey You, an incentivized reminder to stay in touch with the people who mean the most.

<!-- INTERACTIVE BUBBLES -->

When you make a commitment with Hey You, we'll send you a reminder once a month, at the time and date of your choice, to call that person. If you have to cancel, or don't feel like it, you donate $5 to one of our charity partners working to combat loneliness, social isolation, and depression.

## Requirements

We needed a site to serve as the face for Hey You, which would allow users to make a commitment and get info about the project and partner charities. We needed a means to send reminders, and hold people to their commitments. And we wanted the experience to seem light and unintrusive, with no app to download or account to create.

As for the reminders, SMS seemed an obvious choice to keep communication lightweight — everyone has it, and there's nothing to download! We decided that once a user had initiated a commitment, we would pick up the process over text, and all further interaction would be through this channel.

## Meat and potatoes

I built a streamlined, mobile-first frontend application in React to handle the signup process and provide contact and FAQ about our partner charities. Particular joy was had in adding polished animations [Framer Motion](https://motion.dev/) and smart forms with the flexible [React Hook Form](https://react-hook-form.com) library.

We designed and implemented a robust microservice-based backend on Firebase that orchestrated registering users (in a Firestore DB), scheduling reminders (via Cloud Functions) and handoffs to the appropriate Twilio SMS flow.

The flows included:

- Receive a hand-off to finishing the sign-up process
- Send reminders at the requisite time and date
- Confirm a call was made 👋
- Send a donation link if you didn't 🤹
- Allow editing existing commitments

## What's left

While yet to launch, Hey You is in the process of securing funding to
finish development and QA, and to get us to a public release. More
info will be made available via [the GitHub repository](https://github.com/hey-you-fullstack/hey-you-frontend).

import { ReactNode, ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  Icon,
  DeviceMobileSpeaker,
  HandPointing,
  Gauge,
  Lightbulb,
  NewspaperClipping,
  PhosphorLogo,
  Rss,
  Translate,
} from "@phosphor-icons/react";

import Heading from "../components/Heading/Heading";
import Snippet from "../components/Snippet/Snippet";
import Callout from "../components/Callout/Callout";
import StaticField from "../components/Demos/StaticField";
import SliderCard from "../components/Demos/SliderCard";
import IconPalette from "../components/Demos/IconPalette";
import ChatBubbles from "../components/Demos/ChatBubbles";
import NetworkGraph from "../components/Demos/NetworkGraph";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

import cert_warning_png from "../assets/cert-warning.png";
import cert_warning_webp from "../assets/cert-warning.webp";
import cockpit_webp from "../assets/cockpit.webp";
import cockpit_png from "../assets/cockpit.png";
import cockpit_gauges_webp from "../assets/cockpit-gauges.webp";
import cockpit_gauges_png from "../assets/cockpit-gauges.png";
import gejji_svg from "../assets/gejji3d.svg";
import gejji_hist_svg from "../assets/gejji3d_hist.svg";
import helena_spec_webp from "../assets/helenazhang-spec.webp";
import helena_spec_png from "../assets/helenazhang-spec.png";
import huebert_controls_svg from "../assets/huebert-controls.svg";
import phosphor_site_png from "../assets/phosphor_site.png";
import phosphor_site_webp from "../assets/phosphor_site.webp";
// @ts-ignore
import y_reader_video from "../assets/y-reader-video.mp4";
// @ts-ignore
import y_reader_video_hevc from "../assets/y-reader-video-hevc.mp4";

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number | readonly [start: number, end?: number];
  url: string;
  color?: string;
  accent?: string;
  theme?: string;
  Icon?: Icon;
  content?: ReactNode;
}

export const projects: ReadonlyArray<Project> = [
  {
    id: "qmind",
    title: "qMind",
    description:
      "A research tool to map intersections between language and intelligence",
    url: "https://qmind.io",
    year: 2020,
    color: "#FFFFFF",
    accent: "#1890FF",
    Icon: Translate,
    content: (
      <>
        <Heading id="what-is-it">What is it?</Heading>
        <p>
          qMind is a research platform for building a more individual model of
          intelligence and mental fitness via language. The core concept is that
          ideas are defined in relation to one another; words can only be
          defined in terms of other words, therefore our understanding can be
          represented by a directed graph of word meanings. By asking people to
          define different phrases in their own terms, we build a weighted
          network of meaning and word association.
        </p>
        <p>
          Current language models are based on statistical prediction methods,
          whereby vast amounts of text are analyzed in advance to form a
          weighted graph of their likelihood to appear near each other in a
          sentence. These transformers have an incredible capacity to imitate
          complex and intelligent behavior.
        </p>
        <ErrorBoundary>
          <figure>
            <NetworkGraph />
            <figcaption>Interactive force-directed graph component</figcaption>
          </figure>
        </ErrorBoundary>
        <p>
          Ours is based on self-reported definitions and associations provided
          by real people in their own words, and in the moment.
        </p>
        <Heading id="building-realtime-tools">Building realtime tools</Heading>
        <p>
          One of the requirements was that the portal be not only a means for
          collecting data, but also serve as an exploration tool for both
          participants and researchers to look deeply into the data. This meant
          having interactive data visualizations, search, sort, filter and
          transforms of the underlying data, and realtime analysis on it.
        </p>
        <p>
          I implemented algorithms and related visualizations for common graph
          analysis tools: breadth- and depth-first search, shortest path (first
          Dijkstra's, then A*),
        </p>
        <Snippet
          language="javascript"
          caption="Implementing Dijkstra's Algorithm for graph traversal"
        >
          {`\
function shortestPath(source, target) {
  if (!source || !target) return [];
  if (source === target) return [source];

  const queue = [source];
  const visited = { [source]: true };
  const predecessor = {};
  let tail = 0;

  while (tail < queue.length) {
    // Pop vertex off queue
    let last = queue[tail++];
    let neighbors = nodeMap[last];

    if (neighbors) {
      for (let neighbor of neighbors) {
        if (visited[neighbor]) continue;

        visited[neighbor] = true;
        if (neighbor === target) {
          // Check if path is complete. If so, backtrack!
          const path = [neighbor];
          while (last !== source) {
            path.push(last);
            last = predecessor[last];
          }
          path.push(last);
          path.reverse();
          return path;
        }
        predecessor[neighbor] = last;
        queue.push(neighbor);
      }
    }
  }
};\
`}
        </Snippet>
        <p>
          Providing these slices of information on-the-fly is a tough target to
          hit. The datasets generated by a single session are relatively small,
          but the analysis on them could be potentially massive. Some tasks lent
          themselves strongly toward client-side calculation on a per-user
          basis, and others toward batch or cron jobs on tables or entire
          databases. That's why we went with a GraphQL-based communication
          layer, and a hybrid mode of analysis where work was split between
          server and client, depending on what significance and scope it had.
        </p>
        <p>
          Finding path lengths between specific nodes, for example, could be
          done on demand by the client, since it would be relevant only at that
          time. Calculating the graph's Eigenvector centralities, on the other
          hand, would be precomputed by batch processes.
        </p>
        <Heading id="whats-next">What's next?</Heading>
        <p>
          The platform will use participant datasets to build language models
          that are both generalizable, and tuneable. Eventually, the plan is to
          use the model to help identify cognitive deficiencies in youth and
          elderly, to recommend areas of focus for school-aged children, and
          potentially as an early-warning indicator for neurological disease.
        </p>
      </>
    ),
  },
  {
    id: "heyyou",
    title: "Hey You",
    description: "A subtle reminder to call your loved ones",
    url: "https://hey-you-fullstack.github.io/hey-you-frontend/",
    year: 2020,
    color: "#FFFFFF",
    accent: "#CD5C5C",
    Icon: HandPointing,
    content: (
      <>
        <Heading id="the-problem-these-days">The problem these days</Heading>
        <p>
          ...is that despite the million ways to communicate with friends and
          loved ones, it's harder and harder to do it. The importance of having
          a strong support network and regular social interaction is underscored
          especially now in the time of COVID-19 and work-from-home. That's why
          my friends David &amp; Johan decided to make Hey You, an incentivized
          reminder to stay in touch with the people who mean the most.
        </p>
        <figure>
          <ChatBubbles
            messages={[
              {
                from: "you",
                content:
                  "We all have that one person we'd like to stay in touch with, but never get around to calling.",
              },
              {
                from: "me",
                content: (
                  <>
                    Yeah...I'm a bad friend{" "}
                    <span role="img" aria-label="woman facepalming emoji">
                      🤦🏾‍♀️
                    </span>
                  </>
                ) as any,
              },
              {
                from: "you",
                content:
                  "You're not! Our lives are busy, and these things take work.",
              },
              {
                from: "you",
                content:
                  "What if there was an incentive to call your loved ones more often?",
              },
            ]}
          />
          <figcaption>A chat component built for Hey You</figcaption>
        </figure>
        <p>
          When you make a commitment with Hey You, we'll send you a reminder
          once a month, at the time and date of your choice, to call that
          person. If you have to cancel, or don't feel like it, you donate $5 to
          one of our charity partners working to combat loneliness, social
          isolation, and depression.
        </p>
        <Heading id="requirements">Requirements</Heading>
        <p>
          We needed a site to serve as the face for Hey You, which would allow
          users to make a commitment and get info about the project and partner
          charities. We needed a means to send reminders, and hold people to
          their commitments. And we wanted the experience to seem light and
          unintrusive, with no app to download or account to create.
        </p>
        <p>
          As for the reminders, SMS seemed an obvious choice to keep
          communication lightweight — everyone has it, and there's nothing to
          download! We decided that once a user had initiated a commitment, we
          would pick up the process over text, and all further interaction would
          be through this channel.
        </p>
        <Heading id="meat-and-potatoes">Meat and potatoes</Heading>
        <p>
          I built a streamlined, mobile-first frontend application in React to
          handle the signup process and provide contact and FAQ about our
          partner charities. Particular joy was had in adding polished
          animations via{" "}
          <a href="https://www.framer.com/api/motion">Framer Motion</a> and
          smart forms with the flexible{" "}
          <a href="https://react-hook-form.com/">React Hook Form</a> library.
        </p>
        <p>
          We designed and implemented a robust microservice-based backend on
          Firebase that orchestrated registering users (in a Firestore DB),
          scheduling reminders (via Cloud Functions) and handoffs to the
          appropriate Twilio SMS flow.
        </p>
        <p>The flows included:</p>
        <ul>
          <li>Receive a hand-off to finishing the sign-up process</li>
          <li>Send reminders at the requisite time and date</li>
          <li>
            Confirm a call was made{" "}
            <span role="img" aria-label="waving hand emoji">
              👋🏽
            </span>
          </li>
          <li>
            Send a donation link if you didn't{" "}
            <span role="img" aria-label="man juggling emoji">
              🤹🏽‍♂️
            </span>
          </li>
          <li>Allow editing existing commitments</li>
        </ul>
        <Heading id="whats-left">What's left</Heading>
        <p>
          While yet to launch, Hey You is in the process of securing funding to
          finish development and QA, and to get us to a public release. More
          info will be made available via{" "}
          <a href="https://github.com/hey-you-fullstack/hey-you-frontend/">
            the GitHub repository
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cockpit",
    title: "Cockpit",
    description: "An immersive, techy dashboard for Android",
    url: "https://drive.google.com/drive/folders/1-0a62_LKvpX1713hEUAV4s-360yzdqwe?usp=sharing",
    year: 2018,
    // color: "#6FD2B9",
    color: "#60F0C4",
    accent: "#000000",
    theme: "inverse",
    Icon: DeviceMobileSpeaker,
    content: (
      <>
        <Heading id="digital-detox">Digital detox...lite</Heading>
        <p>
          Our phones are basically digital drugs. Colorful app icons, badges and
          notifications vying for our attention at every minute. It's tough to
          resist, and I'd be the first to admit I have a problem. So when I
          discovered that with an Android phone and some special tools I could
          entirely replace the addictive homescreen paradigm with whatever I
          could dream up, I decided to make something that would, hopefully,
          help institute some harm-reduction with in phone habits. And maybe
          look kinda cool in the process.
        </p>
        <Heading id="heads-up">Heads up</Heading>
        <p>
          Cockpit is a data-rich homescreen replacement for Android phones
          inspired by (surprise) aircraft cockpit design. The HUD style
          interface surfaces useful information like recent messages, nearby
          transit and weather, and device resource utilization to keep you in
          the know without hijacking your attention.
        </p>
        <figure>
          <picture>
            <source srcSet={cockpit_webp} type="image/webp" />
            <img src={cockpit_png} alt="" />
          </picture>
          <figcaption>Shots of the dashboard in action</figcaption>
        </figure>
        <p>
          Built using <abbr title="Kustom Live Wallpaper">KLWP</abbr> by{" "}
          <a href="https://play.google.com/store/apps/dev?id=5300483087872269403&hl=en_US&gl=US">
            Kustom Industries
          </a>
          , Cockpit replaces the typical grid of apps and eschews the
          ever-present notification shade in favor of four content areas:
        </p>
        <ol>
          <li>
            A <em>status</em> section with a clock, local weather, map view, and
            realtime nearby transit stations.
          </li>
          <li>
            A <em>notice</em> section with a customizable quick view into the
            three messaging or communication apps you need the most.
          </li>
          <li>
            A <em>vitals</em> section with like CPU and network usage.
          </li>
          <li>
            A <em>dock</em> section containing commonly-used apps, each with a
            custom icon treatment designed by{" "}
            <a href="https://helenazhang.com">my better half</a>.
          </li>
        </ol>
        <Callout accent="#60F0C4">
          <p>
            I found that this interface significantly reduced the amount of time
            I spent mindlessly browsing my phone.
          </p>
        </Callout>
        <Heading id="functional-bits">Functional bits</Heading>
        <p>
          While the framework API exposes some device vitals and notifications,
          generating the map view and nearby transit visualizations was a bit
          more of a challenge. I relied on Google's{" "}
          <a href="https://developers.google.com/maps/documentation/maps-static/overview">
            Static Maps
          </a>{" "}
          and{" "}
          <a href="https://developers.google.com/transit/gtfs-realtime/">
            GTFS Realtime
          </a>{" "}
          REST APIs to put it all together. For the map, we would construct a
          complex query using device GPS coordinates and user-set variables like
          the current dashboard theme and map zoom level, request a static map
          image with the appropriate style parameters, then apply
          post-processing and layer it into the dashboard UI.
        </p>
        <Snippet
          language="javascript"
          caption="Tediously assembling URL parameters to style the map"
        >
          {`\
let mapQueryUrl = \`https://maps.googleapis.com/maps/api/staticmap?\` +
  \`center=\${lat},\${lon}\` +
  \`&maptype=\${mapType}\` +
  \`&size=\${Math.round(height)}&scale=\${scale}&zoom=\${zoom}\` +
  \`&style=feature:all|element:labels|visibility\${
    labels ? "simplified" : "off"
  }\` +
  \`&style=feature:administrative|element:labels|visibility\${
    labels && cityLabels ? "simplified" : "off"
  }|color:\${labelColor}\` +
  \`&style=feature:road.highway|element:geometry.fill|color:\${highwayColor}\` +
  // ...About 40 more repetitive style parameters... 
  \`&key\${API_KEY}\`;\
`}
        </Snippet>
        <p>
          The transit stations would be a bit simpler, requiring just a simple
          API query and some parsing of the response, before displaying the
          transit modes on screen. Both the map and transit components could be
          customized to deep-link into the preferred navigation app with some of
          the navigation context pre-filled.
        </p>
        <p>
          At the time, I was on a less-than-ideal phone plan with exhorbitant
          data costs, and I was paranoid of going over my caps — which I did
          constantly anyway. I figured that placing this quota right on the home
          screen would keep me honest about my consumption in more ways than
          one. It turned out to work beautifully!
        </p>
        <figure>
          <picture>
            <source srcSet={cockpit_gauges_webp} type="image/webp" />
            <img src={cockpit_gauges_png} alt="" />
          </picture>
          <figcaption>
            Close-up of indicators in the <em>vitals</em> section
          </figcaption>
        </figure>
        <p>
          I found that this interface significantly reduced the amount of time I
          spent mindlessly browsing my phone; native notifications were silenced
          by default with this setup, and the loud, colorful icons and badges
          were no longer calling to be checked constantly. My data and usage was
          in check. And it made my feel like a character in Westworld when I
          used it.
        </p>
        <Heading id="variations-on-a-theme">Variations on a theme</Heading>
        <p>
          The custom icons designed for Cockpit sowed the seed for a complete
          set of app icons became a complete set of icons{" "}
          <a href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.mercury">
            for Android home screens
          </a>
          , and ultimately an{" "}
          <Link to="/phosphoricons">open-source resource</Link> for designers
          and developers of all kinds. My partner Helena even wrote{" "}
          <a href="https://medium.com/@minoraxis">several articles</a> on the
          subject of icon design and history.
        </p>
        <p>
          Cockpit got a number of new color schemes, underwent several revisions
          to adapt to breaking API changes and new OS limitations, but is still
          alive and well today. I stopped using it on my primary mobile phone,
          but I know I'll come back to it one day.
        </p>
      </>
    ),
  },
  {
    id: "huebert",
    title: "Huebert",
    description: "A desktop dashboard to control your Philips Hue",
    url: "https://rektdeckard.github.io/huebert",
    year: 2019,
    accent: "#BC8AF4",
    // accent: "linear-gradient(to bottom right, blue, pink)",
    Icon: Lightbulb,
    content: (
      <>
        <Heading id="motivation">Motivation</Heading>
        <p>
          Smart home lighting is pretty great. The ability to set the mood for a
          horror movie, gaming session, or party is a new level of immersion.
          And hey, our screens change color temperature to protect our eyes and
          sleep patterns, so why shouldn't the lights in our houses?
        </p>
        <p>
          <i>Controlling</i> your smart lights, however, is another story. When
          I installed Philips Hue bulbs in my apartment, my initial awe was
          followed shortly by the realization that 'smart' is a relative term. I
          couldn't touch the wall switches if I wanted the bulbs to stay
          connected. It always felt like a <i>process</i> to simply dim the
          lights as I worked late into the evening. The desktop apps for
          managing them were bloated, and my phone was...across the room. I
          started wondering, could my smart lights and sensors be controlled
          from a web app? The answer was Yes. Sort of.
        </p>
        <figure>
          <img src={huebert_controls_svg} alt="" />
          <figcaption>A rendering of the Huebert dashboard</figcaption>
        </figure>
        <Heading id="hello-huebert">Hello, Huebert</Heading>
        <p>
          Enter stage right, Huebert, my idea for a web and desktop client for
          Philips Hue lighting and home automation. It would provide a clean and
          lightweight interface to adjust your lights directly from the browser.
          As far as I knew, it would be the only browser-based app of its kind.
          As it would turn out, there may be a reason for that.
        </p>
        <Callout accent="#BC8AF4">
          <p>
            I started wondering, could my smart lights and sensors be controlled
            from a web app?
          </p>
          <p>
            <strong>TL;DR:</strong> Yes. Sort of.
          </p>
        </Callout>
        <Heading id="getting-to-know-hue">Getting to know Hue</Heading>
        <p>
          Philips Hue's{" "}
          <a href="https://developers.meethue.com/">API documentation</a>{" "}
          (account creation required) is thorough and flush with specifications
          and examples, and shows Philips' deep commitment to making an
          ecosystem of hackable and open products. They actively welcome
          development of third-party hardware and software, and even have a
          lengthy section on light and color theory in the developer pages.
        </p>
        <p>
          The Hue Bridge operates a local webserver on your WiFi network that
          listens to requests at several endpoints, providing control of
          everything from individual lights to scheduling lighting changes to
          customizing the behavior and triggers of connected switches and
          sensors. Commands use a declarative language that allow you to
          describe the state a light or element should be in, and the Bridge
          handles transitioning to that state.
        </p>
        <Snippet language="javascript" caption="Using the Philips Hue API">
          {`\
// Describe the light state
const lightState = {
  bri: 125,
  hue: 52322,
  sat: 254,
};
  
const options = {
  method: "POST",
  body: JSON.stringify(lightState),
  headers: {
      "Content-Type": "application/json"
  },
};
  
// Send POST request to the desired light or group endpoint
fetch("http://<BRIDGE_IP>/api/groups/<GROUP_NUMBER>", options)
  .then((res) => res.json())
  // Update application state accordingly
  .then((res) => updateLights(res));\
`}
        </Snippet>
        <Heading id="deceptively-simple">
          A deceptively simple implementation
        </Heading>
        <p>
          I chose to scaffold out a web application in React, since the
          declarative nature of the framework seemed a good fit for the API.
          Talking to the Bridge via the RESTful interface was a breeze, and
          building an interface around such inherently colorful data was a joy.{" "}
          {/* <span role="img" aria-label="rainbow emoji">
            🌈
          </span> */}
          To move fast, I leaned on the{" "}
          <a href="https://react.semantic-ui.com/">Semantic UI</a> toolkit for
          basic interface components. Other components were custom-made to fit
          the context. A working prototype came together in a matter of days.
        </p>
        <figure>
          <SliderCard />
          <figcaption>Demo of a control component used in Huebert</figcaption>
        </figure>
        <p>
          Since I was on a roll, I figured why not port the project to a
          multiplatform Electron app as well. No internet access? No problem! A
          desktop app could talk to your lights without leaving the local
          network.
        </p>
        <Heading id="pitfalls">Pitfalls</Heading>
        <p>
          The first working web-app build was deployed after a week or two via
          GitHub Pages. Difficulties arose when I realized that:
        </p>
        <ol>
          <li>The Hue Bridge does not expose an encrypted endpoint.</li>
          <li>
            Modern browsers <i>really</i> don't like it when web content from
            encrypted sources (HTTPS) make requests to unencrypted (HTTP)
            destinations.
          </li>
          <li>
            Philips <i>does</i> provide a Remote API that handles unencrypted
            traffic without routing communication through the browser, but it
            requires additional setup. Messages travel over the internet rather
            than the local network, and therefore incur additional latency.
          </li>
        </ol>
        <p>
          People were visiting the site, attempting to link to their Hue Bridge,
          and getting console errors about an <code>Invalid Certificate</code>.
          Their browsers were refusing to talk to unencrypted endpoints, since
          the origin itself was encrypted — also known as{" "}
          <code>Mixed Content</code>. Chrome and other browsers allow you to
          circumvent this protection, but not without blasting you with some
          pretty scary-looking warnings:
        </p>
        <figure>
          <picture>
            <source srcSet={cert_warning_webp} type="image/webp" />
            <img src={cert_warning_png} alt="" />
          </picture>
          <figcaption>
            Scary Chrome warning that a site's certificate is not trusted
          </figcaption>
        </figure>
        <p>
          Thankfully, this issue wasn't present in the Electron version of the
          app, since it would be running on a host machine on the local network.
          Foregoing encryption in this context is fine, since the traffic never
          leaves your house.
        </p>
        <p>
          I did the math, and decided the compromise of asking users to
          occasionally consent to a scary warning (every time the browser is
          updated or the cache is cleared) while posing litte real security risk
          was better than the alternatives — hosting the web-app itself on an
          unencrypted domain and sending all communication in-the-clear, or
          using the Remote API and requiring a more complicated setup on the
          user's part.
        </p>
        <Heading id="hard-truths">Hard truths</Heading>
        <p>
          Browsers protect us from the vast majority of malicious actors out
          there, as well as much of our own unsafe behavior. Though working
          within their security restrictions can present challenges in
          edge-cases like this one, I'm glad to have them. At least I now know a
          lot more about the inner workings of{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">
            CORS
          </a>
          ,{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content">
            Mixed Content
          </a>
          , and browser-specific security policies.
        </p>
        <p>
          Ultimately I was able to provide myself, as well as a creative
          community of enthusiasts, a much-needed tool. Even if it's a little
          rough around the edges.
        </p>
      </>
    ),
  },
  {
    id: "helenazhang",
    title: "Helena Zhang",
    description: "A portfolio website inspired by newspaper design",
    url: "https://helenazhang.com",
    year: 2020,
    color: "#FFFFFF",
    theme: "inverse",
    accent: "#000000",
    Icon: NewspaperClipping,
    content: (
      <>
        <Heading id="the-brief">The brief</Heading>
        <p>
          My partner Helena and I have a soft spot for the early days of the
          internet, when sites were unique, experimental, and performant. We
          wanted to build her a portfolio that was all of these things — but
          with modern web conventions at the core: responsive design, lazy
          loading, interactions that felt dynamic and tactile.
        </p>
        <p>
          Helena put together a design inspired by newspapers, with dense
          columns of content and explicit hierarchies of information. We mixed
          in references to broadcast TV and other analog media to make an
          experience that felt simultaneously nostalgic and modern.
        </p>
        <figure>
          <picture>
            <source srcSet={helena_spec_webp} type="image/webp" />
            <img src={helena_spec_png} alt="" />
          </picture>
          <figcaption>Site specifications</figcaption>
        </figure>
        <Heading id="laying-the-foundation">Laying the foundation</Heading>
        <p>
          I knew that using a popular framework like React or Vue.js went
          against the vibe for the site. It had to load fast, in mere kilobytes,
          and degrade gracefully in cases of poor bandwidth or lack of
          JavaScript — none of which are possible with typical SPAs today. This
          would be a regular old HTML/CSS/JS site. But since it's not 2003 any
          more, it needed to have some panache, too.
        </p>
        <p>
          Since most of the content would follow a grid-like pattern, I first
          laid out a scaffold using CSS <code>grid</code> layouts. After some
          experimentation with different breakpoints (mobile in particular), I
          pivoted to a <code>flexbox</code> based layout to simplify things. I
          borrowed some ideas (and code) from the{" "}
          <a href="https://bulma.io/">Bulma</a> CSS framework to achieve good
          reusability on the column components.
        </p>
        <Heading id="arguing-semantics">Arguing semantics</Heading>
        <p>
          A requirement of the portfolio site was that is should be simple
          enough for Helena to update herself with new content and projects.
          HTML5 Semantic Elements helped make the markup read like an outline,
          and massively aided comprehension. No <code>&lt;div&gt;</code> soup
          for you!
        </p>
        <Snippet
          language="html"
          caption="Semantic HTML can improve accessibility and code readability"
        >
          {`\
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    <header class="is-centered">
      <nav>...</nav>
      <h1>Hello, world! I'm a designer/writer...</h1>
    </header>
    <main>
      <section id="articles">
        <h2>Articles</h2>
        <article>...</article>
        <article>...</article>
      </section>
      <section id="design">...</section>
      <section id="projects">...</section>
      <section id="dribbble">
        <h2>Dribbble</h2>
        <figure>...</figure>
        <figure>...</figure>
      </section>
      ...
    </main>
    <footer class="is-centered">...</footer>
    <canvas id="static"></canvas>
  </body>
  <script src="/js/static.js"></script>
  <script src="/js/quote.js"></script>
</html>\
`}
        </Snippet>
        <p>
          Perhaps the two greatest benefits to this approach are the impressive
          gains to accessibility (screen readers and assistive devices have a
          much easier time of parsing this type of document), and the boost it
          gives to webpage SEO and indexing.
        </p>
        <Heading id="making-some-noise">Making some noise</Heading>
        <figure>
          <StaticField />
          <figcaption>TV static effect used in the footer</figcaption>
        </figure>
        <p>
          The design included a small block of TV static at the foot of the
          page; a purely aesthetic element that was originally intended to be a
          simple image. For fun, I decided to make it dynamic and wrote a white
          noise generator and spit the results onto a{" "}
          <code>&lt;canvas&gt;</code> element, to great nostalgic effect. The
          first, naïve pass used the Canvas API methods <code>fillRect()</code>{" "}
          and <code>clearRect()</code>, looping through the canvas coordinates
          and painting 1x1 'pixels' randomly in black or white. Since painting
          on a canvas is additive, each frame also had to clear the canvas
          before painting into it again. It was terribly slow.
        </p>
        <p>
          With some research into optimal data structures in JavaScript, and
          some performance testing of my own, I came up with a solution that
          didn't require clearing the canvas, and only needed one paint call per
          frame (instead of one per pixel!). Using a <code>Uint32Array</code> as
          a shared buffer for both the white noise values and the{" "}
          <code>ImageData</code> itself, we would fill the typed array with
          32-bit integers representing transparent black (all <code>0</code>{" "}
          bits) or solid white (all <code>1</code> bits) at random, then paint
          this <code>ImageData</code> in one go with <code>putImageData()</code>
          . The canvas itself was given a black background that peeked through
          the transparent pixels.
        </p>
        <Snippet
          language="javascript"
          caption="Generating white noise performantly"
        >
          {`\
// static.js
const canvas = document.getElementById("static");

if (canvas) {
  const context = canvas.getContext("2d");
  const { offsetHeight, offsetWidth } = canvas;
  canvas.width = offsetWidth;
  canvas.height = offsetHeight;

  const idata = context.createImageData(offsetWidth, offsetHeight);
  const buffer = new Uint32Array(idata.data.buffer);

  function noise(context) {
    let len = buffer.length - 1;
    while (len--) buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
    context.putImageData(idata, 0, 0);
  };

  (function loop() {
    noise(context);
    requestAnimationFrame(loop);
  })();
};\
`}
        </Snippet>
        <p>
          As a further optimization, I turned to the browser's built-in{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto">
            Crypto API{" "}
          </a>
          to get random bits even faster, with less overhead. The{" "}
          <code>window.crypto</code> object exposes a single method,{" "}
          <code>getRandomValues(typedArray)</code>, which will fill a passed{" "}
          <code>TypedArray</code> with cryptographically strong random bits via
          a PRNG seeded by a system-level entropy source. Similar to how we went
          from <code>n</code> paint events down to <code>1</code>, we were now
          getting our random bits wholesale.
        </p>
        <Callout>
          <p>
            <strong>NB:</strong> requesting more than 65,536 bits at a time from{" "}
            <code>window.crypto.getRandomValues()</code> will throw a{" "}
            <code>QuotaExceededError</code>, due to minimum guaranteed entropy
            of seed values. If more bits are needed, the buffer can be filled,
            used, and filled again.
          </p>
        </Callout>
        <p>
          There are certainly less CPU-intensive ways to create the visual
          effect of TV static: precomputing more noise than needed and choosing
          a random index into the noise to start painting from each frame, or
          even just using a GIF. But the fact that this implementation is truly
          (pseudo)random each frame and still manages to maintain 60 FPS is
          pretty unique.
        </p>
        <Heading id="looking-further-afield">Looking further afield</Heading>
        <p>
          When I sat down to build this, I was expecting a familiar exercise in
          static site development. Through the process of playing around with a
          seemingly mundane aesthetic element, though, I discovered quite a bit
          about browser APIs, and learned to look for solutions in unexpected
          places. By architecting the site for future modification and code
          readability, we got some excellent side-benefits. The end result was
          exactly the type of experience we wanted to create at the start. And
          we brought this thing from a sketch to production in one week flat.
        </p>
      </>
    ),
  },
  {
    id: "phosphoricons",
    title: "Phosphor Icons",
    description: "An open source icon library for React, Vue, and vanilla JS",
    url: "https://phosphoricons.com",
    year: [2020],
    Icon: PhosphorLogo,
    // color: "",
    accent: "#c4e456",
    content: (
      <>
        <Heading id="an-obsession">An obsession</Heading>
        <p>
          A few years ago I made the switch from iPhone to Android. I wanted to
          escape Apple's walled garden and start using technology that permitted
          me to modify and customize it to my liking, to make my own. I made a{" "}
          <Link to="/cockpit">techy dashboard</Link> for my phone, with design
          help from my partner{" "}
          <a href="https://helenazhang.com">Helena Zhang</a>. She designed
          around 40 custom, minimal icons to replace the common utility app
          icons and fit in with the hacker aesthetic.
        </p>
        <p>
          Over time that seed grew, eventually becoming a complete set of icons{" "}
          <a href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.mercury">
            for Android home screens
          </a>
          , replacing icons for over 800 of the most common apps with clean,
          minimalistic, monochromatic glyphs. We released different colorways,
          took icon suggestions, got involved in the small but active community
          of phone customizers. Helena even wrote{" "}
          <a href="https://medium.com/@minoraxis">several articles</a> on the
          subject of icon design and history. We were eating, breathing, and
          sleeping icons.
        </p>
        <figure>
          <IconPalette />
          <figcaption>Live demo of Phosphor Icons!</figcaption>
        </figure>
        <p>
          Eventually we realized that all this effort could serve a much larger
          audience of digital designers and engineers of all walks, not just the
          Android enthusiasts. We decided to create a library of general-purpose
          user interface icons for modern web, desktop, and mobile platforms —
          and <a href="https://phosphoricons.com">Phosphor Icons</a> was born.
        </p>
        <Heading id="providing-great-dx">Providing great DX</Heading>
        <p>
          I knew that its success would not come down to the design of the icons
          alone. We wanted to make an icon library that was as easy to learn as
          it was to use, covered the vast majority of platforms, and just
          worked. We needed to provide a top-tier developer experience to those
          using the icons. This meant not only supporting the most common
          frameworks, with packages for{" "}
          <a href="http://github.com/phosphor-icons/phosphor-react">React</a>,{" "}
          <a href="http://github.com/phosphor-icons/phosphor-vue">Vue.js</a>,
          and{" "}
          <a href="http://github.com/phosphor-icons/phosphor-icons">
            vanilla JS
          </a>
          , but also exposing an intuitive API and writing great documentation.
        </p>
        <Callout accent="#c4e456">
          <p>
            We wanted to make an icon library that was as easy to learn as it
            was to use, covered the vast majority of platforms, and just worked.
          </p>
        </Callout>
        <p>
          Taking advantage of React's <code>Context API</code> and Vue's{" "}
          <code>provide/inject</code> feature, I brought stateful local and
          global styling to the icon components. You could set the appearance of
          all icons in a subtree from one place, but unlike CSS it could be
          dynamic and manipulated programmatically.
        </p>
        <Snippet caption="Using React Context to apply default icon styles">
          {`\
import React from "react";
import { createRoot } from 'react-dom/client';
import { IconContext, Horse, Heart, Cube } from "phosphor-react";

const App = () => {
  return (
    <IconContext.Provider
      value={{
        color: "limegreen",
        size: 32,
        weight: "bold",
        mirrored: false,
      }}
    >
      <div>
        <Horse /> {/* I'm lime-green, 32px, and bold! */}
        <Heart /> {/* Me too! */}
        <Cube />  {/* Me three :) */}
      </div>
    </IconContext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(<App />);\
`}
        </Snippet>
        <Heading id="automate-the-fragile-stuff">
          Automate the fragile stuff, test everything
        </Heading>
        <p>
          When working with large component libraries, it's important to factor
          out sources of human error. Mistakes crop up inevitably at scale, and
          with over 3,500 icons and their corresponding implementations —
          packages in 3 javascript frameworks, a Figma plugin and library, and
          other things I'm forgetting — we had a lot of complexity to manage by
          hand. This led me to build custom internal tooling to support our
          efforts from the design process all the way through to production,
          including:
        </p>
        <ul>
          <li>
            An{" "}
            <a href="https://phosphor-icons.github.io/phosphor-testbed">
              icon testbed and live SVG editor
            </a>{" "}
            to check visual size and consistency of new icons against known
            controls
          </li>
          <li>A custom SVG sanitizer to slim down our asset sizes</li>
          <li>Codegen for 99.5% of our framework-specific library code</li>
          <li>
            Macro tools for Figma that handle some assembly of the design
            resources
          </li>
          <li>Build-scripts to tie it all together</li>
        </ul>
        <p>
          A small battery of unit and integration tests ensured that our
          automated approach wouldn't propagate subtle bugs throughout the
          system. And at the end of it all, we generated example apps to allow
          thorough inspection of every icon with the good ol'{" "}
          <i title="A.K.A. looking at it.">Mark I Eyeball™</i>. This usually
          consisted of large contact-sheets with multiple instances of each icon
          in its many variants and sizes, arranged to visually highlight
          inconsistencies.
        </p>
        <Callout accent="#c4e456">
          <p>
            Aside from reducing carpal tunnel risks for my partner and myself,
            the automation and testing processes gave us a confidence we
            couldn't get doing all of this manually.
          </p>
        </Callout>
        <Heading id="giving-phosphor-a-home">Giving Phosphor a home</Heading>
        <p>
          Naturally, we needed a fun and functional site to house the project.
          We wanted a searchable interface for the icon library that showcased
          each icon variant, along with code snippets for developers to quickly
          reference. And to show off a bit with sleek, snappy animations and
          strong visual demonstrations of the icons in use.
        </p>
        <p>
          I took it as an opportunity to try out some new tools in the React
          ecosystem. TypeScript formed the foundation for less buggy code with
          more compile-time guarantees. I used{" "}
          <a href="https://recoiljs.org/">Recoil</a>, a new experimental state
          management library from Facebook. It is an absolute joy to work with,
          and eliminates hundreds of lines of Redux boilerplate. I implemented a
          smart client-size fuzzy search with help from the awesome{" "}
          <a href="https://fusejs.io/">Fuse.js</a> library, making searching for
          icons much more forgiving.
        </p>
        <figure>
          <picture>
            <source srcSet={phosphor_site_webp} type="image/webp" />
            <img
              src={phosphor_site_png}
              alt="Screenshot of the Phosphor Icons homepage"
            />
          </picture>
          <figcaption>
            <a href="https://phosphoricons.com">phosphoricons.com</a>
          </figcaption>
        </figure>
        <p>
          Ultimately, we managed to pack a ton of ergonomic features into a
          simple and straightforward one-page site, and even received some
          accolades from sites like:{" "}
        </p>
        <ul>
          <li>
            <a href="https://www.admiretheweb.com/inspiration/phosphor-icons/">
              Admire the Web
            </a>
          </li>
          <li>
            <a href="https://cssnectar.com/css-gallery-inspiration/phosphor-icons/">
              CSS Nectar
            </a>
          </li>
          <li>
            <a href="https://twitter.com/smashingmag/status/1323575426501980166">
              Smashing Magazine
            </a>
          </li>
          <li>
            <a href="https://www.uxdatabase.io/issue-26">
              User Experience Database
            </a>
          </li>
          <li>
            <a href="https://onepagelove.com/phosphor-icons">One Page Love</a>
          </li>
        </ul>
        <Heading id="looking-ahead">Looking ahead</Heading>
        <p>
          We continue to grow the library, using analytics and feedback from the
          community to add the most-needed icons first. We hope to expand to
          support more use-cases for developers and designers alike. A{" "}
          <a href="https://github.com/phosphor-icons/phosphor-flutter">
            Flutter library
          </a>{" "}
          is already on the way, and we are planning Sketch support via a
          library and/or plugin down the road.
        </p>
      </>
    ),
  },
  {
    id: "y-reader",
    title: "YReader",
    description: "A modern Hacker News desktop client",
    year: 2022,
    url: "https://github.com/rektdeckard/y-reader",
    color: "#000000",
    accent: "#FE7820",
    theme: "a11y-light",
    Icon: Rss,
    content: (
      <>
        <Heading id="nth">The gap</Heading>
        <p>
          It's hard to really justify how bad the Hacker News website is,
          considering its pedigree and adjacency to so much tech capital. Yes,
          it works, and it is impressive that it still{" "}
          <a href="https://news.ycombinator.com/item?id=16076041">
            runs on a single, on-prem server
          </a>
          . But the UX is dated, and it is not so enjoyable to browse via the
          official website.
        </p>
        <p>
          I am far from the first person to come to this conclusion, as there
          are literally thousands of <abbr title="Hacker News">HN</abbr> clients
          out there. But I took this opportunity to explore cross-platform
          graphical application development in Rust, and resolved to write my
          own client.
        </p>
        <figure>
          <video autoPlay loop width="100%">
            <source src={y_reader_video_hevc} type="video/mp4" />
            <source src={y_reader_video} type="video/mp4" />
          </video>
          <figcaption>YReader Hacker News client</figcaption>
        </figure>
        <Heading id="something">Something</Heading>
        <p>Maybe more things here, lorem ipsum</p>
        <Callout accent="#FE7820">
          <p>YOYOYOYO</p>
        </Callout>
        <p>Maybe more things here, lorem ipsum</p>
        <Snippet
          language="rust"
          caption="Using egui immediate-mode UI crate to build rich apps"
        >
          {`\
impl YReader {
    fn init(&self) {
        let data_top = Arc::clone(&self.data);
        thread::spawn(move || loop {
            let client = JsonClient::new();
            let ids = client.top_stories();
            if let Ok(ids) = ids {
                let page;
                {
                    let data = data_top.lock().unwrap();
                    page = data.top_page;
                }
                for (idx, id) in ids.iter().take(WINDOW * (page + 1)).enumerate() {
                    if let Ok(item) = client.item(*id) {
                        let mut data = data_top.lock().unwrap();
                        data.top.insert(idx, item);
                    }
                }
                let mut data = data_top.lock().unwrap();
                data.top_ids = ids;
                data.top_page = (data.top_page + 1) % 2;
            }
            thread::sleep(Duration::from_secs(REFETCH_DELAY_SECONDS));
        });

        let data_new = Arc::clone(&self.data);
        thread::spawn(move || loop {
            let client = JsonClient::new();
            let ids = client.new_stories();
            if let Ok(ids) = ids {
                let page;
                {
                    let data = data_new.lock().unwrap();
                    page = data.new_page;
                }
                for (idx, id) in ids.iter().take(WINDOW * (page + 1)).enumerate() {
                    if let Ok(item) = client.item(*id) {
                        let mut data = data_new.lock().unwrap();
                        data.new.insert(idx, item);
                    }
                }
                let mut data = data_new.lock().unwrap();
                data.new_ids = ids;
                data.new_page = (data.new_page + 1) % 2;
            }
            thread::sleep(Duration::from_secs(REFETCH_DELAY_SECONDS));
        });
    }
}\
`}
        </Snippet>
      </>
    ),
  },
  {
    id: "gejji",
    title: "Gejji",
    description:
      "Monitor system performance on dedicated, retro LED indicators",
    url: "https://github.com/rektdeckard/gejji",
    year: 2022,
    Icon: Gauge,
    color: "#FDC126",
    theme: "inverse",
    accent: "#333333",
    content: (
      <>
        <Heading id="retro-is-beautiful">Retro is beautiful</Heading>
        <p>
          In my weekend forays into embedded systems, I came up with the idea to
          build a dedicated hardware system resource monitor to always show the
          CPU, Memory, and I/O utilization of my computer in a beautiful
          phyisical device. Who doesn't like a retro techy gadget?
        </p>
        <p>
          The initial design used a simple 4 character 14-segment amber LED
          display and an Adafruit Feather HUZZAH microcontroller for the brains.
          It alternated showing the current CPU and Memory usage in percent,
          collecting performance data using the{" "}
          <a href="https://github.com/microsoft/DTrace-on-Windows">
            DTrace for Windows
          </a>{" "}
          library, and streaming the data over the UART in a bespoke text
          format. It only worked on Windows and was pretty finnicky, but it was
          damn cool.
        </p>
        <figure>
          <picture>
            <source srcSet={""} type="image/webp" />
            <img src={gejji_svg} alt="" className="square" />
          </picture>
          <figcaption>
            A rendering of Gejji's initial, simple display
          </figcaption>
        </figure>
        <p>
          It fit nicely on my desk, and I was happy with it, for a time. But I
          soon wanted more information: disk and network I/O, histograms to
          visualize the statistics over time. I also wanted a robust CLI with
          backwards-compatibility for my original hardware, improved support for
          things like display update interval and display brightness, and the
          ability to run the host as a daemon so it could be started on boot
          with no interaction and run completely in the background.
        </p>

        <Heading id="redesign">Redesign</Heading>
        <p>
          I chose a 128x32 pixel monochrome OLED display, and wrote a primitive
          but effective graphing library to render pretty histograms. The end
          result looked something like this:
        </p>
        <figure>
          <picture>
            <source srcSet={""} type="image/webp" />
            <img src={gejji_hist_svg} alt="" className="square" />
          </picture>
          <figcaption>
            A rendering of Gejji's later iteration, with histogram
          </figcaption>
        </figure>
        <p>
          The memory limitation led me to implement a simple Ring Buffer to
          store chronological data and to write and read efficiently without
          allocation. This also resulted in quite simple rendering code.
        </p>
        <Snippet language="cpp" caption="Simple histogram drawing code">
          {`\
void drawHistogram(&Adafruit_GFX display, int *data, int offset, Edge edge)
{
    for(int i = offset, x = 0; x < display.width(); --i, ++x) {
        if (i < 0)
            i = display.width() - 1;

        int16_t column = display.width() - x - 1;

        switch (edge) {
        case Edge::Top:
            display.drawLine(
                column,
                0,
                column,
                (data[i] * display.height()) / Y_SCALE,
                WHITE);
            break;
        case Edge::Bottom:
            display.drawLine(
                column,
                display.height(),
                column,
                (display.height() - data[i] * display.height()) / Y_SCALE,
                WHITE);
            break;
        }
    }
}\
`}
        </Snippet>
        <p>
          With the help of the{" "}
          <a href="https://crates.io/crates/sysinfo">sysinfo</a> crate and some
          handy macros, we could now build and run cross-platform, and even
          daemonize the host to make it simple to start at boot.
        </p>

        <Heading id="rust-for-embedded">Detour into Rust for embedded</Heading>
        <p>
          Given that the host code was already written in Rust, and seeing the
          opportunity for a challenge, I decided to rewrite the microcontroller
          code in Rust as well. Using{" "}
          <a href="https://github.com/esp-rs/espflash">espflash</a> and{" "}
          <a href="https://mabez.dev/blog/posts/esp-rust-ecosystem/">
            this lovely guide by Scott Mabin
          </a>
          , I was able to compile Rust for the ESP32 board. But while ultimately
          possible, I found few benefits — and a number of difficulties around
          the tooling needed to get it working. I eventually went back to C++
          for the microcontroller code, but hope to see progress in this space
          in the future.
        </p>
        <p>
          Overall, I'm quite happy with the outcome, and the sharp little device
          sits on my desk to this day.
        </p>
      </>
    ),
  },
] as const;

import React from "react";
import { Link } from "react-router-dom";
import {
  Icon,
  HandPointing,
  Translate,
  Lightbulb,
  NewspaperClipping,
  PhosphorLogo,
  DeviceMobileSpeaker,
} from "phosphor-react";

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
import helena_spec_webp from "../assets/helenazhang-spec.webp";
import helena_spec_png from "../assets/helenazhang-spec.png";
import huebert_controls_svg from "../assets/huebert-controls.svg";
import phosphor_site_png from "../assets/phosphor-css-nectar.png";
import phosphor_site_webp from "../assets/phosphor-css-nectar.webp";

export interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
  url: string;
  color?: string;
  accent?: string;
  theme?: string;
  Icon?: Icon;
  content?: React.ReactNode;
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
        <h2>What is it?</h2>
        <p>
          qMind is a research platform for building a more individual model of
          intelligence and mental fitness via language. The core concept is
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
          Neque aliquam vestibulum morbi blandit cursus risus at. Rutrum quisque
          non tellus orci ac auctor augue. At imperdiet dui accumsan sit amet.
          Nibh tortor id aliquet lectus proin nibh nisl. Neque vitae tempus quam
          pellentesque nec nam. Volutpat consequat mauris nunc congue nisi
          vitae. Vulputate odio ut enim blandit volutpat maecenas. Elementum
          facilisis leo vel fringilla. Aliquam id diam maecenas ultricies mi
          eget mauris. Id nibh tortor id aliquet lectus. Et malesuada fames ac
          turpis.
        </p>
        <h2>Building realtime tools</h2>
        <p>
          One of the requirements was that the protal be not only a means for
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
};
`}
        </Snippet>
        <p>Providing these slices of information on-the-fly</p>
        <p>
          Neque aliquam vestibulum morbi blandit cursus risus at. Rutrum quisque
          non tellus orci ac auctor augue. At imperdiet dui accumsan sit amet.
          Nibh tortor id aliquet lectus proin nibh nisl. Neque vitae tempus quam
          pellentesque nec nam. Volutpat consequat mauris nunc congue nisi
          vitae. Vulputate odio ut enim blandit volutpat maecenas. Elementum
          facilisis leo vel fringilla. Aliquam id diam maecenas ultricies mi
          eget mauris. Id nibh tortor id aliquet lectus. Et malesuada fames ac
          turpis.
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
        <h2>The problem these days...</h2>
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
                ),
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
        <h2>Requirements</h2>
        <p>
          I was hired to build a site that would serve as the face for Hey You,
          and would allow users to make a commitment, and get info about the
          project and partner charities. We needed a means to send reminders,
          and hold people to their commitments. And we wanted the experience to
          seem light and unintrusive, with no app to download or account to
          create.
        </p>
        <p>
          SMS seemed an obvious choice to keep communication lightweight —
          everyone has it, and there's nothing to download! Once a user had
          initiated a commitment, we would hand off the process to a Twilio flow
          to finish the sign-up, and all further interaction would be through
          this channel.
        </p>
        <ul>
          <li>
            Website
            <ul>
              <li>Allow users to make a call commitment</li>
              <li>Allow choosing a preferred charity</li>
              <li>Provide Contact and FAQ</li>
            </ul>
          </li>
          <li>
            Twilio
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
          </li>
        </ul>

        <p></p>
      </>
    ),
  },
  {
    id: "cockpit",
    title: "Cockpit",
    description: "An immersive, techy dashboard for Android",
    url:
      "https://drive.google.com/drive/folders/1-0a62_LKvpX1713hEUAV4s-360yzdqwe?usp=sharing",
    year: 2018,
    color: "#6FD2B9",
    accent: "#000000",
    theme: "inverse",
    Icon: DeviceMobileSpeaker,
    content: (
      <>
        <h2>Heads up</h2>
        <p>
          Cockpit is a data-rich homescreen replacement for Android phones
          inspired by (surprise) aircraft cockpit design. The HUD style
          interface surfaces useful information like recent messages, nearby
          transit and weather, and device resource utilization to keep you in
          the know.
        </p>
        <figure>
          <picture>
            <source srcSet={cockpit_webp} type="image/webp" />
            <img src={cockpit_png} alt="" />
          </picture>
          <figcaption>Shots of the dashboard in action</figcaption>
        </figure>
        <h2>On obsession</h2>
        <p>
          A few years ago I made the switch from iPhone to Android. I wanted to
          escape Apple's walled garden and start using technology that permitted
          me to modify and customize it to my liking, to make my own. I got
          familiar with{" "}
          <a href="https://play.google.com/store/apps/dev?id=5300483087872269403&hl=en_US&gl=US">
            Kustom Industries
          </a>{" "}
          and made a <Link to="/cockpit">techy dashboard</Link> for my phone,
          with design help from my partner.
        </p>
        <h2>Information density</h2>
        <figure>
          <picture>
            <source srcSet={cockpit_gauges_webp} type="image/webp" />
            <img src={cockpit_gauges_png} alt="" />
          </picture>
          <figcaption>Close-ups of gauges and indicators</figcaption>
        </figure>
      </>
    ),
  },
  {
    id: "huebert",
    title: "Huebert",
    description: "A desktop dashboard to control your Philips Hue",
    url: "https://rektdeckard.github.io/huebert",
    year: 2019,
    accent: "#B688F0",
    // accent: "#BC8AF4",
    // accent: "linear-gradient(to bottom right, blue, pink)",
    Icon: Lightbulb,
    content: (
      <>
        <h2>Hello, Huebert</h2>
        <p>
          Huebert is a web and desktop client for Philips Hue lighting and home
          automation, built in React and Electron. It provides a clean and
          lightweight interface to adjust your lights directly from the browser.
        </p>
        <figure>
          <img src={huebert_controls_svg} alt="" />
          <figcaption>A rendering of the Huebert dashboard</figcaption>
        </figure>
        <h2>Motivation</h2>
        <p>
          Smart home lighting is pretty great. The ability to set the mood for a
          horror movie, gaming session, or party is a new level of immersion.
          And hey, our screens change color temperature to protect our eyes and
          sleep patterns, so why shouldn't the lights in our houses?
        </p>
        <p>
          <i>Controlling</i> your smart lights, however, is another story. When
          I installed Philips Hue bulbs in my apartment, my initial reaction of
          awe was followed shortly by the unfortunate realization I could never
          touch the physical light switches ever again, if I wanted things to
          work as expected. It always felt like a <i>process</i> to simply dim
          the lights as I sat at the computer, working later into the evening.
          The desktop apps for managing them were bloated, and my phone
          was...across the room.
        </p>
        <Callout accent="#BC8AF4">
          <p>
            <strong>TL;DR:</strong> I started wondering, could my smart lights
            and sensors be controlled from a web app?
          </p>
          <p>The answer was Yes. Sort of.</p>
        </Callout>
        <h2>Getting to know Hue</h2>
        <p>
          Philips Hue's{" "}
          <a href="https://developers.meethue.com/">API documentation</a>{" "}
          (account creation required) is thorough and flush with specifications
          and examples, and shows Philips' deep commitment to making an
          ecosystem of hackable and open products. They actively welcome
          development of third-party hardware and software. They even have a
          lengthy section on light and color theory (too heady for me).
        </p>
        <p>
          The Hue Bridge itself operates a local webserver on your WiFi network
          that listens to requests at several endpoints, providing control of
          everything from individual lights to scheduling lighting changes to
          customizing the behavior and triggers of connected switches and
          sensors. Commands use a declarative language that allows you to
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
  .then((res) => updateLights(res));
`}
        </Snippet>
        <h2>Building the dang thing</h2>
        <p>
          I chose to scaffold out a web application in React, since the
          declarative nature of the framework seemed a good fit for the API.
          Talking to the Bridge via the RESTful interface was a breeze, and
          building an interface around such inherently colorful data was a joy{" "}
          <span role="img" aria-label="rainbow emoji">
            🌈
          </span>
          . To move fast, I leanded on the{" "}
          <a href="https://react.semantic-ui.com/">Semantic UI</a> toolkit for
          basic interface components. Other components were custom-made to fit
          the context. A working prototype came together in a matter of days.
        </p>
        <figure>
          <SliderCard />
          <figcaption>Demo of a control component used in Huebert</figcaption>
        </figure>
        <p>
          Since I was on a roll, I thought that porting the project to a
          multiplatform Electron app would be a swell idea. No internet access?
          No problem! A desktop app could talk to your lights without leaving
          the local network.
        </p>
        <h2>Pitfalls</h2>
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
        <h2>Learnings</h2>
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
          community of enthusiasts, a much-needed tool.
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
        <h2>The brief</h2>
        <p>
          My partner Helena and I both have a soft spot for the early days of
          the internet, when sites were unique, experimental, performant. We
          wanted to build her a portfolio that was all of these things — but
          with modern web conventions at the core: responsive design, lazy
          loading, interactions that felt dynamic and tactile.
        </p>
        <p>
          The design was inspired by newspapers, with dense columns of content
          and explicit hierarchies of information. We mixed in references to
          broadcast TV and other analog media to make an experience that felt
          simultaneously nostalgic and modern.
        </p>
        <figure>
          <picture>
            <source srcSet={helena_spec_webp} type="image/webp" />
            <img src={helena_spec_png} alt="" />
          </picture>
          <figcaption>A wireframe of the site</figcaption>
        </figure>
        <h2>Laying the foundation</h2>
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
          laid out a scaffolding using CSS <code>grid</code> layouts. After some
          experimentation with different breakpoints (mobile in particular), I
          decided to pivot to a <code>flexbox</code> based layout to take
          advantage of <code>flex-flow</code> to simplify things. I borrowed
          some ideas (and code) from the <a href="https://bulma.io/">Bulma</a>{" "}
          CSS framework to achieve good reusability on the column components.
        </p>
        <h2>Arguing semantics</h2>
        <p>
          An unspoken requirement of the portfolio site was that is should be
          simple enough for Helena (a designer by trade) to update herself with
          new content and projects. HTML5 Semantic Elements helped make the
          markup read like an outline, and massively aided comprehension, even
          for a non-coder. No <code>&lt;div&gt;</code> soup for you!
        </p>
        <Snippet
          language="html"
          caption="Semantic HTML can improve accessibility and code readability"
        >
          {`\
<!-- index.html -->
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
</html>          
`}
        </Snippet>
        <p>
          Perhaps the two greatest benefits to this approach are the impressive
          gains to accessibility (screen readers and assistive devices have a
          much easier time of parsing this type of document), and the boost it
          gives to webpage SEO and indexing.
        </p>
        <h2>Making some noise</h2>
        <figure>
          <StaticField />
          <figcaption>TV static effect used in the portfolio site</figcaption>
        </figure>
        <p>
          I wrote a white noise generator that spit TV static onto a{" "}
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
};
`}
        </Snippet>
        <p>
          As a further optimization, I turned to the browser's built-in Crypto
          API to get random bits even faster, with less overhead. The{" "}
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
          effect of TV static — precomputing more noise than needed and chosing
          a random index into the noise to start painting from each frame, or
          even just using a GIF. But the fact that this implementation is truly
          (pseudo)random each frame and still manages to maintain 60 FPS is
          pretty cool, in my opinion.
        </p>
        <h2>Summing up</h2>
        <p>
          We built a highly performant static portfolio site that ticked all the
          boxes with respect to modern conventions and accessibility. We threw
          in some deceptively clever Easter eggs. And we brought this thing from
          a sketch to production in one week flat.
        </p>
      </>
    ),
  },
  {
    id: "phosphoricons",
    title: "Phosphor Icons",
    description: "An open source icon library for React, Vue, and vanilla JS",
    url: "https://phosphoricons.com",
    year: 2020,
    Icon: PhosphorLogo,
    content: (
      <>
        <h2>On obsession</h2>
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
          Over time that seed grew, eventually becoming a{" "}
          <a href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.mercury">
            complete set of icons
          </a>{" "}
          for Android home screens, replacing icons for over 800 of the most
          common apps with clean, minimalistic, monochromatic glyphs. We
          released different colorways, took icon suggestions, got involved in
          the small but active community of phone customizers. We were eating,
          breathing, and sleeping icons.
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
        <h2>Providing great DX</h2>
        <p>
          I knew that its success would not come down to the design of the icons
          alone. We needed to provide a top-tier developer experience to those
          using the icons. This meant not only supporting the most common
          use-cases by providing libraries for{" "}
          <a href="http://github.com/phosphor-icons/phosphor-react">React</a>,{" "}
          <a href="http://github.com/phosphor-icons/phosphor-vue">Vue.js</a>,
          and{" "}
          <a href="http://github.com/phosphor-icons/phosphor-icons">
            vanilla JS
          </a>
          , but also exposing an intuitive API, writing great documentation, and
          having a kickass website.
        </p>
        <Callout accent="#FFD171">
          <p>
            We wanted to make an icon library that was as easy to learn as it
            was to use, covered the vast majority of platforms, and just worked.
          </p>
        </Callout>
        <p>
          <del>
            A lot of UI Toolkits out there enforce their own design system
            guidelines on the library user; components can have one of six color
            variants, one of four size variants, and so on. The problem with
            this approach is that most applications call for their own colors,
            sizes, and other variants, and changing these defaults inevitably
            requires mucking around in CSS preprocesser variables or worse — the
            dreaded <code>!important</code> directive.
          </del>
        </p>
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
import ReactDOM from "react-dom";
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

ReactDOM.render(<App />, document.getElementById("root"));
`}
        </Snippet>
        <h2>Automate the fragile stuff, test everything</h2>
        <p>
          When working with large component libraries, it's important to factor
          out sources of human error. Copy/paste mistakes and absentmindedness
          crop up inevitably at scale, and with over 3,500 icons and their
          corresponding implementations — packages in 3 javascript frameworks, a
          Figma plugin and library, and other things I'm forgetting — we had a
          lot of complexity to manage by hand. This led me to build custom
          internal tooling to support our efforts from the design process all
          the way through to production, including:
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
          <li>Build scripts to tie it all together</li>
        </ul>
        <p>
          A small battery of unit and integration tests ensured that our
          automated approach wouldn't propagate subtle bugs throughout the
          system. And at the end of it all, we generated example apps to allow
          thorough inspection of every icon with the good ol'{" "}
          <i title="A.K.A. looking at it.">Mark I Eyeball™</i>. This usually
          consisted of large contact-sheets multiple instances of each icon in
          its many variants and sizes, arranged to visually highlight
          inconsistencies.
        </p>
        <Callout accent="#FFD171">
          <p>
            Aside from reducing carpal tunnel risks for my partner and me, the
            automation and testing processes gave us a confidence we couldn't
            get doing all of this manually.
          </p>
        </Callout>
        <h2>Giving Phosphor a home</h2>
        <p>
          Naturally, we needed a fun and functional site to house the project.
          We wanted a searchable interface for the icon library that showcased
          each icon variant, along with code snippets for developers to quickly
          reference. Sleek and snappy animations. Strong visual demonstrations
          of the icons in use.
        </p>
        <p>
          React is my go-to for web development these days, and I took it as an
          opportunity to try out some new libraries in the ecosystem. TypeScript
          formed the foundation for less buggy code with more compile-time
          guarantees. I used <a href="https://recoiljs.org/">Recoil</a>, a new
          experimental state management library from Facebook. It is an absolute
          joy to work with, and eliminates hundreds of lines of Redux
          boilerplate. I implemented a smart client-size fuzzy search with help
          from the awesome <a href="https://fusejs.io/">Fuse.js</a> library,
          making searching for icons much more forgiving.
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
            The final <a href="https://phosphoricons.com">phosphoricons.com</a>
          </figcaption>
        </figure>
        <p>
          Ultimatley, we managed to pack a ton of ergonomic features into a
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
        <p></p>
        <h2>Looking ahead</h2>
        <p></p>
      </>
    ),
  },
];

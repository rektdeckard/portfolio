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
import StaticField from "../components/Demos/StaticField";
import SliderCard from "../components/Demos/SliderCard";
import IconPalette from "../components/Demos/IconPalette";

import cert_warning_png from "../assets/cert-warning.png";
import cert_warning_webp from "../assets/cert-warning.webp";
import cockpit_webp from "../assets/cockpit.webp";
import cockpit_png from "../assets/cockpit.png";
import helena_spec_webp from "../assets/helenazhang-spec.webp";
import helena_spec_png from "../assets/helenazhang-spec.png";
import huebert_controls_svg from "../assets/huebert-controls.svg";
import ChatBubbles from "../components/Demos/ChatBubbles";
import NetworkGraph from "../components/Demos/NetworkGraph";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

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
        <p>
          Venenatis tellus in metus vulputate. Quis hendrerit dolor magna eget
          est lorem. Sed sed risus pretium quam. Amet venenatis urna cursus eget
          nunc scelerisque viverra. Viverra aliquet eget sit amet tellus cras
          adipiscing enim eu. Lorem ipsum dolor sit amet consectetur adipiscing
          elit ut aliquam. Tellus mauris a diam maecenas sed enim ut. Dictum at
          tempor commodo ullamcorper a lacus vestibulum. Interdum velit euismod
          in pellentesque massa placerat duis. Orci nulla pellentesque dignissim
          enim sit amet venenatis urna. At imperdiet dui accumsan sit amet nulla
          facilisi morbi tempus. Parturient montes nascetur ridiculus mus mauris
          vitae. Nisl nunc mi ipsum faucibus vitae aliquet nec. Congue mauris
          rhoncus aenean vel elit scelerisque mauris.
        </p>
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
        <Snippet>
          {`\
/**
 * Dijkstra's Algorithm implementation.
 * Calculates the shortest path between two nodes in the graph.
 *
 * @param {string} source - Starting node value
 * @param {string} target - Destination node value
 * @return {string[]} - Ordered nodelist from source to target
 */
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
        <p>
          Venenatis tellus in metus vulputate. Quis hendrerit dolor magna eget
          est lorem. Sed sed risus pretium quam. Amet venenatis urna cursus eget
          nunc scelerisque viverra. Viverra aliquet eget sit amet tellus cras
          adipiscing enim eu. Lorem ipsum dolor sit amet consectetur adipiscing
          elit ut aliquam. Tellus mauris a diam maecenas sed enim ut. Dictum at
          tempor commodo ullamcorper a lacus vestibulum. Interdum velit euismod
          in pellentesque massa placerat duis. Orci nulla pellentesque dignissim
          enim sit amet venenatis urna. At imperdiet dui accumsan sit amet nulla
          facilisi morbi tempus. Parturient montes nascetur ridiculus mus mauris
          vitae. Nisl nunc mi ipsum faucibus vitae aliquet nec. Congue mauris
          rhoncus aenean vel elit scelerisque mauris.
        </p>
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
    url: "https://github.com/Hey-You-Fullstack/hey-you-frontend",
    year: 2020,
    color: "#FFFFFF",
    accent: "#CD5C5C",
    Icon: HandPointing,
    content: (
      <>
        <p>
          Tattooed sustainable fixie, lo-fi cred tacos fam single-origin coffee
          put a bird on it taiyaki wolf tofu. Ennui organic cred hoodie marfa
          freegan franzen street art vegan af neutra. Raw denim church-key venmo
          bitters skateboard, DIY celiac offal. Mlkshk master cleanse raclette
          organic copper mug butcher, blog tbh selfies keytar microdosing retro.
        </p>

        <p>
          Viral vape XOXO venmo taiyaki tumblr. Tumblr farm-to-table bicycle
          rights scenester tofu, health goth pinterest umami typewriter VHS
          selfies marfa portland chambray lumbersexual. Literally kale chips raw
          denim tote bag. Aesthetic scenester authentic narwhal PBR&B ennui
          cardigan crucifix thundercats succulents. Chia biodiesel paleo hella.
        </p>

        <p>
          Aesthetic helvetica viral flannel 8-bit chicharrones photo booth man
          braid PBR&B. Biodiesel hoodie keffiyeh banjo microdosing keytar photo
          booth ramps flexitarian banh mi vape +1 bespoke normcore meggings.
          Twee aesthetic pork belly, vaporware cronut vegan palo santo readymade
          tattooed taiyaki austin. Pour-over kogi la croix put a bird on it
          shoreditch kombucha. 3 wolf moon celiac artisan, beard everyday carry
          tote bag health goth hoodie. Church-key vinyl shoreditch, venmo
          thundercats poke kinfolk normcore brunch gentrify palo santo. Artisan
          blue bottle pok pok ennui banh mi put a bird on it mustache yr vinyl
          fanny pack kale chips direct trade brooklyn fam raw denim.
        </p>
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
    Icon: DeviceMobile,
    content: (
      <>
        <p>
          Messenger bag pop-up leggings, franzen offal +1 typewriter.
          Thundercats banjo air plant truffaut sartorial live-edge. Photo booth
          put a bird on it scenester, whatever organic godard snackwave small
          batch tousled artisan. Vape normcore tattooed bitters twee trust fund
          fashion axe drinking vinegar taiyaki four loko edison bulb readymade.
          Asymmetrical occupy crucifix single-origin coffee art party, fixie
          pour-over coloring book bitters fanny pack roof party vice.
        </p>
        <p>
          Taxidermy kombucha poke, whatever meggings lo-fi pinterest authentic
          tote bag. Squid bitters glossier, coloring book 90's tbh narwhal trust
          fund tacos occupy 8-bit cardigan letterpress. Austin snackwave
          post-ironic copper mug lumbersexual cornhole hoodie freegan forage
          tilde godard slow-carb health goth leggings. Mustache jianbing
          succulents schlitz. Meh chillwave tbh bushwick. Vice stumptown
          coloring book semiotics, helvetica blue bottle lyft thundercats.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src={cockpitTeal} style={{ width: "50%" }} />
          {/* <img src={cockpitAmber} style={{ flex: 1, width: "50%" }} /> */}
        </div>
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
    Icon: Lightbulb,
    content: (
      <>
        <h2>The inspiration</h2>
        <p>
          Huebert is a web and desktop client for Philips Hue lighting and home
          automation, built in Electron and React. It was born out of pure
          laziness, as are all my programming endeavors, and it is my hope that
          it allows you to be just as lazy as I am.
        </p>
        <SliderCard />
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
        <p>
          I knew that using a popular framework like React or Vue.js went
          against the vibe for the site. It had to load fast, in mere kilobytes,
          and degrade gracefully in cases of poor bandwidth or lack of
          JavaScript — none of which are possible with typical SPAs today. This
          would be a regular old HTML/CSS/JS site. But since it's not 2003 any
          more, it needed to have some panache, too.
        </p>
        <h2>Laying the foundation</h2>
        <p></p>
        <h2>Making some noise</h2>
        <figure>
          <StaticField />
          <figcaption>TV static effect used in the portfolio site</figcaption>
        </figure>
        <p>
          I wrote a white noise generator that spit TV-static-like noise onto a{" "}
          <code>&lt;canvas&gt;</code> element, to great nostalgic effect. The
          first, naïve pass used the Canvas API methods <code>fillRect()</code>{" "}
          and <code>clearRect()</code>, looping through the canvas coordinates
          and painting 1x1 'pixels' randomly in black or white. Since painting
          on a canvas is additive, each frame had to clear the canvas before
          painting into it again. It was terribly slow.
        </p>
        <p>
          With some research into optimal data structures in JavaScript, and
          some performance testing of my own, I came up with a solution that
          didn't require clearing the canvas, and only needed one paint call per
          frame (instead of one per pixel!). Using a <code>Uint32Array</code> as
          a shared buffer for both the white noise values and the{" "}
          <code>ImageData</code> itself, we would fill the array with 32-bit
          integers representing transparent black (all <code>0</code> bits) or
          solid white (all <code>1</code> bits) at random, then paint this{" "}
          <code>ImageData</code> in one go with <code>putImageData()</code>. The
          canvas itself was given a black background that peeked through the
          transparent pixels.
        </p>
        <Snippet caption="Generating white noise performantly">
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
          There are certainly less CPU-intensive ways to create the visual
          effect of TV static — precomputing more noise than needed and chosing
          a random index into the noise to start painting from each frame, or
          even just finding a GIF somewhere. But the fact that this
          implementation is truly (pseudo)random each frame and still manages to
          maintain 60 FPS is pretty cool, in my opinion.
        </p>
        <h2>Arguing semantics</h2>
        <p>
          An unspoken requirement of the portfolio site was that is should be
          simple enough for Helena (a designer by trade) to update herself with
          new content and projects. This meant relying heavily on HTML5 Semantic
          Elements to make the code extremely legible, even for non-coders. No{" "}
          <code>&lt;div&gt;</code> soup for you!
        </p>
        <Snippet
          language="html"
          caption="Semantic HTML can improve readability and accessibility"
        >
          {`\
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    <header class="is-centered">
      <h1>Hello, world!...</h1>
      ...
      <nav>...</nav>
    </header>
    <main>
      <section id="articles">
        <h2>Articles</h2>
        <article>...</article>
        <article>...</article>
        <article>...</article>
      </section>
      <section id="design">
        <h2>Design</h2>
        <article>...</article>
        <article>...</article>
        <article>...</article>
        <article>...</article>
      </section>
      <section id="dribbble">
        <h2>Dribbble</h2>
        <figure>...</figure>
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
          Perhaps the two greatest benefits to this approach are the massive
          gains to accessibility (screen readers and assistive devices have a
          much easier time of parsing this type of document), and the boost it
          gives to webpage SEO and indexing.
        </p>
        <p>
          And did I mention we brought this thing from sketches to production in
          one week flat?
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
          me to modify and customize it to my liking, to make my own. I got
          familiar with{" "}
          <a href="https://play.google.com/store/apps/dev?id=5300483087872269403&hl=en_US&gl=US">
            Kustom Industries
          </a>{" "}
          and made a <Link to="/cockpit">techy dashboard</Link> for my phone,
          with design help from my partner.
        </p>
        <p></p>
        <figure>
          <IconPalette />
          <figcaption>Try out the icons!</figcaption>
        </figure>
        <p>
          When my partner <a href="https://helenazhang.com">Helena Zhang</a> and
          I set out to create the icons we always wanted to use, I knew that its
          success would not come down to the design of the icons alone. We
          needed to provide a top-tier developer experience to those using the
          icons. This meant not only supporting the most common use-cases by
          providing libraries for{" "}
          <a href="http://github.com/phosphor-icons/phosphor-react">React</a>,{" "}
          <a href="http://github.com/phosphor-icons/phosphor-vue">Vue.js</a>,
          and{" "}
          <a href="http://github.com/phosphor-icons/phosphor-icons">
            vanilla JS
          </a>
          , but also exposing an intuitive API, and
        </p>
        <p></p>
        {/* <img src={phosphorHero} width="100%" /> */}
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
      </>
    ),
  },
];

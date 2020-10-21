import React from "react";
import {
  Icon,
  HandPointing,
  Translate,
  DeviceMobile,
  Lightbulb,
  NewspaperClipping,
  PhosphorLogo,
} from "phosphor-react";
import { Prism } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import cockpitTeal from "../assets/cockpit-frame.png";
import cockpitAmber from "../assets/cockpit-frame-amber.png";
import phosphorHero from "../assets/phosphor-product-hunt-1.png";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  url: string;
  color?: string;
  accent?: string;
  Icon?: Icon;
  content?: React.ReactNode;
}

export const projects: ReadonlyArray<Project> = [
  {
    id: "qmind",
    title:
      "A research tool mapping intersections between language and intelligence",
    subtitle: "qMind",
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
        <Prism
          language="typescript"
          style={a11yDark}
          customStyle={{ borderRadius: 4 }}
          // showLineNumbers
          // wrapLines
          wrapLongLines
        >
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
        </Prism>
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
    title: "A subtle reminder to call your loved ones",
    subtitle: "Hey You",
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
    title: "An immersive, techy dashboard for Android",
    subtitle: "Cockpit",
    url:
      "https://drive.google.com/drive/folders/1-0a62_LKvpX1713hEUAV4s-360yzdqwe?usp=sharing",
    year: 2018,
    color: "#6FD2B9",
    accent: "#000000",
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <img src={cockpitTeal} style={{ width: "50%" }} />
        {/* <img src={cockpitAmber} style={{ flex: 1, width: "50%" }} /> */}
        </div>
      </>
    ),
  },
  {
    id: "huebert",
    title: "A desktop dashboard to control your Philips Hue",
    subtitle: "Huebert",
    url: "https://rektdeckard.github.io/huebert",
    year: 2019,
    // accent: "#EE8868",
    accent: "#BC8AF4",
    Icon: Lightbulb,
    content: (
      <>
        <p>
          Huebert is a web and desktop client for Philips Hue lighting and home
          automation, built in Electron and React. It was born out of pure
          laziness, as are all my programming endeavors, and it is my hope that
          it allows you to be just as lazy as I am.
        </p>
      </>
    ),
  },
  {
    id: "helenazhang",
    title: "A portfolio website inspired by newspaper design",
    subtitle: "Helena Zhang",
    url: "https://helenazhang.com",
    year: 2020,
    color: "#FFFFFF",
    accent: "#000000",
    Icon: NewspaperClipping,
    content: (
      <>
        <p>
          90's stumptown disrupt, gluten-free blog fingerstache polaroid hashtag
          wolf master cleanse. 3 wolf moon readymade kombucha authentic freegan
          letterpress succulents artisan ugh pabst banh mi truffaut poke. Put a
          bird on it bicycle rights selvage authentic bespoke pour-over,
          heirloom four loko pinterest. Helvetica disrupt glossier, franzen
          locavore flannel you probably haven't heard of them sriracha lo-fi
          polaroid kickstarter.
        </p>
        <p>
          Blue bottle slow-carb health goth vape lomo whatever waistcoat green
          juice chillwave disrupt direct trade la croix fingerstache. Paleo
          tacos ugh, mixtape beard pork belly skateboard pabst actually. Banh mi
          pork belly man bun dreamcatcher truffaut. Occupy intelligentsia squid,
          scenester meditation subway tile jianbing copper mug edison bulb pork
          belly biodiesel semiotics coloring book. Typewriter cloud bread
          crucifix aesthetic craft beer chillwave. Wolf austin small batch
          butcher, literally vexillologist kogi four dollar toast pitchfork
          blog. Bicycle rights raclette iPhone vape, flexitarian pok pok blog
          franzen humblebrag lumbersexual.
        </p>
      </>
    ),
  },
  {
    id: "phosphoricons",
    title: "An open source icon library for React, Vue, and vanilla JS",
    subtitle: "Phosphor Icons",
    url: "https://phosphoricons.com",
    year: 2020,
    Icon: PhosphorLogo,
    content: (
      <>
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
        <Prism
          language="typescript"
          style={a11yDark}
          customStyle={{ borderRadius: 4 }}
          wrapLongLines
        >
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
        </Prism>
      </>
    ),
  },
];

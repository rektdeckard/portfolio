import React, { CSSProperties } from "react";

// import "./SimpleSite.css";

const styles: Record<string, CSSProperties> = {
  body: {
    width: "100vw",
    // minHeight: "100vh",
    // padding: 32,
    backgroundColor: "#141414",
    color: "lightblue",
    fontFamily: "monospace",
  },
  main: {
    maxWidth: 640,
    margin: "auto",
    overflow: "overlay"
  },
  a: { color: "lightcyan" },
  ul: { listStyle: "sqaure" },
  summary: { cursor: "pointer" },
  article: {
    margin: "8px 0",
    padding: "0 16px",
    backgroundColor: "#202020",
    border: "1px dashed",
  },
  small: { float: "right" },
};

const SimpleSite: React.FC<{}> = () => (
  <div style={styles.body}>
    <main style={styles.main}>
      <h1>Tobias Fried</h1>
      <p>
        Hey, I'm a full-stack engineer and maker of digital tools and toys
        looking for a new opportunity. Let's talk about TypeScript, React vs.
        Vue, microframeworks, SSR vs. CSR, serverless, serverful, GraphQL,
        automation, TDD, CI/CD...
      </p>
      <section>
        <h2>Contact</h2>
        <ul>
          <li>
            <a href="https://github.com/rektdeckard" style={styles.a}>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/tobiasfried" style={styles.a}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://twitter.com/friedtm" style={styles.a}>
              Twitter
            </a>
          </li>
          <li>
            <a href="mailto:friedtm@gmail.com" style={styles.a}>
              Email
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Projects</h2>
        <article style={styles.article}>
          <h3>
            <a href="https://phosphoricons.com" style={styles.a}>
              Phosphor Icons
            </a>
            <small style={styles.small}>2020</small>
          </h3>
          <p>An open source icon library for React, Vue, and vanilla JS</p>
          <ul>
            <li>
              <a href="https://github.com/phosphor-icons" style={styles.a}>
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:hello@phosphoricons.com" style={styles.a}>
                Email
              </a>
            </li>
          </ul>
        </article>
        <article style={styles.article}>
          <h3>
            <a href="https://helenazhang.com" style={styles.a}>
              HelenaZhang.com
            </a>
            <small style={styles.small}>2020</small>
          </h3>
          <p>A portfolio website inspired by newspaper design</p>
        </article>
        <article style={styles.article}>
          <h3>
            <a
              href="https://hey-you-fullstack.github.io/hey-you-frontend/"
              style={styles.a}
            >
              Hey You
            </a>
            <small style={styles.small}>2020</small>
          </h3>
          <p>A subtle reminder to call your loved ones</p>
          <ul>
            <li>
              <a href="https://github.com/hey-you-fullstack/" style={styles.a}>
                GitHub
              </a>
            </li>
          </ul>
        </article>
        <article style={styles.article}>
          <h3>
            <a href="https://qmind.io" style={styles.a}>
              qMind.io
            </a>{" "}
            <small style={styles.small}>2020</small>
          </h3>
          <p>
            A research tool to map intersections between language and
            intelligence
          </p>
          <ul>
            <li>
              <a
                href="https://github.com/rektdeckard/wordnet-web"
                style={styles.a}
              >
                GitHub
              </a>
            </li>
          </ul>
        </article>
        <article style={styles.article}>
          <h3>
            <a href="https://rektdeckard.github.io/huebert" style={styles.a}>
              Huebert
            </a>
            <small style={styles.small}>2019</small>
          </h3>
          <p>
            A desktop dashboard to control your Philips Hue lights and
            smart-home devices
          </p>
          <ul>
            <li>
              <a href="https://github.com/rektdeckard/huebert" style={styles.a}>
                GitHub
              </a>
            </li>
          </ul>
        </article>
        <article style={styles.article}>
          <h3>
            <a
              href="https://drive.google.com/drive/folders/1-0a62_LKvpX1713hEUAV4s-360yzdqwe?usp=sharing"
              style={styles.a}
            >
              Cockpit
            </a>
            <small style={styles.small}>2018</small>
          </h3>
          <p>An immersive, techy dashboard for Android</p>
        </article>
      </section>
    </main>
  </div>
);

export default SimpleSite;

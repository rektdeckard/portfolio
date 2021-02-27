import React from "react";
import "./Copyright.css";

const Copyright: React.FC<{}> = () => (
  <footer className="copyright">
    <p>Copyright © {new Date().getFullYear()} Tobias Fried</p>
    <p>
      Designed by <a href="https://helenazhang.com">Helena Zhang</a>
    </p>
  </footer>
);

export default Copyright;

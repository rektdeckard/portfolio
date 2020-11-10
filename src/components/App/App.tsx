import React, { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";

import Header from "../Header/Header";
import Card from "../Card/Card";
import Detail from "../Detail/Detail";
import Copyright from "../Copyright/Copyright";
import { projects } from "../../data";
import "./App.css";
// import SimpleSite from "./SimpleSite";

const App: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  // const [simple, setSimple] = useState<boolean>(false);

  return (
    <div className="container" ref={ref}>
      <AnimateSharedLayout type="crossfade">
        <Router>
          <Switch>
            <Route exact path="/">
              {/* <span
                className="ui toggle checkbox"
                style={{ margin: 16, float: "right" }}
              >
                <input
                  type="checkbox"
                  checked={simple}
                  onChange={() => setSimple((s) => !s)}
                />
                <label></label>
              </span>
              {simple ? <SimpleSite /> : <> */}
              <Header />
              {projects.map((project) => (
                <Card key={project.id} {...project} ref={ref} />
              ))}
              <Copyright />
              {/* </>} */}
            </Route>
            <Route path="/:id" component={Detail} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </AnimateSharedLayout>
    </div>
  );
};

export default App;

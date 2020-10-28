import React, { useRef } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";

import Header from "../Header/Header";
import Card from "../Card/Card";
import Detail from "../Detail/Detail";
import Copyright from "../Copyright/Copyright";
import { projects } from "../../data";
import "./App.css";

const App: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="container" ref={ref}>
      <AnimateSharedLayout type="crossfade">
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              {projects.map((project) => (
                <Card key={project.id} {...project} ref={ref} />
              ))}
              {/* <Copyright /> */}
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

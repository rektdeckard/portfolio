import React, { Suspense } from "react";
import "@antv/graphin/dist/index.css";

import "./NetworkGraph.css";
import data from "../../data/graph.json";

const Graphin = React.lazy(() => import("@antv/graphin"));

const NetworkGraph: React.FC<{}> = () => {
  return (
    <div className="graph">
      <Suspense fallback={null}>
        <Graphin
          data={data}
          layout={{
            name: "force",
            options: {
              damping: 0.5,
              stiffness: 1000,
              defSpringLen: 25,
              minEnergyThreshold: 0.1,
              MaxIterations: 500,
              repulsion: 5000,
              maxSpeed: 1000,
              animation: true,
            },
          }}
          options={{
            wheelSensitivity: 4,
            // disablePan: true,
            // disableDrag: true,
            disableZoom: true,
          }}
        />
      </Suspense>
    </div>
  );
};

export default NetworkGraph;

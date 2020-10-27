import React, { Suspense } from "react";
// import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css";

import "./NetworkGraph.css";
import data from "./data.json";

const Graphin = React.lazy(() => import("@antv/graphin"));

const NetworkGraph: React.FC<{}> = () => {
  return (
    <Suspense fallback={<div></div>}>
      <div style={{ width: "100%" }}>
        <Graphin
          data={data}
          layout={{
            name: "force",
            options: {
              damping: 0.5,
              stiffness: 1000,
              defSpringLen: 25,
              // defSpringLen: settings.autoScaleSpringLength
              //   ? displayNodes.length + displayEdges.length / 2
              //   : settings.defaultSpringLength,
              minEnergyThreshold: 0.1,
              MaxIterations: 500,
              repulsion: 5000,
              maxSpeed: 1000,
              animation: true,
            },
          }}
          options={{
            wheelSensitivity: 4,
            // minZoom: 0.1,
            // zoom: 0.7,
            disablePan: true,
            // disableDrag: true,
            disableZoom: true,
          }}
          extend={{
            nodeShape: (node) => [
              {
                name: "TestShape",
                render: (node: any) => ({
                  // shape: string,
                  // shapeComponents: [
                  //   {
                  //     shape: G.ShapeType;
                  //     attrs: {
                  //     /** 这个shape图形的ID，用户自定义，保证不重复即可 */
                  //       id: string;
                  //       [key: string]: any;
                  //     };
                  //     isKeyShape?: boolean;
                  //     noReset?: boolean;
                  //   }
                  // ],
                  // state: {
                  //   [stateName: string]: {
                  //       [id: string]: {
                  //           [attr: string]: any;
                  //       };
                  //   };
                  // },
                  shape: "TestShape",
                  shapeComponents: [
                    {
                      shape: "circle",
                      attrs: { 
                        id: node.id,
                        r: node.data.radius,
                        fill: node.data.color
                      },
                      isKeyShape: true,
                      noReset: true,
                    }
                  ]
                }),
              },
            ],
          }}
          register={{
            nodeShape: (g6: any) => ([ { name: "TestShape", register: (g6) => {  }} ])
          }}
        />
      </div>
    </Suspense>
  );
};

export default NetworkGraph;

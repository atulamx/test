import "./styles.css";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

export default function SVGDiagram() {
  const showMessage = (value) => {
    console.log(value);
    alert("object clicked " + value.key);
  };

  var W_geometry = go.Geometry.parse("M 0,0 L 10,50 20,10 30,50 40,0", false);

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue"
      },
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key" // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      })
    });
    // define a simple Node template
    var simpleTemplate = $(
      go.Node,
      "Auto", // the Shape will go around the TextBlock
      // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      //   go.Point.stringify
      // ),
      $(
        go.Shape,
        "RoundedRectangle",
        { name: "SHAPE", fill: "white", strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true }, // some room around the text
        new go.Binding("text").makeTwoWay()
      )
    );

    var wTemplate = $(
      go.Node,
      "Auto",
      $(go.Shape, {
        geometry: W_geometry,
        stroke: "#00ff00",
        strokeWidth: 2,
        strokeMiterLimit: 10
      })
    );

    var svgTemplate = $(
      go.Part,
      "Table",
      $(go.Shape, {
        // row: 0, column: 2,
        geometryString:
          "M 47 2 L 35 2" +
          "M 47 7 L 35 7" +
          "M 47 11 L 35 11" +
          "M 47 15 L 35 15" +
          "M 47 20 L 35 20" +
          "M 47 24 L 35 24" +
          "M 14 13 L 0 13",
        stroke: "#24211d",
        fill: "none",
        strokeMiterLimit: 10
      }),
      $(go.Shape, {
        // row: 0, column: 1,
        geometryString:
          "M 14 11.82 L 24.67 17.62 L 35.34 24 L 35.34 11.62 L 35.34 -0.38 L 24.5 5.91 L 14 11.82",
        stroke: "#000000",
        fill: $(go.Brush, "Linear", { 0.0: "#1aad42", 1.0: "#007247" }),
        strokeMiterLimit: 10
      })
    );

    var templmap = new go.Map();
    templmap.add("simple", simpleTemplate);
    templmap.add("w", wTemplate);
    templmap.add("svg", svgTemplate);
    diagram.nodeTemplateMap = templmap;

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      var part = e.subject.part;
      if (!(part instanceof go.Link)) showMessage(part.data);
    });

    return diagram;
  }

  return (
    <ReactDiagram
      initDiagram={initDiagram}
      divClassName="diagram-component"
      nodeDataArray={[
        {
          key: 1,
          category: "svg"
        }
      ]}
      linkDataArray={
        [
          // { key: -1, from: 0, to: 1 },
          // { key: -2, from: 0, to: 2 },
          // { key: -3, from: 1, to: 1 },
          // { key: -4, from: 2, to: 3 },
          // { key: -5, from: 3, to: 0 }
        ]
      }
      // onModelChange={handleModelChange}
    />
  );
}

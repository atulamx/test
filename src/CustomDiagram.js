import "./styles.css";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import splitter from "./Splitter_6_outlet.svg";

export default function CustomDiagram() {
  const showMessage = (value) => {
    console.log(value);
    alert("object clicked " + value.key);
  };

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

    var svgTemplate = $(
      go.Part,
      $(go.Picture, { desiredSize: new go.Size(100, 70), source: splitter })
    );

    var templmap = new go.Map();
    templmap.add("simple", simpleTemplate);
    templmap.add("svg", svgTemplate);
    diagram.nodeTemplateMap = templmap;

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      var part = e.subject.part;
      if (!(part instanceof go.Link)) showMessage(part.data);
    });
    diagram.scale = 0.5;
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
    />
  );
}

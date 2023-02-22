import "./styles.css";
import * as go from "gojs";
import { ReactDiagram, ReactPalette } from "gojs-react";

const Pallete = () => {
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

    diagram.nodeTemplate = $(
      go.Node,
      "Horizontal",
      $(
        go.Shape,
        { width: 14, height: 14, fill: "white" },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, new go.Binding("text", "color"))
    );

    diagram.scale = 0.5;
    return diagram;
  }

  function initPalette() {
    const $ = go.GraphObject.make;
    var myPalette = $(go.Palette, {
      // model: $(go.GraphLinksModel, {
      //   linkKeyProperty: "key" // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      // }),
      layout: $(go.GridLayout, {
        cellSize: new go.Size(200, 20),
        wrappingColumn: 1
      })
    });
    myPalette.nodeTemplate = $(
      go.Node,
      "Horizontal",
      $(
        go.Shape,
        { width: 14, height: 14, fill: "white" },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, new go.Binding("text", "color"))
    );

    // myPalette.model.nodeDataArray = [
    //   { key: "C", color: "cyan" },
    //   { key: "LC", color: "lightcyan" },
    //   { key: "A", color: "aquamarine" },
    //   { key: "T", color: "turquoise" },
    //   { key: "PB", color: "powderblue" },
    //   { key: "LB", color: "lightblue" },
    //   { key: "LSB", color: "lightskyblue" },
    //   { key: "DSB", color: "deepskyblue" }
    // ];

    return myPalette;
  }

  return (
    <div style={{ display: "flex" }}>
      <ReactPalette
        initPalette={initPalette}
        divClassName="paletteComponent"
        nodeDataArray={[
          { key: "C", color: "cyan" },
          { key: "LC", color: "lightcyan" },
          { key: "A", color: "aquamarine" },
          { key: "T", color: "turquoise" },
          { key: "PB", color: "powderblue" },
          { key: "LB", color: "lightblue" },
          { key: "LSB", color: "lightskyblue" },
          { key: "DSB", color: "deepskyblue" }
        ]}
      />
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={[]}
      />
    </div>
  );
};

export default Pallete;

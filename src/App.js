import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls
} from "reactflow";
import "reactflow/dist/style.css";

import EnigmaDecoder from "./EnigmaDecoder.jsx";
import EnigmaEndoder from "./EnigmaEndoder.jsx";

import "./index.css";
import TextNode from "./TextNode";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  encoder: EnigmaEndoder,
  decoder: EnigmaDecoder,
  textNode: TextNode
};

const CustomNodeFlow = () => {
  const [inp, setInp] = useState("");
  const [op, setOp] = useState("");
  const [op2, setOp2] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onInpChange = (e) => {
    setInp(e.target.value?.toUpperCase());
  };

  useEffect(() => {
    setNodes(
      nodes.map((n) => {
        if (n.id === "2") {
          return { ...n, data: { ...n.data, inp, op } };
        }
        return n;
      })
    );
  }, [inp, op]);

  useEffect(() => {
    setNodes(
      nodes.map((n) => {
        if (n.id === "5") {
          return { ...n, data: { ...n.data, label: op2 } };
        }
        return n;
      })
    );
  }, [op2]);

  useEffect(() => {
    setNodes(
      nodes.map((n) => {
        if (n.id === "4") {
          return { ...n, data: { ...n.data, inp: op, op: op2 } };
        }
        if (n.id === "3") {
          return { ...n, data: { ...n.data, label: op } };
        }
        return n;
      })
    );
  }, [op]);

  useEffect(() => {
    setNodes([
      {
        id: "1",
        type: "textNode",
        data: { label: "Input", onInpChange, inp },
        style: {
          background: "white",
          paddingTop: 0,
          border: "1px solid #777",
          borderRadius: "5px",
          padding: 10
        },
        position: { x: 0, y: 50 },
        sourcePosition: "right"
      },
      {
        id: "2",
        type: "encoder",
        data: { label: "Enigma Encoders", op, setOp, inp, setInp, setOp2 },
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          background: "white",
          borderRadius: "5px",
          border: "1px solid #777",
          padding: 10,
          width: "180px"
        },
        position: { x: 250, y: 50 }
      },
      {
        id: "4",
        type: "decoder",
        data: { label: "Enigma Decoder", op, setOp, inp, setInp, setOp2 },
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          background: "white",
          borderRadius: "5px",
          border: "1px solid #777",
          padding: 10,
          width: "180px"
        },
        position: { x: 550, y: 100 }
      },
      {
        id: "3",
        type: "output",
        data: { label: op },
        position: { x: 550, y: 25 },
        targetPosition: "left"
      },
      {
        id: "5",
        type: "output",
        data: { label: op2 },
        position: { x: 800, y: 25 },
        targetPosition: "left"
      }
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#000000" }
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        animated: true,
        style: { stroke: "#000000" }
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        animated: true,
        style: { stroke: "#000000" }
      },
      {
        id: "e4b-5",
        source: "4",
        target: "5",
        animated: true,
        style: { stroke: "#000000" }
      }
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
      />
    </>
  );
};

export default CustomNodeFlow;

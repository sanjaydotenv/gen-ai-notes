import ConditionalEdges from "../notes/LangGraphFundamentals/ConditionalEdges";
import Edges from "../notes/LangGraphFundamentals/Edges";
import GraphExecution from "../notes/LangGraphFundamentals/GraphExecution";
import Nodes from "../notes/LangGraphFundamentals/Nodes";
import STARTEND from "../notes/LangGraphFundamentals/STARTEND";
import State from "../notes/LangGraphFundamentals/State";
import StateGraph from "../notes/LangGraphFundamentals/StateGraph";
import WhatisLangGraph from "../notes/LangGraphFundamentals/WhatisLangGraph";

const LangGraphFundamentalsRoutes = [
  {
    path: "/what-is-langgraph",
    element: <WhatisLangGraph />,
    label: "What is LangGraph",
  },
  {
    path: "/stategraph",
    element: <StateGraph />,
    label: "StateGraph",
  },
  {
    path: "/nodes",
    element: <Nodes />,
    label: "Nodes",
  },
  {
    path: "/edges",
    element: <Edges />,
    label: "Edges",
  },
  {
    path: "/conditional-edges",
    element: <ConditionalEdges />,
    label: "Conditional Edges",
  },
  {
    path: "/state",
    element: <State />,
    label: "State",
  },
  {
    path: "/start-end",
    element: <STARTEND />,
    label: "START & END",
  },
  {
    path: "/graph-execution",
    element: <GraphExecution />,
    label: "Graph Execution",
  },
];


export default LangGraphFundamentalsRoutes
import AgentWorkflows from "../notes/LangGraphAdvanced/AgentWorkflows";
import Checkpointing from "../notes/LangGraphAdvanced/Checkpointing";
import HumanintheLoop from "../notes/LangGraphAdvanced/HumanintheLoop";
import Interrupts from "../notes/LangGraphAdvanced/Interrupts";
import Memory from "../notes/LangGraphAdvanced/Memory";
import Persistence from "../notes/LangGraphAdvanced/Persistence";
import Subgraphs from "../notes/LangGraphAdvanced/Subgraphs";
import ToolNode from "../notes/LangGraphAdvanced/ToolNode";

const LangChainAdvancedRoutes = [
  {
    path: "/Agent-Workflows",
    element: <AgentWorkflows />,
    label: "Agents",
  },
  {
    path: "/Checkpointing",
    element: <Checkpointing />,
    label: "Custom Tools",
  },
  {
    path: "/Human-in-the-Loop",
    element: <HumanintheLoop />,
    label: "Document Loaders",
  },
  {
    path: "/Interrupts",
    element: <Interrupts />,
    label: "Embeddings Integration",
  },
  {
    path: "/Memory",
    element: <Memory />,
    label: "Retrievers",
  },
  {
    path: "/Persistence",
    element: <Persistence />,
    label: "Text Splitters",
  },
  {
    path: "/Subgraphs",
    element: <Subgraphs />,
    label: "Vector Store Integration",
  },
  {
    path: "/ToolNode",
    element: <ToolNode />,
    label: "Vector Store Integration",
  },
];


export default LangChainAdvancedRoutes
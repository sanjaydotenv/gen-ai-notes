import AgentArchitecture from "../notes/AIAgents/AgentArchitecture";
import AgentExecutionLoop from "../notes/AIAgents/AgentExecutionLoop";
import AgentMemory from "../notes/AIAgents/AgentMemory";
import MultiAgentFundamentals from "../notes/AIAgents/MultiAgentFundamentals";
import ReActPattern from "../notes/AIAgents/ReActPattern";
import ToolSelection from "../notes/AIAgents/ToolSelection";
import WhatareAIAgents from "../notes/AIAgents/WhatareAIAgents";

const AiAgentsRoutes = [
  {
    path: "/what-are-ai-agents",
    element: <WhatareAIAgents />,
    label: "What are AI Agents",
  },
  {
    path: "/agent-architecture",
    element: <AgentArchitecture />,
    label: "Agent Architecture",
  },
  {
    path: "/agent-execution-loop",
    element: <AgentExecutionLoop />,
    label: "Agent Execution Loop",
  },
  {
    path: "/tool-selection",
    element: <ToolSelection />,
    label: "Tool Selection",
  },
  {
    path: "/react-pattern",
    element: <ReActPattern />,
    label: "ReAct Pattern",
  },
  {
    path: "/agent-memory",
    element: <AgentMemory />,
    label: "Agent Memory",
  },
  {
    path: "/multi-agent-fundamentals",
    element: <MultiAgentFundamentals />,
    label: "Multi-Agent Fundamentals",
  },
];

export default AiAgentsRoutes;

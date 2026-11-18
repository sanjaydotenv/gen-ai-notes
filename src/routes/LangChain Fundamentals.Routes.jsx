import Chains from "../notes/LangChainFundamentals/Chains";
import LCEL from "../notes/LangChainFundamentals/LCEL";
import Models from "../notes/LangChainFundamentals/Models";
import OutputParsers from "../notes/LangChainFundamentals/OutputParsers";
import Prompts from "../notes/LangChainFundamentals/Prompts";
import Runnables from "../notes/LangChainFundamentals/Runnables";
import Streaming from "../notes/LangChainFundamentals/Streaming";
import WhatisLangChain from "../notes/LangChainFundamentals/WhatisLangChain";

const LangChainFundamentalsRoutes = [
  {
    path: "/what-is-langchain",
    element: <WhatisLangChain />,
    label: "What is LangChain",
  },
  {
    path: "/models",
    element: <Models />,
    label: "Models",
  },
  {
    path: "/prompts",
    element: <Prompts />,
    label: "Prompts",
  },
  {
    path: "/output-parsers",
    element: <OutputParsers />,
    label: "Output Parsers",
  },
  {
    path: "/chains",
    element: <Chains />,
    label: "Chains",
  },
  {
    path: "/lcel",
    element: <LCEL />,
    label: "LCEL",
  },
  {
    path: "/runnables",
    element: <Runnables />,
    label: "Runnables",
  },
  {
    path: "/streaming",
    element: <Streaming />,
    label: "Streaming",
  },
];

export default LangChainFundamentalsRoutes;

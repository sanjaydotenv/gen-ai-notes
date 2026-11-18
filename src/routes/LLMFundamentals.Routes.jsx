import HowLLMsWork from "../notes/LLMFundamentals/HowLLMsWork";
import ContextWindow from "../notes/LLMFundamentals/ContextWindow";
import Hallucinations from "../notes/LLMFundamentals/Hallucinations";
import Temperature from "../notes/LLMFundamentals/Temperature";
import TokensTokenization from "../notes/LLMFundamentals/TokensTokenization";
import WhatareLLMs from "../notes/LLMFundamentals/WhatareLLMs";
import WhatisGenerativeAI from "../notes/LLMFundamentals/WhatisGenerativeAI";

const LLMFundamentalsRoutes = [
  {
    path: "what-is-generative-ai",
    element: <WhatisGenerativeAI />,
    label: "What is Generative AI",
  },
  {
    path: "what-are-llms",
    element: <WhatareLLMs />,
    label: "What are LLMs",
  },
  {
    path: "how-llms-work",
    element: <HowLLMsWork />,
    label: "How LLMs Work",
  },
  {
    path: "tokens-tokenization",
    element: <TokensTokenization />,
    label: "Tokens & Tokenization",
  },
  {
    path: "context-window",
    element: <ContextWindow />,
    label: "Context Window",
  },
  {
    path: "temperature",
    element: <Temperature />,
    label: "Temperature",
  },
  {
    path: "hallucinations",
    element: <Hallucinations />,
    label: "Hallucinations",
  },
];

export default LLMFundamentalsRoutes;

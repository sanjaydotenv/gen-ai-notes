import AIApplicationArchitecture from "../notes/ProductionAI/AIApplicationArchitecture";
import AIEvaluation from "../notes/ProductionAI/AIEvaluation";
import Deployment from "../notes/ProductionAI/Deployment";
import LangSmith from "../notes/ProductionAI/LangSmith";
import PromptInjectionProtection from "../notes/ProductionAI/PromptInjectionProtection";
import RateLimiting from "../notes/ProductionAI/RateLimiting";
import TokenCostOptimization from "../notes/ProductionAI/TokenCostOptimization";

const ProductionAIRoutes = [
  {
    path: "/ai-application-architecture",
    element: <AIApplicationArchitecture />,
    label: "AI Application Architecture",
  },
  {
    path: "/ai-evaluation",
    element: <AIEvaluation />,
    label: "AI Evaluation",
  },
  {
    path: "/deployment",
    element: <Deployment />,
    label: "Deployment",
  },
  {
    path: "/langsmith",
    element: <LangSmith />,
    label: "LangSmith",
  },
  {
    path: "/prompt-injection-protection",
    element: <PromptInjectionProtection />,
    label: "Prompt Injection Protection",
  },
  {
    path: "/rate-limiting",
    element: <RateLimiting />,
    label: "Rate Limiting",
  },
  {
    path: "/token-cost-optimization",
    element: <TokenCostOptimization />,
    label: "Token Cost Optimization",
  },
];

export default ProductionAIRoutes;

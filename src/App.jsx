import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import LLMFundamentalsRoutes from "./routes/LLMFundamentals.Routes";
import PromptEngineeringRoutes from "./routes/PromptEngineering.Routes";
import LLMAPIIntegrationRoutes from "./routes/LLMAPIIntegration.Routes";
import AdvancedLLMFeaturesRoutes from "./routes/AdvancedLLMFeatures.Routes";
import EmbeddingsVectorDatabasesRoutes from "./routes/EmbeddingsVectorDatabases.Routes";
import LangChainFundamentalsRoutes from "./routes/LangChain Fundamentals.Routes";
import LangChainAdvanced from "./routes/LangChainAdvanced.Routes";
import RAGFundamentals from "./routes/RAGFundamentals.Routes";
import AdvancedRAGRoutes from "./routes/AdvancedRAG.Routes";
import LangGraphFundamentalsRoutes from "./routes/LangGraphFundamentals.Routes";
import ProductionAIRoutes from "./routes/ProductionAI.Routes";
import LangChainAdvancedRoutes from "./routes/LangGraphAdvanced.Routes";
import AiAgentsRoutes from "./routes/AIAgents.Routes";
import McpRoutes from "./routes/MCP.Routes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        ...LLMFundamentalsRoutes,
        ...PromptEngineeringRoutes,
        ...LLMAPIIntegrationRoutes,
        ...AdvancedLLMFeaturesRoutes,
        ...EmbeddingsVectorDatabasesRoutes,
        ...LangChainFundamentalsRoutes,
        ...LangChainAdvanced,
        ...RAGFundamentals,
        ...AdvancedRAGRoutes,
        ...LangGraphFundamentalsRoutes,
        ...LangChainAdvancedRoutes,
        ...LangChainAdvanced,
        ...AiAgentsRoutes,
        ...McpRoutes,
        ...ProductionAIRoutes
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

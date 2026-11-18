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
        ...AdvancedRAGRoutes
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

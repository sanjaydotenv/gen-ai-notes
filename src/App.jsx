import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import LLMFundamentalsRoutes from "./routes/LLMFundamentals.Routes";
import PromptEngineeringRoutes from "./routes/PromptEngineering.Routes";
import LLMAPIIntegrationRoutes from "./routes/LLMAPIIntegration.Routes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        ...LLMFundamentalsRoutes,
        ...PromptEngineeringRoutes,
        ...LLMAPIIntegrationRoutes,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

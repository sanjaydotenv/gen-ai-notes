import ContextManagement from "../notes/AdvancedLLMFeatures/ContextManagement";
import ConversationHistory from "../notes/AdvancedLLMFeatures/ConversationHistory";
import FunctionCalling from "../notes/AdvancedLLMFeatures/FunctionCalling";
import MultimodalAPIs from "../notes/AdvancedLLMFeatures/MultimodalAPIs";
import StructuredOutputs from "../notes/AdvancedLLMFeatures/StructuredOutputs";
import ToolCalling from "../notes/AdvancedLLMFeatures/ToolCalling";

const AdvancedLLMFeaturesRoutes = [
  {
    path: "function-calling",
    element: <FunctionCalling />,
  },
  {
    path: "tool-calling",
    element: <ToolCalling />,
  },
  {
    path: "structured-outputs",
    element: <StructuredOutputs />,
  },
  {
    path: "multimodal-apis",
    element: <MultimodalAPIs />,
  },
  {
    path: "conversation-history",
    element: <ConversationHistory />,
  },
  {
    path: "context-management",
    element: <ContextManagement />,
  },
];

export default AdvancedLLMFeaturesRoutes;

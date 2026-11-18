import SystemUserPrompts from "../notes/PromptEngineering/SystemUserPrompts";
import ZeroshotFewshot from "../notes/PromptEngineering/ZeroshotFewshot";
import PromptTemplates from "../notes/PromptEngineering/PromptTemplates";
import StructuredPrompting from "../notes/PromptEngineering/StructuredPrompting";
import JSONOutput from "../notes/PromptEngineering/JSONOutput";
import PromptInjection from "../notes/PromptEngineering/PromptInjection";

const PromptEngineeringRoutes = [
  {
    path: "system-user-prompts",
    element: <SystemUserPrompts />,
  },
  {
    path: "zero-shot-few-shot",
    element: <ZeroshotFewshot />,
  },
  {
    path: "prompt-templates",
    element: <PromptTemplates />,
  },
  {
    path: "structured-prompting",
    element: <StructuredPrompting />,
  },
  {
    path: "json-output",
    element: <JSONOutput />,
  },
  {
    path: "prompt-injection",
    element: <PromptInjection />,
  },
];

export default PromptEngineeringRoutes;

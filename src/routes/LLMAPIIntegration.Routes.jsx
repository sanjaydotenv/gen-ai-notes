import OpenAIAPI from "../notes/LLMAPIIntegration/OpenAIAPI";
import GeminiAPI from "../notes/LLMAPIIntegration/GeminiAPI";
import GroqAPI from "../notes/LLMAPIIntegration/GroqAPI";
import ChatCompletions from "../notes/LLMAPIIntegration/ChatCompletions";
import StreamingResponses from "../notes/LLMAPIIntegration/StreamingResponses";
import TokenUsageRateLimits from "../notes/LLMAPIIntegration/TokenUsageRateLimits";
import ErrorHandling from "../notes/LLMAPIIntegration/ErrorHandling";

const LLMAPIIntegrationRoutes = [
  {
    path: "openai-api",
    element: <OpenAIAPI />,
  },
  {
    path: "gemini-api",
    element: <GeminiAPI />,
  },
  {
    path: "groq-api",
    element: <GroqAPI />,
  },
  {
    path: "chat-completions",
    element: <ChatCompletions />,
  },
  {
    path: "streaming-responses",
    element: <StreamingResponses />,
  },
  {
    path: "token-usage-rate-limits",
    element: <TokenUsageRateLimits />,
  },
  {
    path: "error-handling",
    element: <ErrorHandling />,
  },
];

export default LLMAPIIntegrationRoutes;
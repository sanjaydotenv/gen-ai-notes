import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
  BrainCircuit,
  Sparkles,
  ChevronRight,
  BookOpen,
  Search,
  Command,
  PanelLeftClose,
  Layers3,
  Bot,
  Database,
  Workflow,
  ShieldCheck,
  Network,
} from "lucide-react";

const MainLayout = () => {
  const [expandedModule, setExpandedModule] = useState("LLM Fundamentals");

  const modules = [
    {
      title: "LLM Fundamentals",
      description: "Core Concepts",
      icon: BrainCircuit,
      day: "DAY 01",
      topics: [
        { title: "What is Generative AI?", path: "what-is-generative-ai" },
        { title: "What are LLMs?", path: "what-are-llms" },
        { title: "How LLMs Work", path: "how-llms-work" },
        { title: "Tokens & Tokenization", path: "tokens-tokenization" },
        { title: "Context Window", path: "context-window" },
        { title: "Temperature", path: "temperature" },
        { title: "Hallucinations", path: "hallucinations" },
      ],
    },
    {
      title: "Prompt Engineering",
      description: "Design Better Prompts",
      icon: Sparkles,
      day: "DAY 02",
      topics: [
        { title: "System & User Prompts", path: "system-user-prompts" },
        { title: "Zero-shot & Few-shot", path: "zero-shot-few-shot" },
        { title: "Prompt Templates", path: "prompt-templates" },
        { title: "Structured Prompting", path: "structured-prompting" },
        { title: "JSON Output", path: "json-output" },
        { title: "Prompt Injection", path: "prompt-injection" },
      ],
    },
    {
      title: "LLM API Integration",
      description: "Working With LLM APIs",
      icon: Layers3,
      day: "DAY 03",
      topics: [
        { title: "OpenAI API", path: "openai-api" },
        { title: "Gemini API", path: "gemini-api" },
        { title: "Groq API", path: "groq-api" },
        { title: "Chat Completions", path: "chat-completions" },
        { title: "Streaming Responses", path: "streaming-responses" },
        { title: "Token Usage & Rate Limits", path: "token-usage-rate-limits" },
        { title: "Error Handling", path: "error-handling" },
      ],
    },
    {
      title: "Advanced LLM Features",
      description: "Advanced Capabilities",
      icon: BrainCircuit,
      day: "DAY 04",
      topics: [
        { title: "Function Calling", path: "function-calling" },
        { title: "Tool Calling", path: "tool-calling" },
        { title: "Structured Outputs", path: "structured-outputs" },
        { title: "Multimodal APIs", path: "multimodal-apis" },
        { title: "Conversation History", path: "conversation-history" },
        { title: "Context Management", path: "context-management" },
      ],
    },
    {
      title: "Embeddings & Vector Databases",
      description: "Semantic Search",
      icon: Database,
      day: "DAY 05",
      topics: [
        { title: "What are Embeddings?", path: "what-are-embeddings" },
        { title: "Vector Representations", path: "vector-representations" },
        { title: "Cosine Similarity", path: "cosine-similarity" },
        { title: "Semantic Search", path: "semantic-search" },
        { title: "Vector Databases", path: "vector-databases" },
        { title: "ChromaDB / Pinecone", path: "chromadb-pinecone" },
        { title: "MongoDB Vector Search", path: "mongodb-vector-search" },
      ],
    },
    {
      title: "LangChain Fundamentals",
      description: "Build With LangChain",
      icon: Network,
      day: "DAY 06",
      topics: [
        { title: "What is LangChain?", path: "what-is-langchain" },
        { title: "Models", path: "models" },
        { title: "Prompts", path: "prompts" },
        { title: "Output Parsers", path: "output-parsers" },
        { title: "Chains", path: "chains" },
        { title: "LCEL", path: "lcel" },
        { title: "Runnables", path: "runnables" },
        { title: "Streaming", path: "streaming" },
      ],
    },
    {
      title: "LangChain Advanced",
      description: "Advanced LangChain",
      icon: Network,
      day: "DAY 07",
      topics: [
        { title: "Document Loaders", path: "document-loaders" },
        { title: "Text Splitters", path: "text-splitters" },
        { title: "Retrievers", path: "retrievers" },
        { title: "Embeddings Integration", path: "embeddings-integration" },
        { title: "Vector Store Integration", path: "vector-store-integration" },
        { title: "Custom Tools", path: "custom-tools" },
        { title: "Tool Calling", path: "tool-calling" },
        { title: "Agents", path: "agents" },
      ],
    },
    {
      title: "RAG Fundamentals",
      description: "Retrieval Augmented Generation",
      icon: Database,
      day: "DAY 08",
      topics: [
        { title: "What is RAG?", path: "what-is-rag" },
        { title: "RAG Architecture", path: "rag-architecture" },
        { title: "Document Processing", path: "document-processing" },
        { title: "Chunking", path: "chunking" },
        { title: "Embeddings", path: "embeddings" },
        { title: "Retrieval", path: "retrieval" },
        { title: "Context Injection", path: "context-injection" },
        { title: "RAG Implementation", path: "rag-implementation" },
      ],
    },
    {
      title: "Advanced RAG",
      description: "Advanced Retrieval",
      icon: Layers3,
      day: "DAY 09",
      topics: [
        { title: "Semantic Search", path: "semantic-search" },
        { title: "Hybrid Search", path: "hybrid-search" },
        { title: "Query Transformation", path: "query-transformation" },
        { title: "Reranking", path: "reranking" },
        { title: "Metadata Filtering", path: "metadata-filtering" },
        { title: "RAG Evaluation", path: "rag-evaluation" },
        {
          title: "Agentic RAG (Introduction)",
          path: "agentic-rag-introduction",
        },
      ],
    },
    {
      title: "LangGraph Fundamentals",
      description: "Graph Based Workflows",
      icon: Workflow,
      day: "DAY 10",
      topics: [
        { title: "What is LangGraph?", path: "what-is-langgraph" },
        { title: "StateGraph", path: "stategraph" },
        { title: "State", path: "state" },
        { title: "Nodes", path: "nodes" },
        { title: "Edges", path: "edges" },
        { title: "Conditional Edges", path: "conditional-edges" },
        { title: "START / END", path: "start-end" },
        { title: "Graph Execution", path: "graph-execution" },
      ],
    },
    {
      title: "LangGraph Advanced",
      description: "Advanced Graph Systems",
      icon: Workflow,
      day: "DAY 11",
      topics: [
        { title: "ToolNode", path: "toolnode" },
        { title: "Agent Workflows", path: "agent-workflows" },
        { title: "Checkpointing", path: "checkpointing" },
        { title: "Persistence", path: "persistence" },
        { title: "Memory", path: "memory" },
        { title: "Human-in-the-Loop", path: "human-in-the-loop" },
        { title: "Interrupts", path: "interrupts" },
        { title: "Subgraphs", path: "subgraphs" },
      ],
    },
    {
      title: "AI Agents",
      description: "Autonomous AI Systems",
      icon: Bot,
      day: "DAY 12",
      topics: [
        { title: "What are AI Agents?", path: "what-are-ai-agents" },
        { title: "Agent Architecture", path: "agent-architecture" },
        { title: "ReAct Pattern", path: "react-pattern" },
        { title: "Tool Selection", path: "tool-selection" },
        { title: "Agent Execution Loop", path: "agent-execution-loop" },
        { title: "Agent Memory", path: "agent-memory" },
        { title: "Multi-Agent Fundamentals", path: "multi-agent-fundamentals" },
      ],
    },
    {
      title: "MCP",
      description: "Model Context Protocol",
      icon: Network,
      day: "DAY 13",
      topics: [
        { title: "What is MCP?", path: "what-is-mcp" },
        { title: "MCP Architecture", path: "mcp-architecture" },
        { title: "MCP Client", path: "mcp-client" },
        { title: "MCP Server", path: "mcp-server" },
        { title: "Resources", path: "resources" },
        { title: "Tools", path: "tools" },
        { title: "Prompts", path: "prompts" },
        { title: "Custom MCP Server", path: "custom-mcp-server" },
      ],
    },
    {
      title: "Production AI",
      description: "Deploy & Scale AI",
      icon: ShieldCheck,
      day: "DAY 14",
      topics: [
        {
          title: "AI Application Architecture",
          path: "ai-application-architecture",
        },
        { title: "Error Handling", path: "error-handling" },
        { title: "Rate Limiting", path: "rate-limiting" },
        {
          title: "Prompt Injection Protection",
          path: "prompt-injection-protection",
        },
        { title: "AI Evaluation", path: "ai-evaluation" },
        { title: "LangSmith", path: "langsmith" },
        { title: "Token Cost Optimization", path: "token-cost-optimization" },
        { title: "Deployment", path: "deployment" },
      ],
    },
  ];

  const totalTopics = modules.reduce(
    (total, module) => total + module.topics.length,
    0,
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E3E3E3] flex">
      {/* SIDEBAR */}
      <aside className="w-[290px] shrink-0 h-screen sticky top-0 bg-[#121212] border-r border-white/[0.06] flex flex-col">
        {/* LOGO */}
        <div className="h-[75px] shrink-0 px-6 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex items-center justify-center">
              <BrainCircuit size={22} className="text-[#FC6C26]" />
            </div>

            <div>
              <h1 className="font-bold text-[15px] tracking-wide">
                AI<span className="text-[#FC6C26]">.DOCS</span>
              </h1>

              <p className="text-[10px] text-white/30 tracking-[2px]">
                LEARNING PLATFORM
              </p>
            </div>
          </div>

          <PanelLeftClose
            size={17}
            className="text-white/30 cursor-pointer hover:text-[#FC6C26] transition-colors"
          />
        </div>

        {/* SEARCH */}
        <div className="px-4 pt-6 shrink-0">
          <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#FC6C26]/30 transition-all">
            <div className="flex items-center gap-2 text-white/40">
              <Search size={16} />
              <span className="text-xs">Search documentation...</span>
            </div>

            <span className="flex items-center gap-1 text-[10px] text-white/30">
              <Command size={11} /> K
            </span>
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-7 custom-scrollbar">
          <div className="flex items-center justify-between px-2 mb-5">
            <span className="text-[10px] font-bold tracking-[2px] text-white/30">
              LEARNING PATH
            </span>

            <span className="text-[10px] text-[#FC6C26] font-semibold">
              14 DAYS
            </span>
          </div>

          {/* ROADMAP PROGRESS */}
          <div className="px-3 py-3 mb-5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-white/60 font-medium">
                Generative AI Roadmap
              </span>

              <Sparkles size={13} className="text-[#FC6C26]" />
            </div>

            <div className="flex justify-between text-[10px] text-white/30 mb-2">
              <span>14 Learning Modules</span>
              <span>{totalTopics} Topics</span>
            </div>

            <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full w-[7%] bg-[#FC6C26] rounded-full" />
            </div>
          </div>

          {/* MODULES */}
          <div className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              const isExpanded = expandedModule === module.title;

              return (
                <div key={module.title}>
                  {/* MODULE HEADER */}
                  <button
                    onClick={() =>
                      setExpandedModule(isExpanded ? null : module.title)
                    }
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all duration-200 ${
                      isExpanded
                        ? "bg-[#FC6C26]/[0.08] border-[#FC6C26]/15"
                        : "border-transparent hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${
                        isExpanded ? "bg-[#FC6C26]/15" : "bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          isExpanded ? "text-[#FC6C26]" : "text-white/40"
                        }
                      />
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold tracking-wider text-[#FC6C26]/70">
                          {module.day}
                        </span>
                      </div>

                      <h3
                        className={`text-xs font-semibold truncate ${
                          isExpanded ? "text-white" : "text-white/65"
                        }`}
                      >
                        {module.title}
                      </h3>

                      <p className="text-[10px] text-white/30 mt-1 truncate">
                        {module.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] text-white/25">
                        {module.topics.length}
                      </span>

                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded
                            ? "rotate-90 text-[#FC6C26]"
                            : "text-white/30"
                        }`}
                      />
                    </div>
                  </button>

                  {/* TOPICS */}
                  {/* TOPICS */}
                  {isExpanded && (
                    <div className="ml-7 mt-2 mb-3 pl-4 border-l border-white/[0.08] space-y-1">
                      {module.topics.map((topic, index) => {
                        const topicContent = (
                          <>
                            <span className="text-[10px] opacity-40 w-4 shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1">{topic.title}</span>
                          </>
                        );

                        return (
                          <NavLink
                            key={topic.path}
                            to={`/${topic.path}`}
                            className={({ isActive }) =>
                              `group relative flex items-center gap-3 px-3 py-3 rounded-lg text-xs transition-all duration-200 ${
                                isActive
                                  ? "bg-[#FC6C26]/10 text-[#FC6C26] font-semibold"
                                  : "text-white/45 hover:text-white/90 hover:bg-white/[0.04]"
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-[#FC6C26] shadow-[0_0_10px_#FC6C26]" />
                                )}

                                {topicContent}

                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC6C26] shadow-[0_0_8px_#FC6C26]" />
                                )}
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR BOTTOM */}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 min-h-screen">
        {/* TOPBAR */}
        <header className="h-[75px] sticky top-0 z-20 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-xs">
            <BookOpen size={15} className="text-[#FC6C26]" />

            <span className="text-white/35">Documentation</span>

            <ChevronRight size={13} className="text-white/20" />

            <span className="text-white/80">Generative AI</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30">
              LEARN. BUILD. MASTER.
            </span>

            <div className="w-8 h-8 rounded-full bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex items-center justify-center">
              <Sparkles size={15} className="text-[#FC6C26]" />
            </div>
          </div>
        </header>

        {/* PAGE */}
        <div className="max-w-[1200px] mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

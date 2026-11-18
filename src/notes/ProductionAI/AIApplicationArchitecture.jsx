import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AIApplicationArchitecture = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          PRODUCTION AI / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">AI Application Architecture</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          AI Application Architecture describes how different components work
          together to build, process, and deliver AI-powered features in a
          real-world application.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Basic Architecture</h2>

        <p className="leading-7 text-[#aaa]">
          A typical AI application contains a frontend, backend, AI model, data
          storage, and external services.
        </p>

        <CodeBlock
          code={`             USER
               |
               v
          FRONTEND
         (React UI)
               |
               v
          BACKEND API
        (Node.js / Express)
               |
               v
        AI APPLICATION
               |
       +-------+-------+
       |       |       |
       v       v       v
      LLM   DATABASE  TOOLS
       |       |       |
       +-------+-------+
               |
               v
          AI RESPONSE
               |
               v
            USER`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The backend coordinates the request, communicates with the required
          services, and sends the final response to the frontend.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Main Components</h2>

        {[
          {
            title: "1. Frontend",
            desc: "Provides the user interface where users enter prompts and receive AI responses.",
            example: "React, Next.js",
          },
          {
            title: "2. Backend",
            desc: "Handles API requests, authentication, validation, business logic, and AI orchestration.",
            example: "Node.js, Express",
          },
          {
            title: "3. LLM",
            desc: "Understands user input and generates responses based on the provided context.",
            example: "GPT, Gemini, Llama",
          },
          {
            title: "4. Database",
            desc: "Stores users, chat history, application data, and other persistent information.",
            example: "MongoDB, PostgreSQL",
          },
          {
            title: "5. Vector Database",
            desc: "Stores and searches embeddings for semantic retrieval in RAG applications.",
            example: "Pinecone, Chroma, Qdrant",
          },
          {
            title: "6. External Tools",
            desc: "Allow the AI application to interact with APIs, services, and external systems.",
            example: "Weather API, MCP tools",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
          >
            <h3 className="font-semibold text-[#FC6C26]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">{item.desc}</p>
            <p className="mt-2 text-xs text-[#888]">Examples: {item.example}</p>
          </div>
        ))}
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Request Processing Flow</h2>

        <p className="leading-7 text-[#aaa]">
          Let's understand what happens when a user sends a message to an AI
          chatbot.
        </p>

        <CodeBlock
          code={`1. User sends a message
          |
          v
2. Frontend sends API request
          |
          v
3. Backend validates the request
          |
          v
4. Load relevant context
   (Chat History / RAG Data)
          |
          v
5. Build the LLM input
          |
          v
6. Send request to LLM
          |
          v
7. Process model response
          |
          v
8. Save conversation if required
          |
          v
9. Return response to frontend`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. Example: AI Chatbot Backend
        </h2>

        <p className="leading-7 text-[#aaa]">
          A simplified Express route shows how the backend can receive a
          message, call an AI service, and return its response.
        </p>

        <CodeBlock
          code={`import express from "express";

const app = express();

app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Call your LLM service here
    const aiResponse = await generateAIResponse(message);

    return res.json({
      reply: aiResponse,
    });

  } catch (error) {
    return res.status(500).json({
      error: "AI request failed",
    });
  }
});`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            generateAIResponse() represents your LLM integration function. Its
            implementation depends on the provider or AI framework you use.
            Never expose your API key in frontend code.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Important Production Layers
        </h2>

        <p className="leading-7 text-[#aaa]">
          A production AI application needs additional layers to make it
          reliable, secure, and scalable.
        </p>

        <CodeBlock
          code={`        FRONTEND
            |
        API LAYER
            |
    AUTHENTICATION
            |
     AI ORCHESTRATION
       /    |     \\
      /     |      \\
    LLM    RAG    TOOLS
      \\     |      /
       \\    |     /
       DATA LAYER
            |
     MONITORING & LOGS`}
        />

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            <span className="text-[#E3E3E3]">Authentication:</span> Controls who
            can access the application.
          </li>
          <li>
            <span className="text-[#E3E3E3]">AI Orchestration:</span>{" "}
            Coordinates models, tools, and retrieval workflows.
          </li>
          <li>
            <span className="text-[#E3E3E3]">Error Handling:</span> Handles
            failed model requests and external service errors.
          </li>
          <li>
            <span className="text-[#E3E3E3]">Monitoring:</span> Tracks latency,
            token usage, failures, and application behavior.
          </li>
          <li>
            <span className="text-[#E3E3E3]">Security:</span> Protects API keys,
            user data, and sensitive operations.
          </li>
        </ul>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Key Takeaways</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Frontend handles user interaction.</li>
          <li>Backend manages application logic and AI requests.</li>
          <li>LLMs generate responses from input and context.</li>
          <li>Databases store application and conversation data.</li>
          <li>Vector databases support semantic search in RAG.</li>
          <li>Tools connect AI applications to external services.</li>
          <li>Monitoring and security are essential in production.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is AI Application Architecture?",
            "It is the structure of components and services that work together to build and run an AI-powered application.",
          ],
          [
            "2. Why do we need a backend in an AI application?",
            "To handle authentication, business logic, secure API calls, data access, and AI orchestration.",
          ],
          [
            "3. What is AI orchestration?",
            "It is the process of coordinating LLMs, tools, data retrieval, and other services to complete an AI task.",
          ],
          [
            "4. What is the role of a vector database?",
            "It stores embeddings and enables semantic similarity search, commonly used in RAG systems.",
          ],
          [
            "5. Should we call an LLM directly from the frontend?",
            "Usually no. Calling it through a secure backend protects API keys and allows centralized validation and control.",
          ],
          [
            "6. What makes an AI application production-ready?",
            "Security, error handling, monitoring, scalability, reliable data storage, and cost management.",
          ],
        ].map(([question, answer]) => (
          <div
            key={question}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 className="font-medium">{question}</h3>
            <p className="mt-2 text-sm leading-6 text-green-400">{answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AIApplicationArchitecture;

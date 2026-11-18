import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatisLangChain = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">What is LangChain?</h1>
        <p className="mt-3 leading-7 text-[#999]">
          LangChain is an open-source framework that helps developers
          build applications powered by Large Language Models (LLMs).
          It provides reusable components to connect models, prompts,
          tools, databases, and external data sources.
        </p>
      </div>

      {/* Problem */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. Why Do We Need LangChain?</h2>

        <p className="leading-7 text-[#aaa]">
          We can directly call an LLM API using JavaScript. However,
          building a complete AI application requires more than just
          sending messages to a model.
        </p>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Managing prompts and conversation history.</li>
          <li>Connecting multiple LLMs.</li>
          <li>Parsing model responses.</li>
          <li>Connecting external tools and APIs.</li>
          <li>Retrieving information from documents and databases.</li>
          <li>Building multi-step AI workflows.</li>
        </ul>

        <p className="leading-7 text-[#aaa]">
          LangChain provides reusable building blocks to simplify
          these tasks.
        </p>
      </section>

      {/* Architecture */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. How LangChain Works</h2>

        <CodeBlock code={`             User Input
                  |
                  v
             Prompt Template
                  |
                  v
               LLM Model
                  |
                  v
             Output Parser
                  |
                  v
             Final Response`} />

        <p className="text-sm leading-6 text-[#aaa]">
          This is a simplified workflow. Real LangChain applications
          can also include tools, memory management, retrievers,
          databases, and multiple processing steps.
        </p>
      </section>

      {/* Components */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Main Components of LangChain</h2>

        <div className="space-y-3">
          {[
            ["Models", "Connect applications with LLMs such as OpenAI, Gemini, and other supported providers."],
            ["Prompts", "Create reusable instructions and templates for LLMs."],
            ["Output Parsers", "Convert model responses into structured formats such as JSON."],
            ["Chains", "Connect multiple processing steps into a workflow."],
            ["LCEL", "A declarative way to compose LangChain components using the pipe operator."],
            ["Runnables", "A common interface for executing and composing LangChain components."],
            ["Streaming", "Receive model output incrementally instead of waiting for the complete response."]
          ].map(([title, desc], index) => (
            <div key={title} className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 flex gap-3">
              <span className="font-bold text-[#FC6C26]">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#aaa]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Without Langchain */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Without LangChain vs With LangChain</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <h3 className="font-semibold text-[#FC6C26]">Without LangChain</h3>

          <CodeBlock code={`User Input
    |
    v
Manual API Integration
    |
    v
Manual Prompt Handling
    |
    v
Manual Response Parsing
    |
    v
Final Response`} />

          <h3 className="font-semibold text-[#FC6C26]">With LangChain</h3>

          <CodeBlock code={`User Input
    |
    v
Prompt Template
    |
    v
LLM
    |
    v
Output Parser
    |
    v
Final Response`} />

          <p className="text-sm text-[#aaa]">
            LangChain reduces repetitive integration code and provides
            reusable abstractions. It does not eliminate the need to
            understand APIs or application logic.
          </p>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Install LangChain in Node.js</h2>

        <p className="text-sm leading-6 text-[#aaa]">
          Install the core LangChain package:
        </p>

        <CodeBlock language="bash" code={`npm install langchain`} />

        <p className="text-sm leading-6 text-[#aaa]">
          For OpenAI model integration, install its provider package:
        </p>

        <CodeBlock language="bash" code={`npm install @langchain/openai`} />

        <p className="text-sm leading-6 text-[#aaa]">
          LangChain uses separate provider packages for different
          model integrations.
        </p>
      </section>

      {/* Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. First LangChain Example</h2>

        <p className="leading-7 text-[#aaa]">
          Let's connect an LLM with LangChain and send a message
          using JavaScript.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Environment Variable</h3>

        <CodeBlock language="bash" code={`OPENAI_API_KEY=your_api_key`} />

        <h3 className="font-semibold text-[#FC6C26]">JavaScript Code</h3>

        <CodeBlock code={`import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
});

const response = await model.invoke(
  "Explain LangChain in simple words."
);

console.log(response.content);`} />

        <h3 className="font-semibold text-[#FC6C26]">How It Works</h3>

        <CodeBlock code={`ChatOpenAI
    |
    v
Configure Model
    |
    v
invoke("Your Prompt")
    |
    v
Send Request to LLM
    |
    v
Receive AI Response
    |
    v
response.content`} />

        <p className="text-sm leading-6 text-[#aaa]">
          <span className="text-[#FC6C26]">invoke()</span> executes
          the model call and returns its response. For chat models,
          the result is generally an AI message object.
        </p>
      </section>

      {/* Applications */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. What Can We Build with LangChain?</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["AI Chatbots", "Build conversational applications."],
            ["RAG Applications", "Answer questions using custom documents."],
            ["AI Agents", "Build systems that can use tools to perform tasks."],
            ["Document Q&A", "Ask questions about PDFs and other files."],
            ["Semantic Search", "Find information based on meaning."],
            ["AI Workflows", "Connect multiple AI processing steps."]
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LangChain vs LangGraph */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. LangChain vs LangGraph</h2>

        <p className="leading-7 text-[#aaa]">
          Both are part of the LangChain ecosystem, but they solve
          different workflow requirements.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="bg-[#1A1A1A]">
              <tr>
                <th className="p-3 text-[#FC6C26]">LangChain</th>
                <th className="p-3 text-[#FC6C26]">LangGraph</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[#aaa]">
              <tr>
                <td className="p-3">Builds LLM applications.</td>
                <td className="p-3">Builds stateful agent workflows.</td>
              </tr>
              <tr>
                <td className="p-3">Provides reusable components.</td>
                <td className="p-3">Provides graph-based execution.</td>
              </tr>
              <tr>
                <td className="p-3">Useful for chains and integrations.</td>
                <td className="p-3">Useful for loops, branching, and state management.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>LangChain is an open-source framework for LLM applications.</li>
          <li>It supports multiple model providers.</li>
          <li>It provides prompts, models, parsers, and other reusable components.</li>
          <li>It helps connect LLMs with tools and external data.</li>
          <li>It supports RAG and AI agent development.</li>
          <li>LCEL helps compose components into workflows.</li>
          <li>LangChain and LangGraph are related but have different purposes.</li>
          <li>LangChain is not an LLM; it works with LLMs.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          10. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is LangChain?",
            a: "LangChain is an open-source framework for building applications powered by Large Language Models."
          },
          {
            q: "Why do we use LangChain?",
            a: "It provides reusable components to connect LLMs with prompts, tools, databases, and external data sources."
          },
          {
            q: "Is LangChain an LLM?",
            a: "No. LangChain is a framework that helps developers build applications using LLMs."
          },
          {
            q: "What are the main components of LangChain?",
            a: "Models, prompts, output parsers, chains, runnables, LCEL, and streaming."
          },
          {
            q: "Can LangChain connect different LLM providers?",
            a: "Yes. It provides integrations for different model providers through separate packages."
          },
          {
            q: "What is invoke() in LangChain?",
            a: "invoke() executes a model or runnable with the provided input and returns its result."
          },
          {
            q: "Can we build RAG applications using LangChain?",
            a: "Yes. LangChain provides components for document loading, text splitting, embeddings, retrieval, and generation."
          },
          {
            q: "What is the difference between LangChain and LangGraph?",
            a: "LangChain provides components for LLM applications, while LangGraph focuses on stateful, graph-based workflows and agents."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>
            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400">Answer: </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default WhatisLangChain;
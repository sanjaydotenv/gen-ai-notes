import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatisLangGraph = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 01
        </p>
        <h1 className="text-3xl font-bold mt-2">What is LangGraph?</h1>
        <p className="text-[#999] mt-3 leading-7">
          LangGraph is an orchestration framework for building stateful,
          multi-step AI applications and agents. It gives developers control
          over how an AI workflow executes.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is LangGraph?</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph is a framework developed by the LangChain team. It allows
          developers to build AI workflows using a graph-based structure.
        </p>

        <p className="text-[#aaa] leading-7">
          Instead of executing only a fixed sequence of operations, we can
          create workflows that make decisions, repeat steps, maintain state,
          and follow different execution paths.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="text-[#FC6C26] font-semibold">Simple Definition</p>
          <p className="text-[#aaa] mt-2 leading-7">
            LangGraph helps us control the complete execution flow of an AI
            application using nodes, edges, and shared state.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need LangGraph?</h2>

        <p className="text-[#aaa] leading-7">
          A simple LLM call is enough for basic questions. But complex AI
          applications may need multiple steps, decisions, tool execution, and
          memory.
        </p>

        <p className="text-[#aaa] leading-7">
          For example, an AI research assistant might need to:
        </p>

        <CodeBlock
          code={`1. Understand the user's question
          |
          v
2. Search for information
          |
          v
3. Check search results
          |
          v
4. Is information sufficient?
       /          \\
     No            Yes
     |              |
     v              v
 Search Again    Generate Answer
                    |
                    v
                 Response`}
        />

        <p className="text-[#aaa] leading-7">
          LangGraph helps us build and control workflows like this.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Core Building Blocks</h2>

        <p className="text-[#aaa] leading-7">
          Every LangGraph workflow is built around three important concepts:
        </p>

        <div className="space-y-3">
          {[
            [
              "State",
              "Stores the current data of the workflow, such as messages, results, and other information.",
            ],
            [
              "Nodes",
              "Functions that perform tasks, such as calling an LLM, executing a tool, or processing data.",
            ],
            [
              "Edges",
              "Define which node should execute next. They can also control decisions and branching.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`          STATE
            |
            v
        NODE A
            |
            v
        NODE B
            |
         EDGE
            |
            v
        NODE C
            |
            v
        UPDATED STATE`}
        />

        <p className="text-sm text-[#999]">
          Nodes perform the work, edges control the flow, and state carries the
          data between steps.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. LangChain vs LangGraph</h2>

        <p className="text-[#aaa] leading-7">
          Both are part of the LangChain ecosystem, but they solve different
          problems.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="p-3">LangChain</th>
                <th className="p-3">LangGraph</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Provides LLM integrations and agent abstractions.
                </td>
                <td className="p-3">
                  Provides workflow orchestration and execution control.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Useful for quickly building common AI applications.
                </td>
                <td className="p-3">Useful for complex, stateful workflows.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Provides higher-level agent APIs.</td>
                <td className="p-3">
                  Provides low-level graph building blocks.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Can manage common tool-calling loops.</td>
                <td className="p-3">
                  Allows explicit control over loops and branches.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#999]">
          LangGraph can work independently or alongside LangChain components.
          You do not need LangChain to use LangGraph.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Important Features</h2>

        <div className="space-y-3">
          {[
            [
              "State Management",
              "Maintains application data throughout graph execution.",
            ],
            [
              "Cyclic Workflows",
              "Allows workflows to repeat steps instead of only moving forward.",
            ],
            [
              "Persistence",
              "Checkpoints can save graph state and support resuming execution.",
            ],
            [
              "Human-in-the-Loop",
              "Allows execution to pause for human review or approval.",
            ],
            [
              "Streaming",
              "Supports streaming tokens, state updates, and execution events.",
            ],
            [
              "Durable Execution",
              "Supports long-running workflows that can resume after interruptions when configured with persistence.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Installation</h2>

        <p className="text-[#aaa] leading-7">
          To use LangGraph with JavaScript or TypeScript, install its core
          packages:
        </p>

        <CodeBlock code={`npm install @langchain/langgraph @langchain/core`} />

        <p className="text-sm text-[#999]">
          You can use LangGraph with LangChain model and tool integrations when
          your application needs them.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          7. Interview Questions & Answers
        </h2>

        {[
          [
            "What is LangGraph?",
            "A graph-based orchestration framework for building stateful, multi-step AI applications and agents.",
          ],
          [
            "Why do we use LangGraph?",
            "To control complex AI workflows involving decisions, loops, state, and tool execution.",
          ],
          [
            "What are the three main building blocks?",
            "State, Nodes, and Edges.",
          ],
          [
            "What is State?",
            "Shared data that represents the current information of a graph.",
          ],
          [
            "What is a Node?",
            "A function that performs a task and can return updates to the graph state.",
          ],
          [
            "What is an Edge?",
            "A connection that determines which node executes next.",
          ],
          [
            "Can LangGraph create cyclic workflows?",
            "Yes. Edges can connect nodes in loops, allowing repeated execution.",
          ],
          [
            "Is LangGraph dependent on LangChain?",
            "No. It can work independently, but it can also integrate with LangChain components.",
          ],
          [
            "What is the difference between LangChain and LangGraph?",
            "LangChain provides model, tool, and agent abstractions, while LangGraph provides explicit workflow orchestration.",
          ],
        ].map(([q, a], i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4"
          >
            <p className="font-semibold">
              <span className="text-[#FC6C26]">Q{i + 1}.</span> {q}
            </p>
            <p className="text-sm text-green-400 mt-2 leading-6">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WhatisLangGraph;

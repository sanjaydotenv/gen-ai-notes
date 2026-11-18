import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AgenticRAGIntroduction = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 06
        </p>
        <h1 className="text-3xl font-bold">Agentic RAG Introduction</h1>
        <p className="text-[#aaa] leading-7">
          Agentic RAG combines Retrieval-Augmented Generation with AI
          agents. Instead of following a fixed retrieval pipeline, an
          agent can decide when to retrieve information, which tools to
          use, and whether additional retrieval is required.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Agentic RAG?
        </h2>

        <p className="text-[#aaa] leading-7">
          Agentic RAG is an advanced RAG architecture in which an AI agent
          controls and manages the retrieval process using reasoning,
          tools, and decisions.
        </p>

        <p className="text-[#aaa] leading-7">
          In traditional RAG, the system generally follows a predefined
          pipeline. In Agentic RAG, the agent can decide what action
          should happen next based on the user's question and previous
          results.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="font-semibold text-white">Example</p>

          <p className="text-sm text-[#FC6C26]">User Question</p>
          <p className="text-white">
            "Explain how Node.js handles asynchronous operations."
          </p>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <p className="text-sm text-[#FC6C26]">Agent Decisions</p>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Understand what information is required.</li>
              <li>Decide to search the knowledge base.</li>
              <li>Retrieve relevant Node.js documents.</li>
              <li>Check whether the retrieved information is sufficient.</li>
              <li>Search again if important information is missing.</li>
              <li>Generate the final answer.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Traditional RAG vs Agentic RAG
        </h2>

        <h3 className="font-semibold text-white">Traditional RAG</h3>

        <p className="text-[#aaa] leading-7">
          Traditional RAG generally follows a predefined sequence of
          operations. The user asks a question, the retriever searches
          documents, and the LLM generates an answer.
        </p>

        <CodeBlock
          language="text"
          code={`          User Question
                |
                v
            Retriever
                |
                v
        Retrieved Documents
                |
                v
                LLM
                |
                v
           Final Answer`}
        />

        <h3 className="font-semibold text-white">Agentic RAG</h3>

        <p className="text-[#aaa] leading-7">
          Agentic RAG gives the agent control over the workflow. It can
          choose tools, perform multiple searches, evaluate results,
          and decide what to do next.
        </p>

        <CodeBlock
          language="text"
          code={`             User Question
                   |
                   v
                AI Agent
                   |
             Analyze Question
                   |
                   v
             Decide Next Action
                   |
          +--------+--------+
          |                 |
          v                 v
      Search Tool       Other Tool
          |                 |
          v                 v
      Documents          Results
          |                 |
          +--------+--------+
                   |
                   v
             Evaluate Results
                   |
             +-----+-----+
             |           |
             v           v
         Sufficient   Not Enough
             |           |
             v           v
         Final Answer  Search Again`}
        />

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Traditional RAG</th>
                <th className="p-3">Agentic RAG</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Mostly predefined workflow.</td>
                <td className="p-3">Agent decides the next action.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually follows a fixed retrieval process.</td>
                <td className="p-3">Can perform multiple retrieval steps.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Limited decision-making during retrieval.</td>
                <td className="p-3">Can choose between available tools.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Simpler architecture.</td>
                <td className="p-3">More flexible architecture.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually lower orchestration overhead.</td>
                <td className="p-3">May have higher latency and cost.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Why Do We Need Agentic RAG?
        </h2>

        <p className="text-[#aaa] leading-7">
          Traditional RAG works well for simple questions, but complex
          questions may require multiple searches, different tools, or
          additional information.
        </p>

        <div className="space-y-3">
          {[
            [
              "Complex Questions",
              "A question may require information from multiple documents or sources.",
            ],
            [
              "Multiple Retrievals",
              "The agent can perform another search when the first results are insufficient.",
            ],
            [
              "Tool Selection",
              "The agent can choose between different retrieval tools or external tools.",
            ],
            [
              "Dynamic Workflow",
              "The next operation can depend on the results of previous operations.",
            ],
            [
              "Result Evaluation",
              "The agent can evaluate retrieved information before generating an answer.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Core Components of Agentic RAG
        </h2>

        <p className="text-[#aaa] leading-7">
          An Agentic RAG system generally contains these important
          components:
        </p>

        <div className="space-y-4">
          {[
            [
              "A. LLM",
              "The language model understands the question, makes decisions, and generates responses.",
            ],
            [
              "B. Agent",
              "The agent controls the workflow and decides which action should happen next.",
            ],
            [
              "C. Tools",
              "Tools allow the agent to perform operations such as document retrieval, web search, or database queries.",
            ],
            [
              "D. Retriever",
              "The retriever searches the knowledge base and returns relevant documents.",
            ],
            [
              "E. Memory / State",
              "Stores relevant information about the current workflow, such as messages, search results, and previous actions.",
            ],
            [
              "F. Generator",
              "Uses the available context to generate the final answer. This can be the same LLM used by the agent.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa] leading-6">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. How Agentic RAG Works
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's understand the complete workflow using a practical
          example.
        </p>

        <CodeBlock
          language="text"
          code={`User Question
      |
      v
  AI Agent
      |
      v
Understand the Question
      |
      v
Choose a Tool
      |
      v
Execute Tool
      |
      v
Get Tool Result
      |
      v
Evaluate Result
      |
      +----------------------+
      |                      |
      v                      v
Information Sufficient?   Need More Information?
      |                      |
      v                      v
Generate Answer          Choose Another Action
      |                      |
      v                      |
   Final Answer <------------+`}
        />

        <h3 className="font-semibold text-white">Step-by-step Example</h3>

        <div className="space-y-3">
          {[
            [
              "Step 1: User Question",
              "The user asks how Node.js handles asynchronous operations.",
            ],
            [
              "Step 2: Agent Analysis",
              "The agent identifies that it needs information about the Event Loop, libuv, and non-blocking I/O.",
            ],
            [
              "Step 3: Tool Selection",
              "The agent decides to use the document search tool.",
            ],
            [
              "Step 4: Tool Execution",
              "The retriever searches the knowledge base and returns relevant documents.",
            ],
            [
              "Step 5: Result Evaluation",
              "The agent checks whether the retrieved documents contain enough information.",
            ],
            [
              "Step 6: Additional Retrieval",
              "If libuv information is missing, the agent can search for it separately.",
            ],
            [
              "Step 7: Final Answer",
              "The agent uses the collected context to generate a complete answer.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FC6C26]/10 text-sm font-bold text-[#FC6C26]">
                {index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-[#aaa] leading-6">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Role of Tool Calling in Agentic RAG
        </h2>

        <p className="text-[#aaa] leading-7">
          Tool Calling is one of the most important concepts in Agentic
          RAG. It allows an LLM to request the execution of external
          functions.
        </p>

        <p className="text-[#aaa] leading-7">
          The LLM does not directly execute the function. Instead, it
          generates a structured tool call. The application executes
          that tool and sends the result back to the LLM.
        </p>

        <CodeBlock
          language="text"
          code={`User Message
     |
     v
LLM Receives Available Tools
     |
     v
LLM Selects a Tool
     |
     v
Tool Call Request
     |
     v
Application Executes Function
     |
     v
Tool Result
     |
     v
Result Sent Back to LLM
     |
     v
LLM Generates Answer`}
        />

        <h3 className="font-semibold text-white">Example Tools</h3>

        <CodeBlock
          language="javascript"
          code={`const tools = [
  documentSearchTool,
  webSearchTool,
  databaseQueryTool,
  calculatorTool,
];

// The agent can select an appropriate tool
// based on the user's question.`}
        />

        <p className="text-[#aaa] leading-7">
          For example, if a user asks about internal documentation,
          the agent may choose document search. If the question requires
          a calculation, it may choose a calculator tool.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Agentic RAG with LangGraph
        </h2>

        <p className="text-[#aaa] leading-7">
          LangGraph is useful for building stateful agent workflows.
          It allows us to create nodes, connect them with edges, maintain
          state, and control conditional execution.
        </p>

        <p className="text-[#aaa] leading-7">
          A simple Agentic RAG workflow can contain two main nodes:
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">Agent Node</h3>
            <p className="text-sm text-[#aaa]">
              Calls the LLM. The LLM decides whether to answer or request
              a tool.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">Tools Node</h3>
            <p className="text-sm text-[#aaa]">
              Executes the selected tool and returns its result to the
              agent.
            </p>
          </div>
        </div>

        <CodeBlock
          language="text"
          code={`             START
                |
                v
             AGENT
                |
          toolsCondition
                |
          +-----+-----+
          |           |
          v           v
        TOOLS        END
          |
          v
        AGENT
          |
          v
      Decide Again`}
        />

        <h3 className="font-semibold text-white">
          LangGraph JavaScript Example
        </h3>

        <p className="text-[#aaa] leading-7">
          In this example, the agent has a document search tool. It can
          decide when to search and can use the returned documents to
          answer the question.
        </p>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/langgraph @langchain/openai @langchain/core zod`}
        />

        <CodeBlock
          language="javascript"
          code={`import { ChatOpenAI } from "@langchain/openai";

import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";

import {
  ToolNode,
  toolsCondition,
} from "@langchain/langgraph/prebuilt";

import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Assume retriever is already created.

// 1. Create a retrieval tool
const documentSearchTool = tool(
  async ({ query }) => {
    const documents = await retriever.invoke(query);

    return documents
      .map((doc) => doc.pageContent)
      .join("\\n\\n");
  },
  {
    name: "document_search",
    description:
      "Search the knowledge base for relevant documents.",
    schema: z.object({
      query: z.string(),
    }),
  }
);

// 2. Register available tools
const tools = [documentSearchTool];

// 3. Create the LLM
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// 4. Bind tools to the LLM
const modelWithTools = model.bindTools(tools);

// 5. Create the agent node
const agentNode = async (state) => {
  const response = await modelWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful RAG assistant. " +
        "Use document_search when you need information " +
        "from the knowledge base. Answer using the " +
        "retrieved information.",
    },
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

// 6. Create the graph
const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", agentNode)
  .addNode("tools", new ToolNode(tools))

  .addEdge(START, "agent")

  .addConditionalEdges(
    "agent",
    toolsCondition
  )

  .addEdge("tools", "agent")

  .compile();

// 7. Run the agent
const result = await graph.invoke(
  {
    messages: [
      {
        role: "user",
        content:
          "Explain how the Node.js Event Loop works.",
      },
    ],
  },
  {
    recursionLimit: 10,
  }
);

console.log(
  result.messages[result.messages.length - 1].content
);`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">
            Important Notes
          </p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
            <li>
              <code>StateGraph</code> creates the workflow graph.
            </li>
            <li>
              <code>MessagesAnnotation</code> provides the message state.
            </li>
            <li>
              <code>agent</code> calls the LLM and decides the next action.
            </li>
            <li>
              <code>ToolNode</code> executes requested tools.
            </li>
            <li>
              <code>toolsCondition</code> routes to the tools node when
              the LLM requests a tool, otherwise it ends the graph.
            </li>
            <li>
              The tools node returns tool results to the agent, allowing
              another decision.
            </li>
            <li>
              <code>recursionLimit</code> limits graph execution and
              helps prevent an endless tool-calling loop.
            </li>
          </ul>
        </div>

        <p className="text-sm text-[#aaa]">
          This is a basic tool-calling RAG graph. Production systems
          should also validate retrieved results, handle tool errors,
          enforce access permissions, and define explicit stopping rules.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Agentic RAG vs Normal AI Agent
        </h2>

        <p className="text-[#aaa] leading-7">
          A normal AI agent can use different tools to complete tasks.
          Agentic RAG specifically incorporates retrieval from a
          knowledge base as an important part of its workflow.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Normal AI Agent</th>
                <th className="p-3">Agentic RAG</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Can use different tools.</td>
                <td className="p-3">Uses retrieval as part of its workflow.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">May use APIs, calculators, or databases.</td>
                <td className="p-3">Can search knowledge bases and use other tools.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Focused on completing tasks.</td>
                <td className="p-3">Focused on retrieval-supported task completion.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Advantages and Limitations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-green-400">Advantages</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Supports dynamic retrieval workflows.</li>
              <li>Can perform multiple searches.</li>
              <li>Can use multiple tools.</li>
              <li>Handles complex questions more flexibly.</li>
              <li>Can evaluate results before answering.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-red-400">Limitations</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>More complex architecture.</li>
              <li>Can increase API and token costs.</li>
              <li>Multiple tool calls can increase latency.</li>
              <li>Agent decisions may be incorrect.</li>
              <li>Requires execution limits and error handling.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Real-World Use Cases
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Enterprise AI assistants",
            "Technical documentation assistants",
            "Customer support agents",
            "Research assistants",
            "Multi-source knowledge systems",
            "AI-powered developer assistants",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-[#ccc]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is Agentic RAG?",
            a: "Agentic RAG combines RAG with AI agents that can make decisions, select tools, and control retrieval workflows.",
          },
          {
            q: "What is the difference between Traditional RAG and Agentic RAG?",
            a: "Traditional RAG generally follows a predefined retrieval pipeline, while Agentic RAG allows an agent to decide which actions and retrieval steps are needed.",
          },
          {
            q: "Why do we need Agentic RAG?",
            a: "It helps handle complex questions that require multiple retrieval steps, different tools, or dynamic decision-making.",
          },
          {
            q: "What is the role of an agent in Agentic RAG?",
            a: "The agent analyzes the question, chooses tools, evaluates results, and decides the next action.",
          },
          {
            q: "What is the role of tools in Agentic RAG?",
            a: "Tools allow the agent to perform operations such as document retrieval, web search, and database queries.",
          },
          {
            q: "What is Tool Calling?",
            a: "Tool Calling allows an LLM to request the execution of a function using structured arguments.",
          },
          {
            q: "Why is LangGraph useful for Agentic RAG?",
            a: "LangGraph supports stateful workflows, nodes, conditional edges, tool execution, and repeated agent decisions.",
          },
          {
            q: "Can Agentic RAG perform multiple retrieval operations?",
            a: "Yes. The agent can perform additional searches when the available information is insufficient.",
          },
          {
            q: "Does Agentic RAG always produce better answers?",
            a: "No. Its performance depends on the model, tools, retrieval quality, workflow design, and evaluation.",
          },
          {
            q: "What is the main disadvantage of Agentic RAG?",
            a: "It introduces additional complexity, latency, and cost because of multiple model calls and tool executions.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-white">
              {index + 1}. {item.q}
            </p>
            <p className="text-sm text-green-400 leading-6">
              {item.a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default AgenticRAGIntroduction;

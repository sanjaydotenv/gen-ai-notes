import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ToolNode = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 01
        </p>
        <h1 className="text-3xl font-bold mt-2">ToolNode in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          ToolNode is a prebuilt LangGraph node that executes tools requested by
          an AI model and returns their results as messages.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is ToolNode?</h2>

        <p className="text-[#aaa] leading-7">
          In LangChain, we create tools using the tool() function. But defining
          a tool and executing a tool are two different things.
        </p>

        <p className="text-[#aaa] leading-7">
          ToolNode handles tool execution inside a LangGraph workflow. It reads
          tool calls from the latest AI message, executes the matching tools,
          and returns ToolMessages.
        </p>

        <CodeBlock
          code={`AI Model
   |
   | Requests a tool
   v
ToolNode
   |
   | Executes the tool
   v
Tool Result
   |
   v
AI Model`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why ToolNode?</h2>

        <p className="text-[#aaa] leading-7">
          Without ToolNode, we would need to manually handle tool selection,
          execution, and tool result messages inside our graph.
        </p>

        <p className="text-[#aaa] leading-7">
          ToolNode provides these features:
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            [
              "Automatic Execution",
              "Executes tools requested by the AI model.",
            ],
            [
              "Multiple Tool Calls",
              "Can execute multiple requested tools in parallel.",
            ],
            ["Error Handling", "Provides built-in tool error handling."],
            [
              "State Injection",
              "Can provide graph state and runtime data to tools.",
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
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Import ToolNode</h2>

        <p className="text-[#aaa] leading-7">
          ToolNode is available from the LangGraph prebuilt package.
        </p>

        <CodeBlock
          code={`import { ToolNode } from "@langchain/langgraph/prebuilt";`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Creating Tools</h2>

        <p className="text-[#aaa] leading-7">
          First, create tools using tool() and define their input schema using
          Zod.
        </p>

        <CodeBlock
          code={`import { tool } from "@langchain/core/tools";
import { z } from "zod";

const calculator = tool(
  ({ a, b }) => String(a + b),
  {
    name: "calculator",
    description: "Add two numbers.",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);`}
        />

        <p className="text-[#aaa] leading-7">
          Now register this tool with ToolNode.
        </p>

        <CodeBlock
          code={`const toolNode = new ToolNode([
  calculator,
]);`}
        />

        <p className="text-sm text-[#999]">
          ToolNode can manage multiple tools. The AI model must also know about
          the tools through bindTools() to request them.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. How ToolNode Executes Tools
        </h2>

        <p className="text-[#aaa] leading-7">
          The AI model generates a tool call inside an AIMessage. ToolNode reads
          that request and executes the matching registered tool.
        </p>

        <CodeBlock
          code={`AIMessage
  |
  | tool_calls
  v
ToolNode
  |
  | Finds calculator
  v
calculator({ a: 10, b: 20 })
  |
  v
ToolMessage("30")`}
        />

        <p className="text-[#aaa] leading-7">
          The result is returned as a ToolMessage containing the original tool
          call ID. This connects the result to the request.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's execute a calculator tool using ToolNode directly.
        </p>

        <CodeBlock
          code={`import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { AIMessage } from "@langchain/core/messages";
import { z } from "zod";

// 1. Create Tool
const calculator = tool(
  ({ a, b }) => String(a + b),
  {
    name: "calculator",
    description: "Add two numbers.",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);

// 2. Register Tool
const toolNode = new ToolNode([
  calculator,
]);

// 3. Simulate AI Tool Call
const aiMessage = new AIMessage({
  content: "",
  tool_calls: [
    {
      name: "calculator",
      args: { a: 10, b: 20 },
      id: "call_123",
      type: "tool_call",
    },
  ],
});

// 4. Execute ToolNode
const result = await toolNode.invoke({
  messages: [aiMessage],
});

// 5. Read Tool Result
console.log(result.messages[0].content);

// Output:
// 30`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-[#FC6C26]">What happened?</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#aaa]">
            <li>We created a calculator tool.</li>
            <li>We registered it inside ToolNode.</li>
            <li>An AIMessage requested the calculator tool.</li>
            <li>ToolNode executed the calculator.</li>
            <li>The result was returned as a ToolMessage.</li>
          </ol>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          7. ToolNode Inside StateGraph
        </h2>

        <p className="text-[#aaa] leading-7">
          In a real AI workflow, ToolNode is registered as a graph node.
          Conditional routing decides whether the AI response contains a tool
          call or is already a final answer.
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";

import {
  ToolNode,
  toolsCondition,
} from "@langchain/langgraph/prebuilt";

// Assume modelWithTools and calculator are already defined.

const tools = [calculator];

const callModel = async (state) => {
  const response = await modelWithTools.invoke(
    state.messages
  );

  return {
    messages: [response],
  };
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", new ToolNode(tools))

  .addEdge(START, "agent")

  .addConditionalEdges(
    "agent",
    toolsCondition,
    ["tools", END]
  )

  .addEdge("tools", "agent")

  .compile();`}
        />

        <p className="text-[#aaa] leading-7">
          Here, toolsCondition checks the latest AI message. If it contains tool
          calls, execution moves to ToolNode. Otherwise, the graph ends.
        </p>

        <CodeBlock
          code={`START
  |
  v
Agent Node
  |
  v
Tools Required?
  |
  | Yes
  v
ToolNode
  |
  v
Agent Node
  |
  | No tool calls
  v
 END`}
        />

        <p className="text-sm text-[#999]">
          This is the basic tool execution loop used in many AI Agent workflows.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          [
            "Prebuilt Node",
            "ToolNode is provided by LangGraph; you don't need to implement tool execution manually.",
          ],
          [
            "Tool Registration",
            "Pass your available tools into new ToolNode(tools).",
          ],
          [
            "AI Tool Calls",
            "ToolNode executes tool calls present in the latest AIMessage.",
          ],
          ["ToolMessage", "Tool results are returned as ToolMessages."],
          [
            "Parallel Execution",
            "Multiple tool calls in one AI message can execute in parallel.",
          ],
          [
            "Agent Loop",
            "After tool execution, the graph commonly returns to the AI node.",
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
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is ToolNode?",
            "A prebuilt LangGraph node that executes tools requested by an AI model.",
          ],
          [
            "Where do we import ToolNode from?",
            "From @langchain/langgraph/prebuilt.",
          ],
          [
            "How do we register tools?",
            "By passing an array of tools to new ToolNode(tools).",
          ],
          [
            "What is ToolMessage?",
            "A message containing the result of a tool execution.",
          ],
          [
            "Can ToolNode execute multiple tools?",
            "Yes. Multiple tool calls in the same AI message can execute in parallel.",
          ],
          [
            "What is toolsCondition?",
            "A routing function that sends execution to the tools node if the latest AI message contains tool calls; otherwise, it ends the graph.",
          ],
          [
            "Why connect ToolNode back to the Agent node?",
            "So the AI model can read tool results and decide what to do next.",
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

export default ToolNode;

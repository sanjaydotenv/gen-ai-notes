import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AgentWorkflows = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 02
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Agent Workflows in LangGraph
        </h1>
        <p className="text-[#999] mt-3 leading-7">
          Agent Workflows connect an AI model, tools, and graph routing to
          create applications that can decide what action to perform and execute
          it.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          1. What is an Agent Workflow?
        </h2>

        <p className="text-[#aaa] leading-7">
          An Agent Workflow is a graph-based process where an AI model
          understands a request, decides whether a tool is needed, executes that
          tool, and uses the result to generate a response.
        </p>

        <CodeBlock
          code={`User Request
     |
     v
  AI Model
     |
     v
Need a Tool?
   /     \\
 Yes      No
  |        |
  v        v
ToolNode  Final Answer
  |
  v
AI Model
  |
  v
Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          The AI model makes decisions, ToolNode executes tools, and Conditional
          Edges control the workflow.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Main Components</h2>

        <div className="space-y-3">
          {[
            [
              "AI Model",
              "Understands user requests and decides whether to call a tool.",
            ],
            [
              "Tools",
              "Functions that perform specific tasks, such as searching or calculating.",
            ],
            ["ToolNode", "Executes the tool calls requested by the AI model."],
            [
              "Conditional Edges",
              "Check the AI response and decide whether to execute tools or finish.",
            ],
            [
              "State",
              "Stores conversation messages and shares them between nodes.",
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
        <h2 className="text-2xl font-semibold">3. Agent Execution Loop</h2>

        <p className="text-[#aaa] leading-7">
          An Agent Workflow can repeat the same process until the AI model
          decides that no more tools are required.
        </p>

        <CodeBlock
          code={`1. User sends a request
          |
          v
2. AI Model processes request
          |
          v
3. Does it need a tool?
          |
     Yes  |  No
      |       |
      v       v
4. ToolNode  END
      |
      v
5. Tool executes
      |
      v
6. Result added to messages
      |
      v
7. AI Model receives result
      |
      v
   Repeat if needed`}
        />

        <p className="text-[#aaa] leading-7">
          This loop allows an agent to use multiple tools or perform multiple
          actions before producing its final answer.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. Creating an Agent Workflow
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's build a simple workflow that can use a calculator tool.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Step 1: Create a Tool</h3>

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

        <h3 className="font-semibold text-[#FC6C26]">
          Step 2: Bind Tools to the Model
        </h3>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const modelWithTools = model.bindTools([
  calculator,
]);`}
        />

        <p className="text-sm text-[#999]">
          bindTools() makes tool definitions available to the model. It does not
          execute the tools.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          Step 3: Create Agent Node
        </h3>

        <CodeBlock
          code={`const callModel = async (state) => {
  const response = await modelWithTools.invoke(
    state.messages
  );

  return {
    messages: [response],
  };
};`}
        />

        <p className="text-[#aaa] text-sm">
          The model receives conversation messages and returns an AIMessage.
          That message may contain tool calls or a normal response.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          Step 4: Create ToolNode
        </h3>

        <CodeBlock
          code={`import {
  ToolNode,
  toolsCondition,
} from "@langchain/langgraph/prebuilt";

const toolNode = new ToolNode([
  calculator,
]);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 5: Connect the Graph
        </h3>

        <CodeBlock
          code={`import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)

  .addEdge(START, "agent")

  .addConditionalEdges(
    "agent",
    toolsCondition,
    ["tools", END]
  )

  .addEdge("tools", "agent")

  .compile();`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 6: Execute Agent</h3>

        <CodeBlock
          code={`const result = await graph.invoke({
  messages: [
    {
      role: "user",
      content: "What is 25 + 35?",
    },
  ],
});

console.log(
  result.messages[result.messages.length - 1].content
);`}
        />

        <p className="text-sm text-[#999]">
          This example requires a valid OpenAI API key. Configure it using
          OPENAI_API_KEY in your environment.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Complete Workflow Architecture
        </h2>

        <CodeBlock
          code={`             START
                |
                v
           Agent Node
                |
                v
         toolsCondition()
                |
          Has Tool Calls?
            /       \\
          Yes        No
           |          |
           v          v
        ToolNode     END
           |
           v
      Tool Execution
           |
           v
       ToolMessage
           |
           v
        Agent Node
           |
           v
      Check Again`}
        />

        <p className="text-[#aaa] leading-7">
          Notice that ToolNode connects back to the Agent Node. This allows the
          model to read the tool result and decide its next action.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Important Concepts</h2>

        {[
          [
            "bindTools()",
            "Provides the model with available tool definitions so it can request tool calls.",
          ],
          [
            "ToolNode",
            "Executes the requested tools and returns ToolMessages.",
          ],
          [
            "toolsCondition",
            "Routes to the tools node when the latest AI message contains tool calls; otherwise, it routes to END.",
          ],
          [
            "Agent Loop",
            "Connects tool execution back to the model for further decisions.",
          ],
          [
            "MessagesAnnotation",
            "Provides message state with a reducer that appends new messages to the conversation.",
          ],
          [
            "Model Decision",
            "The model decides whether to request a tool or return a normal response.",
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

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          7. Interview Questions & Answers
        </h2>

        {[
          [
            "What is an Agent Workflow?",
            "A graph-based workflow where an AI model can make decisions, execute tools, and generate responses.",
          ],
          [
            "What is an Agent Loop?",
            "A repeated process in which the model requests tools, tools execute, and results return to the model.",
          ],
          [
            "What does bindTools() do?",
            "It provides tool definitions to the model so it can generate tool calls.",
          ],
          [
            "Does bindTools() execute tools?",
            "No. ToolNode or another tool executor performs the actual execution.",
          ],
          [
            "Why do we connect ToolNode back to the Agent Node?",
            "So the model can process tool results and decide what to do next.",
          ],
          [
            "What does toolsCondition do?",
            "It checks the latest AI message for tool calls and routes to ToolNode or END.",
          ],
          [
            "What is the role of MessagesAnnotation?",
            "It provides a messages state with a reducer that appends new messages.",
          ],
          [
            "How does an Agent know when to stop?",
            "When the model returns a response without tool calls, toolsCondition routes execution to END.",
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

export default AgentWorkflows;

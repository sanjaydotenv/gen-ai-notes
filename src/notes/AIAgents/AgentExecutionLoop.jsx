import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AgentExecutionLoop = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">Agent Execution Loop</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Agent Execution Loop is the repeated process in which an AI Agent
          calls an LLM, executes requested tools, observes results, and
          continues until it produces a final response.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. How the Execution Loop Works
        </h2>
        <CodeBlock
          code={`       User Request
             |
             v
         Call LLM
             |
             v
       Check LLM Response
          /       \\
    Tool Call   Final Answer
       |
       v
  Execute Tool
       |
       v
  Get Tool Result
       |
       v
  Update Messages / State
       |
       +---------> Call LLM Again`}
        />
        <p className="text-sm leading-6 text-[#aaa]">
          The loop repeats whenever the model requests another tool. It ends
          when the model returns a normal final response or execution is stopped
          by a configured limit or error.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Execution Steps</h2>
        {[
          [
            "Receive Input",
            "The agent receives the user's request and relevant conversation history.",
          ],
          [
            "Call LLM",
            "The model decides whether to answer directly or request a tool.",
          ],
          [
            "Check Response",
            "The runtime checks whether the model returned tool calls.",
          ],
          [
            "Execute Tool",
            "The application runs the requested function with its arguments.",
          ],
          [
            "Observe Result",
            "The tool result is added to the conversation messages.",
          ],
          [
            "Call LLM Again",
            "The model uses the result to decide the next step.",
          ],
          [
            "Final Response",
            "When no more tools are needed, the model returns its answer.",
          ],
        ].map(([title, description], index) => (
          <div
            key={title}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FC6C26]/15 text-sm font-semibold text-[#FC6C26]">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#aaa]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. Practical Execution Example
        </h2>
        <p className="leading-7 text-[#aaa]">
          User asks: "Find the price of 2 products and calculate their total."
        </p>
        <CodeBlock
          code={`User:
Find prices of Product A and Product B,
then calculate the total.

Iteration 1:
LLM -> Calls searchProduct("Product A")

Tool Result:
Product A = 500

Iteration 2:
LLM -> Calls searchProduct("Product B")

Tool Result:
Product B = 300

Iteration 3:
LLM -> Calls calculator("500 + 300")

Tool Result:
800

Iteration 4:
LLM -> Final Answer

Total price = 800`}
        />
        <p className="text-sm leading-6 text-[#999]">
          Each iteration gives the model new information. The model decides
          whether another tool call is needed.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. Build a Simple Execution Loop
        </h2>
        <p className="leading-7 text-[#aaa]">
          This simplified JavaScript example shows how an application can
          repeatedly call a model and execute its requested tools.
        </p>
        <CodeBlock
          code={`const messages = [
  {
    role: "user",
    content: "Calculate 20 + 30",
  },
];

const tools = {
  calculator: async ({ expression }) => {
    // Demo only. Use a safe math parser in production.
    return "50";
  },
};

const MAX_STEPS = 5;

for (let step = 0; step < MAX_STEPS; step++) {
  // Ask the model what to do next
  const response = await model.invoke(messages);

  // Save the model response
  messages.push(response);

  // Stop if no tool call was requested
  if (!response.tool_calls?.length) {
    console.log(response.content);
    break;
  }

  // Execute requested tools
  for (const call of response.tool_calls) {
    const tool = tools[call.name];

    if (!tool) {
      throw new Error("Unknown tool: " + call.name);
    }

    const result = await tool(call.args);

    // Send tool result back to the model
    messages.push({
      role: "tool",
      tool_call_id: call.id,
      content: String(result),
    });
  }
}`}
        />
        <p className="text-sm leading-6 text-[#999]">
          This is an illustrative loop, not a drop-in implementation for every
          model provider. Actual tool-call and tool-result message formats
          depend on the model SDK. Production code should also validate
          arguments and handle tool errors.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Execution Loop in LangChain
        </h2>
        <p className="leading-7 text-[#aaa]">
          LangChain's <code className="text-[#FC6C26]">createAgent</code>{" "}
          provides a runtime that manages model calls and tool execution. You do
          not need to manually write the entire loop.
        </p>
        <CodeBlock
          code={`import { createAgent, tool } from "langchain";
import { z } from "zod";

const calculator = tool(
  async ({ expression }) => {
    // Demo result. Use a safe math parser.
    return "50";
  },
  {
    name: "calculator",
    description: "Calculate a mathematical expression.",
    schema: z.object({
      expression: z.string(),
    }),
  }
);

const agent = createAgent({
  model: "your-configured-model",
  tools: [calculator],
});

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Calculate 20 + 30",
    },
  ],
});

console.log(result.messages);`}
        />
        <p className="text-sm leading-6 text-[#999]">
          The agent runtime handles the tool-call cycle internally. The
          configured model and provider credentials are required.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Important Execution Controls
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Max Iterations", "Limits how many model/tool cycles can run."],
            ["Error Handling", "Handles failed tools and invalid arguments."],
            ["Timeout", "Prevents slow operations from running indefinitely."],
            [
              "Tool Validation",
              "Checks tool names, arguments, and permissions.",
            ],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          7. Why Is the Execution Loop Important?
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Allows agents to complete multi-step tasks.</li>
          <li>Connects LLM decisions with real tool execution.</li>
          <li>Lets the model use tool results for further decisions.</li>
          <li>Provides a controlled process for agent execution.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is an Agent Execution Loop?",
            "It is the repeated cycle of calling an LLM, executing requested tools, returning results, and continuing until a final answer is produced.",
          ],
          [
            "2. When does the execution loop stop?",
            "It normally stops when the model returns a final response, or when a configured limit, error, or stop condition is reached.",
          ],
          [
            "3. Why is the LLM called again after tool execution?",
            "The model needs the tool result to understand what happened and decide the next action or generate the final answer.",
          ],
          [
            "4. What is the role of a maximum iteration limit?",
            "It prevents an agent from making too many repeated model and tool calls.",
          ],
          [
            "5. Does LangChain manage the execution loop?",
            "Yes. LangChain's createAgent runtime manages model calls and tool execution internally.",
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

export default AgentExecutionLoop;

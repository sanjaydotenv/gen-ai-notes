import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ReActPattern = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">ReAct Pattern</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          ReAct stands for Reasoning + Acting. It is an agent pattern where an
          LLM reasons about a task, takes an action using a tool, observes the
          result, and decides what to do next.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. How ReAct Works</h2>
        <p className="leading-7 text-[#aaa]">
          Instead of generating an answer immediately, the agent follows a
          repeated cycle:
        </p>
        <CodeBlock
          code={`User Question
      |
      v
   Reasoning
      |
      v
     Action
      |
      v
   Observation
      |
      v
   Reason Again
      |
      +------> Action (if needed)
      |
      v
  Final Answer`}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Reasoning", "Decide what information or action is needed."],
            ["Action", "Request a tool to perform an operation."],
            ["Observation", "Receive and understand the tool result."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Practical Example</h2>
        <p className="leading-7 text-[#aaa]">
          User asks: "Find the population of Bhopal and calculate what it would
          be after a 10% increase."
        </p>
        <div className="space-y-3">
          {[
            ["Reason", "The agent needs the current population first."],
            ["Action", "Calls a population lookup tool for Bhopal."],
            ["Observation", "The tool returns a population value."],
            ["Reason", "Now the agent needs to calculate a 10% increase."],
            ["Action", "Calls a calculator tool with the population value."],
            ["Observation", "The calculator returns the increased value."],
            ["Final Answer", "The agent explains the result to the user."],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="flex gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
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
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. ReAct Message Structure</h2>
        <p className="leading-7 text-[#aaa]">
          In a traditional ReAct-style prompt, the process is often represented
          using these labels:
        </p>
        <CodeBlock
          code={`Question: What is 25 multiplied by 4?

Thought: I need to calculate the result.

Action: calculator
Action Input: 25 * 4

Observation: 100

Thought: I have the result.

Final Answer: 25 multiplied by 4 is 100.`}
        />
        <div className="space-y-2 text-sm text-[#aaa]">
          <p>
            <strong className="text-[#E3E3E3]">Thought:</strong> The agent's
            reasoning step.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Action:</strong> The tool it
            wants to use.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Action Input:</strong> Arguments
            passed to the tool.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Observation:</strong> The result
            returned by the tool.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Final Answer:</strong> The final
            response.
          </p>
        </div>
        <p className="text-sm text-[#999]">
          These labels describe a classic ReAct prompt format. Modern LangChain
          agents commonly use structured tool calls and messages instead of
          requiring these exact text labels.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. ReAct with Tool Calling</h2>
        <p className="leading-7 text-[#aaa]">
          In modern agent frameworks, the LLM usually returns a structured
          tool-call request. The framework executes the tool and sends its
          result back to the model.
        </p>
        <CodeBlock
          code={`// Model requests a tool
{
  "name": "calculator",
  "args": {
    "expression": "25 * 4"
  }
}

// Application executes the function
const result = await calculator({
  expression: "25 * 4"
});

// Tool result: 100
// Send the result back to the model.
// Model generates the final answer.`}
        />
        <p className="text-sm text-[#999]">
          The model decides what tool to request; the application executes the
          actual function.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. ReAct in LangChain</h2>
        <p className="leading-7 text-[#aaa]">
          LangChain can build agents that follow this reasoning and tool-use
          cycle. The framework manages model calls, tool execution, and
          returning tool results to the model.
        </p>
        <CodeBlock
          code={`import { createAgent, tool } from "langchain";
import { z } from "zod";

const calculator = tool(
  async ({ expression }) => {
    // Example only: use a safe math parser
    // instead of eval() in real applications.
    return "100";
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
      content: "What is 25 multiplied by 4?",
    },
  ],
});`}
        />
        <p className="text-sm text-[#999]">
          This is a simplified LangChain JS example. Configure a supported model
          and its provider credentials before running it.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Why Use ReAct?</h2>
        <div className="space-y-2">
          {[
            "Helps agents solve tasks that need multiple steps.",
            "Allows agents to use external tools and APIs.",
            "Uses tool results to make better next decisions.",
            "Makes the agent's action sequence easier to trace.",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-[#aaa]"
            >
              <span className="text-[#FC6C26]">✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Important Limitations</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            Repeated reasoning and tool calls can increase latency and cost.
          </li>
          <li>
            The model may choose an incorrect tool or provide wrong arguments.
          </li>
          <li>Tool failures and repeated loops need proper handling.</li>
          <li>
            Tool permissions and execution limits are important for safety.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is ReAct?",
            "ReAct is an agent pattern that combines reasoning and acting. The agent reasons, takes actions, observes results, and continues until it can answer.",
          ],
          ["2. What does ReAct stand for?", "Reasoning and Acting."],
          [
            "3. What is an Observation in ReAct?",
            "It is the result returned after an action, usually from a tool.",
          ],
          [
            "4. How is ReAct different from a normal LLM response?",
            "A normal response may answer directly, while a ReAct agent can repeatedly use tools and observe their results before answering.",
          ],
          [
            "5. Does the LLM execute the tool in ReAct?",
            "No. The LLM requests the tool call, and the application or framework executes it.",
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

export default ReActPattern;

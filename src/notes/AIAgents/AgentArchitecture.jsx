import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AgentArchitecture = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">Agent Architecture</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Agent Architecture describes how an AI Agent's components work
          together to understand requests, make decisions, execute actions, and
          return results.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Core Components</h2>
        <div className="space-y-3">
          {[
            [
              "1. User Input",
              "Provides the goal or task the agent needs to complete.",
            ],
            [
              "2. LLM (Brain)",
              "Understands the request and decides the next action.",
            ],
            [
              "3. Tools",
              "Allow the agent to interact with APIs, databases, files, or other systems.",
            ],
            [
              "4. State",
              "Stores conversation history and relevant task information.",
            ],
            [
              "5. Agent Executor",
              "Manages the execution loop, tool calls, and results.",
            ],
            ["6. Output", "Returns the final result to the user."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#aaa]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Agent Architecture Flow</h2>
        <p className="text-[#aaa]">
          These components work together in a cycle. The LLM can either return a
          final answer or request a tool execution.
        </p>
        <CodeBlock
          code={`          User Input
               |
               v
          Agent Executor
               |
               v
             State
               |
               v
              LLM
               |
        Decision Making
          /         \\
     Tool Call    Final Answer
        |
        v
   Tool Execution
        |
        v
   Tool Result
        |
        v
      Update State
        |
        +------> LLM (Again)`}
        />
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. How Components Work Together
        </h2>
        <div className="space-y-3 text-sm leading-6 text-[#aaa]">
          <p>
            <strong className="text-[#E3E3E3]">Step 1 — Input:</strong> User
            asks: "What is the weather in Bhopal?"
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Step 2 — LLM:</strong> The model
            understands that it needs current weather information.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Step 3 — Tool Call:</strong> The
            model requests the weather tool with the location.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Step 4 — Execution:</strong> The
            executor runs the tool and receives its result.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Step 5 — Observation:</strong>{" "}
            The tool result is added to the conversation state and sent back to
            the LLM.
          </p>
          <p>
            <strong className="text-[#E3E3E3]">Step 6 — Final Response:</strong>{" "}
            The LLM uses the result to answer the user.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. What Happens During Tool Calling?
        </h2>
        <p className="leading-7 text-[#aaa]">
          An important detail: the LLM does not directly execute your JavaScript
          function. It generates a structured tool-call request. The application
          executes that function and sends its result back.
        </p>
        <CodeBlock
          code={`// 1. LLM requests a tool call
{
  "name": "getWeather",
  "args": {
    "city": "Bhopal"
  }
}

// 2. Application executes the tool
const result = await getWeather({
  city: "Bhopal"
});

// 3. Result is sent back to the LLM
{
  "temperature": 28,
  "condition": "Sunny"
}

// 4. LLM generates the final answer`}
        />
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Simple Architecture Example
        </h2>
        <p className="text-[#aaa]">
          Consider a coding assistant. Its architecture might look like this:
        </p>
        <CodeBlock
          code={`User
 |
 v
AI Agent
 |
 +-- LLM
 |    |
 |    +-- Understand request
 |    +-- Decide next action
 |
 +-- Tools
 |    |
 |    +-- readFile()
 |    +-- writeFile()
 |    +-- runCommand()
 |
 +-- State
      |
      +-- Conversation
      +-- Task information

Agent Executor
 |
 v
Final Response`}
        />
        <p className="text-sm leading-6 text-[#999]">
          The agent can read a file, inspect its contents, decide to modify it,
          and use another tool to write the updated file.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Important Architecture Concepts
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Decision Making", "The LLM selects what should happen next."],
            [
              "Tool Execution",
              "Application code actually runs the requested tool.",
            ],
            [
              "State Management",
              "Keeps relevant information available during execution.",
            ],
            [
              "Control Flow",
              "Determines whether to call a tool, continue, or finish.",
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

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is Agent Architecture?",
            "It is the structure that defines how an agent's LLM, tools, state, and executor work together.",
          ],
          [
            "2. What is the role of an LLM in an AI Agent?",
            "The LLM understands input, reasons about the task, and decides whether to respond or request a tool.",
          ],
          [
            "3. Does an LLM execute tools directly?",
            "No. It generates a tool-call request. The application or agent executor runs the actual function.",
          ],
          [
            "4. What is the role of State?",
            "State stores relevant information such as messages and task data that the agent needs during execution.",
          ],
          [
            "5. What is an Agent Executor?",
            "It manages the agent's execution process, including model calls, tool execution, and passing results back to the model.",
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

export default AgentArchitecture;

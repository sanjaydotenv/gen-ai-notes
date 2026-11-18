import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ToolCalling = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">Tool Calling</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Tool Calling allows LLMs to interact with external tools, APIs,
          databases, and services to perform tasks beyond simple text
          generation.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Tool Calling?</h2>

        <p className="leading-7 text-[#aaa]">
          Tool Calling is a capability that allows an AI model to request the
          execution of external tools when additional information or actions are
          required.
        </p>

        <CodeBlock
          code={`User
 |
 v
LLM
 |
 | Selects a Tool
 v
Application Executes Tool
 |
 v
Tool Returns Result
 |
 v
LLM Processes Result
 |
 v
Final Response to User`}
        />

        <p className="text-sm text-[#aaa]">
          Example: An AI assistant can use a weather API to get the current
          temperature of a city.
        </p>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Examples of Tools</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Weather API", "Get real-time weather information."],
            ["Database", "Fetch or update database records."],
            ["Web Search", "Search for latest information."],
            ["Calculator", "Perform mathematical calculations."],
            ["Email Service", "Send emails through an API."],
            ["File System", "Read or process application files."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How Tool Calling Works</h2>

        <p className="text-[#aaa]">
          Tool Calling generally follows these steps:
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            "User sends a request",
            "Application provides available tool definitions",
            "LLM selects a suitable tool",
            "LLM generates tool arguments",
            "Application executes the tool",
            "Tool result is sent back to LLM",
            "LLM generates the final response",
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div className="rounded-lg bg-white/5 p-3 text-sm">
                <span className="mr-2 font-semibold text-[#FC6C26]">
                  {index + 1}.
                </span>
                {step}
              </div>

              {index !== 6 && <div className="text-[#FC6C26]">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Tool Definition */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Tool Definition</h2>

        <p className="leading-7 text-[#aaa]">
          A tool definition describes the tool's name, purpose, and parameters
          so the LLM knows when and how to request it.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "type": "function",
  "function": {
    "name": "getWeather",
    "description": "Get weather of a city",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string",
          "description": "City name"
        }
      },
      "required": ["city"]
    }
  }
}`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Properties</h3>

          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li>
              <strong>name:</strong> Identifies the tool.
            </li>
            <li>
              <strong>description:</strong> Explains what the tool does.
            </li>
            <li>
              <strong>parameters:</strong> Defines required inputs.
            </li>
            <li>
              <strong>required:</strong> Specifies mandatory arguments.
            </li>
          </ul>
        </div>
      </section>

      {/* Practical Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Practical Example</h2>

        <p className="leading-7 text-[#aaa]">
          Suppose an AI assistant needs to calculate two numbers. The model
          requests a calculator tool, and our application executes the actual
          function.
        </p>

        <CodeBlock
          code={`// Tool Function

function calculate(a, b) {
  return a + b;
}

// Execute Tool

const result = calculate(10, 20);

console.log(result);

// Output: 30`}
        />

        <p className="text-sm text-[#aaa]">
          Here, the application executes the function after receiving the tool
          request from the LLM.
        </p>
      </section>

      {/* Function vs Tool */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          6. Function Calling vs Tool Calling
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Function Calling</th>
                <th className="p-3">Tool Calling</th>
              </tr>
            </thead>

            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Focuses on calling functions.</td>
                <td className="p-3">Broader concept of using tools.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually invokes application functions.</td>
                <td className="p-3">
                  Can involve APIs, search, and other tools.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">A type of tool interaction.</td>
                <td className="p-3">Can include function calling.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important Points */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Tools extend the capabilities of LLMs.</li>
          <li>LLM decides which available tool to request.</li>
          <li>Application executes the actual tool.</li>
          <li>Tool results can be sent back to the LLM.</li>
          <li>One request can involve multiple tool calls.</li>
          <li>Always validate arguments and permissions before execution.</li>
          <li>Tool Calling is an important part of AI Agents.</li>
        </ul>
      </section>

      {/* Interview Questions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Tool Calling?",
            a: "Tool Calling allows an LLM to request external tools to retrieve information or perform actions.",
          },
          {
            q: "Why do we need Tool Calling?",
            a: "It allows AI applications to interact with external APIs, databases, and services instead of only generating text.",
          },
          {
            q: "Does an LLM execute tools directly?",
            a: "No. The LLM generates a tool call request, and the application executes the actual tool.",
          },
          {
            q: "What is a Tool Definition?",
            a: "It describes a tool's name, purpose, and parameters so the LLM can understand how to use it.",
          },
          {
            q: "Can an LLM call multiple tools?",
            a: "Yes. Depending on the API and model, an LLM can request multiple tool calls in a single response or across multiple steps.",
          },
          {
            q: "What happens after tool execution?",
            a: "The application sends the tool result back to the LLM, which uses it to generate a response.",
          },
          {
            q: "What is the difference between Function Calling and Tool Calling?",
            a: "Function Calling focuses on invoking functions, while Tool Calling is a broader concept that includes different external capabilities.",
          },
          {
            q: "What is the role of an application in Tool Calling?",
            a: "The application provides tool definitions, validates arguments, executes tools, and returns their results to the LLM.",
          },
          {
            q: "How is Tool Calling used in AI Agents?",
            a: "AI Agents use tools to interact with external systems, gather information, and perform tasks.",
          },
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

export default ToolCalling;

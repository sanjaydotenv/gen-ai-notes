import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ToolSelection = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Tool Selection</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Tool Selection is the process through which an AI Agent chooses the
          most appropriate tool to complete a user's task.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What is Tool Selection?</h2>
        <p className="leading-7 text-[#aaa]">
          An agent may have access to multiple tools, such as a calculator,
          search engine, database, or file reader. It must identify which tool
          is useful for the current request.
        </p>

        <CodeBlock
          code={`User: What is the weather in Bhopal?

Available Tools:
- calculator
- weatherSearch
- databaseSearch
- fileReader

Agent Decision:
weatherSearch

Reason:
The user needs current weather information.`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. How Does Tool Selection Work?
        </h2>
        <CodeBlock
          code={`       User Request
             |
             v
       Understand Task
             |
             v
       Check Available Tools
             |
             v
       Match Tool with Task
             |
             v
       Select Appropriate Tool
             |
             v
       Generate Tool Call
             |
             v
       Execute Tool
             |
             v
       Return Result to LLM`}
        />
        <p className="text-sm leading-6 text-[#aaa]">
          The LLM generally selects a tool based on the user's request, tool
          descriptions, available schemas, and conversation context.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. Tool Description and Schema
        </h2>
        <p className="leading-7 text-[#aaa]">
          Tool descriptions help the model understand when to use a tool. A
          schema defines the arguments the tool expects.
        </p>
        <CodeBlock
          code={`const weatherTool = {
  name: "getWeather",

  description:
    "Get current weather for a city.",

  schema: {
    city: "string"
  }
};`}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Description</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Explains what the tool does and when it should be used.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Schema</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Defines required arguments and their data types.
            </p>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Tool Selection Example</h2>
        <p className="leading-7 text-[#aaa]">
          Suppose an agent has these three tools:
        </p>
        <CodeBlock
          code={`getWeather(city)
searchWeb(query)
calculator(expression)`}
        />
        <div className="space-y-3">
          {[
            ["Question", "What is the weather in Bhopal?", "getWeather"],
            ["Question", "Find the latest Node.js release.", "searchWeb"],
            ["Question", "Calculate 150 * 20.", "calculator"],
          ].map(([question, description, tool]) => (
            <div
              key={question}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className="text-sm text-[#aaa]">{question}</p>
              <p className="mt-2 text-sm">
                Selected Tool:{" "}
                <span className="font-semibold text-[#FC6C26]">{tool}</span>
              </p>
              <p className="mt-1 text-xs text-[#888]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Tool Selection in LangChain
        </h2>
        <p className="leading-7 text-[#aaa]">
          In LangChain, tools are provided to the agent. The model uses their
          names, descriptions, and schemas to request an appropriate tool call.
        </p>
        <CodeBlock
          code={`import { createAgent, tool } from "langchain";
import { z } from "zod";

const calculator = tool(
  async ({ expression }) => {
    // Use a safe math parser in production.
    return "3000";
  },
  {
    name: "calculator",
    description: "Calculate mathematical expressions.",
    schema: z.object({
      expression: z.string(),
    }),
  }
);

const searchWeb = tool(
  async ({ query }) => {
    return \`Search results for: \${query}\`;
  },
  {
    name: "search_web",
    description: "Search the web for current information.",
    schema: z.object({
      query: z.string(),
    }),
  }
);

const agent = createAgent({
  model: "your-configured-model",
  tools: [calculator, searchWeb],
});

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Calculate 150 multiplied by 20.",
    },
  ],
});`}
        />
        <p className="text-sm leading-6 text-[#999]">
          The model requests the calculator tool for this task. The agent
          runtime executes it and returns the result to the model.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. When Should an Agent Use a Tool?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-green-400">Use a Tool</h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-[#aaa]">
              <li>Current or live information is needed.</li>
              <li>External data must be retrieved.</li>
              <li>A calculation must be performed.</li>
              <li>An external action is required.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">No Tool Needed</h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-[#aaa]">
              <li>Simple conceptual questions.</li>
              <li>General explanations.</li>
              <li>Basic text transformations.</li>
              <li>Tasks the model can answer directly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Important Considerations</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Write clear and specific tool descriptions.</li>
          <li>Use schemas to validate tool arguments.</li>
          <li>Give the agent only the tools it actually needs.</li>
          <li>Handle tool errors and invalid arguments.</li>
          <li>Validate and authorize sensitive actions in application code.</li>
          <li>Do not assume the model always selects the correct tool.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is Tool Selection?",
            "It is the process of choosing the most appropriate tool for a user's task.",
          ],
          [
            "2. How does an LLM select a tool?",
            "It considers the user's request, available tool descriptions, schemas, and conversation context.",
          ],
          [
            "3. Why are tool descriptions important?",
            "They help the model understand what each tool does and when it should be used.",
          ],
          [
            "4. What is the role of a tool schema?",
            "It defines the expected arguments, data types, and validation rules for a tool.",
          ],
          [
            "5. Does the LLM execute the selected tool?",
            "No. It generates a structured tool-call request. The application or agent framework executes the function.",
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

export default ToolSelection;

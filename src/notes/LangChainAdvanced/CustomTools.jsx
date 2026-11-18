import React from "react";
import CodeBlock from "../../components/CodeBlock";

const CustomTools = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 06
        </p>
        <h1 className="text-3xl font-bold mt-2">Custom Tools</h1>
        <p className="text-[#999] mt-3 leading-7">
          Custom Tools allow developers to expose their own functions to an
          LLM. The model can decide when to use a tool, provide its input,
          and use the returned result.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Custom Tools?</h2>

        <p className="text-[#aaa] leading-7">
          A tool is a function that an AI application can use to perform a
          specific task, such as fetching weather, searching a database,
          calculating values, or calling an API.
        </p>

        <p className="text-[#aaa] leading-7">
          Custom Tools are tools that developers create according to their
          application's requirements.
        </p>

        <CodeBlock code={`User:
"What is the weather in Bhopal?"

        |
        v

       LLM
        |
        v
   Weather Tool
        |
        v
  Weather API
        |
        v
  Tool Result
        |
        v
       LLM
        |
        v
Final Answer`} />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need Custom Tools?</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["External APIs", "Connect AI applications with third-party APIs."],
            ["Database Access", "Allow AI workflows to search or update application data."],
            ["Custom Logic", "Execute your own JavaScript business logic."],
            ["Real-World Actions", "Perform tasks such as sending emails or creating records."]
          ].map(([title, desc]) => (
            <div key={title} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Creating a Custom Tool</h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides the tool() function to create custom tools.
          It accepts a function, a tool name, a description, and an input
          schema.
        </p>

        <CodeBlock code={`import { tool } from "@langchain/core/tools";
import { z } from "zod";

const addTool = tool(
  ({ a, b }) => a + b,
  {
    name: "add_numbers",
    description: "Add two numbers together.",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);`} />

        <p className="text-[#aaa] leading-7">
          Here, we created a tool that adds two numbers.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">Important Parts</p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">name:</span> Unique name used to
            identify the tool.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">description:</span> Explains what
            the tool does. Helps the model decide when to use it.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">schema:</span> Defines the
            expected input structure.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">function:</span> Contains the
            actual logic executed by the tool.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. What is Zod Schema?</h2>

        <p className="text-[#aaa] leading-7">
          Zod is a TypeScript-first schema validation library. LangChain uses
          schemas such as Zod objects to describe and validate tool inputs.
        </p>

        <CodeBlock code={`import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});`} />

        <p className="text-[#aaa] leading-7">
          This schema expects an object containing a string name, a numeric
          age, and a valid email address.
        </p>

        <p className="text-sm text-[#999]">
          Schema validation helps prevent tools from receiving incorrectly
          structured input. It does not replace authorization or business
          validation.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Calling a Tool Manually</h2>

        <p className="text-[#aaa] leading-7">
          A custom tool can be executed directly using invoke(). This is
          useful for testing its functionality before connecting it to an LLM.
        </p>

        <CodeBlock code={`const result = await addTool.invoke({
  a: 10,
  b: 20,
});

console.log(result);

// Output: 30`} />

        <p className="text-[#aaa] leading-7">
          Here, JavaScript directly executes the tool. The LLM is not involved.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Creating a Tool with an API</h2>

        <p className="text-[#aaa] leading-7">
          Custom tools can execute asynchronous operations, such as calling
          external APIs.
        </p>

        <CodeBlock code={`import { tool } from "@langchain/core/tools";
import { z } from "zod";

const weatherTool = tool(
  async ({ city }) => {
    const response = await fetch(
      \`https://api.example.com/weather?city=\${encodeURIComponent(city)}\`
    );

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    return JSON.stringify({
      city,
      temperature: data.temperature,
      condition: data.condition,
    });
  },
  {
    name: "get_weather",
    description: "Get current weather information for a city.",
    schema: z.object({
      city: z.string().describe("Name of the city"),
    }),
  }
);`} />

        <p className="text-sm text-[#999]">
          This is an illustrative API endpoint. Replace it with a real weather
          provider and configure authentication if required.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Connecting Custom Tools with an LLM</h2>

        <p className="text-[#aaa] leading-7">
          Creating a tool does not automatically make the LLM execute it.
          We must bind the tools to a model using bindTools().
        </p>

        <CodeBlock code={`import { ChatOpenAI } from "@langchain/openai";

// Initialize model
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// Register tools with model
const modelWithTools = model.bindTools([
  addTool,
  weatherTool,
]);

// Send user message
const response = await modelWithTools.invoke(
  "What is 10 + 20?"
);

console.log(response.tool_calls);`} />

        <p className="text-[#aaa] leading-7">
          bindTools() makes the tool definitions available to the model.
          The model can return a tool call when it decides a tool is needed.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. How Tool Calling Works</h2>

        <p className="text-[#aaa] leading-7">
          An important point: the model usually does not execute your
          JavaScript function itself. It requests a tool call, and your
          application executes that tool.
        </p>

        <CodeBlock code={`1. User sends a message
          |
          v
2. LLM receives message + tool definitions
          |
          v
3. LLM returns a tool call
          |
          v
4. Application executes the requested tool
          |
          v
5. Tool returns its result
          |
          v
6. Application sends result back to LLM
          |
          v
7. LLM generates final response`} />

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Important Difference</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            bindTools() registers tools with the model. It does not execute
            the tools automatically. Your application or an agent runtime
            must handle tool execution.
          </p>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Important Best Practices</h2>

        <div className="space-y-3">
          {[
            ["Clear Descriptions", "Write descriptions that clearly explain when a tool should be used."],
            ["Validate Inputs", "Use Zod schemas to validate tool arguments."],
            ["Handle Errors", "Handle API failures, invalid data, and timeouts."],
            ["Protect Sensitive Actions", "Require authorization or user confirmation for actions such as payments and deleting data."],
            ["Limit Tool Permissions", "Give tools only the access they actually need."],
            ["Keep Tools Focused", "Each tool should perform one clear task."]
          ].map(([title, desc]) => (
            <div key={title} className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">10. Interview Questions & Answers</h2>

        {[
          ["What is a Custom Tool in LangChain?", "A developer-defined function exposed to an LLM so it can request application-specific operations."],
          ["Why do we use Custom Tools?", "To connect LLMs with APIs, databases, external services, and custom application logic."],
          ["What is the tool() function?", "A LangChain function used to create a tool with executable logic and a defined input schema."],
          ["What is Zod?", "A schema validation library used to define and validate structured tool inputs."],
          ["What is the purpose of a tool description?", "It helps the model understand what a tool does and when it should be selected."],
          ["What does invoke() do on a tool?", "It executes the tool with the supplied input."],
          ["What does bindTools() do?", "It makes tool definitions available to a chat model so it can request tool calls."],
          ["Does an LLM execute JavaScript tools directly?", "No. The LLM requests a tool call. The application or agent runtime executes the actual function."],
          ["Can tools perform asynchronous operations?", "Yes. Tool functions can be async and can call APIs or databases."],
          ["Why is input validation important?", "It ensures tool arguments follow the expected structure and reduces invalid input."],
          ["Is tool calling the same as an agent?", "No. Tool calling allows a model to request tools. An agent manages the process of deciding and executing tools, often repeatedly, to complete a task."]
        ].map(([q, a], i) => (
          <div key={i} className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <p className="font-semibold">
              <span className="text-[#FC6C26]">Q{i + 1}.</span> {q}
            </p>
            <p className="text-sm text-green-400 mt-2 leading-6">
              {a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default CustomTools;
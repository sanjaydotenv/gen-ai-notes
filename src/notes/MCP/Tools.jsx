import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Tools = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 06
        </p>
        <h1 className="mt-2 text-3xl font-bold">MCP Tools</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          MCP Tools are executable functions exposed by an MCP Server. They
          allow AI applications to interact with external systems and perform
          operations through a standardized protocol.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What are MCP Tools?</h2>

        <p className="leading-7 text-[#aaa]">
          A Tool is a function that an MCP Client can discover and invoke. The
          function executes on the MCP Server and returns a result.
        </p>

        <CodeBlock
          code={`          AI APPLICATION
                 |
                 v
              LLM
                 |
          Selects a Tool
                 |
                 v
             MCP CLIENT
                 |
                 v
             MCP SERVER
                 |
           Tool Execution
                 |
          +------+------+
          |      |      |
         API    DB    Files`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example: A user asks an AI assistant to create a GitHub issue. The LLM
          can request a create_issue tool, which the MCP Server executes using
          the GitHub API.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. How Do MCP Tools Work?</h2>

        <CodeBlock
          code={`1. SERVER REGISTERS TOOLS
          |
          v
2. CLIENT DISCOVERS TOOLS
          |
          v
3. HOST PROVIDES TOOLS TO LLM
          |
          v
4. LLM REQUESTS A TOOL CALL
          |
          v
5. HOST AUTHORIZES / EXECUTES CALL
          |
          v
6. MCP CLIENT SENDS REQUEST
          |
          v
7. MCP SERVER EXECUTES TOOL
          |
          v
8. RESULT RETURNS TO LLM`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Important: The LLM requests a tool call, but the Host controls how
          that request is handled. The MCP Client communicates with the Server
          to execute it.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Main Parts of a Tool</h2>

        <div className="space-y-3">
          {[
            ["Name", "Unique identifier used to call the Tool."],
            [
              "Description",
              "Explains what the Tool does so the LLM can select it correctly.",
            ],
            [
              "Input Schema",
              "Defines and validates the arguments required by the Tool.",
            ],
            [
              "Handler",
              "JavaScript function that performs the actual operation.",
            ],
            ["Result", "Returns the output of the operation to the Client."],
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

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Creating an MCP Tool</h2>

        <p className="leading-7 text-[#aaa]">
          We can register a Tool using registerTool() from the MCP SDK. Zod
          defines its input schema and validates incoming arguments.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">
          Install dependencies
        </p>

        <CodeBlock
          language="bash"
          code={`npm install @modelcontextprotocol/sdk zod`}
        />

        <p className="text-sm font-medium text-[#FC6C26]">server.js</p>

        <CodeBlock
          code={`import { McpServer } from
  "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from
  "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

// 1. Create MCP Server
const server = new McpServer({
  name: "calculator-server",
  version: "1.0.0",
});

// 2. Register Tool
server.registerTool(
  "add_numbers",
  {
    description: "Add two numbers together",

    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },

  async ({ a, b }) => {
    const result = a + b;

    return {
      content: [
        {
          type: "text",
          text: \`Result: \${result}\`,
        },
      ],
    };
  }
);

// 3. Start Server
const transport = new StdioServerTransport();

await server.connect(transport);`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">How This Tool Works</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
            <li>
              <code className="text-white">add_numbers</code> is the Tool name.
            </li>
            <li>
              <code className="text-white">description</code> tells the LLM what
              it does.
            </li>
            <li>
              <code className="text-white">inputSchema</code> defines required
              inputs.
            </li>
            <li>
              <code className="text-white">async handler</code> performs the
              calculation.
            </li>
            <li>
              <code className="text-white">content</code> contains the result.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Calling a Tool from MCP Client
        </h2>

        <p className="leading-7 text-[#aaa]">
          After connecting to the Server, the Client can discover and execute
          the registered Tool.
        </p>

        <CodeBlock
          code={`// Discover available tools
const { tools } = await client.listTools();

console.log(tools);

// Call the add_numbers tool
const result = await client.callTool({
  name: "add_numbers",

  arguments: {
    a: 10,
    b: 20,
  },
});

console.log(result.content);`}
        />

        <p className="text-sm text-[#999]">Expected result: Result: 30</p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Tool Input Validation</h2>

        <p className="leading-7 text-[#aaa]">
          MCP SDK validates incoming arguments using the registered input schema
          before executing the handler.
        </p>

        <CodeBlock
          code={`inputSchema: {
  a: z.number(),
  b: z.number(),
}

// Valid arguments
{
  a: 10,
  b: 20
}

// Invalid arguments
{
  a: "10",
  b: 20
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          If an argument does not match the schema, validation fails and the
          handler does not execute.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Tool Error Handling</h2>

        <p className="leading-7 text-[#aaa]">
          A Tool can fail because of API errors, database failures, invalid
          operations, or other runtime problems.
        </p>

        <CodeBlock
          code={`server.registerTool(
  "get_user",
  {
    description: "Get user by ID",
    inputSchema: {
      id: z.string(),
    },
  },
  async ({ id }) => {
    try {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(user),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: error.message,
          },
        ],
        isError: true,
      };
    }
  }
);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Setting <code className="text-white">isError: true</code> tells the
          Client and Host that the Tool execution failed. The LLM can use the
          error information to decide what to do next.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Tool vs Resource vs Prompt</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Example</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Tools</td>
                <td className="p-3">Perform actions</td>
                <td className="p-3">Create a file</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Resources</td>
                <td className="p-3">Provide data</td>
                <td className="p-3">Read a file</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Prompts</td>
                <td className="p-3">Provide templates</td>
                <td className="p-3">Code review template</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9. Security Best Practices</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Validate all Tool inputs.</li>
          <li>Check user permissions before executing operations.</li>
          <li>Require confirmation for destructive actions.</li>
          <li>Never expose secrets or credentials.</li>
          <li>Use proper error handling and execution limits.</li>
          <li>Do not blindly trust arguments generated by an LLM.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What are MCP Tools?",
            "Tools are executable functions exposed by an MCP Server that clients can invoke.",
          ],
          [
            "2. How do you register an MCP Tool?",
            "Using registerTool() with a name, configuration, input schema, and handler.",
          ],
          [
            "3. What is inputSchema?",
            "It defines the arguments a Tool accepts and validates incoming input.",
          ],
          [
            "4. How does an MCP Client discover Tools?",
            "By sending a tools/list request to the MCP Server.",
          ],
          [
            "5. How does an MCP Client execute a Tool?",
            "By sending a tools/call request with the Tool name and arguments.",
          ],
          [
            "6. What does isError: true mean?",
            "It indicates that the Tool execution failed and the returned content describes the error.",
          ],
          [
            "7. Does an MCP Tool require an LLM?",
            "No. A Tool is a normal executable function. The Host and LLM decide when it should be used.",
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

export default Tools;

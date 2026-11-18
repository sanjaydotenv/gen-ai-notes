import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MCPServer = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">MCP Server</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          An MCP Server is a program that exposes external capabilities such as
          Tools, Resources, and Prompts to MCP Clients through the Model Context
          Protocol.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What is an MCP Server?</h2>

        <p className="leading-7 text-[#aaa]">
          An MCP Server acts as a bridge between an AI application and external
          systems like databases, APIs, files, and services.
        </p>

        <CodeBlock
          code={`       AI HOST
           |
           v
       MCP CLIENT
           |
           | MCP Protocol
           v
       MCP SERVER
           |
      +----+-----+
      |    |     |
     API  Files  Database`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example: A GitHub MCP Server can expose tools to list repositories,
          create issues, and read repository information.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. What Does an MCP Server Provide?
        </h2>

        <div className="space-y-3">
          {[
            {
              title: "Tools",
              desc: "Functions that clients can invoke to perform actions, such as creating files or fetching API data.",
            },
            {
              title: "Resources",
              desc: "Data that clients can read, such as documents, configuration, and database information.",
            },
            {
              title: "Prompts",
              desc: "Reusable prompt templates that clients can retrieve for specific tasks.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. How Does an MCP Server Work?
        </h2>

        <CodeBlock
          code={`1. MCP CLIENT CONNECTS
          |
          v
2. INITIALIZATION
          |
          v
3. CLIENT DISCOVERS CAPABILITIES
          |
          v
4. CLIENT SENDS REQUEST
          |
          v
5. SERVER EXECUTES REQUEST
          |
          v
6. SERVER RETURNS RESULT
          |
          v
7. CLIENT RECEIVES RESPONSE`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The Server handles incoming protocol requests and executes the
          corresponding registered functionality.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Creating an MCP Server</h2>

        <p className="leading-7 text-[#aaa]">
          We can create an MCP Server in Node.js using the official TypeScript
          SDK.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">Install packages</p>

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
  name: "my-first-server",
  version: "1.0.0",
});

// 2. Register a Tool
server.registerTool(
  "greet",
  {
    description: "Generate a greeting for a user",
    inputSchema: {
      name: z.string(),
    },
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: \`Hello \${name}! Welcome to MCP.\`,
        },
      ],
    };
  }
);

// 3. Create transport
const transport = new StdioServerTransport();

// 4. Start MCP Server
await server.connect(transport);`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">What happens here?</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
            <li>
              <code className="text-white">McpServer</code> creates the server
              instance.
            </li>
            <li>
              <code className="text-white">registerTool()</code> registers a
              tool.
            </li>
            <li>
              <code className="text-white">inputSchema</code> defines and
              validates its input.
            </li>
            <li>
              <code className="text-white">StdioServerTransport</code> handles
              local communication.
            </li>
            <li>
              <code className="text-white">connect()</code> connects the server
              to its transport.
            </li>
          </ul>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          This example uses the SDK v1 package and API, matching the MCP Client
          example from the previous topic.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Understanding Tool Execution
        </h2>

        <p className="leading-7 text-[#aaa]">
          Registering a tool makes it available to connected clients. When a
          client calls that tool, the registered callback executes.
        </p>

        <CodeBlock
          code={`Client Request:

{
  "name": "greet",
  "arguments": {
    "name": "Mayur"
  }
}

        |
        v

MCP Server
        |
        v

Tool Handler Executes
        |
        v

Result:

{
  "content": [
    {
      "type": "text",
      "text": "Hello Mayur! Welcome to MCP."
    }
  ]
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The MCP Server does not need an LLM to execute this tool. It executes
          the JavaScript function registered by the developer.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. MCP Server Transports</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">stdio</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Used for local MCP Servers launched by a Client as a child process.
            Communication happens through stdin and stdout.
          </p>
          <p className="mt-2 text-xs text-[#888]">
            Example: Local file-system MCP Server.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Streamable HTTP</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Used for remote MCP Servers that communicate over HTTP. It supports
            HTTP request-response and optional SSE streaming.
          </p>
          <p className="mt-2 text-xs text-[#888]">
            Example: A remotely hosted database MCP Server.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          7. MCP Server vs Normal Backend API
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Backend API</th>
                <th className="p-3">MCP Server</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Exposes HTTP endpoints.</td>
                <td className="p-3">Exposes MCP capabilities.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Uses HTTP methods and routes.</td>
                <td className="p-3">Uses MCP operations and messages.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Designed for applications and clients.</td>
                <td className="p-3">
                  Designed for MCP-compatible applications.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Defines its own API contract.</td>
                <td className="p-3">Follows a standardized protocol.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          Important: An MCP Server can internally use your existing Express
          APIs, databases, or business logic. It does not replace your backend.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Security Considerations</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Validate all incoming tool arguments.</li>
          <li>Authenticate and authorize access to protected services.</li>
          <li>Never expose API keys or database credentials.</li>
          <li>Restrict file-system and database permissions.</li>
          <li>Handle errors without leaking sensitive information.</li>
          <li>Require approval for sensitive operations when appropriate.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is an MCP Server?",
            "A program that exposes Tools, Resources, and Prompts to MCP Clients.",
          ],
          [
            "2. What are the main responsibilities of an MCP Server?",
            "Registering capabilities, handling client requests, executing functionality, and returning results.",
          ],
          [
            "3. What is McpServer?",
            "A high-level class provided by the MCP SDK to create and manage an MCP Server.",
          ],
          [
            "4. What does registerTool() do?",
            "It registers a tool with its description, input schema, and execution handler.",
          ],
          [
            "5. What is StdioServerTransport?",
            "A transport that allows local MCP processes to communicate through stdin and stdout.",
          ],
          [
            "6. Does an MCP Server require an LLM?",
            "No. It exposes capabilities and handles requests. The Host manages the LLM.",
          ],
          [
            "7. Can an MCP Server use an existing Express API?",
            "Yes. An MCP Server can call existing APIs and backend services internally.",
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

export default MCPServer;

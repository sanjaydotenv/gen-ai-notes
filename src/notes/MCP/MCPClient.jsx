import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MCPClient = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">MCP Client</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          An MCP Client is a component inside an AI Host that establishes and
          manages communication with an MCP Server. It allows the Host to
          discover and access server capabilities.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. What Does an MCP Client Do?
        </h2>
        <p className="leading-7 text-[#aaa]">
          The MCP Client acts as a communication bridge between the Host
          application and an MCP Server.
        </p>

        <CodeBlock
          code={`       AI HOST
           |
           v
       MCP CLIENT
           |
     MCP Protocol
           |
           v
       MCP SERVER
           |
      External APIs`}
        />

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Connects to an MCP Server.</li>
          <li>Performs the initialization handshake.</li>
          <li>Discovers available Tools, Resources, and Prompts.</li>
          <li>Sends requests and receives responses.</li>
          <li>Manages connection lifecycle and errors.</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. How Does an MCP Client Work?
        </h2>

        <p className="leading-7 text-[#aaa]">
          Before using a server, the Client establishes a connection and
          initializes the MCP session.
        </p>

        <CodeBlock
          code={`1. CREATE CLIENT
       |
       v
2. SELECT TRANSPORT
       |
       v
3. CONNECT TO SERVER
       |
       v
4. INITIALIZATION HANDSHAKE
       |
       v
5. DISCOVER CAPABILITIES
       |
       v
6. CALL TOOLS / READ RESOURCES
       |
       v
7. RECEIVE RESULTS`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Initialization</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            During initialization, Client and Server exchange protocol versions
            and supported capabilities. The Server responds with its information
            and capabilities, allowing communication to continue using the
            negotiated protocol version.
          </p>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. MCP Client Transports</h2>

        <p className="leading-7 text-[#aaa]">
          A transport defines how the Client communicates with the Server. The
          two standard transports are:
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">stdio Transport</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Used when the Client starts a local MCP Server as a child process.
            Communication happens through stdin and stdout.
          </p>
          <CodeBlock
            code={`AI Application
      |
      | Spawn process
      v
MCP Server (Local Process)
      |
      | stdin / stdout
      v
MCP Client`}
          />
          <p className="text-xs text-[#999]">
            Example: Connecting to a local file-system MCP Server.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">
            Streamable HTTP Transport
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Used when the MCP Server is available through an HTTP endpoint. It
            supports request-response communication and optional streaming
            through Server-Sent Events (SSE).
          </p>
          <CodeBlock
            code={`AI Application
      |
      v
MCP Client
      |
      | HTTP Requests
      v
Remote MCP Server
      |
      v
External Services`}
          />
          <p className="text-xs text-[#999]">
            Example: Connecting to a remote GitHub MCP Server.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Building an MCP Client</h2>

        <p className="leading-7 text-[#aaa]">
          We can create an MCP Client in Node.js using the official TypeScript
          SDK.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">Install package</p>
        <CodeBlock
          code={`npm install @modelcontextprotocol/sdk`}
          language="bash"
        />

        <p className="text-sm font-medium text-[#FC6C26]">client.js</p>
        <CodeBlock
          code={`import { Client } from "@modelcontextprotocol/sdk/client/index.js";

import { StdioClientTransport } from
  "@modelcontextprotocol/sdk/client/stdio.js";

// 1. Create MCP Client
const client = new Client({
  name: "my-ai-client",
  version: "1.0.0",
});

// 2. Create transport
const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"],
});

// 3. Connect to MCP Server
await client.connect(transport);

console.log("Connected to MCP Server!");

// 4. Discover available tools
const tools = await client.listTools();

console.log(tools);

// 5. Call a tool
const result = await client.callTool({
  name: "get_weather",
  arguments: {
    city: "Bhopal",
  },
});

console.log(result);

// 6. Close connection
await client.close();`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Note: This example assumes a compatible MCP Server is available in
          server.js and exposes a get_weather tool with a city argument.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Important Client Methods</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["connect()", "Connects and initializes the Client."],
                ["listTools()", "Discovers available tools."],
                ["callTool()", "Executes a server tool."],
                ["listResources()", "Lists available resources."],
                ["readResource()", "Reads a specific resource."],
                ["listPrompts()", "Lists available prompts."],
                ["getPrompt()", "Retrieves a prompt."],
                ["close()", "Closes the connection."],
              ].map(([method, description]) => (
                <tr key={method} className="border-t border-white/10">
                  <td className="p-3 font-mono text-white">{method}</td>
                  <td className="p-3">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. How Does Tool Calling Work?
        </h2>

        <p className="leading-7 text-[#aaa]">
          When an LLM needs an external tool, the Host coordinates the
          operation. The MCP Client communicates with the Server and returns the
          result.
        </p>

        <CodeBlock
          code={`USER
 |
 | "Get my repositories"
 v
HOST / LLM
 |
 | Selects get_repositories tool
 v
MCP CLIENT
 |
 | callTool()
 v
MCP SERVER
 |
 | Executes tool
 v
GITHUB API
 |
 | Repository data
 v
MCP SERVER
 |
 | Tool result
 v
MCP CLIENT
 |
 v
HOST / LLM
 |
 | Generates final response
 v
USER`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Important: The MCP Client does not itself decide what the LLM should
          do. The Host manages model interaction and tool selection.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Error Handling & Security</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Handle connection failures and timeouts.</li>
          <li>Validate tool arguments before sensitive operations.</li>
          <li>Use authentication for protected remote servers.</li>
          <li>
            Ask for user approval before important actions when appropriate.
          </li>
          <li>Close connections when they are no longer needed.</li>
          <li>Never expose API keys or access tokens in logs.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is an MCP Client?",
            "It is a component inside an AI Host that communicates with a specific MCP Server.",
          ],
          [
            "2. What are the main responsibilities of an MCP Client?",
            "Connection management, initialization, capability discovery, and sending and receiving MCP messages.",
          ],
          [
            "3. What are the standard MCP transports?",
            "stdio and Streamable HTTP.",
          ],
          [
            "4. What is stdio transport?",
            "It allows a Client to communicate with a locally spawned Server through stdin and stdout.",
          ],
          [
            "5. What is Streamable HTTP?",
            "It is an HTTP-based transport for communication with MCP Servers, supporting optional SSE streaming.",
          ],
          [
            "6. How does an MCP Client discover tools?",
            "It sends a tools/list request and receives the Server's available tool definitions.",
          ],
          [
            "7. Does the MCP Client select tools using an LLM?",
            "Not necessarily. The Host usually provides available tools to the LLM and coordinates its tool selection.",
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

export default MCPClient;

import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MCPArchitecture = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">MCP Architecture</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          MCP follows a Host-Client-Server architecture. These components work
          together to connect AI applications with external tools and data
          sources.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Three Core Components</h2>

        <div className="space-y-3">
          {[
            {
              name: "Host",
              desc: "The AI application that manages the LLM, MCP clients, user interactions, and permissions.",
              example: "Claude Desktop, an AI coding assistant.",
            },
            {
              name: "Client",
              desc: "A component inside the Host that communicates with one specific MCP Server.",
              example:
                "Manages protocol communication with a GitHub MCP Server.",
            },
            {
              name: "Server",
              desc: "A program that exposes external capabilities such as Tools, Resources, and Prompts.",
              example: "A server that provides GitHub repository access.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="text-lg font-semibold text-[#FC6C26]">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{item.desc}</p>
              <p className="mt-2 text-xs text-[#888]">
                Example: {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. How Components Connect</h2>

        <CodeBlock
          code={`             HOST
       (AI Application)
               |
       +-------+-------+
       |               |
   MCP Client 1    MCP Client 2
       |               |
       v               v
   MCP Server 1    MCP Server 2
       |               |
     GitHub         Database
       |               |
   Repositories    Records`}
        />

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>A Host can manage multiple MCP Clients.</li>
          <li>Each Client communicates with one specific Server.</li>
          <li>Different Servers provide different capabilities.</li>
          <li>Servers remain isolated from each other.</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Role of Each Component</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Host Responsibilities
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#aaa]">
              <li>Manages the LLM and user interaction.</li>
              <li>Creates and manages MCP Clients.</li>
              <li>Controls permissions and user consent.</li>
              <li>Combines context from connected servers.</li>
              <li>Coordinates tool usage and AI responses.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Client Responsibilities
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#aaa]">
              <li>Connects to a specific MCP Server.</li>
              <li>Sends and receives MCP messages.</li>
              <li>Discovers server capabilities.</li>
              <li>Handles protocol communication.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Server Responsibilities
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#aaa]">
              <li>Exposes Tools, Resources, and Prompts.</li>
              <li>Handles incoming protocol requests.</li>
              <li>Communicates with external services.</li>
              <li>Returns results to the Client.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. MCP Communication Layers</h2>

        <p className="leading-7 text-[#aaa]">
          MCP communication has two important layers:
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Data Layer</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Defines the message format and rules for communication. MCP uses
            JSON-RPC 2.0 to exchange requests, responses, and notifications.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Transport Layer</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Defines how messages travel between the Client and Server.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[#aaa]">
            <li>
              <strong className="text-white">stdio:</strong> Communicates
              through stdin and stdout between local processes.
            </li>
            <li>
              <strong className="text-white">Streamable HTTP:</strong>{" "}
              Communicates over HTTP and supports optional SSE streaming.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. How MCP Communication Works
        </h2>

        <p className="text-sm leading-6 text-[#aaa]">
          Example: A user asks an AI assistant to list their GitHub
          repositories.
        </p>

        <CodeBlock
          code={`1. USER
   |
   | "Show my GitHub repositories"
   v
2. HOST
   |
   | Understands the request using LLM
   v
3. MCP CLIENT
   |
   | Sends MCP request to GitHub Server
   v
4. MCP SERVER
   |
   | Calls GitHub API
   v
5. EXTERNAL SERVICE
   |
   | Returns repository data
   v
6. MCP SERVER
   |
   | Sends result to Client
   v
7. MCP CLIENT
   |
   | Passes result to Host
   v
8. HOST / LLM
   |
   | Generates final response
   v
9. USER
   |
   | Sees repository list`}
        />

        <p className="text-sm text-[#999]">
          Important: The MCP Server does not normally control the LLM's entire
          conversation. The Host manages the AI interaction and decides how
          server results are used.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. JSON-RPC Communication</h2>

        <p className="leading-7 text-[#aaa]">
          JSON-RPC 2.0 is the message format MCP uses for communication between
          Clients and Servers.
        </p>

        <p className="text-sm text-[#aaa]">Example request:</p>
        <CodeBlock
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}`}
        />

        <p className="text-sm text-[#aaa]">Example response:</p>
        <CodeBlock
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "get_repositories",
        "description": "Fetch GitHub repositories"
      }
    ]
  }
}`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm leading-6 text-[#aaa]">
            <strong className="text-white">Request:</strong> Asks another
            component to perform an operation.
            <br />
            <strong className="text-white">Response:</strong> Returns the result
            or error.
            <br />
            <strong className="text-white">Notification:</strong> Sends a
            one-way message without expecting a response.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Capability Discovery</h2>

        <p className="leading-7 text-[#aaa]">
          Before using a Server's features, the Client needs to discover which
          capabilities the Server supports.
        </p>

        <CodeBlock
          code={`MCP Client
    |
    | Discover server capabilities
    v
MCP Server
    |
    | Returns supported capabilities
    v
MCP Client
    |
    | Uses supported features
    v
Tools / Resources / Prompts`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Capability discovery helps the Client understand which features are
          available instead of assuming every Server supports everything.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          8. Important Things to Remember
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Host manages the AI application and MCP Clients.</li>
          <li>Client connects to one specific Server.</li>
          <li>Server exposes Tools, Resources, and Prompts.</li>
          <li>MCP uses JSON-RPC 2.0 for messages.</li>
          <li>stdio and Streamable HTTP are standard transports.</li>
          <li>
            Data Layer defines message rules; Transport Layer carries messages.
          </li>
          <li>Host is responsible for permissions and orchestration.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What are the three main components of MCP?",
            "Host, Client, and Server.",
          ],
          [
            "2. What is the role of an MCP Host?",
            "It manages the LLM, user interaction, MCP Clients, permissions, and orchestration.",
          ],
          [
            "3. Can one Host connect to multiple MCP Servers?",
            "Yes. A Host can manage multiple Clients, with each Client communicating with a specific Server.",
          ],
          [
            "4. What is the role of an MCP Client?",
            "It manages communication between the Host and a specific MCP Server.",
          ],
          ["5. Which protocol does MCP use for messages?", "JSON-RPC 2.0."],
          [
            "6. What are MCP transports?",
            "They define how messages travel. Standard transports include stdio and Streamable HTTP.",
          ],
          [
            "7. What is capability discovery?",
            "It allows a Client to discover which features a Server supports.",
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

export default MCPArchitecture;

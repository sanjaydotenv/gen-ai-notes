import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Resources = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">MCP Resources</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Resources are read-only data exposed by an MCP Server. They allow MCP
          Clients to access files, documents, database records, and other
          information as context for an AI application.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What are MCP Resources?</h2>
        <p className="leading-7 text-[#aaa]">
          A Resource represents information that an MCP Client can discover and
          read using its URI.
        </p>

        <CodeBlock
          code={`          MCP SERVER
               |
          Resources
               |
       +-------+-------+
       |       |       |
      Files  Database  Documents
       |       |       |
       +-------+-------+
               |
               v
           MCP CLIENT
               |
               v
          AI Application`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example: An AI assistant reads a project README file through an MCP
          Resource and uses its content to answer questions.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Types of Resources</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Static Resources</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            A resource with a fixed URI. It points to a specific piece of
            information.
          </p>
          <CodeBlock
            code={`config://app
docs://readme
database://users`}
          />
          <p className="text-xs text-[#888]">
            Example: Application configuration or a fixed document.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Dynamic Resources</h3>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Resource templates use URI patterns to access data dynamically based
            on parameters.
          </p>
          <CodeBlock
            code={`users://101/profile
users://102/profile
users://103/profile`}
          />
          <p className="text-xs text-[#888]">
            Example: Reading different user profiles using user IDs.
          </p>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Resource URI</h2>

        <p className="leading-7 text-[#aaa]">
          Every Resource is identified by a URI (Uniform Resource Identifier).
          The Client uses this URI to request specific data.
        </p>

        <CodeBlock
          code={`URI:
users://101/profile

users       -> Resource scheme
101         -> User ID
profile     -> Requested information`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          MCP Servers define their resource URIs. They are identifiers, not
          necessarily normal HTTP URLs.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Creating a Resource</h2>

        <p className="leading-7 text-[#aaa]">
          We can register a Resource using the registerResource() method
          provided by the MCP SDK.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">server.js</p>

        <CodeBlock
          code={`import { McpServer } from
  "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from
  "@modelcontextprotocol/sdk/server/stdio.js";

// 1. Create MCP Server
const server = new McpServer({
  name: "resource-server",
  version: "1.0.0",
});

// 2. Register a Resource
server.registerResource(
  "project-info",
  "project://info",
  {
    description: "Basic project information",
    mimeType: "text/plain",
  },
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          text: "Project: My AI Assistant\\nVersion: 1.0.0",
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
          <h3 className="font-semibold text-[#FC6C26]">Important Methods</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
            <li>
              <code className="text-white">registerResource()</code> registers a
              Resource.
            </li>
            <li>
              <code className="text-white">uri</code> identifies the Resource.
            </li>
            <li>
              <code className="text-white">mimeType</code> describes its content
              format.
            </li>
            <li>
              <code className="text-white">contents</code> contains the returned
              data.
            </li>
            <li>
              <code className="text-white">text</code> contains readable text
              content.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Reading a Resource from Client
        </h2>

        <p className="leading-7 text-[#aaa]">
          After connecting to the Server, an MCP Client can discover available
          Resources and read a specific Resource using its URI.
        </p>

        <CodeBlock
          code={`// 1. List available Resources
const resources = await client.listResources();

console.log(resources);

// 2. Read a specific Resource
const result = await client.readResource({
  uri: "project://info",
});

console.log(result.contents);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          This code runs on the Client side, after connecting to the Resource
          Server.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Resource vs Tool</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Resources</th>
                <th className="p-3">Tools</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Provide data.</td>
                <td className="p-3">Perform actions.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Read-oriented.</td>
                <td className="p-3">Can have side effects.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Application-controlled.</td>
                <td className="p-3">Model-controlled.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Read a document.</td>
                <td className="p-3">Create a document.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-6 text-[#aaa]">
          Important: Resources are generally selected by the Host or Client and
          provided as context. Tools can be exposed to the LLM for function
          calling.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Where are Resources Used?</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["File Access", "Read project files and documentation."],
            ["Database Context", "Read database records and information."],
            ["Configuration", "Provide application configuration data."],
            ["Knowledge Base", "Provide documents for AI responses."],
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

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          8. Important Things to Remember
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Resources provide read-only contextual data.</li>
          <li>Every Resource is identified by a URI.</li>
          <li>Static Resources use fixed URIs.</li>
          <li>Resource Templates support dynamic URI patterns.</li>
          <li>registerResource() registers Resources on a Server.</li>
          <li>listResources() discovers Resources on a Client.</li>
          <li>readResource() reads a specific Resource.</li>
          <li>Resources can return text or binary content.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What are MCP Resources?",
            "Resources are read-only data exposed by an MCP Server for an AI application to use as context.",
          ],
          [
            "2. What is a Resource URI?",
            "A URI uniquely identifies a Resource that a Client can read.",
          ],
          [
            "3. What is the difference between static and dynamic Resources?",
            "Static Resources have fixed URIs, while dynamic Resource Templates use URI patterns with parameters.",
          ],
          [
            "4. How do you register a Resource?",
            "Using the registerResource() method on an MCP Server.",
          ],
          [
            "5. How does a Client read a Resource?",
            "It uses readResource() with the Resource URI.",
          ],
          [
            "6. What is the difference between Resources and Tools?",
            "Resources provide data, whereas Tools perform operations or actions.",
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

export default Resources;

import React from "react";
import CodeBlock from "../../components/CodeBlock";

const CustomMCPServer = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 08
        </p>
        <h1 className="mt-2 text-3xl font-bold">Custom MCP Server</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          A Custom MCP Server is a server built by developers to expose their
          own application logic, APIs, databases, and data through the Model
          Context Protocol.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. Why Build a Custom MCP Server?
        </h2>

        <p className="leading-7 text-[#aaa]">
          Existing MCP Servers provide ready-made integrations, but sometimes we
          need to connect our own application or business logic with an AI
          application.
        </p>

        <CodeBlock
          code={`Your Application
       |
       +---- MongoDB
       |
       +---- Express APIs
       |
       +---- Business Logic
       |
       v
  Custom MCP Server
       |
       v
  AI Application`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example: You have a productivity application. You can build a Custom
          MCP Server that allows an AI assistant to read tasks, create tasks,
          and retrieve plan information.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. What Can We Expose?</h2>

        <div className="space-y-3">
          {[
            {
              title: "Custom Tools",
              desc: "Expose your application functions, such as creating tasks or fetching user information.",
            },
            {
              title: "Custom Resources",
              desc: "Expose application data, documents, and database information as readable resources.",
            },
            {
              title: "Custom Prompts",
              desc: "Provide reusable prompt templates for specific application workflows.",
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
        <h2 className="text-xl font-semibold">3. Project Setup</h2>

        <p className="leading-7 text-[#aaa]">
          Let's create a simple custom server using Node.js and the official MCP
          TypeScript SDK v2.
        </p>

        <CodeBlock
          language="bash"
          code={`mkdir custom-mcp-server
cd custom-mcp-server

npm init -y

npm install @modelcontextprotocol/server zod`}
        />

        <p className="text-sm font-medium text-[#FC6C26]">package.json</p>

        <CodeBlock
          code={`{
  "name": "custom-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}`}
        />

        <p className="text-sm font-medium text-[#FC6C26]">Project Structure</p>

        <CodeBlock
          code={`custom-mcp-server/
│
├── server.js
├── package.json
└── node_modules/`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Build a Custom MCP Server</h2>

        <p className="leading-7 text-[#aaa]">
          We will create a small Task Management MCP Server with two tools:
          add_task and get_tasks.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">server.js</p>

        <CodeBlock
          code={`import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

// Temporary in-memory storage
const tasks = [];

// 1. Create MCP Server
const server = new McpServer({
  name: "task-management-server",
  version: "1.0.0",
});

// 2. Register add_task Tool
server.registerTool(
  "add_task",
  {
    description: "Create a new task",
    inputSchema: z.object({
      title: z.string().min(1),
    }),
  },
  async ({ title }) => {
    const task = {
      id: tasks.length + 1,
      title,
      completed: false,
    };

    tasks.push(task);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(task),
        },
      ],
    };
  }
);

// 3. Register get_tasks Tool
server.registerTool(
  "get_tasks",
  {
    description: "Get all tasks",
    inputSchema: z.object({}),
  },
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(tasks),
      },
    ],
  })
);

// 4. Start MCP Server
serveStdio(() => server);`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">What did we build?</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
            <li>Created an MCP Server instance.</li>
            <li>Registered a tool to create tasks.</li>
            <li>Registered a tool to retrieve tasks.</li>
            <li>Used Zod to validate tool inputs.</li>
            <li>Started the server using stdio transport.</li>
          </ul>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. How Does It Work?</h2>

        <CodeBlock
          code={`AI HOST
   |
   v
MCP CLIENT
   |
   | Discovers available tools
   v
CUSTOM MCP SERVER
   |
   +---- add_task
   |
   +---- get_tasks
   |
   v
TASK STORAGE
   |
   v
Returns Results to Client`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example user request: "Create a task called Learn MCP."
        </p>

        <CodeBlock
          code={`LLM selects add_task

Arguments:
{
  "title": "Learn MCP"
}

       |
       v

MCP Client sends tool call

       |
       v

Custom Server executes add_task

       |
       v

Task is stored

       |
       v

Result returned to AI Host`}
        />
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Connect Your Existing Backend
        </h2>

        <p className="leading-7 text-[#aaa]">
          In real applications, we usually replace temporary arrays with
          database queries or existing backend services.
        </p>

        <CodeBlock
          code={`server.registerTool(
  "get_user_tasks",
  {
    description: "Get tasks for a user",
    inputSchema: z.object({
      userId: z.string(),
    }),
  },
  async ({ userId }) => {
    const response = await fetch(
      \`http://localhost:3000/api/tasks/\${userId}\`
    );

    if (!response.ok) {
      return {
        content: [
          {
            type: "text",
            text: "Unable to fetch user tasks",
          },
        ],
        isError: true,
      };
    }

    const tasks = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tasks),
        },
      ],
    };
  }
);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Here, the MCP Server calls an existing Express API instead of directly
          accessing the database.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Running the Server</h2>

        <CodeBlock language="bash" code={`npm start`} />

        <p className="leading-7 text-[#aaa]">
          For a stdio server, running the process starts the MCP communication
          endpoint. It is normally launched by an MCP Host or Client, which
          communicates through stdin and stdout.
        </p>

        <p className="text-sm leading-6 text-[#999]">
          Do not use console.log() for debugging in a stdio server. Standard
          output is reserved for MCP protocol messages. Use stderr for debug
          logs.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          8. Important Production Considerations
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Use a database instead of temporary in-memory storage.</li>
          <li>Authenticate users and authorize every sensitive operation.</li>
          <li>Validate all incoming tool arguments.</li>
          <li>Handle API errors and timeouts.</li>
          <li>Never expose API keys or database credentials.</li>
          <li>Use Streamable HTTP when deploying a remote server.</li>
          <li>Keep tool permissions limited to required operations.</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          9. Important Things to Remember
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            A Custom MCP Server connects your own application with AI Hosts.
          </li>
          <li>It can expose custom Tools, Resources, and Prompts.</li>
          <li>Tools execute application functionality.</li>
          <li>Resources provide contextual data.</li>
          <li>Prompts provide reusable templates.</li>
          <li>MCP Servers do not require their own LLM.</li>
          <li>Existing APIs and databases can be reused.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is a Custom MCP Server?",
            "A developer-built MCP Server that exposes custom application functionality and data to MCP-compatible AI applications.",
          ],
          [
            "2. Why do we build Custom MCP Servers?",
            "To connect our own APIs, databases, and business logic with AI applications through a standardized protocol.",
          ],
          [
            "3. Can an MCP Server connect to MongoDB?",
            "Yes. It can use MongoDB directly or call an existing backend API.",
          ],
          [
            "4. Does an MCP Server need an LLM?",
            "No. The Host manages the LLM, while the Server exposes capabilities.",
          ],
          [
            "5. Which transport can a Custom MCP Server use?",
            "stdio for local process-based communication and Streamable HTTP for remote communication.",
          ],
          [
            "6. Can we expose existing Express APIs through MCP?",
            "Yes. MCP tools can call existing Express endpoints and return their results.",
          ],
          [
            "7. Is in-memory storage suitable for production?",
            "Usually not. It is temporary and data is lost when the process restarts. Use persistent storage such as MongoDB.",
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

export default CustomMCPServer;

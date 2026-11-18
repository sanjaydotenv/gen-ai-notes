import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatisMCP = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          MCP / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          What is Model Context Protocol (MCP)?
        </h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Model Context Protocol (MCP) is an open standard that allows AI
          applications to connect with external tools, data sources, and
          services through a common communication protocol.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Why Do We Need MCP?</h2>
        <p className="leading-7 text-[#aaa]">
          An LLM can generate responses, but it does not automatically have
          access to your local files, databases, GitHub repositories, or
          external APIs.
        </p>
        <p className="leading-7 text-[#aaa]">
          Developers traditionally build separate integrations to connect AI
          applications with these services. Maintaining many different
          integrations becomes difficult.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Without MCP</h3>
          <CodeBlock
            code={`AI Application
    |
    +---- Custom GitHub Integration
    |
    +---- Custom Database Integration
    |
    +---- Custom File Integration
    |
    +---- Custom API Integration`}
          />
          <p className="text-sm text-[#aaa]">
            Every application may need its own integration code.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">With MCP</h3>
          <CodeBlock
            code={`       AI Application
              |
          MCP Client
              |
          MCP Protocol
              |
       +------+------+------+
       |      |      |      |
     GitHub  DB    Files   APIs
     Server Server Server Server`}
          />
          <p className="text-sm text-[#aaa]">
            Compatible applications can connect to compatible MCP servers using
            the same standardized protocol.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. What Exactly is MCP?</h2>
        <p className="leading-7 text-[#aaa]">
          MCP is a communication protocol. It defines how an AI application
          discovers and communicates with external capabilities.
        </p>

        <div className="rounded-xl border border-[#FC6C26]/30 bg-[#FC6C26]/[0.05] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Analogy: USB-C</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            USB-C provides a standard connection between compatible devices.
            Similarly, MCP provides a standard connection between AI
            applications and external services.
          </p>
        </div>

        <p className="leading-7 text-[#aaa]">
          MCP does not provide the AI model itself. It provides a standard way
          for an AI application to access external capabilities.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. What Can MCP Provide?</h2>
        <p className="text-[#aaa]">
          MCP servers can expose three important capabilities:
        </p>

        <div className="space-y-3">
          {[
            [
              "Tools",
              "Allow AI applications to call functions and perform actions, such as creating files or querying APIs.",
            ],
            [
              "Resources",
              "Provide contextual data, such as files, documents, and database information.",
            ],
            [
              "Prompts",
              "Provide reusable prompt templates that help users perform specific tasks.",
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

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Practical Example</h2>
        <p className="leading-7 text-[#aaa]">
          Imagine you are building an AI coding assistant that needs to access
          your GitHub repositories.
        </p>

        <CodeBlock
          code={`User:
"Show my GitHub repositories."

       |
       v

AI Application:
Understands the request.

       |
       v

MCP Client:
Communicates with GitHub MCP Server.

       |
       v

GitHub MCP Server:
Uses GitHub API to fetch repositories.

       |
       v

MCP Client:
Receives repository information.

       |
       v

LLM:
Generates a readable response.

       |
       v

User:
Receives repository list.`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The MCP server handles communication with GitHub. The LLM uses the
          returned information to generate the response.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. MCP vs Traditional Tool Calling
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Traditional Tool Calling</th>
                <th className="p-3">MCP</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Custom integration code.</td>
                <td className="p-3">Standardized protocol.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Application-specific tools.</td>
                <td className="p-3">Reusable MCP servers.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Custom communication logic.</td>
                <td className="p-3">Standardized communication.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Integration maintained by application.</td>
                <td className="p-3">
                  Server can be reused by compatible clients.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          Important: MCP does not replace tool calling. It standardizes how
          external capabilities are exposed and accessed. An MCP client can make
          server tools available to an LLM as tool calls.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Where is MCP Used?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "AI Coding Agents",
              "Access project files, GitHub, and development tools.",
            ],
            [
              "Database Assistants",
              "Retrieve information from connected databases.",
            ],
            ["Research Agents", "Connect with external information sources."],
            [
              "Automation Agents",
              "Interact with APIs and business applications.",
            ],
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

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          7. Important Things to Remember
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>MCP stands for Model Context Protocol.</li>
          <li>It is an open standard for AI application integrations.</li>
          <li>It follows a client-server architecture.</li>
          <li>It supports Tools, Resources, and Prompts.</li>
          <li>
            It does not provide an LLM or automatically make an agent
            intelligent.
          </li>
          <li>
            Security and permissions must be handled carefully when connecting
            external systems.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is MCP?",
            "MCP is an open standard that allows AI applications to communicate with external tools, data sources, and services.",
          ],
          ["2. What does MCP stand for?", "Model Context Protocol."],
          [
            "3. Why do we use MCP?",
            "It standardizes integrations between AI applications and external systems, reducing the need for separate custom integrations.",
          ],
          [
            "4. What are the three main MCP capabilities?",
            "Tools, Resources, and Prompts.",
          ],
          [
            "5. Does MCP replace an LLM?",
            "No. MCP provides a communication standard. The AI application still uses an LLM separately.",
          ],
          [
            "6. Is MCP the same as traditional tool calling?",
            "No. Tool calling is a way for a model to request functions, while MCP standardizes how applications discover and communicate with external capabilities.",
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

export default WhatisMCP;

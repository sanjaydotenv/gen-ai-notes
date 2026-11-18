import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Agents = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 08
        </p>
        <h1 className="text-3xl font-bold mt-2">Agents in LangChain</h1>
        <p className="text-[#999] mt-3 leading-7">
          Agents are AI systems that use an LLM and tools to decide how to
          complete a task. They can select tools, execute them, observe results,
          and repeat the process until the task is completed.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is an Agent?</h2>

        <p className="text-[#aaa] leading-7">
          An Agent is an AI system that can make decisions about which tools to
          use and what steps to take based on the user's request.
        </p>

        <CodeBlock
          code={`User: "Find the weather in Bhopal and explain it"

              |
              v

             Agent
              |
       +------+------+
       |             |
       v             v
   Weather Tool   LLM Reasoning
       |
       v
   Weather Data
       |
       v
      Agent
       |
       v
   Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          Unlike a simple LLM call, an Agent can use external tools and adapt
          its next step based on their results.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. How does an Agent work?</h2>

        <p className="text-[#aaa] leading-7">
          An Agent generally follows a loop called the Agent Execution Loop.
        </p>

        <CodeBlock
          code={`1. Receive User Request
          |
          v
2. Send Request to LLM
          |
          v
3. Decide What to Do
          |
          v
4. Select a Tool
          |
          v
5. Execute Tool
          |
          v
6. Observe Tool Result
          |
          v
7. Send Result Back to LLM
          |
          v
   Task Completed?
       /       \\
     No         Yes
     |           |
     v           v
  Repeat     Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          The Agent repeats this process when another action is required. It
          stops when the model produces a final response or execution reaches a
          configured limit.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          3. Main Components of an Agent
        </h2>

        <div className="space-y-3">
          {[
            [
              "LLM / Model",
              "Understands the request and decides which action to take.",
            ],
            [
              "Tools",
              "Perform external operations such as API calls, calculations, or database queries.",
            ],
            ["Instructions", "Guide the Agent's behavior and define its role."],
            [
              "Agent Runtime",
              "Manages the model-tool loop and passes tool results back to the model.",
            ],
            [
              "State",
              "Stores information such as conversation messages during execution.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. Creating an Agent in LangChain
        </h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides createAgent() to build an Agent. We provide a
          model, tools, and optional system instructions.
        </p>

        <CodeBlock
          code={`import { createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Create a custom tool
const addTool = tool(
  ({ a, b }) => a + b,
  {
    name: "add_numbers",
    description: "Add two numbers.",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);

// Initialize LLM
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// Create Agent
const agent = createAgent({
  model,
  tools: [addTool],
  systemPrompt: "You are a helpful math assistant.",
});

// Run Agent
const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "What is 25 + 15?",
    },
  ],
});

console.log(result.messages.at(-1).content);`}
        />

        <p className="text-[#aaa] leading-7">
          The Agent can decide to call addTool, receive its result, and generate
          the final answer.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">Important Parameters</p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">model:</span> The LLM used by the
            Agent.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">tools:</span> Functions the Agent
            is allowed to use.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">systemPrompt:</span> Instructions
            that guide the Agent's behavior.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Agent vs Normal LLM</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="p-3">Normal LLM</th>
                <th className="p-3">Agent</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Generates responses.</td>
                <td className="p-3">Can perform actions using tools.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Usually follows one request-response flow.
                </td>
                <td className="p-3">Can execute multiple steps.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Does not automatically execute application tools.
                </td>
                <td className="p-3">
                  Manages tool execution through its runtime.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Limited to available context and capabilities.
                </td>
                <td className="p-3">
                  Can access external capabilities through tools.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Agent vs Chain</h2>

        <p className="text-[#aaa] leading-7">
          A Chain generally follows a predefined sequence of operations. An
          Agent can decide which action to take based on the current situation.
        </p>

        <CodeBlock
          code={`CHAIN (Fixed Flow)

Input -> Prompt -> LLM -> Output


AGENT (Dynamic Flow)

Input -> Agent -> Select Action
                    |
              Execute Tool
                    |
               Observe Result
                    |
              Decide Next Step
                    |
                Final Output`}
        />
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Important Agent Concepts</h2>

        <div className="space-y-3">
          {[
            [
              "ReAct Pattern",
              "Combines reasoning and actions. The Agent takes an action, observes its result, and decides what to do next.",
            ],
            [
              "Tool Selection",
              "The Agent chooses an appropriate tool based on the user's request.",
            ],
            [
              "Agent Loop",
              "Repeats model calls and tool execution until a stopping condition is reached.",
            ],
            [
              "State",
              "Keeps track of messages and other information during Agent execution.",
            ],
            [
              "Tool Limits",
              "Execution limits help prevent an Agent from running indefinitely.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          8. When should we use Agents?
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            [
              "AI Research Assistant",
              "Search multiple sources and summarize information.",
            ],
            [
              "Customer Support",
              "Look up orders and answer customer questions.",
            ],
            [
              "Database Assistant",
              "Fetch relevant records using approved tools.",
            ],
            [
              "Personal Assistant",
              "Manage tasks, emails, and schedules through tools.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is an AI Agent?",
            "An AI system that uses an LLM and tools to decide and perform actions to complete a task.",
          ],
          [
            "What is createAgent()?",
            "A LangChain function that creates an Agent with a model, tools, and optional instructions.",
          ],
          [
            "What is the Agent Execution Loop?",
            "A repeated process of model decision, tool execution, observation, and response.",
          ],
          [
            "What is the ReAct Pattern?",
            "A pattern that combines reasoning and actions in an iterative loop.",
          ],
          [
            "What is the difference between an Agent and a Chain?",
            "A Chain follows a predefined flow, while an Agent can dynamically choose its actions.",
          ],
          [
            "Can an Agent use multiple tools?",
            "Yes. It can use multiple tools sequentially or in parallel when supported and appropriate.",
          ],
          [
            "What is Agent State?",
            "Information maintained during execution, such as conversation messages and other state data.",
          ],
          [
            "Can an Agent run forever?",
            "It should not. Execution limits and stopping conditions help control the Agent loop.",
          ],
          [
            "Is every LLM application an Agent?",
            "No. An application becomes agentic when it can make decisions and take actions through an execution loop.",
          ],
        ].map(([q, a], i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4"
          >
            <p className="font-semibold">
              <span className="text-[#FC6C26]">Q{i + 1}.</span> {q}
            </p>
            <p className="text-sm text-green-400 mt-2 leading-6">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Agents;

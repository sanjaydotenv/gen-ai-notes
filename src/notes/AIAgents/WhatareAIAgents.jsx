import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatareAIAgents = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">What are AI Agents?</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          An AI Agent is a system that uses an AI model to understand a goal,
          decide what to do, use tools when needed, and work toward completing
          the task.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What is an AI Agent?</h2>
        <p className="leading-7 text-[#aaa]">
          A normal LLM mainly generates responses from the input it receives. An
          AI Agent can go further: it can decide the next action, call tools,
          observe their results, and continue until the task is completed.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Example</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            User: "Find the weather in Bhopal and tell me whether I should carry
            an umbrella."
          </p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">An AI Agent can:</p>
          <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-[#aaa]">
            <li>Understand the user's request.</li>
            <li>Choose a weather tool.</li>
            <li>Call the tool with Bhopal as the location.</li>
            <li>Read the weather result.</li>
            <li>Generate a final recommendation.</li>
          </ol>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. LLM vs AI Agent</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">LLM</th>
                <th className="p-3">AI Agent</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Generates responses.</td>
                <td className="p-3">Works toward a goal.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually responds to input.</td>
                <td className="p-3">Can decide the next action.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Does not execute tools by itself.</td>
                <td className="p-3">
                  Can use tools through an execution system.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">May provide instructions.</td>
                <td className="p-3">Can perform actions using tools.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#999]">
          Important: An AI Agent commonly uses an LLM as its reasoning engine.
          The LLM alone is not necessarily an agent.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Main Components</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["LLM", "Understands input and decides what action may be needed."],
            ["Tools", "Allow the agent to interact with external systems."],
            ["State", "Stores relevant information about the current task."],
            [
              "Execution Loop",
              "Repeats decisions and actions until completion.",
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
        <h2 className="text-xl font-semibold">4. How Does an AI Agent Work?</h2>
        <p className="text-[#aaa]">
          An agent follows a repeated process of deciding, acting, and observing
          results.
        </p>
        <CodeBlock
          code={`User Goal
    |
    v
Understand the Task
    |
    v
LLM Decides Next Action
    |
    v
Need a Tool?
   / \\
 Yes  No
  |    |
  v    v
Execute  Final
Tool     Response
  |
  v
Observe Tool Result
  |
  v
Decide Again`}
        />
        <p className="text-sm text-[#999]">
          The loop continues when more actions are required. It stops when the
          agent produces a final response or reaches an execution limit.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. AI Agent vs Fixed Workflow</h2>
        <p className="leading-7 text-[#aaa]">
          A fixed workflow follows predefined steps. An AI Agent can choose
          different next actions depending on the user's request and tool
          results.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Fixed Workflow</h3>
            <p className="mt-2 text-sm text-[#aaa]">Step 1 → Step 2 → Step 3</p>
            <p className="mt-2 text-xs text-[#888]">
              The execution path is predefined.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">AI Agent</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Decide → Act → Observe → Decide
            </p>
            <p className="mt-2 text-xs text-[#888]">
              The next action can depend on the current result.
            </p>
          </div>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Where Are AI Agents Used?</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Customer support agents that look up order information.</li>
          <li>Coding agents that inspect files and run commands.</li>
          <li>Research agents that search and summarize information.</li>
          <li>Personal assistants that interact with calendars and emails.</li>
          <li>Business agents that automate repetitive tasks.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is an AI Agent?",
            "An AI Agent is an AI-powered system that can understand a goal, decide actions, use tools, and work toward completing a task.",
          ],
          [
            "2. What is the difference between an LLM and an AI Agent?",
            "An LLM generates responses, while an AI Agent uses an LLM along with tools and an execution process to perform tasks.",
          ],
          [
            "3. Can an AI Agent work without tools?",
            "Yes. It can reason and respond without tools, but tools allow it to interact with external systems and perform additional actions.",
          ],
          [
            "4. What is the execution loop?",
            "It is the repeated process of deciding an action, executing it, observing the result, and deciding what to do next.",
          ],
          [
            "5. Is every LLM application an AI Agent?",
            "No. A simple application that sends a prompt to an LLM and returns its response is not necessarily an AI Agent.",
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

export default WhatareAIAgents;

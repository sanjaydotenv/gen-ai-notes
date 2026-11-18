import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MultiAgentFundamentals = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 07
        </p>
        <h1 className="mt-2 text-3xl font-bold">Multi-Agent Fundamentals</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          A Multi-Agent System is a system where multiple AI Agents work
          together, each handling specific responsibilities to complete a larger
          task.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. What is a Multi-Agent System?
        </h2>
        <p className="leading-7 text-[#aaa]">
          A single agent may handle an entire task. But for complex tasks, we
          can divide the work among multiple specialized agents.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">
            Example: Research System
          </p>
          <p className="mt-2 text-sm text-[#aaa]">
            User: "Research AI trends and prepare a report."
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[#aaa]">
            <li>Research Agent — Collects information.</li>
            <li>Analysis Agent — Analyzes the collected information.</li>
            <li>Writing Agent — Prepares the final report.</li>
          </ul>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. Single Agent vs Multi-Agent
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Single Agent</h3>
            <CodeBlock
              code={`User
  |
  v
Agent
  |
  v
Tools
  |
  v
Result`}
            />
            <p className="text-sm leading-6 text-[#aaa]">
              One agent handles the complete task using its available tools.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Multi-Agent</h3>
            <CodeBlock
              code={`       User
         |
         v
   Coordinator
    /   |   \\
   v    v    v
 Agent Agent Agent
   \\    |    /
        v
      Result`}
            />
            <p className="text-sm leading-6 text-[#aaa]">
              Multiple agents handle different parts of a task and coordinate
              their results.
            </p>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Main Components</h2>
        <div className="space-y-3">
          {[
            [
              "Coordinator Agent",
              "Divides the task and assigns work to other agents.",
            ],
            [
              "Specialized Agents",
              "Handle specific responsibilities such as research, coding, or analysis.",
            ],
            [
              "Communication",
              "Allows agents to exchange messages and results.",
            ],
            [
              "Shared State",
              "Stores information that multiple agents may need.",
            ],
            ["Final Aggregator", "Combines the results into a final response."],
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

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. Common Multi-Agent Patterns
        </h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              A. Supervisor Pattern
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              A supervisor agent decides which specialized agent should handle
              each task and manages the overall workflow.
            </p>
            <CodeBlock
              code={`       Supervisor
        /      \\
       v        v
  Research    Coding
    Agent      Agent
       \\        /
        v      v
       Supervisor`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              B. Sequential Pattern
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Agents work one after another. Each agent receives the previous
              agent's output.
            </p>
            <CodeBlock
              code={`Research Agent
      |
      v
Analysis Agent
      |
      v
Writing Agent
      |
      v
 Final Result`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              C. Parallel Pattern
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Multiple agents work on independent tasks simultaneously. Their
              results are combined afterward.
            </p>
            <CodeBlock
              code={`          Task
            |
      +-----+-----+
      |     |     |
      v     v     v
    Agent Agent Agent
      |     |     |
      +-----+-----+
            |
            v
       Combined Result`}
            />
          </div>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Practical Example</h2>
        <p className="leading-7 text-[#aaa]">
          Imagine building an AI system that generates a technical research
          report.
        </p>
        <CodeBlock
          code={`User Request:
"Prepare a report about Node.js performance."

1. Coordinator Agent
   |
   +--> Research Agent
   |      Collects useful information.
   |
   +--> Analysis Agent
   |      Analyzes performance techniques.
   |
   +--> Writing Agent
          Creates the report.

2. Coordinator receives agent outputs.

3. Final Report is returned to the user.`}
        />
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Multi-Agent Systems in LangGraph
        </h2>
        <p className="leading-7 text-[#aaa]">
          LangGraph can build multi-agent systems using separate nodes or
          subgraphs for specialized agents. Edges define how work moves between
          them.
        </p>
        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";

const State = Annotation.Root({
  task: Annotation(),
  research: Annotation(),
  analysis: Annotation(),
  report: Annotation(),
});

// Specialized nodes
const researchAgent = async (state) => ({
  research: "Collected research about " + state.task,
});

const analysisAgent = async (state) => ({
  analysis: "Analyzed: " + state.research,
});

const writingAgent = async (state) => ({
  report: "Final report: " + state.analysis,
});

// Build workflow
const graph = new StateGraph(State)
  .addNode("research", researchAgent)
  .addNode("analysis", analysisAgent)
  .addNode("writing", writingAgent)
  .addEdge(START, "research")
  .addEdge("research", "analysis")
  .addEdge("analysis", "writing")
  .addEdge("writing", END)
  .compile();

const result = await graph.invoke({
  task: "Node.js performance",
});

console.log(result.report);`}
        />
        <p className="text-sm leading-6 text-[#999]">
          This is a simplified multi-agent-style workflow using separate
          specialized nodes. These nodes are not autonomous LLM agents yet. To
          make them actual AI agents, connect each node to its own LLM and
          tools.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          7. When Should You Use Multi-Agent?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-green-400">Use Multi-Agent</h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-[#aaa]">
              <li>Tasks have clearly separate responsibilities.</li>
              <li>Independent tasks can run in parallel.</li>
              <li>Different agents need specialized tools.</li>
              <li>Workflows need separate agent roles.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Avoid Unnecessary Agents
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-[#aaa]">
              <li>Task is simple and straightforward.</li>
              <li>One agent can handle everything.</li>
              <li>Extra coordination adds no value.</li>
              <li>Latency and cost must stay low.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is a Multi-Agent System?",
            "It is a system where multiple AI agents collaborate to complete a larger task.",
          ],
          [
            "2. What is the difference between Single-Agent and Multi-Agent?",
            "A single-agent system uses one agent, while a multi-agent system divides work among multiple agents.",
          ],
          [
            "3. What is the Supervisor Pattern?",
            "A supervisor coordinates multiple agents and decides which agent should handle each task.",
          ],
          [
            "4. What is the Parallel Agent Pattern?",
            "Multiple agents execute independent tasks simultaneously, and their results are combined.",
          ],
          [
            "5. Does every complex task need multiple agents?",
            "No. Multi-agent systems add coordination overhead, so a single agent is often better for simpler tasks.",
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

export default MultiAgentFundamentals;

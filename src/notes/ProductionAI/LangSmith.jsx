import React from "react";
import CodeBlock from "../../components/CodeBlock";

const LangSmith = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          PRODUCTION AI / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">LangSmith</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          LangSmith is an AI development platform used to trace, debug,
          evaluate, and monitor LLM applications and AI agents.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Why LangSmith?</h2>

        <p className="leading-7 text-[#aaa]">
          AI applications often contain multiple steps, such as LLM calls,
          retrievers, tools, and agents. When something goes wrong, finding the
          exact problem can be difficult.
        </p>

        <CodeBlock
          code={`User Question
      |
      v
   AI Agent
      |
      +---- LLM Call
      |
      +---- Tool Call
      |
      +---- Database Retrieval
      |
      v
   Final Response

Problem: Which step failed?

LangSmith helps inspect every step.`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Instead of debugging only the final response, we can inspect the
          complete execution history.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Main Features</h2>

        {[
          {
            title: "Tracing",
            desc: "Records individual operations performed by an AI application, including LLM calls, tools, and retrieval steps.",
          },
          {
            title: "Debugging",
            desc: "Helps identify failed operations, incorrect outputs, and problems inside AI workflows.",
          },
          {
            title: "Evaluation",
            desc: "Measures response quality using datasets, evaluators, and experiments.",
          },
          {
            title: "Monitoring",
            desc: "Tracks production behavior, latency, errors, token usage, and other performance metrics.",
          },
          {
            title: "Datasets",
            desc: "Stores test examples containing inputs, expected outputs, and other evaluation data.",
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
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Important Concepts</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Project</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              A project groups traces from a particular application or
              environment.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Trace</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              A complete execution record of one application request, containing
              its individual operations.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Run</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              An individual operation inside a trace, such as an LLM call, tool
              execution, or retrieval step.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Thread</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Groups related traces belonging to a multi-turn conversation.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`Project: AI Chatbot
    |
    +---- Trace 1: First User Message
    |       |
    |       +---- Run: LLM Call
    |       +---- Run: Tool Call
    |       +---- Run: Final Response
    |
    +---- Trace 2: Second User Message
            |
            +---- Run: LLM Call
            +---- Run: Final Response

Thread: Groups related conversation traces`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Setup LangSmith</h2>

        <p className="leading-7 text-[#aaa]">
          Create an account on LangSmith, generate an API key, and configure the
          environment variables in your Node.js project.
        </p>

        <p className="text-sm font-medium text-[#FC6C26]">Install</p>

        <CodeBlock language="bash" code={`npm install @langchain/core`} />

        <p className="text-sm font-medium text-[#FC6C26]">.env</p>

        <CodeBlock
          code={`LANGSMITH_TRACING=true
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_PROJECT=my-ai-project`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          LangChain and LangGraph applications can automatically send traces to
          LangSmith when tracing is enabled and the required configuration is
          available.
        </p>

        <p className="text-sm text-[#999]">
          Keep your API key on the backend. Never expose it in frontend code or
          commit your .env file to Git.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Trace a LangGraph Application
        </h2>

        <p className="leading-7 text-[#aaa]">
          Once tracing is configured, you can run your existing LangGraph
          application and inspect its execution in LangSmith.
        </p>

        <CodeBlock
          code={`// Existing compiled LangGraph application

const result = await graph.invoke({
  messages: [
    {
      role: "user",
      content: "What is LangGraph?",
    },
  ],
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          With LangSmith tracing enabled, supported LangGraph operations are
          recorded automatically. You can inspect nodes, model calls, execution
          time, and errors in the dashboard.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Evaluation with LangSmith</h2>

        <p className="leading-7 text-[#aaa]">
          LangSmith allows us to test AI applications using datasets and
          evaluators.
        </p>

        <CodeBlock
          code={`Create Dataset
      |
      v
Add Test Examples
      |
      v
Run AI Application
      |
      v
Evaluate Generated Outputs
      |
      v
Compare Experiments
      |
      v
Improve Application`}
        />

        <p className="text-sm font-medium text-[#FC6C26]">Important Terms</p>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            <span className="text-[#E3E3E3]">Dataset:</span> Collection of test
            examples.
          </li>
          <li>
            <span className="text-[#E3E3E3]">Evaluator:</span> Checks the
            quality of generated outputs.
          </li>
          <li>
            <span className="text-[#E3E3E3]">Experiment:</span> Runs an
            application against a dataset to measure performance.
          </li>
        </ul>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Production Monitoring</h2>

        <p className="leading-7 text-[#aaa]">
          After deployment, LangSmith helps monitor real application behavior
          and identify problems.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["Latency", "Response time"],
            ["Errors", "Failed operations"],
            ["Token Usage", "Input and output tokens"],
            ["Cost", "Model usage cost"],
            ["Feedback", "User response quality"],
            ["Traces", "Execution history"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-3"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-xs text-[#aaa]">{desc}</p>
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
          <li>LangSmith is used for AI observability and evaluation.</li>
          <li>Tracing records application execution.</li>
          <li>A trace contains individual runs.</li>
          <li>Projects organize application traces.</li>
          <li>Threads group related conversation traces.</li>
          <li>Datasets and evaluators help test AI quality.</li>
          <li>LangSmith supports frameworks beyond LangChain and LangGraph.</li>
          <li>
            Protect sensitive data before sending traces to external services.
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
            "1. What is LangSmith?",
            "LangSmith is a platform for tracing, debugging, evaluating, and monitoring LLM applications and AI agents.",
          ],
          [
            "2. What is Tracing?",
            "Tracing records the execution steps of an AI application, including model calls, tool calls, and retrieval operations.",
          ],
          [
            "3. What is the difference between Trace and Run?",
            "A trace represents a complete execution, while a run represents an individual operation inside that execution.",
          ],
          [
            "4. What is a LangSmith Project?",
            "A project groups traces belonging to an application or environment.",
          ],
          [
            "5. How does LangSmith help debug AI applications?",
            "It shows execution steps, inputs, outputs, errors, latency, and other details of application runs.",
          ],
          [
            "6. Can LangSmith work without LangChain?",
            "Yes. It is framework-agnostic and supports custom applications and other AI frameworks.",
          ],
          [
            "7. What is the difference between Offline and Online Evaluation?",
            "Offline evaluation tests an application using a prepared dataset, while online evaluation scores real production interactions.",
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

export default LangSmith;

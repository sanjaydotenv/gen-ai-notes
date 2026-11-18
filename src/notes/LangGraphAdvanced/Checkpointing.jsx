import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Checkpointing = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 03
        </p>
        <h1 className="text-3xl font-bold mt-2">Checkpointing in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Checkpointing allows LangGraph to save snapshots of graph state during
          execution so workflows can recover, resume and maintain conversation
          context.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is Checkpointing?</h2>

        <p className="text-[#aaa] leading-7">
          A checkpoint is a snapshot of the graph state at a particular
          execution step.
        </p>

        <p className="text-[#aaa] leading-7">
          When a checkpointer is attached to a graph, LangGraph automatically
          saves checkpoints after graph super-steps.
        </p>

        <CodeBlock
          code={`Graph Execution
       |
       v
    Node A
       |
       v
  Checkpoint 1
       |
       v
    Node B
       |
       v
  Checkpoint 2
       |
       v
    Node C
       |
       v
  Checkpoint 3`}
        />

        <p className="text-[#aaa] leading-7">
          If execution gets interrupted, saved checkpoints can help the graph
          recover its previous state.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why Checkpointing?</h2>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            [
              "State Recovery",
              "Recover graph state after an interruption or failure.",
            ],
            [
              "Conversation History",
              "Maintain state across multiple interactions in a thread.",
            ],
            [
              "Resume Execution",
              "Continue unfinished workflows from saved checkpoints.",
            ],
            [
              "Human Approval",
              "Pause workflows and continue after human input.",
            ],
            [
              "Time Travel",
              "Inspect previous states and replay execution from a checkpoint.",
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

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Checkpointer</h2>

        <p className="text-[#aaa] leading-7">
          A Checkpointer is the component responsible for saving and loading
          graph checkpoints.
        </p>

        <p className="text-[#aaa] leading-7">
          LangGraph provides different checkpointer implementations:
        </p>

        <div className="space-y-3">
          {[
            [
              "MemorySaver",
              "Stores checkpoints in memory. Useful for learning and testing.",
            ],
            [
              "SQLite Checkpointer",
              "Stores checkpoints in a local SQLite database.",
            ],
            [
              "PostgreSQL Checkpointer",
              "Stores checkpoints in PostgreSQL for persistent applications.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#999]">
          MemorySaver is temporary. Its checkpoints are lost when the process
          restarts. Use a database-backed checkpointer when data must survive
          application restarts.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Enable Checkpointing</h2>

        <p className="text-[#aaa] leading-7">
          To enable checkpointing, create a checkpointer and pass it to
          compile().
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";

// Create Checkpointer
const checkpointer = new MemorySaver();

// Compile Graph
const graph = new StateGraph(GraphState)
  // Add nodes and edges
  .compile({
    checkpointer,
  });`}
        />

        <p className="text-[#aaa] leading-7">
          Now LangGraph automatically saves graph state during execution.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. What is thread_id?</h2>

        <p className="text-[#aaa] leading-7">
          A thread_id identifies a conversation or workflow session. LangGraph
          uses it to group and retrieve checkpoints belonging to that thread.
        </p>

        <CodeBlock
          code={`const config = {
  configurable: {
    thread_id: "user-101",
  },
};

const result = await graph.invoke(
  input,
  config
);`}
        />

        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-[#FC6C26]">Example</h3>
          <CodeBlock
            code={`Thread: user-101
  |
  |-- Checkpoint 1
  |-- Checkpoint 2
  |-- Checkpoint 3

Thread: user-202
  |
  |-- Checkpoint 1
  |-- Checkpoint 2`}
          />
          <p className="text-sm text-[#aaa]">
            Different thread IDs keep different workflow states separate.
          </p>
        </div>

        <p className="text-sm text-[#999]">
          A thread_id must be provided when invoking a graph with a
          checkpointer.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a graph that remembers its counter value across multiple
          executions using the same thread_id.
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph";

// 1. Define State
const GraphState = Annotation.Root({
  count: Annotation({
    default: () => 0,
    reducer: (_, update) => update,
  }),
});

// 2. Create Node
const incrementNode = (state) => {
  return {
    count: state.count + 1,
  };
};

// 3. Create Checkpointer
const checkpointer = new MemorySaver();

// 4. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("increment", incrementNode)
  .addEdge(START, "increment")
  .addEdge("increment", END)
  .compile({
    checkpointer,
  });

// 5. Same Thread
const config = {
  configurable: {
    thread_id: "counter-101",
  },
};

// First Execution
const result1 = await graph.invoke({}, config);

console.log(result1.count);
// Output: 1

// Second Execution
const result2 = await graph.invoke({}, config);

console.log(result2.count);
// Output: 2

// Third Execution
const result3 = await graph.invoke({}, config);

console.log(result3.count);
// Output: 3`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-[#FC6C26]">How does it work?</h3>
          <CodeBlock
            code={`First Invoke
count = 0 -> 1
       |
       v
Checkpoint Saved

Second Invoke (Same Thread)
count = 1 -> 2
       |
       v
Checkpoint Saved

Third Invoke (Same Thread)
count = 2 -> 3
       |
       v
Checkpoint Saved`}
          />
          <p className="text-sm text-[#aaa]">
            Each new invocation loads the saved state for the same thread before
            executing the graph again.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Inspect Saved State</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides getState() to inspect the latest saved state
          associated with a thread.
        </p>

        <CodeBlock
          code={`const state = await graph.getState(config);

console.log(state.values);

// Output:
// { count: 3 }`}
        />

        <p className="text-[#aaa] leading-7">
          You can also inspect previous checkpoints using getStateHistory().
        </p>

        <CodeBlock
          code={`const history = graph.getStateHistory(config);

for await (const snapshot of history) {
  console.log(snapshot.values);
}`}
        />
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          [
            "Checkpoint",
            "A snapshot of graph state at a particular execution step.",
          ],
          ["Checkpointer", "Saves and loads graph checkpoints."],
          [
            "Super-step",
            "A graph execution stage after which a checkpoint is saved.",
          ],
          [
            "thread_id",
            "Identifies the workflow session whose checkpoints should be loaded or saved.",
          ],
          [
            "MemorySaver",
            "An in-memory checkpointer that does not survive process restarts.",
          ],
          [
            "Recovery",
            "Saved checkpoints can help resume unfinished workflows.",
          ],
          [
            "State History",
            "Previous checkpoints can be inspected and replayed.",
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
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is Checkpointing?",
            "Saving snapshots of graph state during execution.",
          ],
          [
            "What is a Checkpoint?",
            "A snapshot of graph state at a particular execution step.",
          ],
          [
            "What is a Checkpointer?",
            "A component responsible for saving and loading checkpoints.",
          ],
          [
            "What is MemorySaver?",
            "An in-memory checkpointer used for development and testing.",
          ],
          [
            "What is thread_id?",
            "A unique identifier used to group checkpoints belonging to a workflow session.",
          ],
          [
            "How do we enable checkpointing?",
            "Create a checkpointer and pass it to graph.compile({ checkpointer }).",
          ],
          [
            "Does MemorySaver survive application restarts?",
            "No. Its data is stored in memory and is lost when the process restarts.",
          ],
          [
            "How can we inspect saved state?",
            "Use graph.getState(config) and graph.getStateHistory(config).",
          ],
          [
            "When are checkpoints saved?",
            "LangGraph saves checkpoints after graph super-steps when a checkpointer is configured.",
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

export default Checkpointing;

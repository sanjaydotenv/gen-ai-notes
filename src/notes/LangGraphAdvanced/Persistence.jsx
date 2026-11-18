import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Persistence = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 04
        </p>
        <h1 className="text-3xl font-bold mt-2">Persistence in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Persistence allows LangGraph applications to store graph state and
          useful information so it remains available across executions,
          conversations and application restarts.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is Persistence?</h2>

        <p className="text-[#aaa] leading-7">
          Normally, application data stored only in RAM disappears when the
          application stops.
        </p>

        <p className="text-[#aaa] leading-7">
          Persistence solves this problem by storing data in a storage system
          such as SQLite, PostgreSQL or MongoDB.
        </p>

        <CodeBlock
          code={`Without Persistence:

Application
    |
    v
   RAM
    |
    v
Application Stops
    |
    v
Data Lost


With Persistence:

Application
    |
    v
Database
    |
    v
Application Stops
    |
    v
Data Still Available`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          2. Persistence vs Checkpointing
        </h2>

        <p className="text-[#aaa] leading-7">
          Checkpointing is one mechanism used by LangGraph's persistence system.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Checkpointing</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Creates snapshots of graph state during execution.
            </p>
            <CodeBlock
              code={`Graph State
    |
    v
Checkpoint
    |
    v
Saved Snapshot`}
            />
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Persistence</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Stores and retrieves useful data beyond a single execution.
            </p>
            <CodeBlock
              code={`Checkpoint
    |
    v
Database
    |
    v
Future Recovery`}
            />
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Persistence in LangGraph</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides two important persistence mechanisms:
        </p>

        <div className="space-y-3">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">1. Checkpointer</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Stores graph state snapshots associated with a thread. It is
              useful for conversation continuity, recovery and human-in-the-loop
              workflows.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">2. Store</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Stores application-defined information across different threads.
              It is useful for long-term user preferences and facts.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`             Persistence
                  |
          +-------+-------+
          |               |
          v               v
      Checkpointer       Store
          |               |
          v               v
      Thread State    Cross-Thread
      (Short-Term)    Data (Long-Term)`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Database Checkpointers</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph supports different storage backends through separate
          checkpointer packages.
        </p>

        <div className="space-y-3">
          {[
            [
              "MemorySaver",
              "Stores checkpoints in RAM. Data disappears after the process stops.",
            ],
            [
              "SQLite",
              "Stores checkpoints in a local database file. Useful for local applications.",
            ],
            [
              "PostgreSQL",
              "Stores checkpoints in a relational database. Suitable for production applications.",
            ],
            [
              "MongoDB",
              "Stores checkpoints in MongoDB. Useful when working with MongoDB-based applications.",
            ],
            ["Redis", "Provides Redis-backed checkpoint storage."],
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

        <p className="text-sm text-[#999]">
          Database checkpointers require their respective integration packages.
          MemorySaver is included with LangGraph.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Using PostgreSQL Persistence
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's see how to store graph checkpoints in PostgreSQL instead of
          keeping them only in RAM.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          Step 1: Install Package
        </h3>

        <CodeBlock
          code={`npm install @langchain/langgraph-checkpoint-postgres`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 2: Create Checkpointer
        </h3>

        <CodeBlock
          code={`import {
  PostgresSaver,
} from "@langchain/langgraph-checkpoint-postgres";

const checkpointer = PostgresSaver.fromConnString(
  process.env.DATABASE_URL
);

// Create required database tables
await checkpointer.setup();`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 3: Attach to Graph
        </h3>

        <CodeBlock
          code={`const graph = new StateGraph(GraphState)
  .addNode("process", processNode)
  .addEdge(START, "process")
  .addEdge("process", END)
  .compile({
    checkpointer,
  });`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 4: Execute Graph</h3>

        <CodeBlock
          code={`const config = {
  configurable: {
    thread_id: "user-101",
  },
};

const result = await graph.invoke(
  { message: "Hello LangGraph" },
  config
);`}
        />

        <p className="text-sm text-[#999]">
          Now graph checkpoints are stored in PostgreSQL and can be retrieved
          using the same thread_id.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Long-Term Persistence Using Store
        </h2>

        <p className="text-[#aaa] leading-7">
          A checkpointer stores state within a thread. But what if we want
          information to remain available across different conversations?
        </p>

        <p className="text-[#aaa] leading-7">
          For this, LangGraph provides Store.
        </p>

        <CodeBlock
          code={`import {
  InMemoryStore,
} from "@langchain/langgraph";

// Create Store
const store = new InMemoryStore();

// Save user information
await store.put(
  ["users", "user-101"],
  "preferences",
  {
    language: "Hindi",
    framework: "React",
  }
);

// Retrieve information
const result = await store.get(
  ["users", "user-101"],
  "preferences"
);

console.log(result.value);

// Output:
// {
//   language: "Hindi",
//   framework: "React"
// }`}
        />

        <p className="text-sm text-[#999]">
          InMemoryStore is useful for learning, but it does not survive
          application restarts. Use a persistent Store implementation for
          production.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Checkpointer vs Store</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white/[0.05] text-left">
                <th className="p-3 border border-white/10">Feature</th>
                <th className="p-3 border border-white/10">Checkpointer</th>
                <th className="p-3 border border-white/10">Store</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["Purpose", "Graph state", "Application data"],
                ["Scope", "Single thread", "Across threads"],
                ["Memory", "Short-term", "Long-term"],
                ["Stores", "State snapshots", "Custom key-value data"],
                ["Example", "Conversation history", "User preferences"],
              ].map(([feature, checkpoint, store]) => (
                <tr key={feature}>
                  <td className="p-3 border border-white/10 text-[#E3E3E3]">
                    {feature}
                  </td>
                  <td className="p-3 border border-white/10">{checkpoint}</td>
                  <td className="p-3 border border-white/10">{store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          [
            "Persistence",
            "Keeps useful application data available beyond a single execution.",
          ],
          [
            "Checkpointer",
            "Persists graph state snapshots for individual threads.",
          ],
          ["Store", "Persists custom information across different threads."],
          [
            "Database",
            "SQLite, PostgreSQL, MongoDB and Redis can be used through integrations.",
          ],
          [
            "MemorySaver",
            "Stores data in RAM and loses it after process restart.",
          ],
          [
            "Production",
            "Use database-backed persistence when data must survive restarts.",
          ],
          [
            "Both Together",
            "An application can use a checkpointer and a Store together.",
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
            "What is Persistence in LangGraph?",
            "It allows graph state and application data to remain available across executions.",
          ],
          [
            "What is the difference between Checkpointing and Persistence?",
            "Checkpointing creates graph state snapshots; persistence is the broader mechanism for storing and retrieving data.",
          ],
          [
            "What is a Checkpointer?",
            "A component that saves and loads graph state snapshots.",
          ],
          [
            "What is Store in LangGraph?",
            "A system for storing application-defined data across different threads.",
          ],
          [
            "Checkpointer vs Store?",
            "Checkpointer stores thread-specific graph state, while Store holds application data across threads.",
          ],
          [
            "Does MemorySaver provide permanent storage?",
            "No. It stores checkpoints in RAM.",
          ],
          [
            "Which databases can store checkpoints?",
            "SQLite, PostgreSQL, MongoDB and Redis through their respective integrations.",
          ],
          [
            "Can we use Checkpointer and Store together?",
            "Yes. They solve different persistence requirements and can be used together.",
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

export default Persistence;

import React from "react";
import CodeBlock from "../../components/CodeBlock";

const GraphExecution = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 08
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Graph Execution in LangGraph
        </h1>
        <p className="text-[#999] mt-3 leading-7">
          Graph Execution is the process of running a compiled graph. LangGraph
          executes nodes, follows edges, updates state and returns the final
          result.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Graph Execution Flow</h2>

        <p className="text-[#aaa] leading-7">
          A LangGraph workflow follows these steps:
        </p>

        <CodeBlock
          code={`Define State
     |
     v
 Create Nodes
     |
     v
 Connect Edges
     |
     v
  compile()
     |
     v
  invoke()
     |
     v
 Graph Executes
     |
     v
 Final Result`}
        />

        <p className="text-[#aaa] leading-7">
          First, we build the graph. Then we compile it and execute it by
          providing input.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. compile()</h2>

        <p className="text-[#aaa] leading-7">
          compile() converts the graph builder into a compiled graph that can be
          executed.
        </p>

        <CodeBlock
          code={`const graph = new StateGraph(GraphState)
  .addNode("process", processNode)
  .addEdge(START, "process")
  .addEdge("process", END)
  .compile();`}
        />

        <p className="text-[#aaa]">What happens during compilation?</p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-[#aaa]">
          <li>Prepares the graph for execution.</li>
          <li>Checks the graph structure for issues.</li>
          <li>
            Allows runtime features like checkpointers and breakpoints to be
            configured.
          </li>
        </ul>

        <p className="text-sm text-[#999]">
          Important: You must compile a StateGraph before invoking or streaming
          it.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. invoke()</h2>

        <p className="text-[#aaa] leading-7">
          invoke() starts graph execution and waits until the graph finishes. It
          returns the final state.
        </p>

        <CodeBlock
          code={`const result = await graph.invoke({
  message: "Hello",
});

console.log(result);`}
        />

        <p className="text-[#aaa] leading-7">
          Use invoke() when you need the final result instead of observing every
          intermediate step.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. stream()</h2>

        <p className="text-[#aaa] leading-7">
          stream() lets you observe graph execution as it happens. Instead of
          waiting only for the final result, you can receive intermediate
          updates.
        </p>

        <CodeBlock
          code={`const stream = await graph.stream(
  { message: "Hello" },
  { streamMode: "updates" }
);

for await (const chunk of stream) {
  console.log(chunk);
}`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Important Stream Modes</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white/[0.05] text-left">
                <th className="p-3 border border-white/10">Mode</th>
                <th className="p-3 border border-white/10">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["values", "Returns the full state after each step."],
                ["updates", "Returns only state updates from nodes."],
                ["messages", "Streams LLM message tokens and metadata."],
                ["debug", "Provides detailed execution information."],
                ["custom", "Streams custom data emitted by nodes."],
              ].map(([mode, desc]) => (
                <tr key={mode}>
                  <td className="p-3 border border-white/10 text-[#FC6C26]">
                    {mode}
                  </td>
                  <td className="p-3 border border-white/10">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's build and execute a small graph using compile() and invoke().
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";

// 1. Define State
const GraphState = Annotation.Root({
  message: Annotation(),
  result: Annotation(),
});

// 2. Create Nodes
const inputNode = (state) => {
  console.log("Input Node Executed");

  return {
    message: state.message,
  };
};

const processNode = (state) => {
  console.log("Process Node Executed");

  return {
    result: state.message.toUpperCase(),
  };
};

// 3. Build Graph
const builder = new StateGraph(GraphState)
  .addNode("input", inputNode)
  .addNode("process", processNode)
  .addEdge(START, "input")
  .addEdge("input", "process")
  .addEdge("process", END);

// 4. Compile Graph
const graph = builder.compile();

// 5. Execute Graph
const result = await graph.invoke({
  message: "hello langgraph",
  result: "",
});

console.log("Final Result:", result.result);

// Output:
// Input Node Executed
// Process Node Executed
// Final Result: HELLO LANGGRAPH`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold text-[#FC6C26] mb-3">Execution Flow</h3>
          <CodeBlock
            code={`invoke(input)
     |
     v
   START
     |
     v
 Input Node
     |
     v
Process Node
     |
     v
    END
     |
     v
Final State Returned`}
          />
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. How Graph Executes Internally
        </h2>

        <p className="text-[#aaa] leading-7">
          LangGraph executes workflows in units called super-steps.
        </p>

        <p className="text-[#aaa] leading-7">
          Nodes scheduled in the same super-step can run in parallel.
          Sequentially connected nodes generally execute in separate
          super-steps.
        </p>

        <CodeBlock
          code={`       START
          |
     Super-step 1
          |
       Node A
          |
     Super-step 2
       /     \\
   Node B   Node C
       \\     /
     Super-step 3
          |
       Node D
          |
         END`}
        />

        <p className="text-sm text-[#999]">
          The graph finishes when no more nodes have pending work.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. invoke() vs stream()</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">invoke()</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Waits for graph execution to finish and returns the final result.
            </p>
            <CodeBlock
              code={`const result =
  await graph.invoke(input);`}
            />
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">stream()</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Provides intermediate execution output while the graph runs.
            </p>
            <CodeBlock
              code={`const output =
  await graph.stream(input);`}
            />
          </div>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          ["compile()", "Prepares the graph for execution."],
          ["invoke()", "Executes the graph and returns its final result."],
          ["stream()", "Provides intermediate execution output."],
          [
            "Super-steps",
            "Groups nodes that execute during the same graph step.",
          ],
          [
            "State Updates",
            "Nodes return updates that LangGraph applies to shared state.",
          ],
          [
            "Execution",
            "The graph follows edges until its execution is complete.",
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
            "What is Graph Execution?",
            "The process of running a compiled graph using input and following its nodes and edges.",
          ],
          [
            "Why is compile() required?",
            "It prepares the graph for execution and produces a compiled graph.",
          ],
          [
            "What does invoke() return?",
            "The final graph state after execution completes.",
          ],
          [
            "What is stream() used for?",
            "To observe intermediate graph outputs while execution is running.",
          ],
          [
            "What are super-steps?",
            "Execution stages in which one or more active nodes can run.",
          ],
          [
            "Can nodes execute in parallel?",
            "Yes. Nodes scheduled in the same super-step can execute in parallel.",
          ],
          [
            "What is the difference between values and updates stream modes?",
            "values returns the full state after each step; updates returns only the changes made by nodes.",
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

export default GraphExecution;

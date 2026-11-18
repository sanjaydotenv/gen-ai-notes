import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Edges = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 05
        </p>
        <h1 className="text-3xl font-bold mt-2">Edges in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Edges define the connections between nodes. They control the execution
          flow by deciding which node runs next.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Edges?</h2>

        <p className="text-[#aaa] leading-7">
          An Edge is a connection between two nodes in a LangGraph workflow. It
          tells the graph where to move after a node finishes execution.
        </p>

        <CodeBlock
          code={`START
  |
  v
Node A
  |
  v
Node B
  |
  v
Node C
  |
  v
 END`}
        />

        <p className="text-[#aaa] leading-7">
          In this workflow, Node A executes first, then Node B, and finally Node
          C.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. addEdge()</h2>

        <p className="text-[#aaa] leading-7">
          We use addEdge() to connect two nodes.
        </p>

        <CodeBlock code={`graph.addEdge("nodeA", "nodeB");`} />

        <p className="text-[#aaa] leading-7">Syntax:</p>

        <CodeBlock code={`addEdge(sourceNode, destinationNode);`} />

        <ul className="list-disc pl-6 space-y-2 text-sm text-[#aaa]">
          <li>
            <span className="text-[#E3E3E3]">sourceNode:</span> Node that
            executes first.
          </li>
          <li>
            <span className="text-[#E3E3E3]">destinationNode:</span> Node that
            executes next.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Connecting Multiple Nodes</h2>

        <p className="text-[#aaa] leading-7">
          Multiple edges can create a complete execution flow.
        </p>

        <CodeBlock
          code={`graph
  .addEdge(START, "input")
  .addEdge("input", "process")
  .addEdge("process", "response")
  .addEdge("response", END);`}
        />

        <CodeBlock
          code={`START
  |
  v
Input Node
  |
  v
Process Node
  |
  v
Response Node
  |
  v
 END`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create three nodes and connect them using edges.
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
});

// 2. Create Nodes
const firstNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};

const secondNode = (state) => {
  return {
    message: state.message + " LangGraph",
  };
};

const thirdNode = (state) => {
  return {
    message: state.message + "!";
  };
};

// 3. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("first", firstNode)
  .addNode("second", secondNode)
  .addNode("third", thirdNode)

  // 4. Connect Nodes
  .addEdge(START, "first")
  .addEdge("first", "second")
  .addEdge("second", "third")
  .addEdge("third", END)

  .compile();

// 5. Execute
const result = await graph.invoke({
  message: "Welcome",
});

console.log(result.message);

// Output:
// Welcome Hello LangGraph!`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold text-[#FC6C26] mb-2">Execution Flow</h3>
          <CodeBlock
            code={`START
  |
  v
firstNode
  |
  v
secondNode
  |
  v
thirdNode
  |
  v
 END`}
          />
          <p className="text-sm text-[#aaa] mt-3">
            Each edge tells LangGraph which node should execute next.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Normal Edge vs Conditional Edge
        </h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides two important ways to control execution flow.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Normal Edge</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Always moves execution to a predefined destination node.
            </p>
            <CodeBlock
              code={`.addEdge(
  "input",
  "process"
)`}
            />
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Conditional Edge</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Selects the next node based on a routing function.
            </p>
            <CodeBlock
              code={`.addConditionalEdges(
  "check",
  routeFunction
)`}
            />
          </div>
        </div>

        <p className="text-sm text-[#999]">
          Conditional Edges are covered separately in the next topic.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Important Points</h2>

        <div className="space-y-3">
          {[
            [
              "Execution Flow",
              "Edges decide which node runs after another node.",
            ],
            [
              "START",
              "Special entry point used to connect the beginning of a graph to its first node.",
            ],
            [
              "END",
              "Special terminal point used to finish a graph execution path.",
            ],
            [
              "Multiple Connections",
              "A node can have multiple outgoing edges. This can schedule multiple destination nodes in the same super-step.",
            ],
            [
              "Cycles",
              "Edges can connect nodes in a loop, allowing workflows to repeat until a stopping condition is reached.",
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

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          7. Interview Questions & Answers
        </h2>

        {[
          [
            "What is an Edge in LangGraph?",
            "An Edge connects nodes and defines the graph's execution flow.",
          ],
          [
            "How do we create an Edge?",
            "Using addEdge(sourceNode, destinationNode).",
          ],
          [
            "What is the purpose of START?",
            "It represents the entry point of a graph.",
          ],
          [
            "What is the purpose of END?",
            "It represents the end of a graph execution path.",
          ],
          [
            "What is the difference between an Edge and a Node?",
            "A Node performs a task, while an Edge connects nodes and controls the execution flow.",
          ],
          [
            "Can a graph contain loops?",
            "Yes. Edges can create cycles between nodes.",
          ],
          [
            "Can a node have multiple outgoing edges?",
            "Yes. Multiple outgoing edges can schedule multiple nodes in the same super-step.",
          ],
          [
            "What is the difference between Normal and Conditional Edges?",
            "Normal edges use a predefined destination, while conditional edges select a destination using a routing function.",
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

export default Edges;

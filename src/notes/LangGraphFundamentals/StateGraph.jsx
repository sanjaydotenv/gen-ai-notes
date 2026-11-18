import React from "react";
import CodeBlock from "../../components/CodeBlock";

const StateGraph = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 02
        </p>
        <h1 className="text-3xl font-bold mt-2">StateGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          StateGraph is the main graph builder in LangGraph. It allows us to
          define a shared state, register nodes, connect them using edges, and
          compile a complete workflow.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is StateGraph?</h2>

        <p className="text-[#aaa] leading-7">
          StateGraph is a class provided by LangGraph that helps us build
          stateful workflows.
        </p>

        <p className="text-[#aaa] leading-7">
          We use it to define how different functions (nodes) work together and
          how data moves between them.
        </p>

        <CodeBlock
          code={`        StateGraph
             |
      +------+------+
      |      |      |
    State  Nodes  Edges
      |      |      |
      +------+------+
             |
             v
          Compile
             |
             v
        Compiled Graph
             |
             v
           Invoke`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Creating a StateGraph</h2>

        <p className="text-[#aaa] leading-7">
          First, we import StateGraph and Annotation from LangGraph.
          Annotation.Root defines the structure of the shared state.
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";

// Define graph state
const GraphState = Annotation.Root({
  message: Annotation<string>,
});

// Create StateGraph
const graphBuilder = new StateGraph(GraphState);`}
        />

        <p className="text-[#aaa] leading-7">
          Here, we created a state schema containing one property called
          message. StateGraph will use this schema to manage workflow data.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Adding Nodes</h2>

        <p className="text-[#aaa] leading-7">
          Nodes are functions that perform tasks. We register them inside
          StateGraph using addNode().
        </p>

        <CodeBlock
          code={`const firstNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};

const secondNode = (state) => {
  return {
    message: state.message + " LangGraph",
  };
};

// Register nodes
graphBuilder.addNode("first", firstNode);
graphBuilder.addNode("second", secondNode);`}
        />

        <p className="text-[#aaa] leading-7">
          Each node receives the current state and returns an object containing
          the state updates.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. Connecting Nodes with Edges
        </h2>

        <p className="text-[#aaa] leading-7">
          After registering nodes, we connect them using addEdge(). Edges define
          the execution order.
        </p>

        <CodeBlock
          code={`graphBuilder.addEdge(START, "first");
graphBuilder.addEdge("first", "second");
graphBuilder.addEdge("second", END);`}
        />

        <CodeBlock
          code={`       START
          |
          v
        first
          |
          v
        second
          |
          v
         END`}
        />

        <p className="text-[#aaa] leading-7">
          This creates a sequential workflow: first executes, then second, and
          finally the graph finishes.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Compiling the Graph</h2>

        <p className="text-[#aaa] leading-7">
          After defining the state, nodes, and edges, we call compile() to
          create an executable graph.
        </p>

        <CodeBlock code={`const graph = graphBuilder.compile();`} />

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            StateGraph is the builder used to construct a workflow. compile()
            creates the compiled graph that we can execute. You must compile the
            graph before invoking it.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Executing the Graph</h2>

        <p className="text-[#aaa] leading-7">
          We use invoke() to execute the compiled graph. The initial state is
          passed as input.
        </p>

        <CodeBlock
          code={`const result = await graph.invoke({
  message: "Welcome",
});

console.log(result);

// Output:
// {
//   message: "Welcome Hello LangGraph"
// }`}
        />

        <p className="text-[#aaa] leading-7">
          The graph passes the updated state from one node to the next until it
          reaches END.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          7. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's combine everything and create a simple two-node workflow.
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
  message: Annotation<string>,
});

// 2. Create Nodes
const greetNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};

const nameNode = (state) => {
  return {
    message: state.message + " LangGraph",
  };
};

// 3. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("greet", greetNode)
  .addNode("name", nameNode)

  // 4. Connect Nodes
  .addEdge(START, "greet")
  .addEdge("greet", "name")
  .addEdge("name", END)

  // 5. Compile
  .compile();

// 6. Execute
const result = await graph.invoke({
  message: "Welcome",
});

console.log(result.message);

// Output:
// Welcome Hello LangGraph`}
        />

        <CodeBlock
          code={`Execution Flow:

Input: "Welcome"
       |
       v
    greetNode
       |
       v
 "Welcome Hello"
       |
       v
    nameNode
       |
       v
"Welcome Hello LangGraph"
       |
       v
      END`}
        />
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Methods</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                [
                  "new StateGraph()",
                  "Creates a graph builder using a state schema.",
                ],
                ["addNode()", "Registers a function as a node."],
                ["addEdge()", "Connects nodes and defines execution order."],
                [
                  "addConditionalEdges()",
                  "Defines conditional routing between nodes.",
                ],
                ["compile()", "Creates an executable graph."],
                ["invoke()", "Executes the compiled graph with input state."],
              ].map(([method, purpose]) => (
                <tr key={method} className="border-t border-white/10">
                  <td className="p-3 text-[#FC6C26] font-mono">{method}</td>
                  <td className="p-3">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is StateGraph?",
            "The main graph builder in LangGraph used to create stateful workflows.",
          ],
          [
            "Why do we use StateGraph?",
            "To define state, register nodes, connect them, and build executable workflows.",
          ],
          [
            "How do we create a StateGraph?",
            "By passing a state schema to the StateGraph constructor.",
          ],
          [
            "What does addNode() do?",
            "It registers a function that performs a task in the graph.",
          ],
          [
            "What does addEdge() do?",
            "It connects nodes and defines which node executes next.",
          ],
          [
            "What does compile() do?",
            "It validates and prepares the graph for execution.",
          ],
          [
            "What is the difference between StateGraph and compiled graph?",
            "StateGraph is the builder; the compiled graph is the executable workflow.",
          ],
          [
            "How do we execute a compiled graph?",
            "By calling invoke() with the initial state.",
          ],
          [
            "Can a StateGraph contain multiple nodes?",
            "Yes. Multiple nodes can be connected to build complex workflows.",
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

export default StateGraph;

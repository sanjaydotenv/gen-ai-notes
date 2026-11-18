import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ConditionalEdges = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 06
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Conditional Edges in LangGraph
        </h1>
        <p className="text-[#999] mt-3 leading-7">
          Conditional Edges allow a graph to choose its next node dynamically
          based on the current state or a condition.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          1. What are Conditional Edges?
        </h2>

        <p className="text-[#aaa] leading-7">
          A normal Edge always follows a predefined path. But a Conditional Edge
          checks a condition and decides which node should execute next.
        </p>

        <CodeBlock
          code={`             START
                |
                v
             Check Node
                |
          Is score >= 50?
             /       \\
           Yes        No
            |          |
            v          v
        Passed Node  Failed Node
            |          |
            v          v
           END        END`}
        />

        <p className="text-[#aaa] leading-7">
          Here, the next node depends on the score stored in the graph state.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. addConditionalEdges()</h2>

        <p className="text-[#aaa] leading-7">
          We use addConditionalEdges() to create conditional routes.
        </p>

        <CodeBlock
          code={`graph.addConditionalEdges(
  "check",
  routingFunction,
  {
    pass: "passed",
    fail: "failed",
  }
);`}
        />

        <p className="text-[#aaa]">It accepts three main arguments:</p>

        <div className="space-y-3">
          {[
            [
              "1. Source Node",
              "The node from which conditional routing starts.",
            ],
            [
              "2. Routing Function",
              "A function that receives the current state and returns a route key.",
            ],
            [
              "3. Path Map",
              "An object that maps the returned route key to the destination node.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Routing Function</h2>

        <p className="text-[#aaa] leading-7">
          A routing function checks the current state and returns a route key.
          LangGraph uses that key to select the next node.
        </p>

        <CodeBlock
          code={`const routingFunction = (state) => {
  if (state.score >= 50) {
    return "pass";
  }

  return "fail";
};`}
        />

        <p className="text-[#aaa] leading-7">
          If the score is 50 or above, it returns "pass". Otherwise, it returns
          "fail".
        </p>

        <p className="text-sm text-[#999]">
          Important: The returned route key must match a key in the path map.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a result-checking workflow. It will send students to
          different nodes based on their marks.
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
  score: Annotation(),
  result: Annotation(),
});

// 2. Create Nodes
const checkNode = (state) => {
  console.log("Checking score:", state.score);

  return {};
};

const passedNode = (state) => {
  return {
    result: "You passed!",
  };
};

const failedNode = (state) => {
  return {
    result: "You failed!",
  };
};

// 3. Create Routing Function
const routeResult = (state) => {
  if (state.score >= 50) {
    return "pass";
  }

  return "fail";
};

// 4. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("check", checkNode)
  .addNode("passed", passedNode)
  .addNode("failed", failedNode)

  .addEdge(START, "check")

  .addConditionalEdges(
    "check",
    routeResult,
    {
      pass: "passed",
      fail: "failed",
    }
  )

  .addEdge("passed", END)
  .addEdge("failed", END)

  .compile();

// 5. Execute Graph
const result = await graph.invoke({
  score: 75,
  result: "",
});

console.log(result.result);

// Output:
// You passed!`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-[#FC6C26]">Execution Flow</h3>
          <CodeBlock
            code={`START
  |
  v
Check Node
  |
  v
routeResult(state)
  |
  | score = 75
  |
  v
"pass"
  |
  v
Passed Node
  |
  v
 END`}
          />
          <p className="text-sm text-[#aaa]">
            If score is 35, the routing function returns "fail" and the Failed
            Node executes instead.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Without Path Map</h2>

        <p className="text-[#aaa] leading-7">
          You can also return the actual destination node name directly from the
          routing function. In that case, a path map is not required.
        </p>

        <CodeBlock
          code={`const routeResult = (state) => {
  return state.score >= 50
    ? "passed"
    : "failed";
};

graph.addConditionalEdges(
  "check",
  routeResult
);`}
        />

        <p className="text-sm text-[#999]">
          The returned strings must match the registered node names.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Practical AI Agent Use Case
        </h2>

        <p className="text-[#aaa] leading-7">
          Conditional routing is useful when an AI application needs to decide
          what to do next.
        </p>

        <CodeBlock
          code={`              START
                 |
                 v
              AI Node
                 |
                 v
          Does AI need a tool?
              /       \\
            Yes        No
             |          |
             v          v
          Tool Node  Response Node
             |          |
             v          v
          AI Node      END`}
        />

        <p className="text-[#aaa] leading-7">
          For example, an AI Agent can route to a Tool Node when a tool call is
          needed, or directly to a Response Node when it can answer the user.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Important Points</h2>

        {[
          [
            "Dynamic Routing",
            "The next node is selected at runtime based on a condition.",
          ],
          [
            "State Access",
            "The routing function receives the current graph state.",
          ],
          [
            "Route Key",
            "The function returns a string that identifies the next route.",
          ],
          ["Path Map", "Maps route keys to actual destination node names."],
          [
            "Loops",
            "Conditional Edges can route execution back to an earlier node to create loops.",
          ],
          [
            "No Path Map",
            "You can return a registered destination node name directly.",
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

      {/* 8 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          8. Interview Questions & Answers
        </h2>

        {[
          [
            "What are Conditional Edges?",
            "They dynamically select the next node based on a condition.",
          ],
          ["Which method creates Conditional Edges?", "addConditionalEdges()."],
          [
            "What is a Routing Function?",
            "A function that reads the current state and returns a route key or destination node name.",
          ],
          [
            "What is a Path Map?",
            "An object that maps route keys to destination node names.",
          ],
          [
            "Can Conditional Edges create loops?",
            "Yes. They can route execution back to an earlier node.",
          ],
          [
            "Can we use Conditional Edges without a Path Map?",
            "Yes. Return the exact registered destination node name from the routing function.",
          ],
          [
            "Normal Edge vs Conditional Edge?",
            "A normal Edge follows a fixed path, while a Conditional Edge selects a path dynamically.",
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

export default ConditionalEdges;

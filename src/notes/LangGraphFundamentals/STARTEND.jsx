import React from "react";
import CodeBlock from "../../components/CodeBlock";

const STARTEND = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 07
        </p>
        <h1 className="text-3xl font-bold mt-2">START & END in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          START and END are special graph markers that define where graph
          execution begins and where an execution path finishes.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are START & END?</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides two special constants: START and END.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="text-[#FC6C26] font-semibold">START</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Represents the entry point of the graph. Execution begins from the
              node connected to START.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="text-[#FC6C26] font-semibold">END</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Represents the terminal point. When an execution path reaches END,
              that path finishes.
            </p>
          </div>
        </div>

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
 END`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Import START & END</h2>

        <p className="text-[#aaa] leading-7">
          Both constants are imported from the LangGraph package.
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";`}
        />
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Using START</h2>

        <p className="text-[#aaa] leading-7">
          Use addEdge() to connect START to the first node of your workflow.
        </p>

        <CodeBlock code={`graph.addEdge(START, "inputNode");`} />

        <p className="text-[#aaa] leading-7">
          This tells LangGraph to begin execution from inputNode.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Using END</h2>

        <p className="text-[#aaa] leading-7">
          Connect the last node to END to finish that execution path.
        </p>

        <CodeBlock code={`graph.addEdge("responseNode", END);`} />

        <p className="text-[#aaa] leading-7">
          After responseNode completes, the graph execution path finishes.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a simple workflow using START and END.
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
const inputNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};

const responseNode = (state) => {
  return {
    message: state.message + " LangGraph!",
  };
};

// 3. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("input", inputNode)
  .addNode("response", responseNode)

  // Starting point
  .addEdge(START, "input")

  // Connect nodes
  .addEdge("input", "response")

  // Ending point
  .addEdge("response", END)

  .compile();

// 4. Execute
const result = await graph.invoke({
  message: "Welcome",
});

console.log(result.message);

// Output:
// Welcome Hello LangGraph!`}
        />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold text-[#FC6C26] mb-3">Execution Flow</h3>
          <CodeBlock
            code={`START
  |
  v
Input Node
  |
  v
Response Node
  |
  v
 END`}
          />
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. START & END with Conditional Edges
        </h2>

        <p className="text-[#aaa] leading-7">
          Conditional routing can send execution to different nodes. Each branch
          can connect to END when its work is complete.
        </p>

        <CodeBlock
          code={`START
  |
  v
Check Node
  |
  v
Conditional Routing
  /          \\
 v            v
Success      Failure
 Node         Node
  |            |
  v            v
 END          END`}
        />

        <p className="text-sm text-[#999]">
          END is a terminal marker, not a regular node that you need to register
          with addNode().
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Important Points</h2>

        {[
          [
            "Special Constants",
            "START and END are provided by @langchain/langgraph.",
          ],
          ["START", "Defines the graph's entry point."],
          ["END", "Marks the completion of an execution path."],
          ["No addNode()", "You don't register START or END as normal nodes."],
          ["Multiple Paths", "Different branches can connect to END."],
          [
            "Conditional Routing",
            "A conditional route can also return END to finish execution directly.",
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
            "What is START in LangGraph?",
            "START is a special constant representing the graph's entry point.",
          ],
          [
            "What is END in LangGraph?",
            "END is a special constant representing the terminal point of an execution path.",
          ],
          [
            "How do you connect START to a node?",
            "Using addEdge(START, 'nodeName').",
          ],
          [
            "How do you finish a graph path?",
            "Connect the final node to END using addEdge().",
          ],
          [
            "Are START and END normal nodes?",
            "No. They are special graph markers, not regular nodes.",
          ],
          [
            "Can multiple nodes connect to END?",
            "Yes. Different execution branches can finish at END.",
          ],
          [
            "Can a conditional route return END?",
            "Yes. A routing function can return END to finish execution directly.",
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

export default STARTEND;

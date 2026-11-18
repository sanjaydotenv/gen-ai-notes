import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Nodes = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 04
        </p>
        <h1 className="text-3xl font-bold mt-2">Nodes in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Nodes are functions that perform individual tasks inside a LangGraph
          workflow. They receive the current state, execute logic, and return
          state updates.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Nodes?</h2>

        <p className="text-[#aaa] leading-7">
          A Node is simply a JavaScript function registered inside a StateGraph
          using addNode().
        </p>

        <p className="text-[#aaa] leading-7">
          Each node performs a specific operation and returns the result as a
          state update.
        </p>

        <CodeBlock
          code={`       START
          |
          v
     Input Node
          |
          v
     LLM Node
          |
          v
    Response Node
          |
          v
         END`}
        />

        <p className="text-[#aaa] leading-7">
          Here, each node has a separate responsibility in the workflow.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Creating a Node</h2>

        <p className="text-[#aaa] leading-7">
          A node can be a normal JavaScript function that receives state and
          returns an object containing updated values.
        </p>

        <CodeBlock
          code={`const greetNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};`}
        />

        <p className="text-[#aaa] leading-7">Here:</p>

        <ul className="list-disc pl-6 space-y-2 text-sm text-[#aaa]">
          <li>
            <span className="text-[#E3E3E3]">state:</span> Current graph data.
          </li>
          <li>
            <span className="text-[#E3E3E3]">return:</span> Updates that should
            be applied to state.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Registering Nodes</h2>

        <p className="text-[#aaa] leading-7">
          We register a function inside StateGraph using addNode(). The first
          argument is the node name, and the second is its function.
        </p>

        <CodeBlock
          code={`graphBuilder.addNode("greet", greetNode);
graphBuilder.addNode("process", processNode);
graphBuilder.addNode("response", responseNode);`}
        />

        <p className="text-[#aaa] leading-7">
          Node names are used to connect nodes through edges.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Types of Nodes</h2>

        <p className="text-[#aaa] leading-7">
          Nodes can perform different kinds of operations depending on the
          requirements of an application.
        </p>

        <div className="space-y-3">
          {[
            [
              "Normal Node",
              "A synchronous function that performs simple operations.",
            ],
            [
              "Async Node",
              "An asynchronous function that handles API calls, database queries, or other async operations.",
            ],
            [
              "LLM Node",
              "A node that calls an LLM and processes its response.",
            ],
            ["Tool Node", "A node that executes tools or external operations."],
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

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Synchronous vs Asynchronous Nodes
        </h2>

        <p className="text-[#aaa] leading-7">
          A synchronous node executes normal JavaScript logic, while an
          asynchronous node can use await for operations such as API calls.
        </p>

        <p className="font-semibold text-[#FC6C26]">Synchronous Node</p>

        <CodeBlock
          code={`const calculateNode = (state) => {
  return {
    result: state.a + state.b,
  };
};`}
        />

        <p className="font-semibold text-[#FC6C26]">Asynchronous Node</p>

        <CodeBlock
          code={`const fetchNode = async (state) => {
  const response = await fetch(
    "https://api.example.com/data"
  );

  const data = await response.json();

  return {
    result: data,
  };
};`}
        />

        <p className="text-sm text-[#999]">
          Async nodes are useful when a workflow needs to communicate with
          external services.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. LLM Node Example</h2>

        <p className="text-[#aaa] leading-7">
          We can call an LLM directly inside a node and save its response in
          graph state.
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const llmNode = async (state) => {
  const response = await model.invoke(
    state.message
  );

  return {
    answer: response.content,
  };
};`}
        />

        <p className="text-[#aaa] leading-7">
          This node reads the user's message, sends it to the LLM, and returns
          the generated answer.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          7. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a simple workflow with two nodes: one processes the input
          and another generates a response.
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
  answer: Annotation<string>,
});

// 2. Create Nodes
const processNode = (state) => {
  return {
    message: state.message.toUpperCase(),
  };
};

const responseNode = (state) => {
  return {
    answer: "Processed: " + state.message,
  };
};

// 3. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("process", processNode)
  .addNode("response", responseNode)

  // 4. Connect Nodes
  .addEdge(START, "process")
  .addEdge("process", "response")
  .addEdge("response", END)

  // 5. Compile
  .compile();

// 6. Execute
const result = await graph.invoke({
  message: "hello langgraph",
});

console.log(result.answer);

// Output:
// Processed: HELLO LANGGRAPH`}
        />

        <CodeBlock
          code={`Execution Flow:

Input:
{ message: "hello langgraph" }
              |
              v
         processNode
              |
              v
{ message: "HELLO LANGGRAPH" }
              |
              v
        responseNode
              |
              v
{ answer: "Processed: HELLO LANGGRAPH" }
              |
              v
             END`}
        />
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Rules for Nodes</h2>

        <div className="space-y-3">
          {[
            [
              "Return State Updates",
              "Return an object containing the properties you want to update.",
            ],
            [
              "Avoid Direct Mutation",
              "Do not directly modify the received state object. Return updates instead.",
            ],
            [
              "Keep Nodes Focused",
              "Each node should ideally perform one clear responsibility.",
            ],
            [
              "Use Async When Needed",
              "Use async/await for API calls, database operations, and LLM calls.",
            ],
            [
              "Handle Errors",
              "Handle failures from external APIs and other operations appropriately.",
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

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is a Node in LangGraph?",
            "A function that performs a specific task inside a graph and returns state updates.",
          ],
          [
            "How do we create a Node?",
            "By defining a JavaScript function that receives state and returns an update object.",
          ],
          [
            "How do we register a Node?",
            "Using addNode(nodeName, nodeFunction).",
          ],
          [
            "What does a Node receive?",
            "The current graph state and optionally additional execution configuration.",
          ],
          [
            "What does a Node return?",
            "Usually a partial state update containing the properties that need to change.",
          ],
          [
            "Can Nodes be asynchronous?",
            "Yes. Nodes can use async/await for APIs, databases, and LLM calls.",
          ],
          [
            "Can a Node call an LLM?",
            "Yes. We can invoke an LLM inside an async node.",
          ],
          [
            "Can multiple Nodes run in parallel?",
            "Yes. Nodes scheduled in the same graph super-step can execute in parallel when the graph structure allows it.",
          ],
          [
            "Why should we avoid mutating state?",
            "Returning explicit updates keeps state changes predictable and works correctly with LangGraph's update and reducer system.",
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

export default Nodes;

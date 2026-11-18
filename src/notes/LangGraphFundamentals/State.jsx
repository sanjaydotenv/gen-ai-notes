import React from "react";
import CodeBlock from "../../components/CodeBlock";

const State = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH FUNDAMENTALS / 03
        </p>
        <h1 className="text-3xl font-bold mt-2">State in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          State is the shared data structure of a LangGraph workflow. It stores
          information that nodes can read and update during graph execution.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is State?</h2>

        <p className="text-[#aaa] leading-7">
          State is an object that carries data throughout the graph. Every node
          can access the current state and return updates to it.
        </p>

        <CodeBlock
          code={`        Initial State
              |
              v
           Node A
              |
         Updated State
              |
              v
           Node B
              |
         Updated State
              |
              v
           Node C
              |
              v
             END`}
        />

        <p className="text-[#aaa] leading-7">
          Example: An AI assistant can store conversation messages in its state
          and pass them between different nodes.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Defining State</h2>

        <p className="text-[#aaa] leading-7">
          In LangGraph JS, we use Annotation.Root() to define the structure of
          the graph state.
        </p>

        <CodeBlock
          code={`import { Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
  message: Annotation<string>,
  count: Annotation<number>,
  isCompleted: Annotation<boolean>,
});`}
        />

        <p className="text-[#aaa] leading-7">
          Here, we defined three state properties: message, count, and
          isCompleted.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">State Structure</p>
          <CodeBlock
            code={`{
  message: "Hello",
  count: 1,
  isCompleted: false
}`}
          />
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          3. Reading State Inside Nodes
        </h2>

        <p className="text-[#aaa] leading-7">
          Every node receives the current state as its argument. We can access
          its properties using state.propertyName.
        </p>

        <CodeBlock
          code={`const greetNode = (state) => {
  console.log(state.message);

  return {};
};`}
        />

        <p className="text-[#aaa] leading-7">
          In this example, the node reads the message property. Returning an
          empty object means it does not update any state property.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Updating State</h2>

        <p className="text-[#aaa] leading-7">
          A node updates state by returning an object containing the properties
          it wants to change.
        </p>

        <CodeBlock
          code={`const greetNode = (state) => {
  return {
    message: state.message + " Hello",
  };
};`}
        />

        <p className="text-[#aaa] leading-7">
          If the initial message is "Welcome", the updated message becomes
          "Welcome Hello".
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="text-sm text-[#aaa] leading-6">
            A node usually returns a partial state update, not the entire state
            object. LangGraph merges that update into the existing state using
            the property's reducer.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. What is a Reducer?</h2>

        <p className="text-[#aaa] leading-7">
          A reducer decides how a new value should be combined with the existing
          value of a state property.
        </p>

        <p className="text-[#aaa] leading-7">
          By default, a state property uses the latest returned value. We can
          define a custom reducer when we want to combine values.
        </p>

        <CodeBlock
          code={`const GraphState = Annotation.Root({
  count: Annotation<number>({
    reducer: (current, update) => current + update,
    default: () => 0,
  }),
});`}
        />

        <p className="text-[#aaa] leading-7">
          Here, the reducer adds the new value to the existing count instead of
          replacing it.
        </p>

        <CodeBlock
          code={`Initial count: 0

Node A returns: { count: 5 }
New count: 5

Node B returns: { count: 3 }
New count: 8`}
        />

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            Without a custom reducer, the new value replaces the old value. With
            a reducer, both values are combined according to the reducer logic.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Complete Practical Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a graph where two nodes update the same message property.
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

// 3. Build Graph
const graph = new StateGraph(GraphState)
  .addNode("first", firstNode)
  .addNode("second", secondNode)
  .addEdge(START, "first")
  .addEdge("first", "second")
  .addEdge("second", END)
  .compile();

// 4. Execute Graph
const result = await graph.invoke({
  message: "Welcome",
});

console.log(result);

// Output:
// { message: "Welcome Hello LangGraph" }`}
        />

        <CodeBlock
          code={`Initial State:
{ message: "Welcome" }
          |
          v
       firstNode
          |
          v
{ message: "Welcome Hello" }
          |
          v
      secondNode
          |
          v
{ message: "Welcome Hello LangGraph" }
          |
          v
         END`}
        />
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. State vs Reducer</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="p-3">State</th>
                <th className="p-3">Reducer</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Stores workflow data.</td>
                <td className="p-3">Controls how updates are applied.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Defines properties.</td>
                <td className="p-3">Defines update behavior.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Example: message, count.</td>
                <td className="p-3">Example: replace, append, add.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          8. Interview Questions & Answers
        </h2>

        {[
          [
            "What is State in LangGraph?",
            "State is the shared data structure that stores information throughout graph execution.",
          ],
          [
            "How do we define State in LangGraph JS?",
            "Using Annotation.Root() with individual Annotation properties.",
          ],
          [
            "How do nodes access State?",
            "State is passed to a node function as its argument.",
          ],
          [
            "How does a node update State?",
            "By returning an object containing the properties it wants to update.",
          ],
          [
            "What is a Reducer?",
            "A function that controls how new values are combined with existing state values.",
          ],
          [
            "What happens without a custom reducer?",
            "The new value replaces the existing value for that property.",
          ],
          [
            "Why do we use reducers?",
            "To define custom update behavior, such as adding numbers or combining arrays.",
          ],
          [
            "What is a default value in Annotation?",
            "It provides an initial value for a state property when that property has not been initialized.",
          ],
          [
            "Do all nodes need to update the complete State?",
            "No. Nodes can return only the properties they need to update.",
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

export default State;

import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Subgraphs = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 08
        </p>
        <h1 className="text-3xl font-bold mt-2">Subgraphs in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Subgraphs allow us to create smaller, independent graphs and use them
          inside a larger parent graph.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Subgraphs?</h2>

        <p className="text-[#aaa] leading-7">
          A Subgraph is a compiled LangGraph graph that is used as a node inside
          another graph.
        </p>

        <p className="text-[#aaa] leading-7">
          Instead of building one large graph, we can divide the workflow into
          smaller graphs, each responsible for a specific task.
        </p>

        <CodeBlock
          code={`Parent Graph
     |
     v
  Subgraph A
     |
     v
  Subgraph B
     |
     v
  Final Output`}
        />

        <p className="text-[#aaa] leading-7">
          Example: An AI application can have separate subgraphs for research,
          content generation and content review.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why Use Subgraphs?</h2>

        <div className="space-y-3">
          {[
            ["Modularity", "Divide a complex workflow into smaller parts."],
            [
              "Reusability",
              "Reuse the same subgraph in different parent graphs.",
            ],
            [
              "Maintainability",
              "Update one workflow without changing the entire graph.",
            ],
            [
              "Separation of Logic",
              "Keep different responsibilities independent.",
            ],
            [
              "Team Development",
              "Different developers can work on separate graph components.",
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
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          3. Parent Graph and Child Graph
        </h2>

        <p className="text-[#aaa] leading-7">
          A graph used inside another graph is called a Child Graph or Subgraph.
          The graph that contains it is called the Parent Graph.
        </p>

        <CodeBlock
          code={`Parent Graph
     |
     v
  Research Node
     |
     v
  Research Subgraph
     |
     +---- Search Node
     |
     +---- Analyze Node
     |
     v
  Parent Graph Continues
     |
     v
  Final Output`}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Parent Graph</h3>
            <p className="text-sm text-[#aaa] mt-2">
              Controls the overall workflow and connects different subgraphs.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Child Graph</h3>
            <p className="text-sm text-[#aaa] mt-2">
              Handles a specific part of the workflow using its own nodes and
              edges.
            </p>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Creating a Subgraph</h2>

        <p className="text-[#aaa] leading-7">
          First, create and compile a child graph. Then register that compiled
          graph as a node inside the parent graph.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          Step 1: Create Shared State
        </h3>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
} from "@langchain/langgraph";

const GraphState = Annotation.Root({
  message: Annotation(),
  result: Annotation(),
});`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 2: Create Child Graph
        </h3>

        <CodeBlock
          code={`const processNode = (state) => {
  return {
    result: state.message.toUpperCase(),
  };
};

const childGraph = new StateGraph(GraphState)
  .addNode("process", processNode)
  .addEdge(START, "process")
  .addEdge("process", END)
  .compile();`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 3: Create Parent Graph
        </h3>

        <CodeBlock
          code={`const parentGraph = new StateGraph(GraphState)
  .addNode("child", childGraph)
  .addEdge(START, "child")
  .addEdge("child", END)
  .compile();`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 4: Execute Parent Graph
        </h3>

        <CodeBlock
          code={`const result = await parentGraph.invoke({
  message: "hello langgraph",
  result: "",
});

console.log(result.result);

// Output:
// HELLO LANGGRAPH`}
        />

        <p className="text-sm text-[#999]">
          Here, the parent graph executes the compiled child graph as one of its
          nodes. Both graphs use the same state schema.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Different State Schemas</h2>

        <p className="text-[#aaa] leading-7">
          Parent and child graphs do not always need the same state schema. When
          their schemas are different, create a wrapper node to map data between
          them.
        </p>

        <CodeBlock
          code={`// Parent State
const ParentState = Annotation.Root({
  userInput: Annotation(),
  finalResult: Annotation(),
});

// Child State
const ChildState = Annotation.Root({
  text: Annotation(),
  output: Annotation(),
});

// Child graph
const childGraph = new StateGraph(ChildState)
  .addNode("process", (state) => ({
    output: state.text.toUpperCase(),
  }))
  .addEdge(START, "process")
  .addEdge("process", END)
  .compile();

// Wrapper node
const callChild = async (state) => {

  const result = await childGraph.invoke({
    text: state.userInput,
  });

  return {
    finalResult: result.output,
  };
};

// Parent graph
const parentGraph = new StateGraph(ParentState)
  .addNode("child", callChild)
  .addEdge(START, "child")
  .addEdge("child", END)
  .compile();`}
        />

        <p className="text-sm text-[#999]">
          The wrapper node controls which data goes into the child graph and
          which result returns to the parent graph.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Subgraphs and Persistence</h2>

        <p className="text-[#aaa] leading-7">
          Subgraphs can also use checkpointing. Their persistence behavior
          depends on how they are connected and how the graph is compiled.
        </p>

        <div className="space-y-3">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Shared Checkpointer
            </h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              A child graph added directly as a node can use the parent's
              checkpointer. Its state can be included in the parent's execution
              history.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Independent Persistence
            </h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              A child graph can also be invoked through a wrapper node. You can
              explicitly manage its checkpointer and thread configuration when
              independent persistence is required.
            </p>
          </div>
        </div>

        <p className="text-sm text-[#999]">
          Important: A compiled child graph does not automatically get
          independent long-term storage just because it is a subgraph.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Real-World Architecture</h2>

        <p className="text-[#aaa] leading-7">
          Consider an AI content generation application. Its parent graph
          coordinates multiple specialized subgraphs.
        </p>

        <CodeBlock
          code={`             Parent Graph
                  |
                  v
             Research Graph
                  |
                  v
             Writing Graph
                  |
                  v
             Review Graph
                  |
                  v
             Final Content`}
        />

        <p className="text-[#aaa] leading-7">
          Each subgraph handles one responsibility. The parent graph controls
          how the complete workflow runs.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          ["Subgraph", "A compiled graph used inside another graph."],
          ["Parent Graph", "The main graph that coordinates the workflow."],
          ["Child Graph", "The smaller graph responsible for a specific task."],
          ["Shared State", "Parent and child can use the same state schema."],
          ["Different State", "Use a wrapper node to map input and output."],
          [
            "Compilation",
            "Compile the child graph before adding it to the parent.",
          ],
          [
            "Reusability",
            "A compiled subgraph can be reused in multiple workflows.",
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
            "What is a Subgraph in LangGraph?",
            "A compiled graph used as a node inside another graph.",
          ],
          [
            "What is a Parent Graph?",
            "The main graph that coordinates the complete workflow.",
          ],
          [
            "What is a Child Graph?",
            "A smaller graph that handles a specific task.",
          ],
          [
            "Why do we use Subgraphs?",
            "To make complex workflows modular, reusable and easier to maintain.",
          ],
          [
            "Can a Subgraph have its own nodes and edges?",
            "Yes. It has its own graph structure.",
          ],
          [
            "Can Parent and Child graphs have different state schemas?",
            "Yes. A wrapper node can map data between their schemas.",
          ],
          [
            "How do we add a Subgraph to a Parent Graph?",
            "Compile the child graph and register it using addNode().",
          ],
          [
            "Can Subgraphs use Checkpointing?",
            "Yes. They can participate in the parent's checkpointing or use independently managed persistence.",
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

export default Subgraphs;

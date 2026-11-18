import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Interrupts = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 07
        </p>
        <h1 className="text-3xl font-bold mt-2">Interrupts in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Interrupts allow a LangGraph workflow to pause execution at a specific
          point, wait for external input and continue from its saved state.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Interrupts?</h2>

        <p className="text-[#aaa] leading-7">
          An interrupt temporarily stops graph execution when the workflow needs
          external input or confirmation.
        </p>

        <CodeBlock
          code={`Start Graph
     |
     v
Execute Node
     |
     v
interrupt()
     |
     v
Graph Paused
     |
     v
Wait for Input
     |
     v
Command({ resume })
     |
     v
Continue Execution`}
        />

        <p className="text-[#aaa] leading-7">
          Example: An agent prepares a payment and pauses to ask the user for
          confirmation before processing it.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. How interrupt() Works</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides the interrupt() function from
          <code className="text-[#FC6C26]"> @langchain/langgraph</code>.
        </p>

        <CodeBlock
          code={`import {
  interrupt,
} from "@langchain/langgraph";

const approvalNode = (state) => {

  const response = interrupt({
    question: "Do you approve?",
    action: state.action,
  });

  return {
    approved: response,
  };
};`}
        />

        <p className="text-[#aaa] leading-7">When interrupt() is called:</p>

        <ol className="list-decimal pl-5 space-y-2 text-[#aaa]">
          <li>LangGraph checks whether a resume value is available.</li>
          <li>If not, it raises a special GraphInterrupt signal.</li>
          <li>The runtime pauses graph execution.</li>
          <li>The checkpointer saves the graph state.</li>
          <li>The interrupt information becomes available to the caller.</li>
        </ol>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Command({`{ resume }`})</h2>

        <p className="text-[#aaa] leading-7">
          Command is used to provide external input and resume a paused graph.
        </p>

        <CodeBlock
          code={`import {
  Command,
} from "@langchain/langgraph";

// Resume with approval
await graph.invoke(
  new Command({
    resume: true,
  }),
  config
);

// Resume with rejection
await graph.invoke(
  new Command({
    resume: false,
  }),
  config
);`}
        />

        <p className="text-[#aaa] leading-7">
          The value provided through resume becomes the return value of the
          paused interrupt() call.
        </p>

        <CodeBlock
          code={`const approved = interrupt({
  question: "Approve this action?"
});

// If resumed with true:
// approved = true

// If resumed with false:
// approved = false`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          4. How to Read Interrupt Information
        </h2>

        <p className="text-[#aaa] leading-7">
          After invoking a graph, use getState() to inspect its current state
          and pending interrupts.
        </p>

        <CodeBlock
          code={`const result = await graph.invoke(
  { action: "Send Email" },
  config
);

// Read graph snapshot
const snapshot = await graph.getState(config);

// Inspect pending interrupts
console.log(snapshot.tasks[0]?.interrupts);`}
        />

        <p className="text-[#aaa] leading-7">
          Each interrupt contains information such as its value, ID and whether
          it can be resumed.
        </p>

        <CodeBlock
          code={`[
  {
    value: {
      question: "Approve this action?",
      action: "Send Email"
    },
    resumable: true,
    when: "during"
  }
]`}
        />

        <p className="text-sm text-[#999]">
          The application can display this information in a UI and collect the
          user's response.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          5. Complete Interrupt Workflow
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's build a simple graph that pauses and waits for approval.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          Step 1: Imports and State
        </h3>

        <CodeBlock
          code={`import {
  StateGraph,
  Annotation,
  START,
  END,
  interrupt,
  Command,
  MemorySaver,
} from "@langchain/langgraph";

const GraphState = Annotation.Root({
  action: Annotation(),
  approved: Annotation(),
});`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 2: Create Node</h3>

        <CodeBlock
          code={`const approvalNode = (state) => {

  const approved = interrupt({
    question: "Do you approve this action?",
    action: state.action,
  });

  return {
    approved,
  };
};`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 3: Build Graph</h3>

        <CodeBlock
          code={`const checkpointer = new MemorySaver();

const graph = new StateGraph(GraphState)
  .addNode("approval", approvalNode)
  .addEdge(START, "approval")
  .addEdge("approval", END)
  .compile({
    checkpointer,
  });`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 4: Start Execution
        </h3>

        <CodeBlock
          code={`const config = {
  configurable: {
    thread_id: "interrupt-101",
  },
};

const result = await graph.invoke(
  {
    action: "Send an important email",
    approved: false,
  },
  config
);

// Inspect paused state
const snapshot = await graph.getState(config);

console.log(snapshot.tasks[0]?.interrupts);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 5: Resume Execution
        </h3>

        <CodeBlock
          code={`const finalResult = await graph.invoke(
  new Command({
    resume: true,
  }),
  config
);

console.log(finalResult.approved);

// Output:
// true`}
        />

        <p className="text-sm text-[#999]">
          This example demonstrates pausing and resuming. The graph does not
          actually send an email; a separate execution node would perform that
          action after approval.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Node Restart Behavior</h2>

        <p className="text-[#aaa] leading-7">
          This is one of the most important concepts about interrupts. When a
          graph resumes, the node containing interrupt() starts again from its
          beginning.
        </p>

        <CodeBlock
          code={`const myNode = (state) => {

  console.log("Node Started");

  const answer = interrupt("Enter your answer");

  console.log("Answer:", answer);

  return { answer };
};`}
        />

        <p className="text-[#aaa] leading-7">Execution behavior:</p>

        <CodeBlock
          code={`First Execution:

Node Started
     |
     v
interrupt()
     |
     v
PAUSED


After Resume:

Node Started   <-- Runs Again
     |
     v
interrupt()    <-- Gets resume value
     |
     v
Answer: Yes
     |
     v
Node Completed`}
        />

        <p className="text-sm text-[#999]">
          The node does not continue from the exact line where it paused. Code
          before interrupt() executes again.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Multiple Interrupts</h2>

        <p className="text-[#aaa] leading-7">
          A single node can contain multiple interrupt() calls. LangGraph
          handles them sequentially.
        </p>

        <CodeBlock
          code={`const userDetailsNode = () => {

  const name = interrupt("Enter your name");

  const age = interrupt("Enter your age");

  return {
    name,
    age,
  };
};`}
        />

        <p className="text-[#aaa] leading-7">Execution:</p>

        <CodeBlock
          code={`First Resume:
"Mayur"
     |
     v
Second Interrupt:
"Enter your age"


Second Resume:
19
     |
     v
Node Completed

Result:
{
  name: "Mayur",
  age: 19
}`}
        />

        <p className="text-sm text-[#999]">
          Keep interrupt calls in the same order every time the node runs. Do
          not dynamically reorder or skip them.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          8. Important Rules & Mistakes
        </h2>

        {[
          [
            "Checkpointer Required",
            "A graph must have a checkpointer to persist state across interrupts.",
          ],
          ["Same thread_id", "Resume the graph using the same thread_id."],
          [
            "JSON-Serializable Data",
            "Pass serializable values such as strings, numbers, arrays or objects to interrupt().",
          ],
          ["Node Restarts", "The entire node starts again when resumed."],
          [
            "Avoid try/catch",
            "Do not accidentally catch and swallow the special GraphInterrupt signal.",
          ],
          [
            "Avoid Duplicate Side Effects",
            "Place API calls, payments and other external actions after interrupt() or make them idempotent.",
          ],
          [
            "Stable Interrupt Order",
            "Keep multiple interrupt calls in a consistent order.",
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
            "What is an interrupt in LangGraph?",
            "It pauses graph execution and waits for external input.",
          ],
          ["Which function creates an interrupt?", "The interrupt() function."],
          [
            "How do you resume a paused graph?",
            "Using new Command({ resume: value }).",
          ],
          [
            "What happens when interrupt() is called?",
            "It raises a special GraphInterrupt signal if no resume value is available.",
          ],
          [
            "Why is a Checkpointer required?",
            "It saves the graph state so execution can resume later.",
          ],
          [
            "Does a resumed node continue from the exact interrupted line?",
            "No. The node restarts from its beginning.",
          ],
          [
            "Can a node contain multiple interrupts?",
            "Yes, they are handled sequentially and their order must remain consistent.",
          ],
          [
            "Why should interrupt() not be wrapped in try/catch?",
            "A catch block may accidentally swallow the special GraphInterrupt signal.",
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

export default Interrupts;

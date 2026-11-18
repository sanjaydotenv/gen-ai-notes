import React from "react";
import CodeBlock from "../../components/CodeBlock";

const HumanintheLoop = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 06
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Human-in-the-Loop in LangGraph
        </h1>
        <p className="text-[#999] mt-3 leading-7">
          Human-in-the-Loop allows humans to review, approve, reject or modify
          an AI Agent's actions before the workflow continues.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          1. What is Human-in-the-Loop?
        </h2>

        <p className="text-[#aaa] leading-7">
          Human-in-the-Loop (HITL) is a workflow where an AI Agent pauses
          execution and waits for human input before performing an important
          action.
        </p>

        <CodeBlock
          code={`Without HITL:

AI Agent
   |
   v
Make Decision
   |
   v
Execute Action


With HITL:

AI Agent
   |
   v
Make Decision
   |
   v
Ask Human for Approval
   |
   v
Approved?
   |
   +------ Yes ------> Execute Action
   |
   +------ No -------> Reject Action`}
        />

        <p className="text-[#aaa] leading-7">
          Example: Before sending an important email, an AI Agent can ask the
          user to review and approve it.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why Do We Need HITL?</h2>

        <div className="space-y-3">
          {[
            ["Safety", "Prevent dangerous or unintended actions."],
            [
              "Approval",
              "Ask permission before payments, emails or deletions.",
            ],
            ["Correction", "Allow humans to correct AI-generated output."],
            ["Control", "Keep important decisions under human supervision."],
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
        <h2 className="text-2xl font-semibold">3. interrupt() Function</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides the{" "}
          <code className="text-[#FC6C26]">interrupt()</code>
          function to pause graph execution and request external input.
        </p>

        <CodeBlock
          code={`import {
  interrupt,
} from "@langchain/langgraph";

const approvalNode = (state) => {

  const approved = interrupt({
    question: "Do you approve this action?",
    action: state.action,
  });

  return {
    approved,
  };
};`}
        />

        <p className="text-[#aaa] leading-7">When interrupt() executes:</p>

        <CodeBlock
          code={`1. Graph execution pauses.
2. Interrupt information is returned to the caller.
3. Graph state is saved by the checkpointer.
4. Application waits for human input.
5. Graph resumes when input is received.`}
        />

        <p className="text-sm text-[#999]">
          The value passed to interrupt() must be JSON-serializable.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Command and Resume</h2>

        <p className="text-[#aaa] leading-7">
          After a human provides input, LangGraph uses the
          <code className="text-[#FC6C26]"> Command </code>
          object to resume the paused graph.
        </p>

        <CodeBlock
          code={`import {
  Command,
} from "@langchain/langgraph";

// Human approves the action
await graph.invoke(
  new Command({
    resume: true,
  }),
  config
);`}
        />

        <p className="text-[#aaa] leading-7">
          The value passed inside resume becomes the return value of interrupt()
          inside the paused node.
        </p>

        <CodeBlock
          code={`// Human approves
new Command({ resume: true });

// Human rejects
new Command({ resume: false });

// Human provides edited content
new Command({
  resume: {
    approved: true,
    message: "Updated content",
  },
});`}
        />
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Requirements for HITL</h2>

        <div className="space-y-3">
          {[
            ["Checkpointer", "Saves graph state while execution is paused."],
            [
              "thread_id",
              "Identifies which conversation or execution should resume.",
            ],
            ["interrupt()", "Pauses execution and requests human input."],
            [
              "Command({ resume })",
              "Provides human input and resumes execution.",
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

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Practical Example: Approval Workflow
        </h2>

        <p className="text-[#aaa] leading-7">
          Let's create a graph that asks for human approval before executing an
          action.
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
  status: Annotation(),
});`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Step 2: Human Approval Node
        </h3>

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

        <h3 className="font-semibold text-[#FC6C26]">Step 3: Action Nodes</h3>

        <CodeBlock
          code={`const executeNode = (state) => {
  console.log("Action Executed:", state.action);

  return {
    status: "Action Approved and Executed",
  };
};

const rejectedNode = () => {
  return {
    status: "Action Rejected",
  };
};`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 4: Build Graph</h3>

        <CodeBlock
          code={`const checkpointer = new MemorySaver();

const graph = new StateGraph(GraphState)
  .addNode("approval", approvalNode)
  .addNode("execute", executeNode)
  .addNode("rejected", rejectedNode)

  .addEdge(START, "approval")

  .addConditionalEdges(
    "approval",
    (state) => state.approved
      ? "execute"
      : "rejected",
    {
      execute: "execute",
      rejected: "rejected",
    }
  )

  .addEdge("execute", END)
  .addEdge("rejected", END)

  .compile({
    checkpointer,
  });`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 5: Run Graph</h3>

        <CodeBlock
          code={`const config = {
  configurable: {
    thread_id: "approval-101",
  },
};

// Start execution
const result = await graph.invoke(
  {
    action: "Send an important email",
    approved: false,
    status: "Pending",
  },
  config
);

// Inspect the interrupt
const snapshot = await graph.getState(config);

console.log(snapshot.tasks[0]?.interrupts);

// Graph is now paused.
// Wait for human approval.`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Step 6: Resume Graph</h3>

        <CodeBlock
          code={`// Human approves
const finalResult = await graph.invoke(
  new Command({
    resume: true,
  }),
  config
);

console.log(finalResult.status);

// Output:
// Action Approved and Executed`}
        />

        <p className="text-sm text-[#999]">
          If the human rejects the action, resume with
          <code className="text-[#FC6C26]"> resume: false </code>
          and the graph will execute the rejected node instead.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Important Rules</h2>

        {[
          [
            "Checkpointer Required",
            "interrupt() requires a compiled graph with a checkpointer.",
          ],
          [
            "Same thread_id",
            "Resume using the same thread_id that was used before pausing.",
          ],
          [
            "Node Restarts",
            "When resumed, the node containing interrupt() starts again from its beginning.",
          ],
          [
            "Avoid Duplicate Actions",
            "Place external side effects after interrupt() to prevent accidental duplicate execution.",
          ],
          [
            "Avoid try/catch",
            "Do not swallow the special interrupt exception inside a try/catch block.",
          ],
          [
            "Durable Storage",
            "Use database-backed checkpointers when paused workflows must survive application restarts.",
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
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Real-World Use Cases</h2>

        <CodeBlock
          code={`AI Email Agent
      |
      v
Draft Email
      |
      v
Human Approval
      |
      v
Send Email


AI Payment Agent
      |
      v
Prepare Payment
      |
      v
Human Approval
      |
      v
Process Payment


AI Content Agent
      |
      v
Generate Content
      |
      v
Human Review
      |
      v
Publish Content`}
        />
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          9. Interview Questions & Answers
        </h2>

        {[
          [
            "What is Human-in-the-Loop?",
            "A workflow where humans review or control important decisions made by an AI Agent.",
          ],
          [
            "Why do we need HITL?",
            "To improve safety, accuracy and control over important actions.",
          ],
          [
            "What is interrupt()?",
            "A LangGraph function that pauses graph execution and waits for external input.",
          ],
          [
            "What is Command({ resume })?",
            "It provides human input to a paused graph and resumes execution.",
          ],
          [
            "Why is a Checkpointer required?",
            "It saves graph state so execution can continue after an interrupt.",
          ],
          [
            "Why is thread_id important?",
            "It identifies the paused execution that needs to be resumed.",
          ],
          [
            "Can a human edit AI output?",
            "Yes. The edited value can be passed through Command({ resume }).",
          ],
          [
            "Does the node continue from the exact interrupted line?",
            "No. The node starts again from its beginning when resumed.",
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

export default HumanintheLoop;

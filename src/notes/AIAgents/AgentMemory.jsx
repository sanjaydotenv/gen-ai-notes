import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AgentMemory = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          AI AGENTS / 06
        </p>
        <h1 className="mt-2 text-3xl font-bold">Agent Memory</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Agent Memory allows an AI Agent to retain and retrieve relevant
          information from current and previous interactions.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. Why Does an Agent Need Memory?
        </h2>
        <p className="leading-7 text-[#aaa]">
          Without memory, an agent may lose important context between
          interactions. Memory helps it remember user preferences, previous
          messages, and useful information about ongoing tasks.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-[#FC6C26]">Example</p>
          <p className="mt-2 text-sm text-[#aaa]">
            User: My name is Mayur. I am learning JavaScript.
          </p>
          <p className="mt-2 text-sm text-[#aaa]">
            Later, user asks: What should I learn next?
          </p>
          <p className="mt-2 text-sm text-green-400">
            Agent: Since you are learning JavaScript, you can start learning
            React.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Types of Agent Memory</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              A. Short-Term Memory
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Stores information needed during the current conversation or task.
            </p>
            <CodeBlock
              code={`Conversation:
User: My name is Mayur.
Agent: Nice to meet you!

User: What is my name?
Agent: Your name is Mayur.`}
            />
            <p className="text-xs text-[#888]">
              Common implementation: conversation messages and graph state.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              B. Long-Term Memory
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Stores useful information that can be retrieved across different
              conversations or sessions.
            </p>
            <CodeBlock
              code={`Saved Memory:
{
  "user": "Mayur",
  "learning": "JavaScript",
  "goal": "Become a developer"
}

Future Conversation:
Agent retrieves relevant memory
and uses it in its response.`}
            />
            <p className="text-xs text-[#888]">
              Common implementation: MongoDB, PostgreSQL, or another persistent
              storage system.
            </p>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. How Does Agent Memory Work?
        </h2>
        <CodeBlock
          code={`        User Message
              |
              v
       Retrieve Memory
              |
              v
     Relevant Context + Input
              |
              v
             LLM
              |
              v
        Agent Response
              |
              v
      Extract Useful Information
              |
              v
        Save Memory
              |
              v
       Future Interaction`}
        />
        <p className="text-sm leading-6 text-[#aaa]">
          Memory is useful only when relevant information is retrieved and
          provided to the model as context.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Implementing Simple Memory</h2>
        <p className="leading-7 text-[#aaa]">
          A simple example using JavaScript Map shows how an application can
          store and retrieve user information.
        </p>
        <CodeBlock
          code={`// Simple in-memory storage
const memory = new Map();

// Save user memory
function saveMemory(userId, data) {
  memory.set(userId, data);
}

// Retrieve user memory
function getMemory(userId) {
  return memory.get(userId) || null;
}

// Store information
saveMemory("user-1", {
  name: "Mayur",
  learning: "JavaScript",
});

// Retrieve information
const userMemory = getMemory("user-1");

console.log(userMemory);`}
        />
        <p className="text-sm leading-6 text-[#999]">
          This is only a demonstration. Map stores data in application memory,
          so information is lost when the process restarts. Real applications
          use persistent databases.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Memory in LangGraph</h2>
        <p className="leading-7 text-[#aaa]">
          LangGraph provides two important mechanisms for agent memory:
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Checkpointer</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Saves graph state as checkpoints. It is commonly used for
              conversation history and short-term memory associated with a
              thread.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Store</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Stores information that can be accessed across different
              conversations or threads. It is commonly used for long-term
              memory.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`Short-Term Memory:
Checkpointer
     |
     v
Thread-specific conversation state

Long-Term Memory:
Store
     |
     v
Information across multiple threads`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Important: A checkpointer or Store provides storage, but the
          application still needs to decide what information to save and
          retrieve.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Important Memory Practices</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            Store useful information instead of every conversation detail.
          </li>
          <li>Retrieve only relevant memories for the current task.</li>
          <li>Keep memory updated when information changes.</li>
          <li>
            Use persistent storage for information needed across restarts.
          </li>
          <li>Protect private information and control memory access.</li>
          <li>Limit conversation history to manage token usage.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is Agent Memory?",
            "Agent Memory allows an AI Agent to store and retrieve useful information from current and previous interactions.",
          ],
          [
            "2. What is the difference between short-term and long-term memory?",
            "Short-term memory maintains information for a current conversation or task, while long-term memory stores information across different sessions or threads.",
          ],
          [
            "3. Does an LLM automatically remember previous conversations?",
            "No. An application must provide conversation history or retrieve stored memories and pass them to the model.",
          ],
          [
            "4. What is the role of a Checkpointer in LangGraph?",
            "It saves graph state checkpoints, commonly supporting thread-specific conversation memory.",
          ],
          [
            "5. What is the difference between Checkpointer and Store?",
            "A Checkpointer manages thread-specific graph state, while Store provides access to information across different threads.",
          ],
        ].map(([question, answer]) => (
          <div
            key={question}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 className="font-medium">{question}</h3>
            <p className="mt-2 text-sm leading-6 text-green-400">{answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AgentMemory;

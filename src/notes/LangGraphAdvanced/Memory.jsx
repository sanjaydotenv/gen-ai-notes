import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Memory = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGGRAPH ADVANCED / 05
        </p>
        <h1 className="text-3xl font-bold mt-2">Memory in LangGraph</h1>
        <p className="text-[#999] mt-3 leading-7">
          Memory allows an AI Agent to remember previous interactions,
          understand user preferences and use past information in future
          responses.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is Memory?</h2>

        <p className="text-[#aaa] leading-7">
          Without memory, an AI Agent may not remember what the user said in a
          previous interaction.
        </p>

        <CodeBlock
          code={`User: My name is Mayur.
AI: Nice to meet you!

User: What is my name?
AI: I don't know. (Without memory)`}
        />

        <p className="text-[#aaa] leading-7">
          With memory, the agent can retrieve previous information and answer
          using that context.
        </p>

        <CodeBlock
          code={`User: My name is Mayur.
AI: Nice to meet you!

--- Later ---

User: What is my name?
AI: Your name is Mayur. (With memory)`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Types of Memory</h2>

        <p className="text-[#aaa] leading-7">
          LangGraph provides two important types of memory:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="text-[#FC6C26] font-semibold">Short-Term Memory</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Remembers messages and information within the same conversation or
              thread.
            </p>
            <p className="text-xs text-[#999] mt-3">
              Example: Current chat history.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="text-[#FC6C26] font-semibold">Long-Term Memory</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Remembers useful information across different conversations and
              sessions.
            </p>
            <p className="text-xs text-[#999] mt-3">
              Example: User name and preferences.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`                 Memory
                    |
            +-------+-------+
            |               |
            v               v
       Short-Term       Long-Term
            |               |
            v               v
       Same Thread     Across Threads
       Chat History    User Preferences`}
        />
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Short-Term Memory</h2>

        <p className="text-[#aaa] leading-7">
          Short-term memory uses graph state and a Checkpointer to preserve
          information within a conversation.
        </p>

        <p className="text-[#aaa] leading-7">
          The same thread_id allows the agent to continue accessing its previous
          conversation state.
        </p>

        <CodeBlock
          code={`import {
  StateGraph,
  MessagesAnnotation,
  MemorySaver,
  START,
  END,
} from "@langchain/langgraph";

// Create checkpointer
const checkpointer = new MemorySaver();

// Create graph
const graph = new StateGraph(MessagesAnnotation)
  .addNode("chat", async (state) => {
    // Your LLM logic goes here
    return {
      messages: [],
    };
  })
  .addEdge(START, "chat")
  .addEdge("chat", END)
  .compile({
    checkpointer,
  });

// Same thread for the same conversation
const config = {
  configurable: {
    thread_id: "conversation-101",
  },
};

// First interaction
await graph.invoke(
  {
    messages: [
      { role: "user", content: "My name is Mayur" },
    ],
  },
  config
);

// Next interaction
const result = await graph.invoke(
  {
    messages: [
      { role: "user", content: "What is my name?" },
    ],
  },
  config
);`}
        />

        <p className="text-sm text-[#999]">
          This demonstrates thread persistence. The chat node must actually call
          an LLM and use the message history to generate a meaningful response.
          MemorySaver stores data in RAM, not permanently.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Long-Term Memory</h2>

        <p className="text-[#aaa] leading-7">
          Long-term memory stores information that should be available across
          different conversations.
        </p>

        <p className="text-[#aaa] leading-7">
          LangGraph uses Store for this purpose. Each memory is organized using
          a namespace and a unique key.
        </p>

        <CodeBlock
          code={`import {
  InMemoryStore,
} from "@langchain/langgraph";

const store = new InMemoryStore();

// Namespace identifies the user
const namespace = ["users", "user-101"];

// Save memory
await store.put(
  namespace,
  "profile",
  {
    name: "Mayur",
    language: "Hindi",
    framework: "React",
  }
);

// Retrieve memory
const memory = await store.get(
  namespace,
  "profile"
);

console.log(memory.value);

// Output:
// {
//   name: "Mayur",
//   language: "Hindi",
//   framework: "React"
// }`}
        />

        <p className="text-sm text-[#999]">
          InMemoryStore is for learning and development. Use a database-backed
          Store when information must survive application restarts.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. How Agent Uses Memory</h2>

        <p className="text-[#aaa] leading-7">
          Saving information alone is not enough. The agent must retrieve
          relevant memories and provide them to the LLM as context.
        </p>

        <CodeBlock
          code={`User Message
     |
     v
Retrieve Relevant Memories
     |
     v
Build Context
     |
     v
Send Context + User Message to LLM
     |
     v
Generate Response
     |
     v
Save Useful New Information`}
        />

        <p className="text-[#aaa] leading-7">
          For example, if a user prefers React, the application can retrieve
          that preference and include it in the system prompt before calling the
          model.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          6. Managing Long Conversations
        </h2>

        <p className="text-[#aaa] leading-7">
          Conversation history grows with every message. Sending the entire
          history to the LLM can increase token usage and exceed its context
          window.
        </p>

        <p className="text-[#aaa] leading-7">Common techniques:</p>

        <div className="space-y-3">
          {[
            ["Trimming", "Remove older or less useful messages."],
            [
              "Summarization",
              "Convert older conversation history into a short summary.",
            ],
            ["Filtering", "Keep only messages relevant to the current task."],
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

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          7. Short-Term vs Long-Term Memory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white/[0.05] text-left">
                <th className="p-3 border border-white/10">Feature</th>
                <th className="p-3 border border-white/10">Short-Term</th>
                <th className="p-3 border border-white/10">Long-Term</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["Scope", "Single thread", "Across threads"],
                ["Storage", "Checkpointer", "Store"],
                ["Data", "Conversation state", "User facts and preferences"],
                ["Example", "Current chat", "User profile"],
                ["Lifetime", "Thread-based", "Across sessions"],
              ].map(([feature, short, long]) => (
                <tr key={feature}>
                  <td className="p-3 border border-white/10 text-[#E3E3E3]">
                    {feature}
                  </td>
                  <td className="p-3 border border-white/10">{short}</td>
                  <td className="p-3 border border-white/10">{long}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Important Points</h2>

        {[
          ["Short-Term Memory", "Maintains context within a conversation."],
          [
            "Long-Term Memory",
            "Stores useful information across conversations.",
          ],
          ["Checkpointer", "Persists thread-specific graph state."],
          ["Store", "Persists application data across threads."],
          ["Memory Retrieval", "Fetches relevant information when needed."],
          ["Summarization", "Reduces long conversation history."],
          ["LLM Context", "Retrieved memories must be provided to the model."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg"
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-[#aaa] mt-1">{desc}</p>
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
            "What is Memory in LangGraph?",
            "It allows agents to retain and retrieve information from previous interactions.",
          ],
          [
            "What are the two types of memory?",
            "Short-term memory and long-term memory.",
          ],
          [
            "What is Short-Term Memory?",
            "Memory that maintains information within a single conversation thread.",
          ],
          [
            "What is Long-Term Memory?",
            "Memory that stores information across different conversations.",
          ],
          [
            "Which component provides Short-Term Memory?",
            "A Checkpointer combined with graph state.",
          ],
          ["Which component provides Long-Term Memory?", "A Store."],
          [
            "Does an LLM automatically remember previous conversations?",
            "No. The application must persist and provide relevant conversation history or memories.",
          ],
          [
            "How can we manage long conversations?",
            "Using trimming, filtering and summarization.",
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

export default Memory;

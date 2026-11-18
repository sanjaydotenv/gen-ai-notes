import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ConversationHistory = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">Conversation History</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Conversation History stores previous user and assistant messages so an
          AI application can maintain context and understand follow-up
          questions.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Conversation History?</h2>

        <p className="leading-7 text-[#aaa]">
          Conversation History is a collection of previous messages exchanged
          between a user and an AI assistant. It helps the model understand the
          ongoing conversation.
        </p>

        <CodeBlock
          code={`User: My name is Mayur.
          |
          v
Assistant: Nice to meet you, Mayur!
          |
          v
User: What is my name?
          |
          v
AI uses previous messages
          |
          v
Assistant: Your name is Mayur.`}
        />

        <p className="text-sm text-[#aaa]">
          Without conversation history, the model may not understand what the
          user is referring to in follow-up questions.
        </p>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. How Conversation History Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            "User sends a message",
            "Application retrieves previous messages",
            "New message is added to conversation history",
            "Complete context is sent to LLM",
            "LLM generates a response",
            "Application stores the assistant response",
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div className="rounded-lg bg-white/5 p-3 text-sm">
                <span className="mr-2 font-semibold text-[#FC6C26]">
                  {index + 1}.
                </span>
                {step}
              </div>

              {index !== 5 && <div className="text-[#FC6C26]">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Message Structure */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Conversation Structure</h2>

        <p className="leading-7 text-[#aaa]">
          Conversation history is generally maintained as an array of messages
          containing roles and content.
        </p>

        <CodeBlock
          language="json"
          code={`[
  {
    "role": "user",
    "content": "My name is Mayur."
  },
  {
    "role": "assistant",
    "content": "Nice to meet you, Mayur!"
  },
  {
    "role": "user",
    "content": "What is my name?"
  }
]`}
        />

        <p className="text-sm text-[#aaa]">
          Each message represents one part of the conversation.
        </p>
      </section>

      {/* Implementation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          4. Maintaining History in JavaScript
        </h2>

        <p className="leading-7 text-[#aaa]">
          We can maintain conversation history using an array and append new
          user and assistant messages.
        </p>

        <CodeBlock
          code={`const messages = [
  {
    role: "system",
    content: "You are a helpful assistant."
  }
];

// Add user message
messages.push({
  role: "user",
  content: "What is Node.js?"
});

// Send messages to LLM
const response = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages
});

// Extract assistant response
const answer =
  response.choices[0].message.content;

// Store assistant response
messages.push({
  role: "assistant",
  content: answer
});

console.log(messages);`}
        />

        <p className="text-sm text-[#aaa]">
          Now both user and assistant messages are available for the next API
          request.
        </p>
      </section>

      {/* Database */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Storing Conversation History</h2>

        <p className="leading-7 text-[#aaa]">
          In real-world applications, conversation history is usually stored in
          a database so users can continue previous chats.
        </p>

        <CodeBlock
          code={`User
  |
  v
React Frontend
  |
  v
Express Backend
  |
  +----> Fetch Previous Messages
  |             |
  |             v
  |          MongoDB
  |
  v
Send History to LLM
  |
  v
Generate Response
  |
  v
Save New Messages
  |
  v
MongoDB`}
        />

        <CodeBlock
          language="javascript"
          code={`// Example MongoDB conversation document

{
  userId: "user123",
  messages: [
    {
      role: "user",
      content: "Explain React"
    },
    {
      role: "assistant",
      content: "React is a JavaScript library."
    }
  ]
}`}
        />

        <p className="text-sm text-[#aaa]">
          A conversation ID can be used to identify and retrieve a particular
          chat.
        </p>
      </section>

      {/* Multi User */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Multiple Conversations</h2>

        <p className="leading-7 text-[#aaa]">
          Each conversation should have its own history so that messages from
          different chats do not get mixed.
        </p>

        <CodeBlock
          code={`User
 |
 +------ Conversation 1
 |          |
 |          v
 |       History 1
 |
 +------ Conversation 2
 |          |
 |          v
 |       History 2
 |
 +------ Conversation 3
            |
            v
         History 3`}
        />
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Conversation History maintains previous messages.</li>
          <li>It helps LLMs understand follow-up questions.</li>
          <li>Messages generally contain role and content.</li>
          <li>Both user and assistant messages should be preserved.</li>
          <li>History can be stored in databases like MongoDB.</li>
          <li>Each conversation should have a unique identifier.</li>
          <li>Long conversations consume more tokens.</li>
          <li>Old messages can be summarized or removed when needed.</li>
        </ul>
      </section>

      {/* Difference */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          8. Conversation History vs Context Window
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Conversation History</th>
                <th className="p-3">Context Window</th>
              </tr>
            </thead>

            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Stores previous messages.</td>
                <td className="p-3">
                  Defines how much input the model can process.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Can be stored in a database.</td>
                <td className="p-3">A model capability.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Can grow over time.</td>
                <td className="p-3">Has a maximum token limit.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Conversation History?",
            a: "Conversation History stores previous user and assistant messages to maintain context during an AI conversation.",
          },
          {
            q: "Why do we need Conversation History?",
            a: "It helps the LLM understand follow-up questions and remember previous messages within the provided context.",
          },
          {
            q: "How do we maintain conversation history?",
            a: "We store messages in an array or database and send the relevant history with new requests.",
          },
          {
            q: "Why do we store conversation history in MongoDB?",
            a: "MongoDB allows us to persist conversations so users can retrieve and continue previous chats.",
          },
          {
            q: "What is a conversation ID?",
            a: "A conversation ID uniquely identifies a chat and helps retrieve its associated messages.",
          },
          {
            q: "What happens if conversation history is not provided?",
            a: "The model may not understand previous interactions and can lose the context of follow-up questions.",
          },
          {
            q: "How does conversation history affect token usage?",
            a: "Sending more previous messages increases input token usage and API costs.",
          },
          {
            q: "How can we manage long conversations?",
            a: "We can use message truncation, summarization, and selective history retrieval.",
          },
          {
            q: "Is Conversation History the same as AI memory?",
            a: "No. Conversation History stores messages, while AI memory can preserve selected useful information for future interactions.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>

            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400">Answer: </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ConversationHistory;

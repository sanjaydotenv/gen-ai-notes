import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ContextManagement = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 06
        </p>
        <h1 className="mt-2 text-3xl font-bold">Context Management</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Context Management is the process of controlling and organizing the
          information sent to an LLM so it can generate relevant and accurate
          responses within its context window.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Context Management?</h2>

        <p className="leading-7 text-[#aaa]">
          An LLM does not automatically know everything from previous
          conversations. We must provide relevant information with each request.
          Context Management decides what information should be included,
          removed, or summarized.
        </p>

        <CodeBlock
          code={`User Message
      |
      v
Collect Relevant Information
      |
      v
Manage Conversation History
      |
      v
Build Context
      |
      v
Send to LLM
      |
      v
Generate Response`}
        />
      </section>

      {/* Context Components */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What Does Context Contain?</h2>

        <p className="text-[#aaa] leading-7">
          Context can contain multiple types of information:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["System Instructions", "Defines the AI's behavior and rules."],
            ["User Message", "The current question or request."],
            ["Conversation History", "Previous user and assistant messages."],
            [
              "Retrieved Data",
              "Relevant information from databases or documents.",
            ],
            ["Tool Results", "Output returned by external tools."],
            ["Memory", "Important information saved for future interactions."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Context Window */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Context Window Limit</h2>

        <p className="leading-7 text-[#aaa]">
          Every LLM has a maximum context window measured in tokens. When too
          much information is sent, the request may exceed the model's supported
          limit.
        </p>

        <CodeBlock
          code={`Context Window
+----------------------------------+
| System Instructions              |
| Conversation History             |
| Retrieved Documents               |
| Current User Message              |
| Reserved Output Tokens            |
+----------------------------------+
       Total must fit model limits`}
        />

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
          <p className="text-sm text-orange-300 font-semibold">Important</p>
          <p className="mt-1 text-sm text-[#aaa]">
            Context window capacity includes input and, depending on the
            model/API, reserved or generated output tokens.
          </p>
        </div>
      </section>

      {/* Strategies */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">4. Context Management Strategies</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">A. Truncation</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Remove older or less relevant messages to reduce context size.
            </p>
            <CodeBlock
              code={`// Keep only the latest 10 messages
const recentMessages = messages.slice(-10);`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">B. Summarization</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Convert a long conversation into a shorter summary while
              preserving important information.
            </p>
            <CodeBlock
              code={`const summary = \`
User is learning Node.js.
Already understands Express basics.
Currently studying MongoDB.
\`;`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">C. Retrieval</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Retrieve only relevant information from a large knowledge source
              instead of sending everything to the LLM.
            </p>
            <CodeBlock
              code={`User Question
      |
      v
Search Relevant Documents
      |
      v
Retrieve Matching Information
      |
      v
Add Results to Context
      |
      v
Send to LLM`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">D. Sliding Window</h3>
            <p className="mt-2 text-sm text-[#aaa]">
              Maintain a fixed number of recent messages and move the window
              forward as new messages arrive.
            </p>
            <CodeBlock
              code={`Messages: [1, 2, 3, 4, 5, 6, 7]

Window 1: [1, 2, 3, 4]
Window 2: [3, 4, 5, 6]
Window 3: [4, 5, 6, 7]

Older messages leave the active window.`}
            />
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Practical Implementation</h2>

        <p className="leading-7 text-[#aaa]">
          We can combine system instructions, recent conversation messages, and
          the current user message before calling an LLM.
        </p>

        <CodeBlock
          code={`const conversationHistory = [
  {
    role: "user",
    content: "What is Node.js?"
  },
  {
    role: "assistant",
    content: "Node.js is a JavaScript runtime."
  }
];

const currentMessage = {
  role: "user",
  content: "Why is it used?"
};

// Manage context
const messages = [
  {
    role: "system",
    content: "You are a helpful programming tutor."
  },
  ...conversationHistory.slice(-10),
  currentMessage
];

// Send to LLM
const response = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages
});

console.log(response.choices[0].message.content);`}
        />

        <p className="text-sm text-[#aaa]">
          This example uses recent history. Production applications should also
          manage token limits and reserve space for output.
        </p>
      </section>

      {/* Best Practices */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Best Practices</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Send only relevant information to the LLM.</li>
          <li>Keep system instructions clear and concise.</li>
          <li>Remove unnecessary old messages.</li>
          <li>Summarize long conversations when needed.</li>
          <li>Use retrieval for large knowledge bases.</li>
          <li>Monitor token usage and API costs.</li>
          <li>Reserve enough tokens for the model's response.</li>
          <li>Do not blindly trust summaries or retrieved content.</li>
        </ul>
      </section>

      {/* Difference */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          7. Conversation History vs Context Management
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Conversation History</th>
                <th className="p-3">Context Management</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Stores previous messages.</td>
                <td className="p-3">Controls information sent to LLM.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Focuses on conversation records.</td>
                <td className="p-3">Focuses on relevant context.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Can grow over time.</td>
                <td className="p-3">Keeps context within model limits.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Context Management?",
            a: "It is the process of organizing and controlling information sent to an LLM.",
          },
          {
            q: "Why is Context Management important?",
            a: "It helps maintain relevant information, avoid context limit errors, and improve response quality.",
          },
          {
            q: "What is a context window?",
            a: "It is the maximum amount of tokens a model can process in a single request.",
          },
          {
            q: "What is context truncation?",
            a: "It removes older or unnecessary messages to reduce context size.",
          },
          {
            q: "What is conversation summarization?",
            a: "It converts a long conversation into a shorter summary while preserving important details.",
          },
          {
            q: "What is a sliding window strategy?",
            a: "It keeps a fixed number of recent messages and removes older messages as new ones arrive.",
          },
          {
            q: "How does RAG help with context management?",
            a: "RAG retrieves relevant information from external sources instead of placing an entire knowledge base in the prompt.",
          },
          {
            q: "What happens when context exceeds the model limit?",
            a: "The API may reject the request with a context-length error, so the application must reduce or restructure the input.",
          },
          {
            q: "Does more context always mean better answers?",
            a: "No. Irrelevant or excessive context can increase cost and distract the model from important information.",
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

export default ContextManagement;

import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ChatCompletions = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Chat Completions</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Chat Completions is an API interaction pattern where we send
          conversation messages to an AI model and receive a generated
          response.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Chat Completions?</h2>
        <p className="leading-7 text-[#aaa]">
          Chat Completions allow developers to communicate with AI models
          using structured messages. The model processes these messages
          and generates an appropriate response.
        </p>

        <CodeBlock code={`Application
     |
     v
Chat Completions API
     |
     v
AI Model
     |
     v
Generated Message
     |
     v
Application`} />

        <p className="text-sm text-[#aaa]">
          Example: A user asks a question, the AI processes it, and
          returns an answer.
        </p>
      </section>

      {/* Structure */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Message Structure</h2>
        <p className="text-[#aaa]">
          A chat completion request contains an array of messages.
          Each message generally has a role and content.
        </p>

        <CodeBlock language="json" code={`{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is JavaScript?"
    }
  ]
}`} />

        <p className="text-sm text-[#aaa]">
          The model uses the messages as conversation context to
          generate its response.
        </p>
      </section>

      {/* Roles */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Different Message Roles</h2>

        <div className="space-y-3">
          {[
            ["System", "Provides high-level behavior and instructions for the assistant."],
            ["Developer", "Provides application-level instructions. Supported by some APIs and models."],
            ["User", "Contains the user's questions or input."],
            ["Assistant", "Contains the AI assistant's generated messages."],
            ["Tool", "Contains the result returned by an external tool."]
          ].map(([title, desc], index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="font-semibold text-[#FC6C26]">{index + 1}. {title}</h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. How Chat Completions Work</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            "User sends a message",
            "Backend creates messages array",
            "Request goes to AI API",
            "Model generates response",
            "API returns completion",
            "Backend sends answer to frontend"
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div className="rounded-lg bg-white/5 p-3 text-sm">
                {index + 1}. {step}
              </div>
              {index !== 5 && (
                <div className="text-[#FC6C26]">↓</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Request */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Creating a Chat Completion</h2>
        <p className="text-[#aaa]">
          Example using the Groq SDK. The same basic pattern is
          available in other compatible providers.
        </p>

        <CodeBlock code={`const completion = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",

  messages: [
    {
      role: "system",
      content: "You are a helpful programming assistant."
    },
    {
      role: "user",
      content: "Explain React in simple words."
    }
  ]
});

console.log(
  completion.choices[0].message.content
);`} />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Properties</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li><strong>model:</strong> Selects the AI model.</li>
            <li><strong>messages:</strong> Contains conversation messages.</li>
            <li><strong>choices:</strong> Contains generated completion choices.</li>
            <li><strong>message.content:</strong> Contains generated text.</li>
          </ul>
        </div>
      </section>

      {/* Conversation History */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Maintaining Conversation History</h2>
        <p className="text-[#aaa] leading-7">
          Most chat completion APIs are stateless at the request level.
          This means the application generally needs to send previous
          messages again to maintain conversation context.
        </p>

        <CodeBlock code={`const messages = [
  {
    role: "system",
    content: "You are a helpful assistant."
  },
  {
    role: "user",
    content: "My name is Mayur."
  },
  {
    role: "assistant",
    content: "Nice to meet you, Mayur!"
  },
  {
    role: "user",
    content: "What is my name?"
  }
];

const completion = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages
});`} />

        <p className="text-sm text-[#aaa]">
          The previous user and assistant messages provide context
          for the latest question.
        </p>
      </section>

      {/* Parameters */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Parameters</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Parameter</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["model", "Selects the AI model."],
                ["messages", "Provides conversation context."],
                ["temperature", "Controls response randomness where supported."],
                ["max_tokens", "Limits generated tokens where supported."],
                ["stream", "Enables streaming responses."],
                ["top_p", "Controls token sampling using nucleus sampling."]
              ].map(([name, desc], index) => (
                <tr key={index} className="border-t border-white/10">
                  <td className="p-3 font-semibold text-white">{name}</td>
                  <td className="p-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#999]">
          Parameter names, limits, and support can differ between
          providers and models. Always check the provider's documentation.
        </p>
      </section>

      {/* Response */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Understanding API Response</h2>

        <CodeBlock language="json" code={`{
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "React is a JavaScript library."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 8,
    "total_tokens": 20
  }
}`} />

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li><strong>choices:</strong> Generated completion options.</li>
          <li><strong>message:</strong> Contains the assistant response.</li>
          <li><strong>finish_reason:</strong> Explains why generation stopped.</li>
          <li><strong>usage:</strong> Provides token consumption information.</li>
        </ul>
      </section>

      {/* Multi turn */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Multi-Turn Conversation</h2>
        <p className="text-[#aaa]">
          A multi-turn conversation contains multiple exchanges between
          the user and assistant.
        </p>

        <CodeBlock code={`User: What is Node.js?

Assistant: Node.js is a JavaScript runtime.

User: Where is it used?

Assistant: It is commonly used for backend development.`} />

        <p className="text-sm text-[#aaa]">
          To maintain this context with Chat Completions, preserve
          and send the previous messages with each new request.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Chat Completions uses structured conversation messages.</li>
          <li>Every message contains a role and content.</li>
          <li>System and developer messages guide assistant behavior.</li>
          <li>User messages contain user input.</li>
          <li>Assistant messages contain generated responses.</li>
          <li>Previous messages help maintain conversation context.</li>
          <li>Most Chat Completions requests require history to be resent.</li>
          <li>Streaming allows progressive response delivery.</li>
          <li>Tool calls can connect the model to external functions.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">11. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Chat Completions?",
            a: "Chat Completions are API requests where structured conversation messages are sent to an AI model to generate a response."
          },
          {
            q: "What is the purpose of the messages array?",
            a: "It stores conversation messages, including instructions, user input, and previous assistant responses."
          },
          {
            q: "What are the common message roles?",
            a: "System, developer, user, assistant, and tool. Exact role support depends on the API provider."
          },
          {
            q: "Why do we maintain conversation history?",
            a: "Conversation history provides previous context so the model can understand follow-up questions."
          },
          {
            q: "Are Chat Completions stateful?",
            a: "Generally, individual Chat Completions requests are stateless. The application usually manages and resends conversation history."
          },
          {
            q: "What is temperature?",
            a: "Temperature controls the randomness of generated responses where the selected model and provider support it."
          },
          {
            q: "What is finish_reason?",
            a: "It indicates why the model stopped generating, for example because it completed the response or reached a token limit."
          },
          {
            q: "What is the difference between streaming and non-streaming?",
            a: "Non-streaming returns the completed response at once, while streaming sends response chunks progressively."
          },
          {
            q: "What is a multi-turn conversation?",
            a: "It is a conversation containing multiple user and assistant exchanges where previous messages provide context for new responses."
          }
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
              <span className="font-semibold text-green-400"> </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default ChatCompletions;
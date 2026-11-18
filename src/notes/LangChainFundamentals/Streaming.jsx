import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Streaming = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 08
        </p>
        <h1 className="mt-2 text-3xl font-bold">Streaming in LangChain</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Streaming allows us to receive an LLM response incrementally as it is
          generated instead of waiting for the entire response to finish.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Streaming?</h2>

        <p className="leading-7 text-[#aaa]">
          Normally, when we call an LLM using invoke(), we wait until the model
          generates its complete response.
        </p>

        <p className="leading-7 text-[#aaa]">
          With streaming, the model sends its response in small chunks. We can
          display these chunks immediately.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Without Streaming</h3>

        <CodeBlock
          code={`User sends a prompt
        |
        v
   LLM generates
   complete response
        |
        v
   Response received
        |
        v
   Display to user`}
        />

        <h3 className="font-semibold text-[#FC6C26]">With Streaming</h3>

        <CodeBlock
          code={`User sends a prompt
        |
        v
   LLM starts generating
        |
        v
   Chunk 1 -> Display
   Chunk 2 -> Display
   Chunk 3 -> Display
   Chunk 4 -> Display
        |
        v
   Complete response`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Streaming improves perceived response speed because users can start
          reading before generation finishes.
        </p>
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need Streaming?</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Better User Experience",
              "Users see responses as they are generated.",
            ],
            [
              "Lower Perceived Latency",
              "Users do not need to wait for the entire response.",
            ],
            [
              "Real-Time Applications",
              "Useful for chatbots and AI assistants.",
            ],
            ["Large Responses", "Long answers can be displayed progressively."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chunks */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. What are Streaming Chunks?</h2>

        <p className="leading-7 text-[#aaa]">
          A chunk is a small piece of the response produced by the model during
          streaming.
        </p>

        <CodeBlock
          code={`Chunk 1: "LangChain"
Chunk 2: " is"
Chunk 3: " a"
Chunk 4: " framework"
Chunk 5: " for"
Chunk 6: " building AI applications."`}
        />

        <p className="leading-7 text-[#aaa]">
          When we combine these chunks, we get the complete response.
        </p>

        <CodeBlock
          code={`const fullResponse =
  "LangChain" +
  " is" +
  " a" +
  " framework" +
  " for" +
  " building AI applications.";

console.log(fullResponse);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Chunk boundaries are determined by the model and provider. A chunk is
          not necessarily a complete word or sentence.
        </p>
      </section>

      {/* Model stream */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Streaming with a Chat Model</h2>

        <p className="leading-7 text-[#aaa]">
          LangChain chat models provide the stream() method to receive AI
          message chunks.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  streaming: true
});

const stream = await model.stream(
  "Explain Node.js in simple words."
);

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          model.stream() returns an asynchronous iterable. We use for await...of
          to receive each chunk as it arrives.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            The streaming option depends on the model integration. In
            integrations that support streaming, calling stream() is the key
            operation used to consume incremental output.
          </p>
        </div>
      </section>

      {/* LCEL */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Streaming with LCEL</h2>

        <p className="leading-7 text-[#aaa]">
          We can also stream the output of a complete LCEL chain using its
          stream() method.
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

import {
  StringOutputParser
} from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words."
);

const model = new ChatOpenAI({
  model: "gpt-4o-mini"
});

const parser = new StringOutputParser();

const chain = prompt
  .pipe(model)
  .pipe(parser);

const stream = await chain.stream({
  topic: "Artificial Intelligence"
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}`}
        />

        <CodeBlock
          code={`User Input
    |
    v
Prompt Template
    |
    v
Chat Model
    |
    v
String Output Parser
    |
    v
Streaming Chunks
    |
    v
Display to User`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The parser converts message chunks into text chunks, allowing us to
          display plain text progressively.
        </p>
      </section>

      {/* Stream methods */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Streaming Methods</h2>

        <p className="leading-7 text-[#aaa]">
          LangChain provides different methods for handling streaming workflows.
        </p>

        <div className="space-y-3">
          {[
            ["stream()", "Streams the output of a Runnable as chunks."],
            [
              "astream()",
              "Asynchronous streaming interface for receiving chunks.",
            ],
            [
              "astreamEvents()",
              "Provides detailed execution events from a Runnable and its child components.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-[#FC6C26]">Using astream()</h3>

        <CodeBlock
          code={`const stream = await chain.astream({
  topic: "Machine Learning"
});

for await (const chunk of stream) {
  console.log(chunk);
}`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Using astreamEvents()</h3>

        <CodeBlock
          code={`const eventStream = await chain.astreamEvents(
  {
    topic: "Machine Learning"
  },
  {
    version: "v2"
  }
);

for await (const event of eventStream) {
  console.log(
    event.event,
    event.name,
    event.data
  );
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          astreamEvents() is useful when we want to observe detailed events such
          as model starts, token generation, and component completion.
        </p>
      </section>

      {/* Events */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Streaming Events</h2>

        <p className="leading-7 text-[#aaa]">
          While streaming a complete chain, LangChain can emit different events
          that describe what is happening internally.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "event": "on_chat_model_stream",
  "name": "ChatOpenAI",
  "data": {
    "chunk": "Hello"
  }
}`}
        />

        <p className="leading-7 text-[#aaa]">
          Some common event names include:
        </p>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>
            <span className="text-[#FC6C26]">on_chain_start:</span> A chain
            starts execution.
          </li>
          <li>
            <span className="text-[#FC6C26]">on_chain_end:</span> A chain
            finishes execution.
          </li>
          <li>
            <span className="text-[#FC6C26]">on_chat_model_start:</span> A chat
            model starts.
          </li>
          <li>
            <span className="text-[#FC6C26]">on_chat_model_stream:</span> A chat
            model emits a chunk.
          </li>
          <li>
            <span className="text-[#FC6C26]">on_chat_model_end:</span> A chat
            model finishes.
          </li>
        </ul>

        <p className="text-sm leading-6 text-[#aaa]">
          These events are useful for debugging, monitoring, and building
          advanced streaming interfaces.
        </p>
      </section>

      {/* React */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          8. Streaming in React Applications
        </h2>

        <p className="leading-7 text-[#aaa]">
          In a React application, the frontend usually receives streamed data
          from a backend API.
        </p>

        <CodeBlock
          code={`React Frontend
      |
      | HTTP Request
      v
Node.js Backend
      |
      v
LangChain Chain
      |
      v
LLM Provider
      |
      v
Response Chunks
      |
      v
Node.js Backend
      |
      | HTTP Stream
      v
React Frontend
      |
      v
Update UI Incrementally`}
        />

        <p className="leading-7 text-[#aaa]">
          Example backend route using Express and a LangChain chain:
        </p>

        <CodeBlock
          code={`app.get("/api/chat", async (req, res) => {
  res.setHeader(
    "Content-Type",
    "text/plain; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-cache, no-transform"
  );

  res.setHeader(
    "X-Accel-Buffering",
    "no"
  );

  try {
    const stream = await chain.stream({
      topic: req.query.topic || "LangChain"
    });

    for await (const chunk of stream) {
      if (res.destroyed) break;

      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).end("Streaming failed");
    } else if (!res.destroyed) {
      res.end();
    }
  }
});`}
        />

        <p className="leading-7 text-[#aaa]">
          React frontend can consume this response using the Fetch API and a
          ReadableStream reader.
        </p>

        <CodeBlock
          language="jsx"
          code={`import { useState } from "react";

function Chat() {
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    setResponse("");

    const res = await fetch(
      "/api/chat?topic=LangChain"
    );

    if (!res.ok || !res.body) {
      throw new Error("Unable to start stream");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true
        });

        setResponse((prev) => prev + chunk);
      }

      const remaining = decoder.decode();

      if (remaining) {
        setResponse((prev) => prev + remaining);
      }
    } finally {
      reader.releaseLock();
    }
  };

  return (
    <div>
      <button onClick={handleGenerate}>
        Generate Response
      </button>

      <p>{response}</p>
    </div>
  );
}

export default Chat;`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The backend streams chunks, and React appends each received chunk to
          the existing response.
        </p>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.05] p-4">
          <p className="font-semibold text-[#FC6C26]">Production Note</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            This example uses plain text streaming. For production, consider
            authentication, request cancellation, disconnect handling, timeouts,
            and structured protocols such as Server-Sent Events (SSE).
          </p>
        </div>
      </section>

      {/* Buffering */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Streaming vs Buffering</h2>

        <p className="leading-7 text-[#aaa]">
          Buffering means collecting data before sending or processing it.
          Streaming sends or processes data incrementally.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-[#1A1A1A] text-[#FC6C26]">
              <tr>
                <th className="p-3">Streaming</th>
                <th className="p-3">Buffering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[#aaa]">
              <tr>
                <td className="p-3">Sends chunks progressively.</td>
                <td className="p-3">Collects data before sending.</td>
              </tr>
              <tr>
                <td className="p-3">Lower perceived latency.</td>
                <td className="p-3">User may wait for complete output.</td>
              </tr>
              <tr>
                <td className="p-3">Useful for AI chat interfaces.</td>
                <td className="p-3">Useful when complete data is required.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Streaming delivers model output incrementally.</li>
          <li>A chunk is a small piece of generated output.</li>
          <li>model.stream() streams chat model output.</li>
          <li>chain.stream() streams the output of an LCEL chain.</li>
          <li>for await...of consumes asynchronous streams.</li>
          <li>
            StringOutputParser can convert message chunks into text chunks.
          </li>
          <li>astreamEvents() provides detailed execution events.</li>
          <li>
            React can consume backend streams using Fetch and ReadableStream.
          </li>
          <li>
            Streaming improves perceived latency, not necessarily total
            generation time.
          </li>
          <li>
            Network proxies and servers may buffer chunks, so configure them
            appropriately.
          </li>
          <li>
            Always handle errors, cancellation, and client disconnections.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">11. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Streaming in LangChain?",
            a: "Streaming allows us to receive model output incrementally instead of waiting for the complete response.",
          },
          {
            q: "Why do we use Streaming?",
            a: "It improves perceived response speed and provides a better experience in real-time AI applications.",
          },
          {
            q: "What is a streaming chunk?",
            a: "A chunk is a small piece of output received while the model generates its response.",
          },
          {
            q: "What is the difference between invoke() and stream()?",
            a: "invoke() returns the completed output, while stream() provides output incrementally.",
          },
          {
            q: "How do we stream an LLM response in LangChain?",
            a: "We can call model.stream() or chain.stream() and consume the returned async iterable using for await...of.",
          },
          {
            q: "What is astreamEvents()?",
            a: "It provides detailed events from a Runnable and its child components during execution.",
          },
          {
            q: "What is the role of StringOutputParser in streaming?",
            a: "It converts AI message chunks into plain text chunks.",
          },
          {
            q: "How can React display streamed AI responses?",
            a: "The backend sends response chunks, and React reads them using Fetch API and ReadableStream.",
          },
          {
            q: "Does streaming reduce total LLM generation time?",
            a: "Not necessarily. It reduces perceived latency because users receive the response before generation finishes.",
          },
          {
            q: "What is the difference between Streaming and Buffering?",
            a: "Streaming sends data progressively, while buffering collects data before sending or processing it.",
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

export default Streaming;

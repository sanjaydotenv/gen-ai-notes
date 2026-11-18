import React from "react";
import CodeBlock from "../../components/CodeBlock";

const StreamingResponses = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">Streaming Responses</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Streaming allows an AI model to send its generated response
          progressively instead of waiting for the complete response.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Streaming?</h2>
        <p className="leading-7 text-[#aaa]">
          Normally, an application waits until the AI generates the
          entire response. With streaming, the response arrives in
          smaller chunks as generation progresses.
        </p>

        <CodeBlock code={`Without Streaming:

Request → Wait → Complete Response


With Streaming:

Request → Chunk 1 → Chunk 2 → Chunk 3 → Finish`} />

        <p className="text-sm text-[#aaa]">
          Example: When you ask ChatGPT a question, the answer starts
          appearing before the entire response is generated.
        </p>
      </section>

      {/* Comparison */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Streaming vs Non-Streaming</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Non-Streaming</th>
                <th className="p-3">Streaming</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Waits for full response</td>
                <td className="p-3">Receives chunks progressively</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">One complete response</td>
                <td className="p-3">Multiple response chunks</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Higher perceived waiting time</td>
                <td className="p-3">Faster initial display</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Simpler implementation</td>
                <td className="p-3">Requires stream handling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How Streaming Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            "User sends a prompt",
            "Backend sends request with streaming enabled",
            "AI model generates response",
            "Response is divided into chunks",
            "Chunks travel to the backend",
            "Frontend displays chunks progressively"
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

      {/* SSE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. What is SSE?</h2>
        <p className="leading-7 text-[#aaa]">
          Server-Sent Events (SSE) is a technology that allows a server
          to send data to a client over a single HTTP connection.
          It is commonly used for streaming AI responses.
        </p>

        <CodeBlock code={`Client
   |
   | HTTP Request
   v
Server
   |
   | SSE Events
   v
Client receives:
   |
   ├── Chunk 1
   ├── Chunk 2
   ├── Chunk 3
   └── Done`} />

        <p className="text-sm text-[#aaa]">
          SSE is one-way communication: the server sends events to
          the client. The client can send another request separately.
        </p>
      </section>

      {/* Groq */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Streaming with Groq API</h2>
        <p className="text-[#aaa] leading-7">
          Set <code className="text-[#FC6C26]">stream: true</code> to
          receive response chunks instead of one complete response.
        </p>

        <CodeBlock code={`const stream = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages: [
    {
      role: "user",
      content: "Explain artificial intelligence."
    }
  ],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";

  process.stdout.write(content);
}`} />

        <p className="text-sm text-[#aaa]">
          <strong>delta.content</strong> contains the newly generated
          text in each chunk. Some chunks may contain metadata without
          text.
        </p>
      </section>

      {/* Express */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Streaming with Express Backend</h2>
        <p className="text-[#aaa] leading-7">
          Express can forward generated chunks to the frontend using
          Server-Sent Events.
        </p>

        <CodeBlock code={`app.post("/api/stream", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await groq.chat.completions.create({
      model: "YOUR_MODEL_ID",
      messages: [
        { role: "user", content: prompt }
      ],
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        res.write(
          \`data: \${JSON.stringify({ content })}\\n\\n\`
        );
      }
    }

    res.write("data: [DONE]\\n\\n");
    res.end();

  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: "Streaming failed"
      });
    }

    res.end();
  }
});`} />

        <p className="text-sm text-[#aaa]">
          The backend converts each AI chunk into an SSE event and
          forwards it to the client.
        </p>
      </section>

      {/* Frontend */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Receiving Stream in React</h2>
        <p className="text-[#aaa] leading-7">
          The Fetch API provides a ReadableStream through response.body.
          We can read incoming chunks using a reader.
        </p>

        <CodeBlock code={`const response = await fetch("/api/stream", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ prompt: "Explain React" })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  const text = decoder.decode(value, {
    stream: true
  });

  console.log(text);
}`} />

        <p className="text-sm text-[#aaa]">
          Important: Network chunks are not guaranteed to match
          individual SSE events. A production client should buffer
          incomplete data, split complete events, and parse their data.
        </p>
      </section>

      {/* Benefits */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Benefits of Streaming</h2>

        <div className="space-y-3">
          {[
            ["Better User Experience", "Users see the answer appearing progressively."],
            ["Lower Perceived Latency", "Users do not need to wait for the entire response."],
            ["Real-Time Feedback", "Applications can display generated content immediately."],
            ["Long Responses", "Useful for lengthy answers and AI-generated content."]
          ].map(([title, desc], index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Streaming sends generated content progressively.</li>
          <li>Non-streaming returns the completed response.</li>
          <li>Groq and OpenAI-compatible APIs support streaming.</li>
          <li>SSE is commonly used for server-to-client streaming.</li>
          <li>Fetch API can read streams using response.body.</li>
          <li>ReadableStream provides a reader to consume chunks.</li>
          <li>TextDecoder converts received bytes into text.</li>
          <li>Handle errors, disconnections, and incomplete events.</li>
          <li>Streaming improves perceived responsiveness, not necessarily total generation speed.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">10. Interview Questions & Answers</h2>

        {[
          {
            q: "What is streaming in AI APIs?",
            a: "Streaming is a technique where an AI model sends generated output progressively in smaller chunks instead of returning the complete response at once."
          },
          {
            q: "What is the difference between streaming and non-streaming?",
            a: "Non-streaming waits for the complete response, while streaming delivers response chunks progressively."
          },
          {
            q: "What is SSE?",
            a: "Server-Sent Events is a technology that allows a server to send events to a client over a persistent HTTP connection."
          },
          {
            q: "What is ReadableStream?",
            a: "ReadableStream is a Web API that allows applications to read data progressively as it becomes available."
          },
          {
            q: "What is TextDecoder?",
            a: "TextDecoder converts binary data, such as Uint8Array chunks, into readable text."
          },
          {
            q: "What is the purpose of stream: true?",
            a: "It enables streaming mode in supported AI APIs so that generated output is delivered progressively."
          },
          {
            q: "What is delta.content?",
            a: "In OpenAI-compatible Chat Completions streaming, delta.content contains newly generated text from an individual chunk."
          },
          {
            q: "Does streaming reduce total generation time?",
            a: "Not necessarily. It mainly reduces perceived waiting time because users can see the response before generation finishes."
          },
          {
            q: "Why do we use streaming in AI chatbots?",
            a: "It provides a more responsive experience by displaying generated text progressively instead of making users wait for the complete answer."
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

export default StreamingResponses;
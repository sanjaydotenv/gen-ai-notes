import React from "react";
import CodeBlock from "../../components/CodeBlock";

const GroqAPI = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">Groq API</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Groq API allows developers to run supported AI models through
          Groq's high-speed inference infrastructure and integrate them
          into their applications.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Groq API?</h2>
        <p className="leading-7 text-[#aaa]">
          Groq provides an inference platform that runs AI models and
          generates responses through APIs. It focuses on fast and
          efficient model inference using its specialized LPU hardware.
        </p>

        <CodeBlock code={`Your Application
       |
       v
    Groq API
       |
       v
 Groq Inference Engine
       |
       v
  Supported AI Model
       |
       v
 Generated Response
       |
       v
Your Application`} />

        <p className="text-sm text-[#aaa]">
          Important: Groq is primarily an inference provider. It runs
          models from different organizations; it does not mean every
          model available on Groq was created by Groq.
        </p>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Key Features</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Fast Inference", "Generate model responses with low latency."],
            ["Multiple Models", "Access supported models from different providers."],
            ["Chat Completions", "Build conversational AI applications."],
            ["Streaming", "Receive generated tokens progressively."],
            ["Tool Calling", "Connect models with external functions."],
            ["OpenAI Compatibility", "Reuse many OpenAI-style API integrations."]
          ].map(([title, desc], index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Getting Started</h2>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 01 — Create API Key</p>
          <p className="text-sm text-[#aaa]">
            Create your API key from the Groq developer platform.
          </p>
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-[#FC6C26] underline"
          >
            Get Groq API Key →
          </a>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 02 — Install Packages</p>
          <CodeBlock language="bash" code={`npm install groq-sdk dotenv`} />
          <p className="text-sm text-[#aaa]">
            <strong>groq-sdk:</strong> Official Groq JavaScript SDK.
            <br />
            <strong>dotenv:</strong> Loads environment variables.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 03 — Configure Environment</p>
          <CodeBlock language="bash" code={`# .env

GROQ_API_KEY=your_api_key_here`} />
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-semibold text-red-400">Security Warning</p>
          <p className="mt-1 text-sm text-[#aaa]">
            Never expose your API key in frontend code or upload your
            .env file to GitHub. Keep API requests on your backend.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Backend Architecture</h2>

        <CodeBlock code={`React Frontend
      |
      | HTTP Request
      v
Node.js / Express Backend
      |
      | Groq SDK
      v
    Groq API
      |
      v
Inference Engine
      |
      v
   AI Model
      |
      v
Generated Response
      |
      v
Express Backend
      |
      v
React Frontend`} />
      </section>

      {/* Client */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Initialize Groq Client</h2>
        <p className="text-[#aaa] leading-7">
          Import Groq from the SDK and initialize the client using
          your API key.
        </p>

        <CodeBlock code={`import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default groq;`} />
      </section>

      {/* First Request */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Make Your First API Request</h2>
        <p className="text-[#aaa] leading-7">
          Groq provides the Chat Completions API. It accepts messages
          and returns a generated response from the selected model.
        </p>

        <CodeBlock code={`import groq from "./groq.js";

const completion = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages: [
    {
      role: "user",
      content: "Explain Node.js in simple words."
    }
  ]
});

console.log(
  completion.choices[0].message.content
);`} />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Understanding the Code</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li><strong>groq:</strong> Initialized SDK client.</li>
            <li><strong>chat.completions.create():</strong> Sends a chat completion request.</li>
            <li><strong>model:</strong> Specifies the model to use.</li>
            <li><strong>messages:</strong> Contains conversation messages.</li>
            <li><strong>choices:</strong> Contains generated completion choices.</li>
            <li><strong>message.content:</strong> Contains the generated text.</li>
          </ul>
        </div>

        <p className="text-sm text-[#999]">
          Use an active model ID from Groq's model list.
          Model availability can change over time.
        </p>
      </section>

      {/* Message Roles */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Understanding Message Roles</h2>
        <p className="text-[#aaa]">
          Chat Completions uses different message roles to describe
          the purpose of each message.
        </p>

        <CodeBlock code={`const messages = [
  {
    role: "system",
    content: "You are a helpful coding assistant."
  },
  {
    role: "user",
    content: "What is React?"
  },
  {
    role: "assistant",
    content: "React is a JavaScript library."
  },
  {
    role: "user",
    content: "What is a component?"
  }
];`} />

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li><strong>system:</strong> Defines the assistant's behavior.</li>
          <li><strong>user:</strong> Contains the user's input.</li>
          <li><strong>assistant:</strong> Contains the assistant's previous response.</li>
          <li><strong>tool:</strong> Contains the result returned by a tool.</li>
        </ul>
      </section>

      {/* Express */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Integrating with Express</h2>
        <p className="text-[#aaa]">
          Create an endpoint that accepts a prompt and returns
          a response generated by Groq.
        </p>

        <CodeBlock code={`import express from "express";
import groq from "./groq.js";

const app = express();

app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const completion = await groq.chat.completions.create({
      model: "YOUR_MODEL_ID",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Groq API request failed"
    });
  }
});

app.listen(3000);`} />
      </section>

      {/* Streaming */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Streaming Responses</h2>
        <p className="text-[#aaa] leading-7">
          Normally, the application waits until the complete response
          is generated. Streaming allows the application to receive
          response chunks progressively.
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

        <CodeBlock code={`Normal Response:
Request → Wait → Complete Response

Streaming Response:
Request → Chunk 1 → Chunk 2 → Chunk 3 → Finish`} />

        <p className="text-sm text-[#aaa]">
          Streaming improves perceived responsiveness because users
          can see generated text before the entire answer is ready.
        </p>
      </section>

      {/* OpenAI compatibility */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. OpenAI Compatibility</h2>
        <p className="text-[#aaa] leading-7">
          Groq provides OpenAI-compatible API endpoints. This means
          you can often reuse the OpenAI SDK by changing the API key
          and base URL.
        </p>

        <CodeBlock code={`import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const response = await client.chat.completions.create({
  model: "YOUR_MODEL_ID",
  messages: [
    {
      role: "user",
      content: "Explain JavaScript."
    }
  ]
});

console.log(response.choices[0].message.content);`} />

        <p className="text-sm text-[#aaa]">
          Important: OpenAI compatibility does not mean every OpenAI
          feature or parameter is supported by Groq. Check Groq's
          documentation for supported features.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">11. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Groq is an AI inference platform.</li>
          <li>Groq uses specialized LPU hardware for inference.</li>
          <li>groq-sdk is its official JavaScript SDK.</li>
          <li>Chat Completions API uses messages and model IDs.</li>
          <li>Streaming sends generated content in chunks.</li>
          <li>Groq supports many models from different providers.</li>
          <li>Groq provides OpenAI-compatible API endpoints.</li>
          <li>Model availability, speed, and rate limits depend on the model and account.</li>
          <li>Keep API keys secure on the backend.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">12. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Groq API?",
            a: "Groq API is a developer interface that provides access to supported AI models through Groq's inference infrastructure."
          },
          {
            q: "What is Groq mainly known for?",
            a: "Groq is known for fast AI inference using its specialized Language Processing Unit (LPU) hardware."
          },
          {
            q: "What is an LPU?",
            a: "LPU stands for Language Processing Unit. It is specialized hardware designed by Groq for fast language model inference."
          },
          {
            q: "Which SDK is used for Groq in Node.js?",
            a: "The official JavaScript SDK is groq-sdk, which can be installed using npm install groq-sdk."
          },
          {
            q: "What is Chat Completions API?",
            a: "It is an API that accepts a list of conversation messages and returns a model-generated completion."
          },
          {
            q: "What is streaming in Groq API?",
            a: "Streaming allows the application to receive generated response chunks progressively instead of waiting for the complete response."
          },
          {
            q: "Is Groq OpenAI compatible?",
            a: "Yes. Groq provides OpenAI-compatible endpoints, allowing developers to reuse many OpenAI SDK integrations by changing the base URL and API key."
          },
          {
            q: "Does Groq create all the models available on its platform?",
            a: "No. Groq provides inference infrastructure for models developed by different organizations."
          },
          {
            q: "How do you access the generated text?",
            a: "In a Chat Completions response, the generated text is available at choices[0].message.content."
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
              <span className="font-semibold text-green-400"></span>
              {item.a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default GroqAPI;
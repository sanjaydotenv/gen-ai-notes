import React from "react";
import CodeBlock from "../../components/CodeBlock";

const OpenAIAPI = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">OpenAI API</h1>
        <p className="mt-3 leading-7 text-[#999]">
          OpenAI API allows developers to integrate AI models into their
          applications using HTTP requests or official SDKs.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is OpenAI API?</h2>
        <p className="leading-7 text-[#aaa]">
          OpenAI API is a developer platform that provides access to AI
          models for generating text, analyzing images, processing audio,
          building AI agents, and more.
        </p>

        <CodeBlock code={`Your Application
       |
       v
   OpenAI API
       |
       v
   AI Model
       |
       v
  Generated Response
       |
       v
Your Application`} />

        <p className="text-sm text-[#aaa]">
          Example: You can build an AI chatbot, coding assistant,
          document analyzer, or customer support bot using this API.
        </p>
      </section>

      {/* API vs ChatGPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. OpenAI API vs ChatGPT</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">ChatGPT</th>
                <th className="p-3">OpenAI API</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Ready-to-use AI product</td>
                <td className="p-3">Developer platform</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Used directly by users</td>
                <td className="p-3">Integrated into applications</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">ChatGPT subscription</td>
                <td className="p-3">Separate API billing</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Limited customization</td>
                <td className="p-3">Developer-controlled integration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#999]">
          Important: A ChatGPT subscription does not automatically
          provide free API usage.
        </p>
      </section>

      {/* Setup */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Getting Started</h2>
        <p className="text-[#aaa]">
          Follow these steps to connect your Node.js application with
          OpenAI API.
        </p>

        <div className="space-y-2">
          <p className="text-sm text-[#FC6C26] font-semibold">STEP 01 — Create API Key</p>
          <p className="text-sm text-[#aaa]">
            Create an API key from the OpenAI developer platform.
          </p>
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-[#FC6C26] underline"
          >
            OpenAI API Keys →
          </a>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-[#FC6C26] font-semibold">STEP 02 — Install Packages</p>
          <CodeBlock language="bash" code={`npm install openai dotenv`} />
          <p className="text-sm text-[#aaa]">
            <strong>openai:</strong> Official Node.js SDK.
            <br />
            <strong>dotenv:</strong> Loads environment variables from a .env file.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-[#FC6C26] font-semibold">STEP 03 — Configure Environment</p>
          <CodeBlock language="bash" code={`# .env

OPENAI_API_KEY=your_api_key_here`} />
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-semibold text-red-400">Security Warning</p>
          <p className="mt-1 text-sm leading-6 text-[#aaa]">
            Never expose your API key in React frontend code or upload
            your .env file to GitHub. Keep API calls on your backend.
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
      | OpenAI SDK
      v
OpenAI API
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

        <p className="text-sm text-[#aaa]">
          The frontend communicates with your backend. Your backend
          securely uses the API key to communicate with OpenAI.
        </p>
      </section>

      {/* Client */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Initialize OpenAI Client</h2>
        <p className="text-[#aaa] leading-7">
          First, import the OpenAI SDK and create a client instance.
          The SDK reads OPENAI_API_KEY from the environment by default.
        </p>

        <CodeBlock code={`import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI();

export default client;`} />
      </section>

      {/* First Request */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Make Your First API Request</h2>
        <p className="text-[#aaa] leading-7">
          OpenAI provides the Responses API for sending input to a model
          and receiving its generated output.
        </p>

        <CodeBlock code={`import client from "./openai.js";

const response = await client.responses.create({
  model: "YOUR_MODEL_NAME",
  input: "Explain Node.js in simple words."
});

console.log(response.output_text);`} />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Understanding the Code</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li><strong>client:</strong> OpenAI SDK instance.</li>
            <li><strong>responses.create():</strong> Sends a request to the Responses API.</li>
            <li><strong>model:</strong> Specifies which available AI model to use.</li>
            <li><strong>input:</strong> Contains the text or other input sent to the model.</li>
            <li><strong>output_text:</strong> Provides the generated text output.</li>
          </ul>
        </div>

        <p className="text-sm text-[#999]">
          Replace YOUR_MODEL_NAME with a model available to your API account.
        </p>
      </section>

      {/* Express */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Integrating with Express</h2>
        <p className="text-[#aaa]">
          A practical example of creating an AI endpoint in a Node.js backend.
        </p>

        <CodeBlock code={`import express from "express";
import client from "./openai.js";

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

    const response = await client.responses.create({
      model: "YOUR_MODEL_NAME",
      input: prompt
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI request failed"
    });
  }
});

app.listen(3000);`} />

        <p className="text-sm text-[#aaa]">
          Now your React frontend can send a POST request to
          <span className="text-[#FC6C26]"> /api/ask </span>
          and receive an AI-generated answer.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Concepts</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>OpenAI API provides programmatic access to AI models.</li>
          <li>API keys authenticate your application.</li>
          <li>OpenAI provides an official Node.js SDK.</li>
          <li>API usage is billed separately from ChatGPT subscriptions.</li>
          <li>Never expose API keys in frontend applications.</li>
          <li>Use environment variables to store secrets.</li>
          <li>Use try/catch and validate input in backend API routes.</li>
          <li>Choose a model based on your application's requirements and budget.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What is OpenAI API?",
            a: "OpenAI API is a developer platform that allows applications to communicate with OpenAI models and use their AI capabilities."
          },
          {
            q: "What is an API key?",
            a: "An API key is a secret credential used to authenticate requests made to an API."
          },
          {
            q: "What is the OpenAI Node.js SDK?",
            a: "It is an official JavaScript library that makes it easier to interact with OpenAI APIs from Node.js applications."
          },
          {
            q: "Why should we call OpenAI API from the backend?",
            a: "Because backend code can securely access environment variables. Frontend code is visible to users, so exposing an API key there can lead to unauthorized usage."
          },
          {
            q: "Does ChatGPT subscription include API credits?",
            a: "No. ChatGPT subscriptions and OpenAI API billing are separate."
          },
          {
            q: "What is the Responses API?",
            a: "The Responses API is an OpenAI API that allows developers to send inputs to models and receive generated outputs. It also supports capabilities such as tools and multimodal inputs."
          },
          {
            q: "What is the purpose of dotenv?",
            a: "dotenv loads environment variables from a .env file into process.env in Node.js applications."
          },
          {
            q: "What happens if an API key is exposed?",
            a: "Someone else may use the key to make unauthorized API requests, potentially causing unexpected usage and charges. The key should be revoked and replaced."
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

export default OpenAIAPI;
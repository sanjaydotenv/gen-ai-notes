import React from "react";
import CodeBlock from "../../components/CodeBlock";

const GeminiAPI = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">Gemini API</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Gemini API allows developers to integrate Google's Gemini AI
          models into applications for text generation, image understanding,
          audio, video, and more.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Gemini API?</h2>
        <p className="leading-7 text-[#aaa]">
          Gemini API is Google's developer interface for accessing
          Gemini models programmatically. Developers can use it to build
          chatbots, AI assistants, document analyzers, and multimodal
          applications.
        </p>

        <CodeBlock code={`Your Application
       |
       v
   Gemini API
       |
       v
   Gemini Model
       |
       v
 Generated Response
       |
       v
Your Application`} />

        <p className="text-sm text-[#aaa]">
          Example: Build an AI chatbot that can answer questions,
          understand images, and analyze documents.
        </p>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What Can Gemini API Do?</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Text Generation", "Generate answers, stories, and explanations."],
            ["Image Understanding", "Analyze images and describe their contents."],
            ["Audio Processing", "Work with audio inputs and outputs."],
            ["Video Understanding", "Analyze video content."],
            ["Code Generation", "Generate and explain programming code."],
            ["Function Calling", "Connect models with external tools and functions."]
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
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 01 — Get API Key</p>
          <p className="text-sm text-[#aaa]">
            Open Google AI Studio and create your Gemini API key.
          </p>
          <a
            href="https://aistudio.google.com/api-keys"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-[#FC6C26] underline"
          >
            Get Gemini API Key →
          </a>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 02 — Install SDK</p>
          <CodeBlock language="bash" code={`npm install @google/genai dotenv`} />
          <p className="text-sm text-[#aaa]">
            <strong>@google/genai:</strong> Official Google Gen AI SDK.
            <br />
            <strong>dotenv:</strong> Loads environment variables.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#FC6C26]">STEP 03 — Configure Environment</p>
          <CodeBlock language="bash" code={`# .env

GEMINI_API_KEY=your_api_key_here`} />
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
      | Google Gen AI SDK
      v
Gemini API
      |
      v
Gemini Model
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
        <h2 className="text-xl font-bold">5. Initialize Gemini Client</h2>
        <p className="text-[#aaa] leading-7">
          Import GoogleGenAI from the official SDK and initialize
          the client using your API key.
        </p>

        <CodeBlock code={`import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default ai;`} />
      </section>

      {/* First Request */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Make Your First API Request</h2>
        <p className="text-[#aaa] leading-7">
          The Interactions API allows you to send input to a Gemini model
          and receive its generated response.
        </p>

        <CodeBlock code={`import ai from "./gemini.js";

const response = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "Explain Node.js in simple words."
});

console.log(response.output_text);`} />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Understanding the Code</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li><strong>ai:</strong> Initialized Gemini client.</li>
            <li><strong>interactions.create():</strong> Creates a new interaction with the model.</li>
            <li><strong>model:</strong> Specifies the Gemini model.</li>
            <li><strong>input:</strong> Contains the prompt or input data.</li>
            <li><strong>output_text:</strong> Returns the generated text.</li>
          </ul>
        </div>

        <p className="text-sm text-[#999]">
          Model availability and names can change. Check the official
          model documentation before selecting one.
        </p>
      </section>

      {/* Express */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Integrating with Express</h2>
        <p className="text-[#aaa]">
          Create an API endpoint that accepts a prompt and returns
          a Gemini-generated response.
        </p>

        <CodeBlock code={`import express from "express";
import ai from "./gemini.js";

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

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gemini API request failed"
    });
  }
});

app.listen(3000);`} />

        <p className="text-sm text-[#aaa]">
          Your React frontend can send a POST request to
          <span className="text-[#FC6C26]"> /api/ask </span>
          and receive the generated answer.
        </p>
      </section>

      {/* Conversation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Maintaining Conversation History</h2>
        <p className="text-[#aaa] leading-7">
          Gemini Interactions API supports stateful conversations.
          You can pass the previous interaction ID so the model can
          continue the conversation with earlier context.
        </p>

        <CodeBlock code={`// First interaction
const first = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "My name is Mayur."
});

// Continue the conversation
const second = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "What is my name?",
  previous_interaction_id: first.id
});

console.log(second.output_text);`} />

        <p className="text-sm text-[#aaa]">
          The previous_interaction_id connects the new request
          to the earlier interaction. Store and manage these IDs
          carefully in your application.
        </p>
      </section>

      {/* API Comparison */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Important API Difference</h2>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-[#FC6C26]">Interactions API</h3>
            <p className="mt-1 text-sm text-[#aaa]">
              Google's default interface for new Gemini applications
              as of June 2026. Supports conversations, tools, and
              agentic workflows.
            </p>
          </div>

          <div className="border-t border-white/10 pt-3">
            <h3 className="font-semibold text-[#FC6C26]">generateContent API</h3>
            <p className="mt-1 text-sm text-[#aaa]">
              The earlier content-generation interface. Still supported,
              but considered legacy for new projects.
            </p>
          </div>
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Gemini API provides programmatic access to Google's AI models.</li>
          <li>Google AI Studio can be used to create API keys.</li>
          <li>@google/genai is the official JavaScript SDK.</li>
          <li>Interactions API is recommended for new projects.</li>
          <li>Gemini supports text and multimodal inputs.</li>
          <li>previous_interaction_id helps continue conversations.</li>
          <li>Keep API keys on the backend.</li>
          <li>Handle API errors and validate user inputs.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">11. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Gemini API?",
            a: "Gemini API is Google's developer interface for integrating Gemini AI models into applications."
          },
          {
            q: "Which SDK is used for Gemini API in JavaScript?",
            a: "The official Google Gen AI SDK, installed using npm install @google/genai."
          },
          {
            q: "What is Google AI Studio?",
            a: "Google AI Studio is a platform where developers can experiment with Gemini models, test prompts, and create API keys."
          },
          {
            q: "What is the Interactions API?",
            a: "It is Google's API for interacting with Gemini models. It supports model inputs, outputs, conversation state, and tool-based workflows."
          },
          {
            q: "What is the difference between Interactions API and generateContent API?",
            a: "Interactions API is the recommended default interface for new projects, while generateContent is the earlier API and is considered legacy for new integrations."
          },
          {
            q: "How do you maintain conversation history using Gemini?",
            a: "You can pass the previous_interaction_id from an earlier interaction to continue the conversation with its context."
          },
          {
            q: "What is a multimodal AI model?",
            a: "A multimodal model can process or generate multiple types of data, such as text, images, audio, and video."
          },
          {
            q: "Why should API keys stay on the backend?",
            a: "Frontend code is visible to users. Keeping API keys on the backend helps prevent unauthorized access and API usage."
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

export default GeminiAPI;
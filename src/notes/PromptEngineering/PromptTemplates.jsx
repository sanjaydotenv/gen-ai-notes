import React from "react";
import CodeBlock from "../../components/CodeBlock";

const PromptTemplates = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          PROMPT ENGINEERING / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">Prompt Templates</h1>
        <p className="mt-3 text-[#999]">
          Prompt templates help us create reusable prompts with dynamic
          values instead of writing the same instructions repeatedly.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Prompt Templates?</h2>
        <p className="text-[#aaa] leading-7">
          A prompt template is a predefined prompt containing placeholders.
          We replace these placeholders with actual values whenever we use
          the prompt.
        </p>

        <CodeBlock code={`You are a helpful assistant.

Explain {topic} in simple language.
Give {number} practical examples.`} />

        <p className="text-sm text-[#aaa]">
          Here, <span className="text-[#FC6C26]">{"{topic}"}</span> and{" "}
          <span className="text-[#FC6C26]">{"{number}"}</span> are dynamic
          placeholders.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need Them?</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Reuse the same prompt for different inputs.</li>
          <li>Avoid writing repetitive instructions.</li>
          <li>Keep prompts consistent across an application.</li>
          <li>Make prompts easier to maintain and update.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How Prompt Templates Work</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">Prompt Template</p>
            <p className="text-xs text-[#888]">
              Explain {"{topic}"} in {"{language}"}
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">Dynamic Values</p>
            <p className="text-xs text-[#888]">
              topic = React, language = English
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-[#FC6C26]/10 p-3">
            <p className="font-semibold text-[#FC6C26]">Final Prompt</p>
            <p className="text-xs text-[#aaa]">
              Explain React in English.
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="font-semibold text-green-400">LLM Response</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Creating Templates with JavaScript</h2>
        <p className="text-[#aaa]">
          We can create simple prompt templates using JavaScript template
          literals.
        </p>

        <CodeBlock code={`function createPrompt(topic, language) {
  return \`Explain \${topic} in \${language}.
Give a simple example.\`;
}

const prompt = createPrompt("React", "English");

console.log(prompt);

// Output:
// Explain React in English.
// Give a simple example.`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Using Prompt Templates with an LLM API</h2>
        <p className="text-[#aaa]">
          First generate the final prompt using dynamic values, then send it
          to the LLM API.
        </p>

        <CodeBlock code={`const topic = "Node.js";
const level = "beginner";

const prompt = \`
Explain \${topic} for a \${level}.
Use simple language and give one example.
\`;

const response = await client.chat.completions.create({
  model: "your-model",
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
});`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Prompt Templates in LangChain</h2>
        <p className="text-[#aaa] leading-7">
          LangChain provides <span className="text-[#FC6C26]">PromptTemplate</span>
          to create reusable prompts with input variables.
        </p>

        <CodeBlock code={`import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate(
  "Explain {topic} in simple language."
);

const formattedPrompt = await prompt.format({
  topic: "Artificial Intelligence"
});

console.log(formattedPrompt);

// Output:
// Explain Artificial Intelligence in simple language.`} />

        <p className="text-sm text-[#999]">
          The <span className="text-[#FC6C26]">format()</span> method
          replaces placeholders with the provided values.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Templates contain reusable instructions and placeholders.</li>
          <li>Dynamic values are inserted at runtime.</li>
          <li>JavaScript template literals can create simple templates.</li>
          <li>LangChain provides PromptTemplate for structured prompt creation.</li>
          <li>Validate dynamic inputs before inserting them into prompts.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Interview Questions & Answers</h2>

        {[
          {
            q: "What is a prompt template?",
            a: "A prompt template is a reusable prompt containing placeholders that are replaced with actual values when generating the final prompt."
          },
          {
            q: "Why do we use prompt templates?",
            a: "They reduce repetitive work, improve consistency, and make prompts easier to reuse and maintain."
          },
          {
            q: "What are dynamic placeholders?",
            a: "Dynamic placeholders are variables inside a prompt, such as {topic} or {language}, whose values are inserted at runtime."
          },
          {
            q: "How can you create a prompt template using JavaScript?",
            a: "We can use JavaScript template literals or functions to insert dynamic values into a predefined prompt."
          },
          {
            q: "What is PromptTemplate in LangChain?",
            a: "PromptTemplate is a LangChain class used to create reusable prompts with input variables."
          },
          {
            q: "What does the format() method do?",
            a: "The format() method replaces template placeholders with the provided values and returns the final prompt string."
          },
          {
            q: "What is the difference between a prompt and a prompt template?",
            a: "A prompt is the actual instruction sent to the model, while a prompt template is a reusable structure used to generate that instruction."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-sm">
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

export default PromptTemplates;
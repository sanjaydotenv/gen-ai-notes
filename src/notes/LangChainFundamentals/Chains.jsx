import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Chains = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">Chains in LangChain</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Chains allow us to connect multiple LangChain components together to
          create a complete workflow. Each component performs a specific task
          and passes its output to the next component.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Chains?</h2>

        <p className="leading-7 text-[#aaa]">
          A Chain is a sequence of operations where the output of one component
          becomes the input of another component.
        </p>

        <p className="leading-7 text-[#aaa]">
          For example, an AI application may need to:
        </p>

        <CodeBlock
          code={`1. Receive user input
2. Create a prompt
3. Send the prompt to an LLM
4. Parse the model response
5. Return the final result`}
        />

        <p className="leading-7 text-[#aaa]">
          Instead of manually managing every step, we can connect these
          components into one workflow.
        </p>

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
Output Parser
    |
    v
Final Response`}
        />
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need Chains?</h2>

        <p className="leading-7 text-[#aaa]">
          Without chains, we have to manually call each component and pass data
          between them.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Without Chain</h3>

        <CodeBlock
          code={`const promptValue = await prompt.invoke({
  topic: "Artificial Intelligence"
});

const modelResponse = await model.invoke(promptValue);

const finalResponse = await parser.invoke(modelResponse);

console.log(finalResponse);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">With Chain</h3>

        <CodeBlock
          code={`const chain = prompt
  .pipe(model)
  .pipe(parser);

const result = await chain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Chains make workflows reusable, organized, and easier to maintain.
        </p>
      </section>

      {/* Components */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Components of a Chain</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Prompt Template", "Creates instructions and formats user input."],
            ["Model", "Processes the prompt and generates a response."],
            ["Output Parser", "Converts model output into a useful format."],
            [
              "Runnable",
              "Provides a standard interface for executing components.",
            ],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Basic Chain */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Creating Your First Chain</h2>

        <p className="leading-7 text-[#aaa]">
          We can create a basic chain by connecting a PromptTemplate, Chat
          Model, and StringOutputParser.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

import {
  StringOutputParser
} from "@langchain/core/output_parsers";

// 1. Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words."
);

// 2. Create model
const model = new ChatOpenAI({
  model: "gpt-4o-mini"
});

// 3. Create parser
const parser = new StringOutputParser();

// 4. Connect components
const chain = prompt
  .pipe(model)
  .pipe(parser);

// 5. Execute chain
const result = await chain.invoke({
  topic: "Machine Learning"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Here, invoke() starts the complete workflow. Data moves through each
          connected component automatically.
        </p>
      </section>

      {/* Sequential */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Sequential Chains</h2>

        <p className="leading-7 text-[#aaa]">
          A Sequential Chain runs multiple steps one after another. The output
          of one step is used as the input for the next step.
        </p>

        <CodeBlock
          code={`Step 1: Generate a topic summary
             |
             v
Step 2: Create quiz questions
             |
             v
Step 3: Generate final result`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Example using LCEL</h3>

        <p className="text-sm leading-6 text-[#aaa]">
          We can build a sequential workflow by connecting two separate chains.
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

import {
  StringOutputParser
} from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "gpt-4o-mini"
});

const parser = new StringOutputParser();

// First chain: Generate summary
const summaryPrompt = ChatPromptTemplate.fromTemplate(
  "Write a short summary about {topic}."
);

const summaryChain = summaryPrompt
  .pipe(model)
  .pipe(parser);

// Second chain: Generate questions
const questionPrompt = ChatPromptTemplate.fromTemplate(
  "Create 3 questions based on this summary:\\n{summary}"
);

const questionChain = questionPrompt
  .pipe(model)
  .pipe(parser);

// Connect both chains
const completeChain = summaryChain.pipe(async (summary) => {
  return questionChain.invoke({
    summary
  });
});

const result = await completeChain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          First, summaryChain generates a summary. Then its output is passed to
          questionChain to generate questions.
        </p>
      </section>

      {/* Parallel */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Parallel Chains</h2>

        <p className="leading-7 text-[#aaa]">
          Parallel execution allows multiple independent operations to run at
          the same time using the same input.
        </p>

        <CodeBlock
          code={`              User Input
                  |
          -------------------
          |                 |
          v                 v
      Summary Chain    Translation Chain
          |                 |
          v                 v
      Summary          Translation
          |                 |
          -------------------
                  |
                  v
             Final Output`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { RunnableParallel } from "@langchain/core/runnables";

const parallelChain = RunnableParallel.from({
  summary: summaryChain,
  questions: questionChain
});

const result = await parallelChain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result.summary);
console.log(result.questions);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          RunnableParallel executes multiple branches independently and combines
          their results into one object.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            In this example, summaryChain and questionChain must both accept the
            same input shape. If one chain requires the output of another, use
            sequential execution instead.
          </p>
        </div>
      </section>

      {/* RunnableSequence */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. RunnableSequence</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableSequence is a Runnable that executes multiple components
          sequentially. It passes the output of each step to the next step.
        </p>

        <CodeBlock
          code={`import {
  RunnableSequence
} from "@langchain/core/runnables";

const chain = RunnableSequence.from([
  prompt,
  model,
  parser
]);

const result = await chain.invoke({
  topic: "Node.js"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The pipe() method also creates sequential Runnable workflows.
          RunnableSequence is useful when we want to define the steps as an
          array.
        </p>
      </section>

      {/* Legacy */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Traditional LLMChain</h2>

        <p className="leading-7 text-[#aaa]">
          Earlier versions of LangChain commonly used LLMChain to connect a
          prompt with an LLM.
        </p>

        <CodeBlock
          code={`// Older LangChain approach

import { LLMChain } from "langchain/chains";

const chain = new LLMChain({
  llm: model,
  prompt
});

const result = await chain.invoke({
  topic: "Artificial Intelligence"
});`}
        />

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.05] p-4">
          <p className="font-semibold text-[#FC6C26]">Modern Approach</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            In modern LangChain JS applications, LCEL and Runnable composition
            using pipe() are preferred for building most workflows. LLMChain is
            a legacy API and should not be the default choice for new projects.
          </p>
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Real-World Use Cases</h2>

        <div className="space-y-3">
          {[
            [
              "AI Chatbot",
              "Connect user input, conversation prompts, models, and response parsers.",
            ],
            [
              "Content Generator",
              "Generate articles, summaries, descriptions, and social posts.",
            ],
            [
              "Document Processing",
              "Extract information, summarize documents, and format results.",
            ],
            [
              "Question Generator",
              "Generate questions from topics, notes, or documents.",
            ],
            [
              "Translation System",
              "Translate user-provided text into different languages.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Points */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Chains connect multiple components into one workflow.</li>
          <li>Each component passes its output to the next component.</li>
          <li>invoke() executes a chain with the provided input.</li>
          <li>pipe() connects components sequentially.</li>
          <li>Sequential workflows execute steps one after another.</li>
          <li>Parallel workflows execute independent branches together.</li>
          <li>
            RunnableSequence represents a sequence of Runnable components.
          </li>
          <li>RunnableParallel combines results from multiple branches.</li>
          <li>LCEL is the modern way to compose LangChain workflows.</li>
          <li>LLMChain is a legacy API; prefer modern Runnable composition.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">11. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Chains in LangChain?",
            a: "Chains connect multiple components together to create an automated workflow.",
          },
          {
            q: "Why do we use Chains?",
            a: "They simplify component integration, reduce manual data passing, and make workflows reusable.",
          },
          {
            q: "What is a Sequential Chain?",
            a: "It executes multiple steps one after another, passing each step's output to the next.",
          },
          {
            q: "What is a Parallel Chain?",
            a: "It executes multiple independent operations concurrently using the same input.",
          },
          {
            q: "What is RunnableSequence?",
            a: "It is a Runnable that executes multiple components sequentially.",
          },
          {
            q: "What is RunnableParallel?",
            a: "It runs multiple Runnable branches concurrently and combines their outputs into an object.",
          },
          {
            q: "What is pipe() in LangChain?",
            a: "pipe() connects Runnable components to create a sequential workflow.",
          },
          {
            q: "What is the difference between Sequential and Parallel Chains?",
            a: "Sequential workflows execute steps one after another, while parallel workflows execute independent branches concurrently.",
          },
          {
            q: "What is LLMChain?",
            a: "LLMChain is an older LangChain abstraction that connects a prompt with a language model. Modern applications generally use LCEL and Runnables.",
          },
          {
            q: "What is LCEL?",
            a: "LangChain Expression Language is a declarative way to compose Runnable components into workflows.",
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

export default Chains;

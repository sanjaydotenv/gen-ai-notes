import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Prompts = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">Prompts in LangChain</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Prompts are instructions or messages provided to an LLM to guide its
          behavior and generate the desired response. LangChain provides
          reusable templates to create dynamic prompts.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is a Prompt?</h2>

        <p className="leading-7 text-[#aaa]">
          A prompt is the input given to an AI model. It can contain questions,
          instructions, context, or examples that guide the model's response.
        </p>

        <CodeBlock
          code={`Prompt:
"Explain JavaScript in simple words."

        |
        v

      LLM Model

        |
        v

Response:
"JavaScript is a programming language..."`}
        />
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          2. Why Do We Need Prompt Templates?
        </h2>

        <p className="leading-7 text-[#aaa]">
          Writing a new prompt manually for every request becomes repetitive.
          Prompt Templates allow us to create reusable prompts with dynamic
          values.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <h3 className="font-semibold text-[#FC6C26]">Without Template</h3>
          <CodeBlock
            code={`"Explain JavaScript."
"Explain Python."
"Explain Node.js."`}
          />

          <h3 className="font-semibold text-[#FC6C26]">With Template</h3>
          <CodeBlock
            code={`"Explain {topic} in simple words."

topic = "JavaScript"
topic = "Python"
topic = "Node.js"`}
          />
        </div>
      </section>

      {/* Types */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Types of Prompts in LangChain</h2>

        <div className="space-y-3">
          {[
            [
              "PromptTemplate",
              "Creates reusable templates for plain-text prompts.",
            ],
            [
              "ChatPromptTemplate",
              "Creates structured prompts containing multiple chat messages.",
            ],
            [
              "MessagesPlaceholder",
              "Inserts a dynamic list of messages into a chat prompt.",
            ],
            [
              "FewShotPromptTemplate",
              "Creates prompts using examples to demonstrate the expected behavior.",
            ],
          ].map(([title, desc], index) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 flex gap-3"
            >
              <span className="font-bold text-[#FC6C26]">0{index + 1}</span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#aaa]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PromptTemplate */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. PromptTemplate</h2>

        <p className="leading-7 text-[#aaa]">
          PromptTemplate is used to create reusable text prompts containing
          placeholders that are replaced with actual values.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate(
  "Explain {topic} in simple words."
);

const formattedPrompt = await prompt.format({
  topic: "JavaScript"
});

console.log(formattedPrompt);

// Explain JavaScript in simple words.`}
        />

        <h3 className="font-semibold text-[#FC6C26]">How It Works</h3>

        <CodeBlock
          code={`Template:
"Explain {topic} in simple words."

        |
        v

Input:
{ topic: "JavaScript" }

        |
        v

Formatted Prompt:
"Explain JavaScript in simple words."`}
        />
      </section>

      {/* ChatPromptTemplate */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. ChatPromptTemplate</h2>

        <p className="leading-7 text-[#aaa]">
          ChatPromptTemplate creates structured chat prompts using different
          message roles such as system and human.
        </p>

        <CodeBlock
          code={`import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful {role}."],
  ["human", "Explain {topic} in simple words."]
]);

const messages = await prompt.invoke({
  role: "programming tutor",
  topic: "Node.js"
});

console.log(messages);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The result is a ChatPromptValue containing formatted chat messages
          that can be passed to a chat model.
        </p>
      </section>

      {/* Message Roles */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Message Roles</h2>

        <div className="space-y-3">
          {[
            [
              "System Message",
              "Defines the model's behavior, role, and instructions.",
            ],
            ["Human Message", "Contains the user's question or input."],
            ["AI Message", "Represents the assistant's response."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert JavaScript tutor."],
  ["human", "Explain closures."]
]);`}
        />
      </section>

      {/* Variables */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Dynamic Prompt Variables</h2>

        <p className="leading-7 text-[#aaa]">
          Variables allow us to pass different values into the same prompt
          template at runtime.
        </p>

        <CodeBlock
          code={`const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} for a {level} student."
);

const result = await prompt.invoke({
  topic: "React",
  level: "beginner"
});`}
        />

        <p className="text-sm text-[#aaa]">
          Here, topic and level are dynamic variables.
        </p>
      </section>

      {/* Placeholder */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. MessagesPlaceholder</h2>

        <p className="leading-7 text-[#aaa]">
          MessagesPlaceholder allows us to insert a dynamic list of messages
          into a ChatPromptTemplate. It is useful for passing conversation
          history.
        </p>

        <CodeBlock
          code={`import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  new MessagesPlaceholder("history"),
  ["human", "{input}"]
]);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">
          Pass Conversation History
        </h3>

        <CodeBlock
          code={`import {
  HumanMessage,
  AIMessage
} from "@langchain/core/messages";

const messages = await prompt.invoke({
  history: [
    new HumanMessage("What is React?"),
    new AIMessage("React is a JavaScript library.")
  ],
  input: "What is a component?"
});`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The previous messages are inserted before the latest human input,
          allowing the model to receive conversation context.
        </p>
      </section>

      {/* Few Shot */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Few-Shot Prompting</h2>

        <p className="leading-7 text-[#aaa]">
          Few-shot prompting provides examples inside a prompt so the model can
          understand the expected input-output pattern.
        </p>

        <CodeBlock
          code={`Examples:

Input: Happy
Output: Positive

Input: Terrible
Output: Negative

Input: Amazing
Output: Positive`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          LangChain provides FewShotPromptTemplate and
          FewShotChatMessagePromptTemplate for building reusable example-based
          prompts.
        </p>
      </section>

      {/* Model */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          10. Connecting Prompts with Models
        </h2>

        <p className="leading-7 text-[#aaa]">
          We can connect a prompt template directly to a model. This allows us
          to format input and generate a response in a single workflow.
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words."
);

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7
});

const chain = prompt.pipe(model);

const response = await chain.invoke({
  topic: "LangChain"
});

console.log(response.content);`}
        />

        <CodeBlock
          code={`User Input
    |
    v
ChatPromptTemplate
    |
    v
Format Dynamic Variables
    |
    v
Chat Model
    |
    v
AI Response`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The pipe() method connects the prompt and model into a runnable
          sequence. This is part of LCEL, which we will study separately.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">11. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>A prompt provides instructions or input to an LLM.</li>
          <li>PromptTemplate creates reusable text prompts.</li>
          <li>ChatPromptTemplate creates structured chat messages.</li>
          <li>Placeholders represent dynamic values.</li>
          <li>System messages define model behavior.</li>
          <li>Human messages contain user input.</li>
          <li>MessagesPlaceholder inserts conversation messages.</li>
          <li>Few-shot prompting uses examples to guide model output.</li>
          <li>pipe() connects prompts with models.</li>
          <li>Prompts can be reused across multiple requests.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">12. Interview Questions & Answers</h2>

        {[
          {
            q: "What is a Prompt in LangChain?",
            a: "A prompt is an instruction or input provided to an LLM to guide its response.",
          },
          {
            q: "What is PromptTemplate?",
            a: "PromptTemplate creates reusable text prompts with dynamic variables.",
          },
          {
            q: "What is ChatPromptTemplate?",
            a: "It creates structured chat prompts using message roles such as system and human.",
          },
          {
            q: "What is the difference between PromptTemplate and ChatPromptTemplate?",
            a: "PromptTemplate creates plain-text prompts, while ChatPromptTemplate creates structured chat messages.",
          },
          {
            q: "What are dynamic prompt variables?",
            a: "They are placeholders that receive values at runtime when formatting a prompt.",
          },
          {
            q: "What is MessagesPlaceholder?",
            a: "It inserts a dynamic list of messages into a chat prompt, commonly used for conversation history.",
          },
          {
            q: "What is Few-Shot Prompting?",
            a: "It provides examples inside a prompt to demonstrate the expected input-output behavior.",
          },
          {
            q: "What is the purpose of System Messages?",
            a: "System messages define the assistant's behavior, role, and instructions.",
          },
          {
            q: "Can prompts be connected directly to models?",
            a: "Yes. We can use pipe() to connect a prompt template with a model.",
          },
          {
            q: "What is prompt.invoke()?",
            a: "It formats the prompt using the provided input and returns a prompt value containing the formatted messages or text.",
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

export default Prompts;

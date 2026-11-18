import React from "react";
import CodeBlock from "../../components/CodeBlock";

const OutputParsers = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Output Parsers</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Output Parsers are components in LangChain that transform raw LLM
          responses into specific formats such as strings, JSON objects, lists,
          or structured data.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Output Parsers?</h2>

        <p className="leading-7 text-[#aaa]">
          LLMs usually generate responses in natural language. However,
          applications often need data in a predictable format so that the
          response can be processed by JavaScript.
        </p>

        <CodeBlock
          code={`LLM Raw Response
       |
       v
  Output Parser
       |
       v
Structured Output
       |
       v
Application Logic`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          An Output Parser takes the model's output and converts it into a
          format that your application can work with.
        </p>
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need Output Parsers?</h2>

        <h3 className="font-semibold text-[#FC6C26]">Without Output Parser</h3>

        <CodeBlock
          code={`const response = "The user's name is Mayur and age is 19.";

console.log(response);

// String output`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          We cannot directly access response.name or response.age because the
          response is just a string.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">With Output Parser</h3>

        <CodeBlock
          language="json"
          code={`{
  "name": "Mayur",
  "age": 19
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Now JavaScript can access individual properties.
        </p>

        <CodeBlock
          code={`console.log(response.name);
console.log(response.age);`}
        />
      </section>

      {/* Types */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Types of Output Parsers</h2>

        <div className="space-y-3">
          {[
            ["StringOutputParser", "Extracts plain text from an AI message."],
            [
              "JsonOutputParser",
              "Parses model output into a JavaScript JSON object.",
            ],
            [
              "StructuredOutputParser",
              "Parses responses according to a defined output schema.",
            ],
            [
              "CommaSeparatedListOutputParser",
              "Converts comma-separated model output into an array of strings.",
            ],
            [
              "XML Parser",
              "Parses XML-formatted output when using an appropriate parser or integration.",
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

      {/* String */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. StringOutputParser</h2>

        <p className="leading-7 text-[#aaa]">
          StringOutputParser extracts the text content from an AI message and
          returns it as a plain JavaScript string.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Installation</h3>

        <CodeBlock language="bash" code={`npm install @langchain/core`} />

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "gpt-4o-mini"
});

const parser = new StringOutputParser();

const response = await model.invoke(
  "Explain LangChain in simple words."
);

const result = await parser.invoke(response);

console.log(result);
console.log(typeof result); // string`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          StringOutputParser is especially useful when we only need the text
          content of a chat model response.
        </p>
      </section>

      {/* JSON */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. JsonOutputParser</h2>

        <p className="leading-7 text-[#aaa]">
          JsonOutputParser converts a JSON-formatted model response into a
          JavaScript object.
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";
import {
  JsonOutputParser
} from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});

const parser = new JsonOutputParser();

const response = await model.invoke(
  \`Return only valid JSON:
   {
     "name": "Mayur",
     "age": 19
   }\`
);

const result = await parser.invoke(response);

console.log(result.name);
console.log(result.age);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The parser uses JSON parsing internally. If the model returns invalid
          JSON, parsing can fail.
        </p>
      </section>

      {/* Structured */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. StructuredOutputParser</h2>

        <p className="leading-7 text-[#aaa]">
          StructuredOutputParser allows us to define the expected output fields
          using a schema-like structure.
        </p>

        <CodeBlock
          code={`import {
  StructuredOutputParser
} from "@langchain/core/output_parsers";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  name: "User's name",
  age: "User's age",
  skills: "Array of programming skills"
});

const prompt = ChatPromptTemplate.fromTemplate(
  \`Extract user information.

  {format_instructions}

  User Information:
  {input}\`
);

const formattedPrompt = await prompt.invoke({
  input: "Mayur is 19 years old and knows React and Node.js.",
  format_instructions: parser.getFormatInstructions()
});

const response = await model.invoke(formattedPrompt);

const result = await parser.parse(response.content);

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          getFormatInstructions() generates instructions that tell the model how
          to format its response. parse() converts the generated text into
          structured data.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "name": "Mayur",
  "age": 19,
  "skills": [
    "React",
    "Node.js"
  ]
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This parser provides formatting instructions, but it does not
          guarantee that the model will always follow them. Always handle
          parsing errors and validate important data.
        </p>
      </section>

      {/* List */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. CommaSeparatedListOutputParser</h2>

        <p className="leading-7 text-[#aaa]">
          This parser converts comma-separated text into an array of strings.
        </p>

        <CodeBlock
          code={`import {
  CommaSeparatedListOutputParser
} from "@langchain/core/output_parsers";

const parser = new CommaSeparatedListOutputParser();

const result = await parser.parse(
  "React, Node.js, MongoDB, Express"
);

console.log(result);

// [
//   "React",
//   "Node.js",
//   "MongoDB",
//   "Express"
// ]`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This is useful when we want a simple list from an LLM instead of a
          single string.
        </p>
      </section>

      {/* Pipe */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          8. Connecting Model with Output Parser
        </h2>

        <p className="leading-7 text-[#aaa]">
          Instead of calling the model and parser separately, we can connect
          them using pipe().
        </p>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";
import {
  StringOutputParser
} from "@langchain/core/output_parsers";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

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

const result = await chain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result); // Plain string`}
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
Output Parser
    |
    v
Final Output`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This workflow is built using LangChain Expression Language (LCEL),
          which we will study in a separate topic.
        </p>
      </section>

      {/* Error Handling */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Handling Parser Errors</h2>

        <p className="leading-7 text-[#aaa]">
          Sometimes an LLM may return an invalid format. For example,
          JsonOutputParser may fail if the response is not valid JSON.
        </p>

        <CodeBlock
          code={`try {
  const result = await parser.invoke(response);

  console.log(result);
} catch (error) {
  console.error("Output parsing failed:", error.message);
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          In production applications, validate parsed data before using it in
          database operations or business logic.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Output Parsers transform model responses into useful formats.</li>
          <li>StringOutputParser extracts plain text from AI messages.</li>
          <li>JsonOutputParser parses JSON-formatted responses.</li>
          <li>
            StructuredOutputParser provides formatting instructions for
            structured output.
          </li>
          <li>
            CommaSeparatedListOutputParser converts comma-separated text into an
            array.
          </li>
          <li>parse() parses raw text into the expected format.</li>
          <li>invoke() executes a parser using its input.</li>
          <li>pipe() connects models and parsers into a workflow.</li>
          <li>Always validate important structured data.</li>
          <li>Output parsing does not guarantee factual correctness.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">11. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Output Parsers in LangChain?",
            a: "Output Parsers convert raw LLM responses into specific formats such as strings, JSON objects, and arrays.",
          },
          {
            q: "Why do we need Output Parsers?",
            a: "They make model responses easier to process and use inside application logic.",
          },
          {
            q: "What is StringOutputParser?",
            a: "It extracts the text content from an AI message and returns a plain string.",
          },
          {
            q: "What is JsonOutputParser?",
            a: "It parses JSON-formatted model output into a JavaScript object.",
          },
          {
            q: "What is StructuredOutputParser?",
            a: "It generates formatting instructions from field descriptions and parses the model's response into structured data.",
          },
          {
            q: "What is parse()?",
            a: "parse() converts raw text into the format expected by a particular parser.",
          },
          {
            q: "What is the difference between parse() and invoke()?",
            a: "parse() directly parses raw text, while invoke() executes the parser through the Runnable interface.",
          },
          {
            q: "What is CommaSeparatedListOutputParser?",
            a: "It converts comma-separated model output into an array of strings.",
          },
          {
            q: "Can Output Parsers guarantee valid JSON?",
            a: "No. They can detect or parse formatting, but invalid output can still cause errors. Use validation and error handling.",
          },
          {
            q: "How do we connect an Output Parser with a model?",
            a: "We can use pipe() to connect a model with an output parser in an LCEL workflow.",
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

export default OutputParsers;

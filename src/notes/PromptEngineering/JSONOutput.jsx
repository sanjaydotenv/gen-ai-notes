import React from "react";
import CodeBlock from "../../components/CodeBlock";

const JSONOutput = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          PROMPT ENGINEERING / 05
        </p>
        <h1 className="mt-2 text-3xl font-bold">JSON Output</h1>
        <p className="mt-3 text-[#999]">
          JSON output allows us to receive structured data from an LLM
          instead of normal text, making AI responses easier to process
          inside applications.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is JSON Output?</h2>
        <p className="text-[#aaa] leading-7">
          JSON output is a way of instructing an LLM to return its response
          in JavaScript Object Notation (JSON) format.
          It stores information using key-value pairs.
        </p>

        <CodeBlock language="json" code={`{
  "name": "Mayur",
  "role": "Developer",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": "Beginner"
}`} />

        <p className="text-sm text-[#999]">
          Instead of returning a paragraph, the model returns structured
          information that our application can easily read.
        </p>
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need JSON Output?</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Easy to process AI responses using JavaScript.</li>
          <li>Useful when building APIs and backend applications.</li>
          <li>Helps extract specific information from text.</li>
          <li>Provides a predictable response structure.</li>
          <li>Useful for connecting LLMs with databases and tools.</li>
        </ul>
      </section>

      {/* Flow */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How JSON Output Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">User Input</p>
            <p className="text-xs text-[#888]">
              Extract name and age from this text.
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-[#FC6C26]/10 p-3">
            <p className="font-semibold text-[#FC6C26]">LLM Processing</p>
            <p className="text-xs text-[#888]">
              Understands and extracts information.
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">JSON Response</p>
            <p className="text-xs text-[#888]">
              {"{ name: \"Mayur\", age: 19 }"}
            </p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="font-semibold text-green-400">
              Application Uses the Data
            </p>
          </div>
        </div>
      </section>

      {/* Prompting */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Asking an LLM for JSON</h2>
        <p className="text-[#aaa]">
          We can explicitly instruct the model to return only valid JSON.
        </p>

        <CodeBlock code={`Prompt:

Extract the following information.

Text:
"Mayur is a 19-year-old developer from India."

Return only valid JSON:
{
  "name": "string",
  "age": "number",
  "profession": "string",
  "country": "string"
}`} />

        <p className="text-sm text-[#999]">
          The example describes the expected structure. However, a prompt
          alone does not guarantee valid JSON.
        </p>
      </section>

      {/* JSON Mode */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. JSON Mode in LLM APIs</h2>
        <p className="text-[#aaa] leading-7">
          Some LLM providers offer a JSON mode that instructs the model
          to return a valid JSON object.
        </p>

        <CodeBlock code={`const response = await client.chat.completions.create({
  model: "your-model",
  messages: [
    {
      role: "system",
      content: "Return information as a JSON object."
    },
    {
      role: "user",
      content: "Give details about JavaScript."
    }
  ],
  response_format: {
    type: "json_object"
  }
});

const result = JSON.parse(
  response.choices[0].message.content
);

console.log(result);`} />

        <p className="text-sm text-[#999]">
          Note: JSON mode syntax and availability depend on the LLM provider
          and model. Follow the provider's API documentation.
        </p>
      </section>

      {/* Parsing */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Parsing JSON in JavaScript</h2>
        <p className="text-[#aaa] leading-7">
          LLM APIs often return JSON as a string. We use
          <span className="text-[#FC6C26]"> JSON.parse()</span> to convert
          that string into a JavaScript object.
        </p>

        <CodeBlock code={`const jsonString = \`{
  "name": "Mayur",
  "age": 19
}\`;

// JSON string → JavaScript object
const data = JSON.parse(jsonString);

console.log(data.name); // Mayur
console.log(data.age);  // 19

// JavaScript object → JSON string
const output = JSON.stringify(data);`} />

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/5 p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="mt-1 text-sm text-[#aaa]">
            JSON.parse() converts JSON string into an object.
            JSON.stringify() converts an object into a JSON string.
          </p>
        </div>
      </section>

      {/* Structured Outputs */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. JSON Mode vs Structured Outputs</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">JSON Mode</th>
                <th className="p-3">Structured Outputs</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Returns valid JSON.</td>
                <td className="p-3">Follows a defined schema.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Does not guarantee exact keys.</td>
                <td className="p-3">Can enforce required fields and types.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Focuses on JSON syntax.</td>
                <td className="p-3">Focuses on JSON structure.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#999]">
          Structured Outputs is an API feature supported by certain providers
          and models. It is more strict than basic JSON mode.
        </p>
      </section>

      {/* Validation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. JSON Validation</h2>
        <p className="text-[#aaa] leading-7">
          Even when using JSON mode, validate the response before using it
          in your application. Valid JSON syntax does not guarantee correct
          values or the expected schema.
        </p>

        <CodeBlock code={`try {
  const data = JSON.parse(jsonString);

  if (typeof data.name !== "string") {
    throw new Error("Invalid name");
  }

  console.log("Valid response:", data);
} catch (error) {
  console.log("Invalid JSON:", error.message);
}`} />
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>JSON stands for JavaScript Object Notation.</li>
          <li>JSON stores data using key-value pairs.</li>
          <li>JSON output makes LLM responses easier to process.</li>
          <li>JSON.parse() converts JSON strings into JavaScript objects.</li>
          <li>JSON.stringify() converts JavaScript objects into JSON strings.</li>
          <li>JSON mode ensures JSON syntax, not necessarily a specific schema.</li>
          <li>Always validate AI-generated data before using it.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">10. Interview Questions & Answers</h2>

        {[
          {
            q: "What is JSON output in Generative AI?",
            a: "JSON output is a technique where an LLM returns information in JSON format instead of normal text, making the response easier to process."
          },
          {
            q: "Why do we use JSON output?",
            a: "It provides structured and predictable data that applications can easily parse, validate, store, and use."
          },
          {
            q: "What is JSON mode?",
            a: "JSON mode is an API feature that instructs a supported LLM to return a valid JSON object."
          },
          {
            q: "What is the difference between JSON.parse() and JSON.stringify()?",
            a: "JSON.parse() converts a JSON string into a JavaScript object, whereas JSON.stringify() converts a JavaScript value into a JSON string."
          },
          {
            q: "What is the difference between JSON mode and Structured Outputs?",
            a: "JSON mode focuses on valid JSON syntax, while Structured Outputs can enforce a predefined schema, including required fields and data types."
          },
          {
            q: "Does JSON mode guarantee correct data?",
            a: "No. It focuses on JSON formatting. The generated values can still be incorrect, so validation is necessary."
          },
          {
            q: "Why should we validate LLM-generated JSON?",
            a: "Validation helps catch invalid data types, missing fields, unexpected values, and other errors before using the response."
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

export default JSONOutput;
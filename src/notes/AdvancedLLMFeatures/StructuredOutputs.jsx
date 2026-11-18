import React from "react";
import CodeBlock from "../../components/CodeBlock";

const StructuredOutputs = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">Structured Outputs</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Structured Outputs allow LLMs to generate responses in a predefined
          format, such as JSON, making AI responses predictable and easier to
          process in applications.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Structured Outputs?</h2>

        <p className="leading-7 text-[#aaa]">
          Structured Outputs ensure that AI responses follow a specific data
          structure, usually defined using a JSON Schema.
        </p>

        <CodeBlock
          code={`User Input
    |
    v
   LLM
    |
    v
Structured Output
    |
    v
Valid JSON Response
    |
    v
Application Processes Data`}
        />

        <p className="text-sm text-[#aaa]">
          Example: Instead of generating a paragraph, an AI model returns user
          information in a predefined JSON format.
        </p>
      </section>

      {/* Normal vs Structured */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          2. Normal Output vs Structured Output
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-red-400">Normal Output</h3>
            <CodeBlock
              code={`The user is Mayur,
19 years old,
and lives in Bhopal.`}
            />
            <p className="text-sm text-[#aaa]">
              Unstructured text can be difficult to process automatically.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-green-400">Structured Output</h3>
            <CodeBlock
              language="json"
              code={`{
  "name": "Mayur",
  "age": 19,
  "city": "Bhopal"
}`}
            />
            <p className="text-sm text-[#aaa]">
              Predictable data that applications can easily process.
            </p>
          </div>
        </div>
      </section>

      {/* JSON Schema */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. What is JSON Schema?</h2>

        <p className="leading-7 text-[#aaa]">
          JSON Schema defines the expected structure, data types, and required
          fields of a JSON response.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "required": ["name", "age"],
  "additionalProperties": false
}`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Properties</h3>

          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li>
              <strong>type:</strong> Defines the data type.
            </li>
            <li>
              <strong>properties:</strong> Defines object fields.
            </li>
            <li>
              <strong>required:</strong> Specifies mandatory fields.
            </li>
            <li>
              <strong>additionalProperties:</strong> Controls extra fields.
            </li>
          </ul>
        </div>
      </section>

      {/* API */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Structured Outputs with OpenAI</h2>

        <p className="leading-7 text-[#aaa]">
          OpenAI provides structured output support through JSON Schema using
          the Responses API.
        </p>

        <CodeBlock
          code={`const response = await client.responses.create({
  model: "YOUR_MODEL_NAME",

  input: "Extract name and age from: Mayur is 19 years old.",

  text: {
    format: {
      type: "json_schema",
      name: "user_info",
      strict: true,
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" }
        },
        required: ["name", "age"],
        additionalProperties: false
      }
    }
  }
});

console.log(response.output_text);`}
        />

        <p className="text-sm text-[#aaa]">
          The model generates output according to the defined JSON Schema. The
          exact supported schema features depend on the API and model.
        </p>
      </section>

      {/* Output */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Example Response</h2>

        <CodeBlock
          language="json"
          code={`{
  "name": "Mayur",
  "age": 19
}`}
        />

        <p className="text-sm text-[#aaa]">
          The application can parse this JSON and directly use its properties
          without manually extracting information from a paragraph.
        </p>
      </section>

      {/* Use Cases */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Real-World Use Cases</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Data Extraction",
              "Extract names, dates, and details from documents.",
            ],
            ["Chatbots", "Return responses in a predefined format."],
            ["E-commerce", "Generate structured product information."],
            [
              "AI Agents",
              "Provide predictable data for application workflows.",
            ],
            ["Resume Parser", "Extract skills, education, and experience."],
            [
              "Database Integration",
              "Prepare structured data for database operations.",
            ],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Difference */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          7. Structured Outputs vs JSON Mode
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">JSON Mode</th>
                <th className="p-3">Structured Outputs</th>
              </tr>
            </thead>

            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Ensures valid JSON syntax.</td>
                <td className="p-3">Follows a specified JSON Schema.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Does not guarantee exact structure.</td>
                <td className="p-3">Enforces supported schema constraints.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">More flexible output.</td>
                <td className="p-3">More predictable output.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Structured Outputs provide predictable AI responses.</li>
          <li>JSON Schema defines the expected output structure.</li>
          <li>Required fields make important properties mandatory.</li>
          <li>It simplifies integration with backend applications.</li>
          <li>JSON Mode guarantees JSON syntax, not a specific schema.</li>
          <li>Structured Outputs do not guarantee factual correctness.</li>
          <li>Always handle refusals and API errors.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Structured Outputs?",
            a: "Structured Outputs allow LLMs to generate responses that follow a predefined data structure, such as a JSON Schema.",
          },
          {
            q: "Why do we use Structured Outputs?",
            a: "They make AI responses predictable and easier to process in applications.",
          },
          {
            q: "What is JSON Schema?",
            a: "JSON Schema defines the expected structure, properties, and data types of JSON data.",
          },
          {
            q: "What is the difference between JSON Mode and Structured Outputs?",
            a: "JSON Mode ensures valid JSON syntax, while Structured Outputs enforce a specified JSON Schema.",
          },
          {
            q: "What is the purpose of required in JSON Schema?",
            a: "It specifies which properties must be present in the generated JSON object.",
          },
          {
            q: "What does additionalProperties: false mean?",
            a: "It prevents additional properties that are not defined in the schema.",
          },
          {
            q: "Does Structured Output guarantee correct information?",
            a: "No. It controls the output structure, not the factual accuracy of the generated information.",
          },
          {
            q: "Where are Structured Outputs used?",
            a: "They are commonly used in data extraction, chatbots, resume parsing, AI agents, and backend applications.",
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

export default StructuredOutputs;

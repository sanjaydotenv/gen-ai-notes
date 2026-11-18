import React from "react";
import CodeBlock from "../../components/CodeBlock";

const FunctionCalling = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">Function Calling</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Function Calling allows an LLM to request the execution of predefined
          functions in an application to interact with external systems, APIs,
          and databases.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Function Calling?</h2>

        <p className="leading-7 text-[#aaa]">
          Function Calling allows an AI model to decide when a function is
          needed and generate its name and arguments. The application then
          executes that function.
        </p>

        <CodeBlock
          code={`User: What is the weather in Bhopal?

       User
         |
         v
        LLM
         |
         v
  Function Call Request
         |
         v
 Application Executes Function
         |
         v
     Weather API
         |
         v
    Weather Result
         |
         v
        LLM
         |
         v
   Final Response`}
        />

        <p className="text-sm text-[#aaa]">
          Example: An AI assistant can call a weather function to get current
          weather information instead of guessing.
        </p>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. How Function Calling Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            "User sends a request",
            "Application provides function definitions to LLM",
            "LLM selects a suitable function",
            "LLM generates function arguments",
            "Application executes the function",
            "Function result is sent back to LLM",
            "LLM generates the final response",
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div className="rounded-lg bg-white/5 p-3 text-sm">
                <span className="mr-2 font-semibold text-[#FC6C26]">
                  {index + 1}.
                </span>
                {step}
              </div>

              {index !== 6 && <div className="text-[#FC6C26]">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Function Definition */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Function Definition</h2>

        <p className="leading-7 text-[#aaa]">
          A function definition describes the function name, purpose, and
          parameters so the LLM knows when and how to request it.
        </p>

        <CodeBlock
          language="json"
          code={`{
  "type": "function",
  "function": {
    "name": "getWeather",
    "description": "Get weather of a city",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string",
          "description": "City name"
        }
      },
      "required": ["city"]
    }
  }
}`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Properties</h3>

          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li>
              <strong>name:</strong> Identifies the function.
            </li>
            <li>
              <strong>description:</strong> Explains its purpose.
            </li>
            <li>
              <strong>parameters:</strong> Defines function inputs.
            </li>
            <li>
              <strong>required:</strong> Specifies mandatory arguments.
            </li>
          </ul>
        </div>
      </section>

      {/* Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Creating a Function</h2>

        <p className="leading-7 text-[#aaa]">
          First, create a normal JavaScript function that performs the required
          operation.
        </p>

        <CodeBlock
          code={`function getWeather(city) {
  return {
    city,
    temperature: 25,
    condition: "Sunny"
  };
}

// Execute function
const result = getWeather("Bhopal");

console.log(result);`}
        />

        <CodeBlock
          language="json"
          code={`{
  "city": "Bhopal",
  "temperature": 25,
  "condition": "Sunny"
}`}
        />

        <p className="text-sm text-[#aaa]">
          Here, getWeather() is a normal JavaScript function. The LLM does not
          execute it directly.
        </p>
      </section>

      {/* API Integration */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Function Calling with LLM</h2>

        <p className="leading-7 text-[#aaa]">
          In an actual API integration, we provide function definitions to the
          model. If the model requests a function, our backend executes it and
          returns the result.
        </p>

        <CodeBlock
          code={`// Example: Groq SDK

const completion = await groq.chat.completions.create({
  model: "YOUR_MODEL_ID",

  messages: [
    {
      role: "user",
      content: "What is the weather in Bhopal?"
    }
  ],

  tools: [
    {
      type: "function",
      function: {
        name: "getWeather",
        description: "Get weather of a city",
        parameters: {
          type: "object",
          properties: {
            city: { type: "string" }
          },
          required: ["city"]
        }
      }
    }
  ],

  tool_choice: "auto"
});

console.log(completion.choices[0].message);`}
        />

        <p className="text-sm text-[#aaa]">
          The model may return a tool call request instead of a normal text
          response. Your application must execute it and send the result back to
          the model.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Function Calling connects LLMs with external functions.</li>
          <li>LLM decides which function should be called.</li>
          <li>LLM generates function arguments.</li>
          <li>Application executes the actual function.</li>
          <li>Function results can be sent back to the LLM.</li>
          <li>Function Calling does not mean the LLM executes code itself.</li>
          <li>Always validate arguments before executing functions.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">7. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Function Calling?",
            a: "Function Calling allows an LLM to request predefined functions to perform external operations.",
          },
          {
            q: "Why do we need Function Calling?",
            a: "It allows AI applications to interact with APIs, databases, and external services instead of only generating text.",
          },
          {
            q: "Does an LLM execute functions directly?",
            a: "No. The LLM generates a function call request, and the application executes the actual function.",
          },
          {
            q: "What is a function definition?",
            a: "It describes a function's name, purpose, and parameters so the LLM can understand how to request it.",
          },
          {
            q: "What are function arguments?",
            a: "Function arguments are input values generated by the LLM and passed to the function for execution.",
          },
          {
            q: "What happens after function execution?",
            a: "The application sends the function result back to the LLM, which can generate a final response.",
          },
          {
            q: "What is tool_choice: auto?",
            a: "It allows the model to decide whether to respond normally or request an available tool.",
          },
          {
            q: "What is the role of the backend in Function Calling?",
            a: "The backend provides function definitions, validates arguments, executes functions, and returns results to the LLM.",
          },
          {
            q: "Is Function Calling the same as Tool Calling?",
            a: "Function Calling focuses on invoking functions, while Tool Calling is a broader concept that includes functions and other external capabilities.",
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
              <span className="font-semibold text-green-400">Answer:</span>{" "}
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FunctionCalling;

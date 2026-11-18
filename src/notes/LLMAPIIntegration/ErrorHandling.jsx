import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ErrorHandling = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LLM API INTEGRATION / 07
        </p>
        <h1 className="mt-2 text-3xl font-bold">Error Handling in LLM APIs</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Error handling means detecting API failures, understanding their
          causes, and responding safely without crashing the application.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          1. Why Error Handling is Important?
        </h2>
        <p className="leading-7 text-[#aaa]">
          LLM API requests can fail for several reasons, such as invalid API
          keys, network problems, rate limits, or unavailable models.
        </p>

        <CodeBlock
          code={`User Request
     |
     v
   Backend
     |
     v
   LLM API
     |
     +------ Success ------> Return Response
     |
     +------ Failure ------> Handle Error
                                  |
                                  v
                            Return Safe Message`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Common API Errors</h2>

        <div className="space-y-3">
          {[
            [
              "400 - Bad Request",
              "Invalid request parameters or malformed input.",
            ],
            ["401 - Unauthorized", "Missing or invalid API key."],
            [
              "403 - Forbidden",
              "The account does not have permission to access the resource.",
            ],
            ["404 - Not Found", "Requested model or endpoint does not exist."],
            [
              "429 - Too Many Requests",
              "Rate limit or quota has been exceeded.",
            ],
            [
              "500 - Internal Server Error",
              "An internal error occurred on the provider's server.",
            ],
            [
              "503 - Service Unavailable",
              "The service is temporarily unavailable.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Using try...catch</h2>
        <p className="leading-7 text-[#aaa]">
          JavaScript uses try...catch to handle errors without unexpectedly
          terminating the current execution flow.
        </p>

        <CodeBlock
          code={`try {
  const result = await groq.chat.completions.create({
    model: "YOUR_MODEL_ID",
    messages: [
      {
        role: "user",
        content: "Explain JavaScript."
      }
    ]
  });

  console.log(result.choices[0].message.content);

} catch (error) {
  console.error("API Error:", error.message);
}`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Handling Different Errors</h2>
        <p className="text-[#aaa] leading-7">
          Check the HTTP status code to understand what went wrong and decide
          how the application should respond.
        </p>

        <CodeBlock
          code={`try {
  const response = await groq.chat.completions.create({
    model: "YOUR_MODEL_ID",
    messages: [
      { role: "user", content: "Hello AI" }
    ]
  });

  return response.choices[0].message.content;

} catch (error) {
  if (error.status === 401) {
    console.log("Invalid API key");
  } else if (error.status === 429) {
    console.log("Rate limit exceeded");
  } else if (error.status >= 500) {
    console.log("AI provider server error");
  } else {
    console.log("Something went wrong");
  }
}`}
        />

        <p className="text-sm text-[#aaa]">
          SDKs may expose additional error types and properties. Always check
          the provider's SDK documentation.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Retry Mechanism</h2>
        <p className="leading-7 text-[#aaa]">
          Some errors are temporary. A retry mechanism attempts the request
          again instead of immediately failing.
        </p>

        <CodeBlock
          code={`async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateResponse() {
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await groq.chat.completions.create({
        model: "YOUR_MODEL_ID",
        messages: [
          { role: "user", content: "Explain Node.js" }
        ]
      });

    } catch (error) {
      const retryable = [429, 500, 502, 503, 504]
        .includes(error.status);

      if (!retryable || attempt === maxRetries - 1) {
        throw error;
      }

      const delay = 1000 * (2 ** attempt);
      await sleep(delay);
    }
  }
}`}
        />

        <p className="text-sm text-[#aaa]">
          Retry temporary failures with exponential backoff. Respect Retry-After
          headers when available, and avoid retrying permanent errors such as
          invalid API keys.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Handling Errors in Express.js</h2>
        <p className="leading-7 text-[#aaa]">
          In backend applications, never expose raw provider errors or secret
          information directly to frontend users. Return a safe and meaningful
          response.
        </p>

        <CodeBlock
          code={`app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const result = await groq.chat.completions.create({
      model: "YOUR_MODEL_ID",
      messages: [
        { role: "user", content: message }
      ]
    });

    return res.status(200).json({
      success: true,
      reply: result.choices[0].message.content
    });

  } catch (error) {
    console.error("AI API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate response"
    });
  }
});`}
        />
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Best Practices</h2>

        <div className="space-y-3">
          {[
            [
              "Never expose API keys",
              "Keep API keys in backend environment variables.",
            ],
            [
              "Validate user input",
              "Check required fields before sending API requests.",
            ],
            [
              "Use meaningful errors",
              "Return safe messages that users can understand.",
            ],
            ["Log errors", "Store useful debugging information on the server."],
            [
              "Use retry carefully",
              "Retry only temporary and retryable failures.",
            ],
            ["Set timeouts", "Prevent requests from waiting indefinitely."],
            [
              "Protect sensitive data",
              "Never log API keys or private user information.",
            ],
            [
              "Monitor API usage",
              "Track failures, latency, and token consumption.",
            ],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">
                {index + 1}. {title}
              </h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Use try...catch for handling asynchronous API errors.</li>
          <li>401 indicates an authentication problem.</li>
          <li>429 indicates a rate limit or quota problem.</li>
          <li>5xx errors generally indicate server-side failures.</li>
          <li>Retry temporary failures using exponential backoff.</li>
          <li>Validate requests before calling the LLM API.</li>
          <li>Never expose API keys or raw internal errors to users.</li>
          <li>Log errors to make debugging easier.</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What is error handling?",
            a: "Error handling is the process of detecting, managing, and responding to errors so that an application can fail safely.",
          },
          {
            q: "Why is try...catch used with LLM APIs?",
            a: "It catches errors from asynchronous API requests and prevents unhandled failures.",
          },
          {
            q: "What does HTTP 401 mean?",
            a: "It indicates an authentication problem, such as a missing or invalid API key.",
          },
          {
            q: "What does HTTP 429 mean?",
            a: "It indicates that a rate limit or request quota has been exceeded.",
          },
          {
            q: "What are 5xx errors?",
            a: "They are HTTP server error responses, generally indicating that the server failed to process a request.",
          },
          {
            q: "What is exponential backoff?",
            a: "It is a retry strategy in which the waiting time increases exponentially after each failed attempt.",
          },
          {
            q: "Should we retry every API error?",
            a: "No. Retry temporary failures such as certain rate-limit and server errors. Permanent errors like invalid API keys should not be retried.",
          },
          {
            q: "Why should raw API errors not be sent to frontend users?",
            a: "They may expose internal implementation details, sensitive information, or provider-specific data.",
          },
          {
            q: "Why is input validation important?",
            a: "It prevents invalid requests from reaching the API and reduces unnecessary token usage and failures.",
          },
          {
            q: "What is the purpose of logging errors?",
            a: "Logging helps developers identify, debug, and monitor problems in production applications.",
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
              <span className="font-semibold text-green-400"> </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ErrorHandling;

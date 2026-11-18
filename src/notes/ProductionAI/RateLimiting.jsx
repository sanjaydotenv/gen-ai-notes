import React from "react";
import CodeBlock from "../../components/CodeBlock";

const RateLimiting = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          PRODUCTION AI / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">Rate Limiting</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Rate Limiting is a technique used to control how many requests a user
          or client can make within a specific time period.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Why Rate Limiting?</h2>

        <p className="leading-7 text-[#aaa]">
          Without rate limiting, a user can send unlimited requests, which may
          overload your server or increase AI API costs.
        </p>

        <CodeBlock
          code={`Without Rate Limiting:

User ---> 1000 Requests ---> AI API
                              |
                         High API Cost
                         Server Overload

With Rate Limiting:

User ---> 10 Requests ---> AI API
       ---> Blocked Requests`}
        />

        <p className="text-sm text-[#aaa]">
          Example: Allow each user to make only 10 AI requests per minute.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. How It Works</h2>

        <CodeBlock
          code={`Incoming Request
       |
       v
Identify User / IP
       |
       v
Check Request Count
       |
       +---- Limit Exceeded?
       |          |
       |        YES ---> Return 429
       |
       NO
       |
       v
Increase Request Count
       |
       v
Process Request`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The server tracks requests for each user or IP address. If the allowed
          limit is exceeded, it rejects further requests until the limit resets.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. Common Rate Limiting Algorithms
        </h2>

        <div className="space-y-3">
          {[
            {
              title: "Fixed Window",
              desc: "Counts requests in fixed time intervals. Example: 10 requests per minute. The counter resets at the start of each new window.",
            },
            {
              title: "Sliding Window",
              desc: "Tracks requests over a continuously moving time period. It provides smoother limits than fixed windows.",
            },
            {
              title: "Token Bucket",
              desc: "Tokens are added to a bucket at a fixed rate. Each request consumes a token. Requests are rejected when no tokens remain.",
            },
            {
              title: "Leaky Bucket",
              desc: "Processes requests at a controlled rate, helping smooth sudden traffic spikes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. Implement Rate Limiting in Express
        </h2>

        <p className="leading-7 text-[#aaa]">
          Express applications can use the express-rate-limit package to limit
          incoming requests.
        </p>

        <CodeBlock language="bash" code={`npm install express-rate-limit`} />

        <p className="text-sm font-medium text-[#FC6C26]">server.js</p>

        <CodeBlock
          code={`import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Try again later.",
  },
});

app.post("/api/chat", aiLimiter, async (req, res) => {
  // Your AI request logic
  res.json({
    message: "AI request processed",
  });
});

app.listen(3000);`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Options</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#aaa]">
            <li>
              <span className="text-[#E3E3E3]">windowMs:</span> Time window in
              milliseconds.
            </li>
            <li>
              <span className="text-[#E3E3E3]">limit:</span> Maximum requests
              allowed in the window.
            </li>
            <li>
              <span className="text-[#E3E3E3]">message:</span> Response when the
              limit is exceeded.
            </li>
            <li>
              <span className="text-[#E3E3E3]">standardHeaders:</span> Sends
              standard rate-limit headers.
            </li>
            <li>
              <span className="text-[#E3E3E3]">legacyHeaders:</span> Controls
              older rate-limit headers.
            </li>
          </ul>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. HTTP 429 Status Code</h2>

        <p className="leading-7 text-[#aaa]">
          When a client exceeds the allowed request limit, the server usually
          responds with HTTP status code 429.
        </p>

        <CodeBlock
          code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": "Too many requests. Try again later."
}`}
        />

        <p className="text-sm text-[#aaa]">
          The response may also include a Retry-After header to tell the client
          when it can retry.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Rate Limiting in AI Applications
        </h2>

        <p className="leading-7 text-[#aaa]">
          AI applications need additional controls because different requests
          can consume different amounts of tokens and money.
        </p>

        <CodeBlock
          code={`User Request
     |
     v
Request Rate Limit
     |
     v
Authentication
     |
     v
Token / Usage Budget Check
     |
     v
LLM API Call
     |
     v
Track Token Usage
     |
     v
Return Response`}
        />

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Limit requests per user or API key.</li>
          <li>Set token usage limits per user.</li>
          <li>Set daily or monthly usage budgets.</li>
          <li>Apply stricter limits to expensive AI endpoints.</li>
          <li>Track provider rate-limit errors and retry safely.</li>
        </ul>

        <p className="text-sm leading-6 text-[#999]">
          Request limits and token budgets are different: one controls request
          frequency, while the other controls AI usage and cost.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Production Best Practices</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Use per-user limits for authenticated applications.</li>
          <li>Use Redis or another shared store across multiple servers.</li>
          <li>Apply different limits to different endpoints.</li>
          <li>Return HTTP 429 when the limit is exceeded.</li>
          <li>Use Retry-After where appropriate.</li>
          <li>Do not blindly trust client-provided user IDs or IP headers.</li>
          <li>Combine request limits with token and cost budgets.</li>
        </ul>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Key Takeaways</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Rate limiting controls request frequency.</li>
          <li>It protects servers from excessive traffic.</li>
          <li>It helps control AI API costs.</li>
          <li>
            Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket are
            common algorithms.
          </li>
          <li>HTTP 429 means Too Many Requests.</li>
          <li>Redis helps share counters across multiple server instances.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is Rate Limiting?",
            "It controls the number of requests a client can make within a specific time period.",
          ],
          [
            "2. Why is Rate Limiting important in AI applications?",
            "It prevents excessive API usage, reduces costs, and protects backend services.",
          ],
          [
            "3. What is HTTP 429?",
            "429 Too Many Requests is returned when a client exceeds the allowed request rate.",
          ],
          [
            "4. What is the Token Bucket algorithm?",
            "It allows requests by consuming tokens from a bucket. Tokens are replenished at a configured rate.",
          ],
          [
            "5. Why use Redis for Rate Limiting?",
            "Redis provides shared, fast counters that multiple backend instances can use.",
          ],
          [
            "6. What is the difference between Rate Limiting and Token Budgeting?",
            "Rate limiting controls request frequency, while token budgeting controls how many AI tokens a user can consume.",
          ],
        ].map(([question, answer]) => (
          <div
            key={question}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 className="font-medium">{question}</h3>
            <p className="mt-2 text-sm leading-6 text-green-400">{answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RateLimiting;

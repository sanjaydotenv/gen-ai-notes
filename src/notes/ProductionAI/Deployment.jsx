import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Deployment = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          PRODUCTION AI / 07
        </p>
        <h1 className="mt-2 text-3xl font-bold">AI Application Deployment</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          Deployment is the process of making an AI application available to
          users through a production server or cloud platform.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Deployment Architecture</h2>

        <p className="leading-7 text-[#aaa]">
          A production AI application usually contains a frontend, backend, AI
          model provider, and database.
        </p>

        <CodeBlock
          code={`             User
              |
              v
         Frontend App
              |
              v
         Backend API
              |
       +------+------+
       |      |      |
       v      v      v
      LLM   Database Tools
       |
       v
   AI Response
       |
       v
      User`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Prepare Application</h2>

        <p className="leading-7 text-[#aaa]">
          Before deployment, make sure the application is ready for production.
        </p>

        <ul className="list-inside list-disc space-y-2 text-sm text-[#aaa]">
          <li>Remove unnecessary development code and logs.</li>
          <li>Keep API keys and secrets in environment variables.</li>
          <li>Configure production database connections.</li>
          <li>Add error handling and request validation.</li>
          <li>Configure CORS and authentication properly.</li>
          <li>Test the production build locally.</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Environment Variables</h2>

        <p className="leading-7 text-[#aaa]">
          API keys, database URLs, and other secrets should not be hardcoded in
          application source code.
        </p>

        <CodeBlock
          code={`# .env

PORT=3000
NODE_ENV=production

OPENAI_API_KEY=your_api_key
MONGODB_URI=your_database_url`}
        />

        <CodeBlock
          code={`// server.js

import "dotenv/config";
import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server running on \${PORT}\`);
});`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Never commit .env files to GitHub. Configure environment variables
            separately on your deployment platform.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Build for Production</h2>

        <p className="leading-7 text-[#aaa]">
          Frontend applications need a production build before they can be
          served efficiently.
        </p>

        <CodeBlock
          code={`# Install dependencies
npm install

# Create production build
npm run build`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          For Vite, the production files are generated inside the dist/
          directory.
        </p>

        <CodeBlock
          code={`Development:
Source Code
    |
    v
Development Server

Production:
Source Code
    |
    v
Build Process
    |
    v
dist/ Folder
    |
    v
Production Hosting`}
        />
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Deploy Backend</h2>

        <p className="leading-7 text-[#aaa]">
          The backend runs on a production server and handles API requests,
          authentication, database operations, and LLM calls.
        </p>

        <CodeBlock
          code={`# Example deployment flow

1. Push backend code to GitHub.
2. Connect the repository to a hosting platform.
3. Configure build and start commands.
4. Add production environment variables.
5. Deploy the application.
6. Test the deployed API.`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example platforms: Render, Railway, AWS, and Google Cloud.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Deploy Frontend</h2>

        <p className="leading-7 text-[#aaa]">
          The frontend can be hosted separately from the backend. Configure its
          API base URL to point to the deployed backend.
        </p>

        <CodeBlock
          code={`# .env.production (Vite)

VITE_API_URL=https://api.example.com`}
        />

        <CodeBlock
          code={`// api.js

const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(message) {
  const response = await fetch(
    \`\${API_URL}/api/chat\`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  return response.json();
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          VITE_ variables are exposed in the browser bundle. Never put private
          API keys in frontend environment variables.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Docker Deployment</h2>

        <p className="leading-7 text-[#aaa]">
          Docker packages an application and its dependencies into a container
          so it can run consistently across environments.
        </p>

        <CodeBlock
          code={`# Dockerfile

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`}
        />

        <CodeBlock
          code={`# Build Docker image
docker build -t ai-backend .

# Run container
docker run -p 3000:3000 --env-file .env ai-backend`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Use a production start script in package.json. Do not copy local
          secrets into the Docker image.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Production Checklist</h2>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <ul className="list-inside list-disc space-y-3 text-sm text-[#aaa]">
            <li>Environment variables configured.</li>
            <li>API keys protected on the backend.</li>
            <li>Database connection tested.</li>
            <li>Authentication and authorization enabled.</li>
            <li>Rate limiting configured.</li>
            <li>Errors and timeouts handled.</li>
            <li>Token usage and costs monitored.</li>
            <li>Health check endpoint available.</li>
            <li>Logs and backups configured where required.</li>
          </ul>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9. Key Takeaways</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>Deployment makes an application accessible to users.</li>
          <li>Frontend and backend can be deployed separately.</li>
          <li>Environment variables protect configuration and secrets.</li>
          <li>Production builds optimize frontend applications.</li>
          <li>Docker provides consistent application environments.</li>
          <li>Monitoring and security are essential after deployment.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is Deployment?",
            "Deployment is the process of making an application available in a production environment.",
          ],
          [
            "2. Why are environment variables used?",
            "They store configuration and sensitive values outside the source code.",
          ],
          [
            "3. What is a Production Build?",
            "It is an optimized version of an application prepared for production hosting.",
          ],
          [
            "4. What is Docker?",
            "Docker is a platform for packaging applications and dependencies into containers.",
          ],
          [
            "5. Why should AI API keys stay on the backend?",
            "Frontend code is accessible to users, so exposed API keys can be stolen and misused.",
          ],
          [
            "6. Can frontend and backend be deployed separately?",
            "Yes. The frontend communicates with the backend through HTTP APIs.",
          ],
          [
            "7. What should be monitored after deployment?",
            "Application errors, latency, availability, token usage, API costs, and resource consumption.",
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

export default Deployment;

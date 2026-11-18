import React from "react";
import CodeBlock from "../../components/CodeBlock";

const AIEvaluation = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-[#FC6C26]">
          PRODUCTION AI / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">AI Evaluation</h1>
        <p className="mt-3 leading-7 text-[#aaa]">
          AI Evaluation is the process of measuring how well an AI application
          performs by testing its accuracy, relevance, reliability, and overall
          response quality.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Why AI Evaluation?</h2>

        <p className="leading-7 text-[#aaa]">
          LLMs can generate incorrect, irrelevant, or inconsistent responses.
          Evaluation helps us identify these problems before and after deploying
          an AI application.
        </p>

        <CodeBlock
          code={`User Question
      |
      v
   AI Model
      |
      v
 Generated Response
      |
      v
   Evaluation
      |
      +---- Good Response? ---> Accept
      |
      +---- Poor Response? ---> Improve`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Example: A customer support chatbot should provide correct answers
          based on company documentation, not invented information.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. What Should We Evaluate?</h2>

        <div className="space-y-3">
          {[
            {
              title: "Accuracy",
              desc: "Is the generated information factually correct?",
            },
            {
              title: "Relevance",
              desc: "Does the response actually answer the user's question?",
            },
            {
              title: "Faithfulness",
              desc: "Does the answer stay consistent with the provided context or retrieved documents?",
            },
            {
              title: "Completeness",
              desc: "Does the response cover the important parts of the question?",
            },
            {
              title: "Latency",
              desc: "How much time does the application take to generate a response?",
            },
            {
              title: "Cost",
              desc: "How many tokens and how much money does each request consume?",
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

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Evaluation Methods</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              1. Human Evaluation
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Humans review AI responses and judge their correctness, relevance,
              and usefulness.
            </p>
            <p className="mt-2 text-xs text-[#888]">
              Best for: Subjective quality and complex responses.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              2. Automated Evaluation
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Code, metrics, or evaluation models automatically check generated
              responses against defined criteria.
            </p>
            <p className="mt-2 text-xs text-[#888]">
              Best for: Repeated tests and large datasets.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">3. LLM-as-a-Judge</h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Another LLM evaluates a generated response using a scoring rubric
              and evaluation instructions.
            </p>
            <p className="mt-2 text-xs text-[#888]">
              Best for: Evaluating semantic quality at scale.
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          LLM-as-a-Judge can also make mistakes or show bias. For important
          applications, compare its results with human-reviewed examples.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Common Evaluation Metrics</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[#aaa]">
              <tr>
                <td className="p-3 text-[#E3E3E3]">Accuracy</td>
                <td className="p-3">Measures correct predictions.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Precision</td>
                <td className="p-3">
                  Measures how many positive predictions are correct.
                </td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Recall</td>
                <td className="p-3">
                  Measures how many actual positive cases are found.
                </td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">F1 Score</td>
                <td className="p-3">Harmonic mean of precision and recall.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Faithfulness</td>
                <td className="p-3">
                  Checks whether answers are supported by context.
                </td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Latency</td>
                <td className="p-3">Measures response time.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          Accuracy, precision, recall, and F1 are especially common in
          classification tasks. Faithfulness is useful for RAG evaluation.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          5. Evaluating RAG Applications
        </h2>

        <p className="leading-7 text-[#aaa]">
          In RAG, we evaluate both document retrieval and the final generated
          answer.
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Retrieval Evaluation
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Checks whether the system retrieves the correct and relevant
              documents.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-[#FC6C26]">
              Generation Evaluation
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#aaa]">
              Checks whether the LLM generates a correct answer using the
              retrieved context.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`User Question
      |
      v
Document Retrieval
      |
      v
Retrieved Context
      |
      +---- Evaluate Retrieval
      |       (Relevance)
      |
      v
   LLM Answer
      |
      +---- Evaluate Generation
              (Faithfulness,
               Correctness)
`}
        />
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Basic Evaluation Example</h2>

        <p className="leading-7 text-[#aaa]">
          We can create a small evaluation dataset containing questions,
          expected answers, and actual AI responses.
        </p>

        <CodeBlock
          code={`const evaluationData = [
  {
    question: "What is Node.js?",
    expected: "A JavaScript runtime environment.",
    actual: "Node.js is a JavaScript runtime environment.",
  },
];

function evaluateResponse(item) {
  return {
    question: item.question,
    passed: item.expected === item.actual,
  };
}

const results = evaluationData.map(evaluateResponse);

console.log(results);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This example checks exact text equality only. Real AI evaluation needs
          semantic comparison, human review, or an evaluation model because
          correct answers can have different wording.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Evaluation Workflow</h2>

        <CodeBlock
          code={`1. Create Test Dataset
          |
          v
2. Define Evaluation Metrics
          |
          v
3. Run AI Application
          |
          v
4. Collect Generated Responses
          |
          v
5. Evaluate Results
          |
          v
6. Identify Weaknesses
          |
          v
7. Improve Prompts / Model / RAG
          |
          v
8. Run Evaluation Again`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Repeat this workflow whenever prompts, models, retrieval settings, or
          application logic change.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Popular Evaluation Tools</h2>

        <div className="space-y-3">
          {[
            {
              name: "LangSmith",
              desc: "Tracing, datasets, experiments, and LLM evaluation.",
            },
            {
              name: "Ragas",
              desc: "Metrics and evaluation for RAG applications.",
            },
            {
              name: "DeepEval",
              desc: "Testing and evaluation framework for LLM applications.",
            },
            {
              name: "OpenAI Evals",
              desc: "Framework for defining and running model evaluations.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9. Key Takeaways</h2>

        <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#aaa]">
          <li>
            AI Evaluation measures the quality and performance of AI
            applications.
          </li>
          <li>
            Human, automated, and LLM-as-a-Judge are common evaluation methods.
          </li>
          <li>Accuracy and relevance measure response quality.</li>
          <li>Faithfulness checks whether answers are supported by context.</li>
          <li>RAG evaluation covers both retrieval and generation.</li>
          <li>Evaluation datasets help compare changes consistently.</li>
          <li>Latency and cost are also important production metrics.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Interview Questions &amp; Answers
        </h2>

        {[
          [
            "1. What is AI Evaluation?",
            "It is the process of measuring the quality, accuracy, and performance of an AI application.",
          ],
          [
            "2. What is LLM-as-a-Judge?",
            "It uses one LLM to evaluate another model's output against defined criteria.",
          ],
          [
            "3. What is Faithfulness in RAG?",
            "It measures whether the generated answer is supported by the retrieved context.",
          ],
          [
            "4. What is the difference between Retrieval and Generation Evaluation?",
            "Retrieval evaluation checks the relevance of retrieved documents, while generation evaluation checks the quality of the final answer.",
          ],
          [
            "5. Why do we need an evaluation dataset?",
            "It provides consistent test cases to measure and compare AI application performance.",
          ],
          [
            "6. What is the difference between Precision and Recall?",
            "Precision measures how many predicted positive results are correct, while Recall measures how many actual positive results are found.",
          ],
          [
            "7. Why is exact text matching insufficient for LLM evaluation?",
            "Because semantically correct answers can use different words and sentence structures.",
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

export default AIEvaluation;

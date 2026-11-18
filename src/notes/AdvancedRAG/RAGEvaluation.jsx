import React from "react";
import CodeBlock from "../../components/CodeBlock";

const RAGEvaluation = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 05
        </p>
        <h1 className="text-3xl font-bold">RAG Evaluation</h1>
        <p className="text-[#aaa] leading-7">
          RAG Evaluation is the process of measuring how effectively a RAG
          system retrieves relevant documents and generates accurate, relevant,
          and context-supported answers.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is RAG Evaluation?
        </h2>

        <p className="text-[#aaa] leading-7">
          A RAG system has two major responsibilities:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Retrieval</h3>
            <p className="text-sm text-[#aaa]">
              Find the most relevant documents from the knowledge base.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Generation</h3>
            <p className="text-sm text-[#aaa]">
              Generate a correct answer using the retrieved context.
            </p>
          </div>
        </div>

        <p className="text-[#aaa] leading-7">
          RAG Evaluation checks both stages independently and also evaluates the
          complete question-to-answer pipeline.
        </p>

        <CodeBlock
          language="text"
          code={`User Question
      |
      v
  Retriever
      |
      v
Retrieved Documents
      |
      |  Retrieval Evaluation
      v
  Context
      |
      v
     LLM
      |
      v
 Generated Answer
      |
      |  Generation Evaluation
      v
 Evaluation Results`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need RAG Evaluation?
        </h2>

        <p className="text-[#aaa] leading-7">
          A RAG application may work correctly from a coding perspective but
          still produce poor answers.
        </p>

        <div className="space-y-3">
          {[
            [
              "Poor Retrieval",
              "The retriever may return documents that are not relevant to the question.",
            ],
            [
              "Missing Context",
              "Important information may be missing from the retrieved documents.",
            ],
            [
              "Hallucination",
              "The LLM may generate unsupported or incorrect information.",
            ],
            [
              "Incomplete Answers",
              "The answer may miss important parts of the question.",
            ],
            [
              "Irrelevant Answers",
              "The answer may contain information unrelated to the user's query.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Main Components of RAG Evaluation
        </h2>

        <h3 className="text-lg font-semibold text-white">
          A. Retrieval Evaluation
        </h3>

        <p className="text-[#aaa] leading-7">
          Retrieval Evaluation measures whether the retriever finds useful and
          relevant documents for a given query.
        </p>

        <h3 className="text-lg font-semibold text-white">
          B. Generation Evaluation
        </h3>

        <p className="text-[#aaa] leading-7">
          Generation Evaluation measures whether the LLM generates a correct,
          relevant, and context-supported answer.
        </p>

        <h3 className="text-lg font-semibold text-white">
          C. End-to-End Evaluation
        </h3>

        <p className="text-[#aaa] leading-7">
          End-to-End Evaluation measures the quality of the complete RAG
          pipeline, starting from the user's question and ending with the final
          answer.
        </p>

        <CodeBlock
          language="text"
          code={`                 RAG Evaluation
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Retrieval    Generation   End-to-End
      Evaluation   Evaluation   Evaluation
          |            |            |
          v            v            v
       Relevant     Correct       Overall
       Documents    Answers       Quality`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Important RAG Evaluation Metrics
        </h2>

        {/* Context Precision */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">A. Context Precision</h3>

          <p className="text-[#aaa] leading-7">
            Context Precision measures how many retrieved documents are
            relevant, especially their position in the ranked list. Relevant
            documents appearing near the top improve this metric.
          </p>

          <CodeBlock
            language="text"
            code={`Retrieved Documents:

1. Relevant Document
2. Relevant Document
3. Irrelevant Document
4. Relevant Document

Higher Context Precision:
More relevant documents appear near the top.`}
          />
        </div>

        {/* Context Recall */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">B. Context Recall</h3>

          <p className="text-[#aaa] leading-7">
            Context Recall measures whether the retrieved context contains the
            information required to answer the question.
          </p>

          <CodeBlock
            language="text"
            code={`Required Information:
- Event Loop
- Callbacks
- Non-blocking I/O

Retrieved Context:
- Event Loop
- Callbacks

Some required information is missing.

Context Recall is reduced.`}
          />
        </div>

        {/* Faithfulness */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">C. Faithfulness</h3>

          <p className="text-[#aaa] leading-7">
            Faithfulness measures whether the generated answer is supported by
            the retrieved context.
          </p>

          <CodeBlock
            language="text"
            code={`Retrieved Context:
"Node.js uses an Event Loop to handle
asynchronous operations."

Generated Answer:
"Node.js uses an Event Loop to handle
asynchronous operations."

Faithfulness: High

If the answer adds unsupported claims,
faithfulness decreases.`}
          />
        </div>

        {/* Answer Relevance */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">D. Answer Relevance</h3>

          <p className="text-[#aaa] leading-7">
            Answer Relevance measures how well the generated answer addresses
            the user's actual question.
          </p>

          <CodeBlock
            language="text"
            code={`Question:
"What is the Node.js Event Loop?"

Answer A:
"The Event Loop coordinates asynchronous
operations in Node.js."

Answer B:
"React is a JavaScript library."

Answer A has higher Answer Relevance.`}
          />
        </div>

        {/* Answer Correctness */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">E. Answer Correctness</h3>

          <p className="text-[#aaa] leading-7">
            Answer Correctness measures how accurately the generated answer
            matches a trusted reference answer.
          </p>

          <p className="text-sm text-[#aaa]">
            Unlike Faithfulness, which focuses on support from retrieved
            context, Answer Correctness checks factual accuracy against a
            reference answer.
          </p>
        </div>

        {/* Context Relevance */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">F. Context Relevance</h3>

          <p className="text-[#aaa] leading-7">
            Context Relevance measures how relevant the retrieved information is
            to the user's question.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Traditional Retrieval Metrics
        </h2>

        <p className="text-[#aaa] leading-7">
          Apart from RAG-specific metrics, traditional information retrieval
          metrics are also useful for evaluating retrievers.
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">A. Precision@K</h3>
            <p className="text-sm text-[#aaa]">
              Measures the proportion of relevant documents among the top K
              retrieved documents.
            </p>
            <CodeBlock
              language="text"
              code={`Precision@K =
Relevant Documents in Top K
----------------------------
         K

Example:
Top 5 results contain 4 relevant documents.

Precision@5 = 4 / 5 = 0.80`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">B. Recall@K</h3>
            <p className="text-sm text-[#aaa]">
              Measures how many of all known relevant documents are retrieved
              within the top K results.
            </p>
            <CodeBlock
              language="text"
              code={`Recall@K =
Relevant Documents Retrieved in Top K
--------------------------------------
Total Relevant Documents

Example:
5 relevant documents exist.
4 are retrieved in Top K.

Recall@K = 4 / 5 = 0.80`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">
              C. Mean Reciprocal Rank (MRR)
            </h3>
            <p className="text-sm text-[#aaa]">
              Measures how high the first relevant result appears in the ranked
              search results.
            </p>
            <CodeBlock
              language="text"
              code={`Reciprocal Rank = 1 / Rank of First Relevant Result

Example:
First relevant document appears at position 2.

Reciprocal Rank = 1 / 2 = 0.5

MRR = Average Reciprocal Rank
      across all queries.`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">D. NDCG@K</h3>
            <p className="text-sm text-[#aaa]">
              Normalized Discounted Cumulative Gain measures ranking quality
              while considering the relevance level of each retrieved document
              and its position.
            </p>
            <p className="text-sm text-[#aaa]">
              Highly relevant documents appearing near the top contribute more
              than equally relevant documents appearing lower down.
            </p>
          </div>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Faithfulness vs Answer Correctness
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Faithfulness</th>
                <th className="p-3">Answer Correctness</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Checks support from retrieved context.</td>
                <td className="p-3">Checks against a reference answer.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Focuses on unsupported claims.</td>
                <td className="p-3">Focuses on factual accuracy.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Can be high even if the context is wrong.
                </td>
                <td className="p-3">
                  Can be high if the answer matches the trusted reference.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
          <p className="font-semibold text-white">Important Example</p>
          <p className="text-sm text-[#aaa]">
            Suppose the retrieved context incorrectly says that Node.js uses
            Python as its runtime.
          </p>
          <p className="text-sm text-[#aaa]">
            The LLM repeats that statement exactly.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li className="text-green-400">
              Faithfulness may be high because the answer follows the context.
            </li>
            <li className="text-red-400">
              Answer Correctness is low because the information is factually
              wrong.
            </li>
          </ul>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. How RAG Evaluation Works
        </h2>

        <CodeBlock
          language="text"
          code={`              Evaluation Dataset
                      |
                      v
                 User Questions
                      |
                      v
                  RAG System
                      |
             +--------+--------+
             |                 |
             v                 v
       Retrieved Docs     Generated Answer
             |                 |
             v                 v
      Retrieval Metrics   Answer Metrics
             |                 |
             +--------+--------+
                      |
                      v
              Evaluation Report
                      |
                      v
              Improve RAG System`}
        />

        <p className="text-[#aaa] leading-7">
          A good evaluation dataset generally contains questions, reference
          answers, and relevant reference contexts. The RAG system is tested
          against this dataset.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. RAG Evaluation with Ragas
        </h2>

        <p className="text-[#aaa] leading-7">
          Ragas is an evaluation framework designed for RAG and LLM
          applications. It provides metrics that help evaluate retrieval and
          generation quality.
        </p>

        <CodeBlock language="bash" code={`pip install ragas datasets`} />

        <p className="text-sm text-[#aaa]">Example using Python and Ragas:</p>

        <CodeBlock
          language="python"
          code={`from datasets import Dataset
from ragas import evaluate
from ragas.metrics import (
    Faithfulness,
    ResponseRelevancy,
    LLMContextPrecisionWithoutReference,
    LLMContextRecall,
)

# 1. Prepare evaluation data
data = {
    "user_input": [
        "What is Node.js Event Loop?"
    ],

    "retrieved_contexts": [
        [
            "The Event Loop handles asynchronous "
            "operations in Node.js."
        ]
    ],

    "response": [
        "The Node.js Event Loop handles "
        "asynchronous operations."
    ],

    "reference": [
        "The Event Loop coordinates asynchronous "
        "operations in Node.js."
    ],
}

# 2. Convert data into Dataset
dataset = Dataset.from_dict(data)

# 3. Run evaluation
results = evaluate(
    dataset=dataset,
    metrics=[
        Faithfulness(),
        ResponseRelevancy(),
        LLMContextPrecisionWithoutReference(),
        LLMContextRecall(),
    ],
)

# 4. Print evaluation results
print(results)
print(results.to_pandas())`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">Important Notes</p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
            <li>
              This is an illustrative Ragas Python example, not a JavaScript
              LangChain implementation.
            </li>
            <li>
              Current Ragas versions may require an LLM and embedding
              configuration for metric evaluation.
            </li>
            <li>Metric names and imports can vary between Ragas versions.</li>
            <li>
              The dataset fields must match the selected metrics' requirements.
            </li>
          </ul>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. How to Improve RAG Evaluation Scores
        </h2>

        <div className="space-y-3">
          {[
            [
              "Improve Chunking",
              "Choose suitable chunk sizes and boundaries so that retrieved chunks contain useful information.",
            ],
            [
              "Improve Embeddings",
              "Use an embedding model suitable for your domain and language.",
            ],
            [
              "Improve Retrieval",
              "Tune Top-K, similarity thresholds, and search strategies.",
            ],
            [
              "Use Hybrid Search",
              "Combine keyword and semantic retrieval when both are useful.",
            ],
            [
              "Apply Reranking",
              "Reorder candidate documents to improve relevance.",
            ],
            [
              "Improve Prompts",
              "Instruct the LLM to answer using retrieved context and acknowledge missing information.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Important Metric Comparison
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">What It Measures</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                [
                  "Context Precision",
                  "Relevance and ranking of retrieved context.",
                ],
                [
                  "Context Recall",
                  "Coverage of required information in retrieved context.",
                ],
                [
                  "Faithfulness",
                  "Support of generated claims by retrieved context.",
                ],
                [
                  "Answer Relevance",
                  "How well the answer addresses the question.",
                ],
                [
                  "Answer Correctness",
                  "Accuracy compared with a reference answer.",
                ],
                ["Precision@K", "Proportion of relevant documents in Top-K."],
                [
                  "Recall@K",
                  "Proportion of all relevant documents found in Top-K.",
                ],
                ["MRR", "Position of the first relevant result."],
                [
                  "NDCG@K",
                  "Quality of the ranked results considering relevance levels.",
                ],
              ].map(([metric, meaning], index) => (
                <tr key={index} className="border-t border-white/10">
                  <td className="p-3 text-white">{metric}</td>
                  <td className="p-3">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is RAG Evaluation?",
            a: "It is the process of measuring retrieval quality and generated answer quality in a RAG system.",
          },
          {
            q: "What are the two major stages of RAG Evaluation?",
            a: "Retrieval Evaluation and Generation Evaluation.",
          },
          {
            q: "What is Faithfulness?",
            a: "It measures whether the generated answer is supported by the retrieved context.",
          },
          {
            q: "What is Context Precision?",
            a: "It measures how relevant the retrieved documents are, considering their ranking positions.",
          },
          {
            q: "What is Context Recall?",
            a: "It measures whether the retrieved context contains the information needed to answer the question.",
          },
          {
            q: "What is Answer Relevance?",
            a: "It measures how well the generated answer addresses the user's question.",
          },
          {
            q: "What is the difference between Precision@K and Recall@K?",
            a: "Precision@K measures the proportion of retrieved results that are relevant, while Recall@K measures the proportion of all relevant results that were retrieved.",
          },
          {
            q: "What is MRR?",
            a: "Mean Reciprocal Rank measures how high the first relevant document appears across multiple queries.",
          },
          {
            q: "What is Ragas?",
            a: "Ragas is a framework that provides metrics and tools for evaluating RAG and LLM applications.",
          },
          {
            q: "Can a RAG answer be faithful but incorrect?",
            a: "Yes. An answer can accurately repeat incorrect information from the retrieved context. Faithfulness does not guarantee factual correctness.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-white">
              {index + 1}. {item.q}
            </p>
            <p className="text-sm text-green-400 leading-6">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RAGEvaluation;

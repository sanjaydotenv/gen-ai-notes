import React from "react";
import CodeBlock from "../../components/CodeBlock";

const CosineSimilarity = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          EMBEDDINGS & VECTOR DATABASES / 03
        </p>
        <h1 className="mt-2 text-3xl font-bold">Cosine Similarity</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Cosine Similarity is a mathematical technique used to measure how
          similar two vectors are by calculating the cosine of the angle between
          them.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Cosine Similarity?</h2>

        <p className="leading-7 text-[#aaa]">
          In AI applications, text is converted into numerical vectors. Cosine
          Similarity compares these vectors to determine how closely their
          directions match.
        </p>

        <CodeBlock
          code={`Vector A: [0.2, 0.8, 0.5]
Vector B: [0.3, 0.7, 0.6]
             |
             v
      Cosine Similarity
             |
             v
       Similarity Score`}
        />

        <p className="text-sm text-[#aaa]">
          A higher cosine similarity generally indicates that two vectors point
          in more similar directions.
        </p>
      </section>

      {/* Formula */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Cosine Similarity Formula</h2>

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
          <p className="text-center text-lg font-semibold text-[#FC6C26]">
            Cosine Similarity
          </p>
          <p className="mt-4 text-center text-xl font-semibold">
            cos(θ) = (A · B) / (||A|| × ||B||)
          </p>
          <p className="mt-3 text-center text-xs text-[#aaa]">
            Dot Product divided by the product of vector magnitudes
          </p>
        </div>

        <p className="text-sm text-[#aaa]">Where:</p>

        <ul className="list-disc space-y-2 pl-5 text-sm text-[#aaa]">
          <li>
            <span className="text-[#FC6C26]">A · B:</span> Dot product of two
            vectors.
          </li>
          <li>
            <span className="text-[#FC6C26]">||A||:</span> Magnitude of vector
            A.
          </li>
          <li>
            <span className="text-[#FC6C26]">||B||:</span> Magnitude of vector
            B.
          </li>
          <li>
            <span className="text-[#FC6C26]">θ:</span> Angle between the
            vectors.
          </li>
        </ul>
      </section>

      {/* Score */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          3. Understanding Similarity Scores
        </h2>

        <div className="space-y-3">
          {[
            ["+1", "Same direction", "text-green-400", "bg-green-500/10"],
            [
              "0",
              "Perpendicular directions",
              "text-yellow-400",
              "bg-yellow-500/10",
            ],
            ["-1", "Opposite directions", "text-red-400", "bg-red-500/10"],
          ].map(([score, label, color, bg]) => (
            <div
              key={score}
              className={`flex items-center gap-4 rounded-xl border border-white/10 p-4 ${bg}`}
            >
              <span className={`text-2xl font-bold ${color}`}>{score}</span>
              <span className="text-sm text-[#ccc]">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#aaa]">
          Cosine similarity ranges from -1 to +1 for non-zero vectors. In many
          embedding applications, scores are often positive, but this is not
          guaranteed.
        </p>
      </section>

      {/* Visual */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Understanding Vector Angles</h2>

        <CodeBlock
          code={`Same Direction (0°)

       A ------>
       B ------>

Cosine Similarity = 1


Perpendicular (90°)

       B
       |
       |
       +--------> A

Cosine Similarity = 0


Opposite Direction (180°)

       A ------>
       <------ B

Cosine Similarity = -1`}
        />

        <p className="text-sm text-[#aaa]">
          Smaller angles generally indicate greater directional similarity,
          while larger angles indicate less similarity.
        </p>
      </section>

      {/* Calculation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Step-by-Step Calculation</h2>

        <p className="text-sm text-[#aaa]">Consider two vectors:</p>

        <CodeBlock
          code={`A = [1, 2]
B = [2, 1]

Step 1: Dot Product

A . B = (1 × 2) + (2 × 1)
      = 2 + 2
      = 4

Step 2: Magnitude of A

||A|| = √(1² + 2²)
      = √5

Step 3: Magnitude of B

||B|| = √(2² + 1²)
      = √5

Step 4: Cosine Similarity

= 4 / (√5 × √5)
= 4 / 5
= 0.8`}
        />

        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <p className="font-semibold text-green-400">Final Result: 0.8</p>
          <p className="mt-1 text-sm text-[#aaa]">
            Both vectors have a high directional similarity.
          </p>
        </div>
      </section>

      {/* JavaScript */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          6. Implementing Cosine Similarity in JavaScript
        </h2>

        <p className="leading-7 text-[#aaa]">
          We can calculate cosine similarity manually using JavaScript arrays
          and mathematical operations.
        </p>

        <CodeBlock
          code={`function cosineSimilarity(A, B) {
  if (A.length !== B.length) {
    throw new Error("Vector dimensions must match");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < A.length; i++) {
    dotProduct += A[i] * B[i];

    magnitudeA += A[i] ** 2;
    magnitudeB += B[i] ** 2;
  }

  const denominator =
    Math.sqrt(magnitudeA) *
    Math.sqrt(magnitudeB);

  if (denominator === 0) {
    throw new Error("Zero vectors are not supported");
  }

  return dotProduct / denominator;
}

const A = [1, 2];
const B = [2, 1];

console.log(cosineSimilarity(A, B));
// 0.8`}
        />
      </section>

      {/* Real World */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Real-World AI Example</h2>

        <p className="leading-7 text-[#aaa]">Imagine a user searches for:</p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="text-sm text-[#999]">User Query</p>
          <p className="mt-2 font-semibold text-[#FC6C26]">
            "How to learn JavaScript?"
          </p>
        </div>

        <p className="text-sm text-[#aaa]">
          A system compares its embedding with stored document embeddings:
        </p>

        <CodeBlock
          code={`Query Embedding
       |
       v
Compare with Document Vectors
       |
       +----> Document A: 0.92
       |
       +----> Document B: 0.78
       |
       +----> Document C: 0.31
       |
       v
Rank by Similarity
       |
       v
Return Most Relevant Documents`}
        />

        <p className="text-sm text-[#aaa]">
          These scores are illustrative. The system can rank documents and
          retrieve the most relevant results.
        </p>
      </section>

      {/* Limitations */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Limitations</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Vectors must have matching dimensions.</li>
          <li>Zero vectors cannot be used because their magnitude is zero.</li>
          <li>High similarity does not guarantee factual correctness.</li>
          <li>Results depend on the quality of the embedding model.</li>
          <li>
            Cosine similarity measures vector direction, not actual meaning
            directly.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Cosine Similarity?",
            a: "It is a mathematical technique that measures similarity between two vectors using the cosine of the angle between them.",
          },
          {
            q: "What is the range of Cosine Similarity?",
            a: "It ranges from -1 to +1 for non-zero vectors.",
          },
          {
            q: "What does a score of 1 mean?",
            a: "Both vectors point in exactly the same direction.",
          },
          {
            q: "What does a score of 0 mean?",
            a: "The vectors are perpendicular to each other.",
          },
          {
            q: "What does a score of -1 mean?",
            a: "Both vectors point in opposite directions.",
          },
          {
            q: "Why is Cosine Similarity used in AI?",
            a: "It helps compare embeddings and retrieve semantically similar data.",
          },
          {
            q: "Does Cosine Similarity consider vector magnitude?",
            a: "It normalizes by vector magnitudes, so the final score depends on the angle rather than the vector lengths.",
          },
          {
            q: "Can Cosine Similarity work with different vector dimensions?",
            a: "No. Standard cosine similarity requires both vectors to have the same dimensions.",
          },
          {
            q: "Is high Cosine Similarity always equal to semantic correctness?",
            a: "No. It indicates vector similarity, but does not guarantee that the information is factually correct.",
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

export default CosineSimilarity;

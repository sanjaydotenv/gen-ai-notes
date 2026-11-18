import ChromaDBPinecone from "../notes/EmbeddingsVectorDatabases/ChromaDBPinecone";
import CosineSimilarity from "../notes/EmbeddingsVectorDatabases/CosineSimilarity";
import MongoDBVectorSearch from "../notes/EmbeddingsVectorDatabases/MongoDBVectorSearch";
import SemanticSearch from "../notes/EmbeddingsVectorDatabases/SemanticSearch";
import VectorDatabases from "../notes/EmbeddingsVectorDatabases/VectorDatabases";
import VectorRepresentations from "../notes/EmbeddingsVectorDatabases/VectorRepresentations";
import WhatareEmbeddings from "../notes/EmbeddingsVectorDatabases/WhatareEmbeddings";

const EmbeddingsVectorDatabasesRoutes = [
  {
    path: "what-are-embeddings",
    element: <WhatareEmbeddings />,
  },
  {
    path: "vector-representations",
    element: <VectorRepresentations />,
  },
  {
    path: "cosine-similarity",
    element: <CosineSimilarity />,
  },
  {
    path: "semantic-search",
    element: <SemanticSearch />,
  },
  {
    path: "vector-databases",
    element: <VectorDatabases />,
  },
  {
    path: "chromadb-pinecone",
    element: <ChromaDBPinecone />,
  },
  {
    path: "mongodb-vector-search",
    element: <MongoDBVectorSearch />,
  },
];

export default EmbeddingsVectorDatabasesRoutes;

import AgenticRAGIntroduction from "../notes/AdvancedRAG/AgenticRAGIntroduction";
import HybridSearch from "../notes/AdvancedRAG/HybridSearch";
import MetadataFiltering from "../notes/AdvancedRAG/MetadataFiltering";
import QueryTransformation from "../notes/AdvancedRAG/QueryTransformation";
import RAGEvaluation from "../notes/AdvancedRAG/RAGEvaluation";
import Reranking from "../notes/AdvancedRAG/Reranking";
import SemanticSearch from "../notes/AdvancedRAG/SemanticSearch";

const AdvancedRAGRoutes = [
  {
    path: "/agentic-rag-introduction",
    element: <AgenticRAGIntroduction />,
    label: "Agentic RAG Introduction",
  },
  {
    path: "/hybrid-search",
    element: <HybridSearch />,
    label: "Hybrid Search",
  },
  {
    path: "/metadata-filtering",
    element: <MetadataFiltering />,
    label: "Metadata Filtering",
  },
  {
    path: "/query-transformation",
    element: <QueryTransformation />,
    label: "Query Transformation",
  },
  {
    path: "/rag-evaluation",
    element: <RAGEvaluation />,
    label: "RAG Evaluation",
  },
  {
    path: "/reranking",
    element: <Reranking />,
    label: "Reranking",
  },
  {
    path: "/semantic-search",
    element: <SemanticSearch />,
    label: "Semantic Search",
  },
];

export default AdvancedRAGRoutes
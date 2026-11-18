import Chunking from "../notes/RAGFundamentals/Chunking";
import ContextInjection from "../notes/RAGFundamentals/ContextInjection";
import DocumentProcessing from "../notes/RAGFundamentals/DocumentProcessing";
import Embeddings from "../notes/RAGFundamentals/Embeddings";
import RAGArchitecture from "../notes/RAGFundamentals/RAGArchitecture";
import RAGImplementation from "../notes/RAGFundamentals/RAGImplementation";
import Retrieval from "../notes/RAGFundamentals/Retrieval";
import WhatisRAG from "../notes/RAGFundamentals/WhatisRAG";

const RAGFundamentals = [
  {
    path: "/what-is-rag",
    element: <WhatisRAG />,
    label: "What is RAG?",
  },
  {
    path: "/rag-architecture",
    element: <RAGArchitecture />,
    label: "RAG Architecture",
  },
  {
    path: "/document-processing",
    element: <DocumentProcessing />,
    label: "Document Processing",
  },
  {
    path: "/chunking",
    element: <Chunking />,
    label: "Chunking",
  },
  {
    path: "/embeddings",
    element: <Embeddings />,
    label: "Embeddings",
  },
  {
    path: "/retrieval",
    element: <Retrieval />,
    label: "Retrieval",
  },
  {
    path: "/context-injection",
    element: <ContextInjection />,
    label: "Context Injection",
  },
  {
    path: "/rag-implementation",
    element: <RAGImplementation />,
    label: "RAG Implementation",
  },
];


export default RAGFundamentals
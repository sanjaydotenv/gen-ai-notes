import Agents from "../notes/LangChainAdvanced/Agents";
import CustomTools from "../notes/LangChainAdvanced/CustomTools";
import DocumentLoaders from "../notes/LangChainAdvanced/DocumentLoaders";
import EmbeddingsIntegration from "../notes/LangChainAdvanced/EmbeddingsIntegration";
import Retrievers from "../notes/LangChainAdvanced/Retrievers";
import TextSplitters from "../notes/LangChainAdvanced/TextSplitters";
import VectorStoreIntegration from "../notes/LangChainAdvanced/VectorStoreIntegration";

const LangChainAdvanced = [
  {
    path: "/agents",
    element: <Agents />,
    label: "Agents",
  },
  {
    path: "/custom-tools",
    element: <CustomTools />,
    label: "Custom Tools",
  },
  {
    path: "/document-loaders",
    element: <DocumentLoaders />,
    label: "Document Loaders",
  },
  {
    path: "/embeddings-integration",
    element: <EmbeddingsIntegration />,
    label: "Embeddings Integration",
  },
  {
    path: "/retrievers",
    element: <Retrievers />,
    label: "Retrievers",
  },
  {
    path: "/text-splitters",
    element: <TextSplitters />,
    label: "Text Splitters",
  },
  {
    path: "/vector-store-integration",
    element: <VectorStoreIntegration />,
    label: "Vector Store Integration",
  },
];


export default LangChainAdvanced
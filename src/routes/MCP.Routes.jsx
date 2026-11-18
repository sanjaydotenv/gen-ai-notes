import CustomMCPServer from "../notes/MCP/CustomMCPServer";
import MCPArchitecture from "../notes/MCP/MCPArchitecture";
import MCPClient from "../notes/MCP/MCPClient";
import MCPServer from "../notes/MCP/MCPServer";
import Resources from "../notes/MCP/Resources";
import Tools from "../notes/MCP/Tools";
import WhatisMCP from "../notes/MCP/WhatisMCP";

const McpRoutes = [
  {
    path: "/what-is-mcp",
    element: <WhatisMCP />,
    label: "What is MCP",
  },
  {
    path: "/mcp-architecture",
    element: <MCPArchitecture />,
    label: "MCP Architecture",
  },
  {
    path: "/mcp-client",
    element: <MCPClient />,
    label: "MCP Client",
  },
  {
    path: "/mcp-server",
    element: <MCPServer />,
    label: "MCP Server",
  },
  {
    path: "/tools",
    element: <Tools />,
    label: "Tools",
  },
  {
    path: "/resources",
    element: <Resources />,
    label: "Resources",
  },
  {
    path: "/custom-mcp-server",
    element: <CustomMCPServer />,
    label: "Custom MCP Server",
  },
];

export default McpRoutes
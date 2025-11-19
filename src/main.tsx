import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeUPP } from "./lib/upp.js";

// Initialize Universal Predictive Protocol
initializeUPP();

createRoot(document.getElementById("root")!).render(<App />);

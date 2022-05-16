import React from "react";
import ReactDOM from "react-dom/client";
import MainMenu from "./MainMenu";
import Instructions from "./Instructions";
import NavBar from "./NavBar";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

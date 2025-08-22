import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Success from "./components/Success.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "system-ui" }}>
      <header style={{ marginBottom: 16 }}>
        <Link to="/" data-cy="brand">Login E2E</Link>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}
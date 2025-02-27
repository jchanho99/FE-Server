// src/App.jsx
import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SecondPage from "./pages/SecondPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 첫 페이지 (/) */}
        <Route path="/" element={<Main />} />
        {/* 두 번째 페이지 (/second) */}
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;

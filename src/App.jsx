// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main"; // ✅ Main 페이지 불러오기

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;

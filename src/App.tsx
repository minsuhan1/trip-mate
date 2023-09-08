import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

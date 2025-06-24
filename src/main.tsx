import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/restaurant/:id" element={<DetailPage />} />
    </Routes>
  </BrowserRouter>
);

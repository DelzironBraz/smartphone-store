import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import CreatePhone from "./pages/create/page.tsx";
import EditPhone from "./pages/edit/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<App />} />
        <Route path="phone">
          <Route path="create" element={<CreatePhone />} />
          <Route path=":code" element={<EditPhone />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);

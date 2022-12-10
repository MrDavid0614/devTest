import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import App from "./App";
import ExchangeInfoPage from "./pages/ExchangeInfo";
import AnnouncementsPage from "./pages/Announcements";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<ExchangeInfoPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContextProvider>
  </React.StrictMode>
);

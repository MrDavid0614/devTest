import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import App from "./App";
import ExchangeInfoPage from "./pages/ExchangeInfo";
import AnnouncementsPage from "./pages/Announcements";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExchangeInfoPage />,
  },
  {
    path: "announcements",
    element: <AnnouncementsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContextProvider>
      <App />
      <RouterProvider router={router} />
    </SocketContextProvider>
  </React.StrictMode>
);

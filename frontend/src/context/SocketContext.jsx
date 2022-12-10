import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000", { transports: ["websocket"] });

const SocketContext = createContext({ socket });

export const useSocketContext = () => useContext(SocketContext);

export function SocketContextProvider({ children }) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

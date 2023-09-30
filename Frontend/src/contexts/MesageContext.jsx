import React, { createContext, useContext, useState } from "react";

// Create the context
const MessageContext = createContext();

// Create a custom hook for accessing the context
export function useMessageContext() {
  return useContext(MessageContext);
}

// Create a context provider component
export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      message: "Hi there, please provide the symptoms for predicting disease.",
      type: "incoming",
    },
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

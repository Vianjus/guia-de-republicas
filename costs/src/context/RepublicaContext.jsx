import { createContext, useState } from "react";

export const RepublicaContext = createContext();

export function RepublicaProvider({ children }) {
  const [republicas, setRepublicas] = useState([]); // inicia vazio

  return (
    <RepublicaContext.Provider value={{ republicas, setRepublicas }}>
      {children}
    </RepublicaContext.Provider>
  );
}

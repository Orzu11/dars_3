import { createContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface ContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  liked: number[];
  toggleLike: (id: number) => void;
}

export const Context = createContext<ContextType>({} as ContextType);

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [liked, setLiked] = useState<number[]>([]);

  const setTokenAndSave = (val: string) => {
    localStorage.setItem("token", val)
    setToken(val)
  }

  const toggleLike = (id: number) =>
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <Context.Provider value={{ token, setToken: setTokenAndSave, liked, toggleLike }}>
      {children}
    </Context.Provider>
  );
};
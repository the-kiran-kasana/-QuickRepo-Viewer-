import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

   const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
       setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className={theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}> {children}</div>
        </ThemeContext.Provider>
      );

}
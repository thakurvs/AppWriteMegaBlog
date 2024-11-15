import { createContext, useContext } from "react";

// we creat a context and provide some values and methods inside it
export const Themecontext = createContext({
    themeMode : 'light',
    lightTheme: () => {},
    darkTheme: () => {}
});

export const ThemeProvider = Themecontext.Provider  //create a provider using ThemeContext/store

export default function useTheme(){
    return useContext(Themecontext); //use the context to get the values and methods inside it
}
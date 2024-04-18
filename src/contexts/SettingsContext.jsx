import { createContext, useState } from 'react';

// Crear el contexto
export const SettingsContext = createContext();

// Crear el Provider
export function SettingsContextProvider({children}) {
    const [textSize, setTextSize] = useState(10);
    
    return (
        <SettingsContext.Provider value={{ textSize: textSize, setTextSize: setTextSize}}>
            {children}
        </SettingsContext.Provider>
    )
}
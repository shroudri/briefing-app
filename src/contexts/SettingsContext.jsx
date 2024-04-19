import { createContext, useState } from 'react';
import { Slider, Text, Icon } from '@rneui/themed';

// Crear el contexto
export const SettingsContext = createContext();

// Crear el Provider
export function SettingsContextProvider({children}) {
    const [textSize, setTextSize] = useState(15);
    const [hours, setHours] = useState(3);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SettingsContext.Provider value={{ 
            textSize: textSize,
            setTextSize: setTextSize,
            hours: hours,
            setHours: setHours,
            darkMode: darkMode,
            setDarkMode: setDarkMode
            }}>
            {children}
        </SettingsContext.Provider>
    )
}
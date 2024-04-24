import { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

import { SettingsContext } from '../contexts/SettingsContext';

// Crear el contexto
export const ThemeContext = createContext();

// Crear el Provider
export function ThemeContextProvider({ children }) {
    const UserSettings = useContext(SettingsContext);
    const isDarkPreferred = UserSettings.darkMode;

    const theme = StyleSheet.create({
        container: {
            flex: 1
        },
        colors: {
            appBackground: isDarkPreferred ? "#0E0E0E" : "#f7f7f7",
            paragraphText: isDarkPreferred ? "#f0f0f0" : "#171717",
            airportCardBackground: isDarkPreferred ? "#0f0f0f" : "#f7f7f7",
            airportCardBorderColor: isDarkPreferred ? "#474747" : "#ebebeb",
            appHeaderBackground: isDarkPreferred ? "#0C001A" : "#0062ff",
            appSubHeaderBackground: isDarkPreferred ? "#0F0F0F" : "#619eff",
            sliderMinimumTrackTintColor: isDarkPreferred ? "#840B65" : "#0062ff",
            sliderMaximumTrackTintColor: isDarkPreferred ? "#C9C9C9" : "#ADADAD",
            airportMenuBackground: isDarkPreferred ? "#0E0E0E" : "#f7f7f7",
            airportMenuIcons: isDarkPreferred ? "#f0f0f0" : "#0062ff"
        },
        text: {
            contentTitle: {
                fontWeight: "bold",
                fontSize: 17
            },
            contentParagraph: {
                fontSize: 15
            }
        }
    })

    return (
        <ThemeContext.Provider value={
            theme
        }>
            {children}
        </ThemeContext.Provider>
    )
}
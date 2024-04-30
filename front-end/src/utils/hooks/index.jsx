import { useContext } from "react"

import { ThemeContext } from "../context/ThemeContext"

export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}
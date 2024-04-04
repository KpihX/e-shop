import { useState, useEffect, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export function useFetch(url) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)  

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function fetchData() {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    const { errorMessage } = await response.json()
                    throw new Error(errorMessage)
                } else {
                    const data = await response.json()
                    setData(data)
                }
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }  
        } 
        fetchData()
    }, [url])

    return { isLoading, data, error}
}

export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}
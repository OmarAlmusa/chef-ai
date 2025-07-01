import "./RecipeContent-styling.css"
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'

export default function RecipeContent(props) {

    const [typedText, setTypedText] = useState("")

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            setTypedText(prev => {
                if (index < props['recipe_content'].length) {
                    const next = prev + props['recipe_content'][index]
                    index++

                    if (index % 10 === 0){
                        props["bottom_ref"]?.current?.scrollIntoView({ behavior: "smooth"})
                    }

                    return next
                } else {
                    clearInterval(interval)
                    return prev
                }
            })
        }, 15)

        return () => clearInterval(interval)
    }, [props["recipe_content"]])

    return (
        <>
            <div className="recipe-full">
                <h1 className="inter-700">Suggested Recipe:</h1>
                <div className="generated-text inter-400">
                    <ReactMarkdown>{typedText}</ReactMarkdown>
                </div>
            </div>
        </>
    )
}
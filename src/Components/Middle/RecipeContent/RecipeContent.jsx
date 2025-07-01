import "./RecipeContent-styling.css"
import ReactMarkdown from 'react-markdown'

export default function RecipeContent(props) {
    return (
        <>
            <div className="recipe-full">
                <h1 className="inter-700">Suggested Recipe:</h1>
                <div className="generated-text inter-400">
                    <ReactMarkdown>{props["recipe_content"]}</ReactMarkdown>
                </div>
            </div>
        </>
    )
}
import "./GetRecipe-styling.css"

export default function GetRecipe(props) {
    return (
        <>
            <div className="get-recipe-full inter-400">
                <div className="text-section">
                    <h2>Ready for recipe?</h2>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>

                <button onClick={props['get_recipe_function']} className="get-recipe-button inter-400">
                    Get a recipe
                </button>

            </div>
        </>
    )
}
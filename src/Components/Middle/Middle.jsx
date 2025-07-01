import { useState } from "react"
import Form from "./Form/Form"
import IngredientList from "./IngredientList/IngredientList"
import GetRecipe from "./GetRecipe/GetRecipe"
import RecipeContent from "./RecipeContent/RecipeContent"
import "./Middle-styling.css"

export default function Middle(props){

    const general_style = {
        backgroundColor: "#1c1c1c",
        color: "white" 
    }

    // whether we got recipe/response from our LLM/AI Agent
    let [recipeShown, setRecipeShown] = useState(false)

    
    function handleGetRecipeClick() {
        setRecipeShown(prevState => !prevState)
    }
    
    // console.log(recipeShown)

    // let [ingredientsList, setIngredientsList] = useState(ingredients)
    let [ingredientsList, setIngredientsList] = useState([])

    function handleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        // console.log(newIngredient)


        // console.log(`before: ${ingredientsList.map(i=>`${i['id']} ${i['ingredient']}`)}`)

        const updatedIngredients = [
            ...ingredientsList,
            {
                id: ingredientsList.length + 1,
                ingredient: newIngredient
            }
        ]
        setIngredientsList(updatedIngredients)

        // console.log(`after: ${updatedIngredients.map(i=>`${i['id']} ${i['ingredient']}`)}`)
    }

    return (
        <>
            <div
            style={props['display_mode'] ? general_style : undefined}
            className="middle-page"
            >
                <Form handle_submit={handleSubmit} display_mode={props['display_mode']} />
                {(ingredientsList.length !== 0) ?
                <>
                    <IngredientList 
                    ingredients_list = {ingredientsList}
                    />
                    {(ingredientsList.length >= 3) 
                    ? <GetRecipe 
                    display_mode={props['display_mode']}
                    get_recipe_function={handleGetRecipeClick} /> 
                    : null}
                    {recipeShown ? <RecipeContent /> : null}
                </>
                : null}
            </div>
        </>
    )
}
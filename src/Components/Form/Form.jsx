import { useState } from "react"
import "./Form-styling.css"
import ingredients from "../../Data/ingredients.js"
import IngredientList from "../IngredientList/IngredientList.jsx"
import GetRecipe from "../GetRecipe/GetRecipe.jsx"
import RecipeContent from "../RecipeContent/RecipeContent.jsx"


export default function Form(){

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
            <form action={handleSubmit} className="page-form">
                <input className="inter-400" type="text" id="ingredient" name="ingredient" placeholder="e.g. cheese" />
                {/* <input className="inter-400" type="submit" id="submit-btn" name="submit-btn" value="+ Add ingredient" /> */}
                <button 
                    className="inter-400" 
                    id="submit-btn" 
                    name="submit-btn"
                >+ Add ingredient</button>
            </form>

            {(ingredientsList.length !== 0) ?
            <>
                <IngredientList 
                ingredients_list = {ingredientsList}
                />
                {(ingredientsList.length >= 3) ? <GetRecipe get_recipe_function={handleGetRecipeClick} /> : null}
                {recipeShown ? <RecipeContent /> : null}
            </>
            : null}


        </>
    )
}
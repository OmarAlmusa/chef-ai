import { useState } from "react"
import "./Form-styling.css"
import ingredients from "../../Data/ingredients.js"
import IngredientList from "../IngredientList/IngredientList.jsx"



export default function Form(){

    let [ingredientsList, setIngredientsList] = useState(ingredients)

    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)


        console.log(`before: ${ingredientsList.map(i=>`${i['id']} ${i['ingredient']}`)}`)

        const updatedIngredients = [
            ...ingredientsList,
            {
                id: ingredientsList.length + 1,
                ingredient: newIngredient
            }
        ]
        setIngredientsList(updatedIngredients)

        console.log(`after: ${updatedIngredients.map(i=>`${i['id']} ${i['ingredient']}`)}`)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="page-form">
                <input className="inter-400" type="text" id="ingredient" name="ingredient" placeholder="e.g. cheese" />
                {/* <input className="inter-400" type="submit" id="submit-btn" name="submit-btn" value="+ Add ingredient" /> */}
                <button 
                    className="inter-400" 
                    id="submit-btn" 
                    name="submit-btn"
                >+ Add ingredient</button>
            </form>
            <IngredientList 
            ingredients_list = {ingredientsList}
            />
        </>
    )
}
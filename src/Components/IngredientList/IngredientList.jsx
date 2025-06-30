import Ingredient from "./Ingredient/Ingredient"
import "./IngredientList-styling.css"

export default function IngredientList(props){
    // console.log(props['ingredients-list'])
    const mapped = props['ingredients_list'].map(i=><Ingredient 
                                                key={i['id']}
                                                ingredient={i['ingredient']} />)
    // console.log(mapped)
    return (
        <>
            <div className="ingredients-full">
                <h1 className="ingredients-header inter-700">Ingredients on hand:</h1>
                <ul className="ingredients-list inter-400">
                    {mapped}
                </ul>
            </div>
        </>
    )
}
import { useState, useRef, useEffect } from "react"
import Form from "./Form/Form"
import IngredientList from "./IngredientList/IngredientList"
import GetRecipe from "./GetRecipe/GetRecipe"
import RecipeContent from "./RecipeContent/RecipeContent"
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import "./Middle-styling.css"
import getRecipeHuggingFace from "../../ai/ai"
import Swal from "sweetalert2"

export default function Middle(props){

    const general_style = {
        backgroundColor: "#1c1c1c",
        color: "white" 
    }

    const bottomRef = useRef(null)

    // whether we got recipe/response from our LLM/AI Agent
    let [recipeShown, setRecipeShown] = useState(false)

    // let [ingredientsList, setIngredientsList] = useState(ingredients)
    let [ingredientsList, setIngredientsList] = useState([])
    
    // Recipe content
    let [recipeContent, setRecipeContent] = useState("")

    // Loading
    let [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (loading || recipeShown) {
            bottomRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [loading, recipeShown])
    
    async function handleGetRecipeClick() {
        if(!recipeShown){
            try {
            setLoading(true)
            const ingredients = ingredientsList.map(item => item.ingredient)
            const result = await getRecipeHuggingFace(ingredients)
            setRecipeContent(result)
            setRecipeShown(true)
            } catch(err) {
                console.error("Error getting recipe: ", err)
            } finally {
                setLoading(false)
            }

        }
        
    }
    
    // console.log(recipeShown)


    // function handleSubmit(formData){
    //     const newIngredient = formData.get("ingredient")
    //     // console.log(newIngredient)


    //     // console.log(`before: ${ingredientsList.map(i=>`${i['id']} ${i['ingredient']}`)}`)

    //     const updatedIngredients = [
    //         ...ingredientsList,
    //         {
    //             id: ingredientsList.length + 1,
    //             ingredient: newIngredient
    //         }
    //     ]
    //     setIngredientsList(updatedIngredients)

    //     // console.log(`after: ${updatedIngredients.map(i=>`${i['id']} ${i['ingredient']}`)}`)
    // }

    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient").trim()

        if (!newIngredient){
            Swal.fire({
                icon: "warning",
                title: "Empty Ingredient",
                text: "Please enter a valid ingredient before submitting!",
                confirmButtonColor: "#d33"
            })
            return
        }

        const updatedIngredients = [
            ...ingredientsList,
            {
                id: ingredientsList.length + 1,
                ingredient: newIngredient
            }
        ]
        setIngredientsList(updatedIngredients)

        event.target.reset()
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
                    {
                    loading 
                    ? <LoadingSpinner /> 
                    : (recipeShown ? <RecipeContent recipe_content={recipeContent} bottom_ref={bottomRef} /> : undefined)
                    }
                </>
                : null}
                <div ref={bottomRef}></div>
            </div>
        </>
    )
}
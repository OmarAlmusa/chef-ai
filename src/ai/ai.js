import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_API_KEY);


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page
`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default async function getRecipeHuggingFace(listOfIngredients){

    // await sleep(3000)


    // prompt = `
    // System: 
    
    // ${SYSTEM_PROMPT}

    // User:

    // Based on the following ingredients:

    // ${listOfIngredients.join(", ")}

    // Please provide me with an appropriate recipe
    // `

    // return prompt

    try {
        const chatCompletion = await client.chatCompletion({
            provider: "novita",
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `
                    Based on the following ingredients:

                    ${listOfIngredients.join(", ")}

                    Please provide me with an appropriate recipe
                    `,
                },
            ],
        });

        const message = chatCompletion?.choices?.[0]?.message?.content?.trim()

        if (!message) {
            console.warn("LLM returned empty content.")
            return "⚠️ Failed to generate a recipe. Try again."
        }

        return message
    } catch (err) {
        console.error("HuggingFace API error:", err)
        return "⚠️ Error connecting to AI service."
    }

    

    // console.log(chatCompletion)

    // return chatCompletion.choices[0].message

}
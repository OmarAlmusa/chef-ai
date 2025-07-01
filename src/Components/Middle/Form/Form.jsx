import "./Form-styling.css"

export default function Form(props){

    const button_style = {
        backgroundColor: "white",
        color: "black"
    }

    return (
        <>
            <form action={props['handle_submit']} className="page-form">
                <input className="inter-400" type="text" id="ingredient" name="ingredient" placeholder="e.g. cheese" />
                {/* <input className="inter-400" type="submit" id="submit-btn" name="submit-btn" value="+ Add ingredient" /> */}
                <button 
                    style={props["display_mode"] ? button_style : undefined}
                    className="inter-400" 
                    id="submit-btn" 
                    name="submit-btn"
                >+ Add ingredient</button>
            </form>
        </>
    )
}
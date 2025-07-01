import "./Header-styling.css"

export default function Header(props){
    const header_style = {
        backgroundColor: "#292929",
        color: "white" 
    }

    const logo_style = {
        filter: "invert(1)"
    }

    return (
        <>
            <header 
            style={props['display_mode'] ? header_style : undefined}
            className="page-header">

                <div className="empty"></div>

                <div className="logo-text">

                    <img 
                    style={props['display_mode'] ? logo_style : undefined}
                    src="src/assets/chef-svgrepo-com.svg" 
                    alt="chef logo" />

                    <h2 className="inter-600">Chef AI</h2>

                </div>

                <button onClick={props["display_func"]}>
                    <img 
                    src={props['display_mode'] ? "src/assets/light-svgrepo-com.svg":"src/assets/dark-svgrepo-com.svg" }
                    alt="display mode logo" />
                </button>

            </header>
        </>
    )
}
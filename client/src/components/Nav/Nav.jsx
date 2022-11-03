import {Link} from "react-router-dom"

const Nav = ()=>{
    return(
        <>        
            <h2>Nav</h2>
            <Link to="/"><p>Main</p></Link>
            <Link to="/home"><p>Home</p></Link>
            <Link to="/create"><p>Create</p></Link>
            <hr></hr>
        </>
    )
}

export default Nav
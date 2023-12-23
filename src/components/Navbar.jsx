import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("id");
        navigate('/auth');
    }
    return ( 
        <div className="">
            <div className="flex font-light text-sm md:text-xl space-x-7 justify-center px-3 py-4 bg-blue-950 text-blue-200">
                <Link to="/">Home</Link>
                <Link to="/add-recipe">Add recipe</Link>
                <Link to="/recipes">View Recipes</Link>
                { !cookies.access_token ? (<Link to="/register">Register</Link>)
                : <button onClick={logout}>Logout</button>}
                
            </div>
        </div>
     );
}
 
export default Navbar;
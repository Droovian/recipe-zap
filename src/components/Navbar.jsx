import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", ""); 
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("id");
        navigate('/auth');
    }
    return ( 
        <div className="">
            <div className="flex  font-light text-sm md:text-base space-x-7 justify-end px-3 py-4 bg-black text-gray-100">
                <Link to="/" className="hover:text-gray-500">Home</Link>
                <Link to="/add-recipe" className="hover:text-gray-500">Add recipe</Link>
                <Link to="/recipes" className="hover:text-gray-500">View Recipes</Link>
                { !cookies.access_token ? (<Link to="/register" className="hover:text-gray-500">Register</Link>)
                : <button onClick={logout} className="hover:text-gray-500">Logout</button>}
                
            </div>
        </div>
     );
}
 
export default Navbar;
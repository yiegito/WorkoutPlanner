import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () =>{
    const {logout} = useLogout();
    const { user } = useAuthContext()
    const handleClick = () =>{
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Workouts
                    </h1>
                </Link>
                
                <nav>
                    {user && (
                        <div>
                            <span className='email'>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                    
                    <Link to="/Info">Info</Link>
                </nav>
                
            </div>
        </header>
    )
}
export default Navbar
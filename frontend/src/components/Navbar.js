import {Link} from 'react-router-dom'
const Navbar = () =>{
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Workouts
                    </h1>
                </Link>
                <Link to="/Info">
                    <h3>
                        Info
                    </h3>

                </Link>
                
            </div>
        </header>
    )
}
export default Navbar
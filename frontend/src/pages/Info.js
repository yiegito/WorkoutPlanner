import { useState } from 'react';
import {Link} from 'react-router-dom'
const Info = () =>{
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);
    const technologies =[
        {
            key: 1,
            name: 'React',
            education: 'Self taught',
            url: 'https://www.google.com'
        },

    ];

    const listTech = technologies.map(technology =>
        <li key={technologies.key}>  
            <h1>{technology.name}</h1>
            <h3>{technology.education}</h3>
            <Link to={technology.url}>Website</Link>
        </li>
    )
    const handleClick = () =>{
        setShow(!show);
        setCount(count + 1);
    }
    
        
    
    return(
        <>
            <h3>This application will alow a user to store their unique workouts in a database and be able to delete, edit and create new ones on the fly!</h3>
            <h1>Technologies used</h1>
            <ul>
                {listTech}
            </ul>
            <h1>Have fun</h1>
            <button onClick={handleClick} >Button</button>
            {show && <h1>Clicks {count}</h1>}
            
        </>
    )
}

export default Info;
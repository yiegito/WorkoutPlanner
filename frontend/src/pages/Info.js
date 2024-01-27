import { useState } from 'react';
// import {Link} from 'react-router-dom'
const Info = () =>{
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);
    const technologies =[
        {key: 1,name: 'React',},
        {key:2, name:'Mongo Database'},
        {key:3,name:'Express.js'},
        {key:4,name:'Node.js'}

    ];

    const listTech = technologies.map(technology =>
        <li key={technologies.key}>  
            <h1>{technology.name}</h1>
            <h3>{technology.education}</h3>
            {/* <Link to={technology.url}>Website</Link> */}
        </li>
    )
    const handleClick = () =>{
        setShow(!show);
        setCount(count + 1);
    }
    
        
    
    return(
        <div className='info'>
            <h3>This application will alow a user to store their unique workouts in a database and be able to delete, edit and create new ones.<br/><br/>Workouts can be sorted through workout group and searched workout</h3>
            <h1>Technologies used</h1>
            <ul>
                {listTech}
            </ul>
            <h1>Contact me</h1>
            <button className='infoButton' onClick={handleClick}>Contact Information</button>
            {show && <h1>yiegitoo@gmail.com</h1>}
            
        </div>
    )
}

export default Info;
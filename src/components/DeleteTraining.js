import React from "react";
import Button from '@mui/material/Button';

export default function DeleteTraining ({deleteTraining, params}) {
    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: '', firstname: '', lastname: ''
     })
     
    const handleClick = () => {
        if(window.confirm('Are you sure you want to delete this training session?')){
            deleteTraining( params.value);
    }
}
    return (
        <div>
            <Button color="error" onClick={handleClick}>Delete</Button>
        </div>
    )
}
import React from "react";
import Button from '@mui/material/Button';

export default function DeleteCustomer ({deleteCustomer, params}) {
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
     })
     
    const handleClick = () => {
        if(window.confirm('Are you sure you want to delete this customer?')){
        deleteCustomer(customer, params.value);
    }
}
    return (
        <div>
            <Button color="error" onClick={handleClick}>Delete</Button>
        </div>
    )
}
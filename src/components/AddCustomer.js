import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
       firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="First name"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Last name"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Email"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Phone"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Street address"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Post code"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="City"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={addCustomer}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from 'react-select'

export default function EditTraining ({updateTraining, params}) {

    const [date, setDate] = React.useState(new Date);
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);
    const [training, setTraining] = React.useState({
       activity: '', date: '', duration: '', firstname: '', lastname: ''
    })

     const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };

    React.useEffect(() => {
        fetchCustomers();
    }, []);

    

    const handleClickOpen = () => {
      
         setTraining({   activity: params.data.activity,
                    date: params.data.date,
                    duration: params.data.duration,
                    firstname: params.data.firstname,
                    lastname: params.data.lastname,
                   })
         setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editTraining = () => {
        updateTraining(params.value);
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    }
    const customerOptions =
    customers.map(customer => ({value: customer.firstname + customer.lastname, label: customer.firstname + " " + customer.lastname}))
    return (
        <div>
            <Button style={{ margin: 0 }} variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog onClose={handleClose} open={open} sx={{ "& .MuiDialog-container": { "& .MuiPaper-root": { width: "100%", maxWidth: "600px", height: "100%", maxHeight: "600px" } } }}>
                <DialogTitle>Edit training session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        label="Activity"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                      label="Date"
                      value={date}
                      onChange={(newDate) => {
                       setDate(newDate);
                    }}
                      renderInput={(params) => <TextField {...params} />}/>
                     </LocalizationProvider>
                    
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label="Duration"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                     <Select options={customerOptions} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={editTraining}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );


}
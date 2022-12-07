import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format } from 'date-fns';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import DeleteTraining from './DeleteTraining';
import Button from '@mui/material/Button';


export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = React.useState({ activity: "", date: "", duration: "", customerFirstname: "", customerLastname: "" });
    const gridRef = useRef();

    useEffect(() => fetchTraining(), []);



    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))


    };
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(res => fetchTraining())
            .catch(err => console.error(err))
    };

    const updateTraining = (link) => {
        const updatelink = "https://customerrest.herokuapp.com/api/trainings/"+link
        fetch(updatelink, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateTraining),
        }).then((response) => {
          if (response.ok) {
            fetchTraining();
          }
        });
      };

      const deleteTraining = (link) => {
        const deletelink = "https://customerrest.herokuapp.com/api/trainings/"+link
        fetch(deletelink, { 
            method: "DELETE"
         }).then((response) => {
            if (response.ok) {
                fetchTraining();
            }
        });
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer.firstname", headerName: "First name" },
        { field: "customer.lastname", headerName: "Last name" },
        {
            headerName: "",
            width: 100,
            field: "id",
            cellRenderer: (params) => (
                <EditTraining updateTraining={updateTraining} params={params} />
            ),
        },
        {
            headerName: "",
            width: 100,
            field: "id",
            cellRenderer: (params) => (
                <DeleteTraining deleteTraining={deleteTraining} params={params} />
            ),
        }
    ])

    return(
        <div className="ag-theme-material"
        style={{ height: '700px', width: '100%' }}>
        <AddTraining saveTraining={saveTraining}/>
        <AgGridReact

            filterable={true}
            sortable={true}
            onGridReady={params => gridRef.current = params.api}
            ref={gridRef}
            rowSelection="single"
            rowData={trainings}
            columnDefs={columnDefs}
            >
                

            </AgGridReact>


    </div>

    );
}
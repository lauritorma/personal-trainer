import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format } from 'date-fns';


export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchTraining(), []);



    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))

    };

    const [columnDefs, setColumnDefs] = useState([
        { field: "activity" },
        { field: "date" },
        { field: "duration" },
        { field: "customer.firstname", headerName: "First name" },
        { field: "customer.lastname", headerName: "Last name" }
    ])

    return(
        <div className="ag-theme-material"
        style={{ height: '700px', width: '100%' }}>

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
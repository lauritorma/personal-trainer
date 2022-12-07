import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchCustomers(), []);



    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    };

    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname", sortable: true, filter: true, },
        { field: "lastname", sortable: true, filter: true },
        { field: "email", sortable: true, filter: true },
        { field: "phone", sortable: true, filter: true },
        { field: "streetaddress", sortable: true, filter: true },
        { field: "postcode", sortable: true, filter: true },
        { field: "city", sortable: true, filter: true },
    ]);

    return (

        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%' }}>

            <AgGridReact

                filterable={true}
                onGridReady={params => gridRef.current = params.api}
                ref={gridRef}
                rowSelection="single"
                rowData={customers}
                columnDefs={columnDefs}
                >


                </AgGridReact>




        </div>

    );
}
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchCustomers(), []);



    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    };

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    };

    const updateCustomer = (updateCustomer, link) => {
        fetch(link, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateCustomer),
        }).then((response) => {
          if (response.ok) {
            fetchCustomers();
          }
        });
      };

      const deleteCustomer = (deleteCustomer, link) => {
     
        fetch(link, {
             method: "DELETE" 
            }).then((response) => {
            if (response.ok) {
                fetchCustomers();
            }
        });
    }

    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname", sortable: true, filter: true, },
        { field: "lastname", sortable: true, filter: true },
        { field: "email", sortable: true, filter: true },
        { field: "phone", sortable: true, filter: true },
        { field: "streetaddress", sortable: true, filter: true },
        { field: "postcode", sortable: true, filter: true },
        { field: "city", sortable: true, filter: true },
        {
            headerName: "",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
                <EditCustomer updateCustomer={updateCustomer} params={params} />
            ),
        },
        {
            headerName: "",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
                <DeleteCustomer deleteCustomer={deleteCustomer} params={params} />
            ),
        },
    ]);

    return (

        <div className="ag-theme-material"
            style={{ height: '600px', width: '100%' }}>
            <AddCustomer saveCustomer={saveCustomer}/>
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
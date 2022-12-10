import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import Button from '@mui/material/Button';
 
const headers = [
    {
      label: "First Name",
      key: "firstname"
        
    },
    {
      label: "Last Name",
      key: "lastname",
        
    },
    {
      label: "Email",
      key: "email"
       
    },
    {
      label: "Phone",
      key: "phone"
        
    },
    {
      label: "Street Address",
      key: "streetaddress"
        
    },
    {
      label: "Post Code", 
      key: "postcode"
        
    },
    {
      label: "City",
      key: "city"
        
    }
];
 
class AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
 
  getUserList = () => {
    return fetch('https://customerrest.herokuapp.com/api/customers')
      .then(res => res.json());
  }
 
  downloadReport = async () => {
    const data = await this.getUserList();
    this.setState({ data: data.content }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }
 
  render() {
    const { data } = this.state;
 
    return (
      <div>
        <Button style={{ margin: 20 }} variant="outlined" color="secondary" size="small" onClick={this.downloadReport}>Export customer-list to CSV</Button>
        <CSVLink
          headers={headers}
          filename="Customers.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}
 
export default AsyncCSV;
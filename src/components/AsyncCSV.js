import React, { Component } from 'react';
import { CSVLink } from "react-csv";
 
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
        <input type="button" value="Export to CSV" onClick={this.downloadReport} />
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
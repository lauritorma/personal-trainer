import React from "react";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import ReactDOM from "react-dom/client";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from "styled-components";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from"react-router-dom";
import { fontSize } from "@mui/system";


  function Home() {
    return (
      <h1 style={{ margin: 50 }}>Welcome to your personal trainer app!</h1>

    );
}

  function Customerpage() {

    return (
      <div>
      <h1 style={{ margin: 50 }}>Customer-list</h1>
      <Customerlist></Customerlist>
      </div>
    );
  }

  function Trainingpage() {

    return(
      <div>
        <h1 style={{ margin: 50 }}>Training-list</h1>
        <Traininglist></Traininglist>
      </div>
    )
  }




//----------stylings-----------------------------------------------
const linkStyle = {
  margin: "10px",
  textDecoration: "none",
  color: 'blue',
  size: '30px'
};









export default function App() {
  return (
    <div className="App" style={{
      margin: 'auto',
      textAlign: 'center'
    }}>
    <AppBar position="static">
    <Toolbar>
          <Typography variant="h6">
            Personal Trainer App
          </Typography>
        </Toolbar>
    </AppBar>
    <BrowserRouter style={{margin: 50}}>
    
      <Link to="/" style={linkStyle}>Home</Link>{' '}
      <Link to="/customerlist" style={linkStyle}>Customerlist</Link>{' '}
      <Link to="/traininglist" style={linkStyle}>Traininglist</Link>{' '} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<Customerpage />} />
        <Route path="/traininglist" element={<Trainingpage />} />
  
        
      </Routes>
    </BrowserRouter>
    </div>
  );

}


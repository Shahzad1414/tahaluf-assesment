import React from 'react'
import { useLocation } from 'react-router-dom';
import "./style.css";

const DetailsPage = () => {

  const location = useLocation();
  const item = location.state.detailObject;

  return (
    
    <div className='container'>
         <h1>{item.name}</h1>
    </div>
  )
}

export default DetailsPage;
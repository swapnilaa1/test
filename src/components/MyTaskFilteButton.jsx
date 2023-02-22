import { Button } from '@mui/material'
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import "./test.css";



const MyTaskFilteButton = ({label , handleClick , label2}) => {
  return (
    <Button className='mui_button' size="small" variant="contained" color="primary" endIcon={<ClearIcon size="small"/>} onClick={()=>handleClick(label2)}    >{label}</Button>
  )
}

export default MyTaskFilteButton
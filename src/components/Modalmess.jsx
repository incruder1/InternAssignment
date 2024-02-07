import React, { useState } from 'react';
import { Button } from 'antd';
import './Modalmess.css'
import AddText from './AddText';
import AddImage from './AddImage';
import DisplayData from './DisplayData';
import Modalbx from './Modalbx';

const Modalmess = () => {
  
 const [loading, setLoading] = useState(false);
 const [open, setOpen] = useState(false);
 const [opentext,setOpentext] = useState(false);
 const [openimage,setOpenimage] = useState(false);
 const [input, setInput] = useState([]);



 const showModal = () => {
   setOpen(true);
 };
 const handleOk = () => {
   setLoading(true);
   setTimeout(() => {
     setLoading(false);
     setOpen(false);
   }, 2000);
 };
 const handleCancel = () => {
   setOpen(false);
 };
 return (
   <div className='modal_mess'>

    <div className="add_block_btn" >
        <Button type="primary" onClick={showModal}>Add Block</Button>
    </div>

    <div className="content">
      <DisplayData input={input} />
    </div>
    
    <Modalbx open={open} handleOk={handleOk} handleCancel={handleCancel} setOpentext={setOpentext} setOpenimage={setOpenimage} setOpen={setOpen}/>
     <AddText  input={input} setInput={setInput} opentext={opentext} setOpentext={setOpentext}/>
     <AddImage input={input} setInput={setInput} openimage={openimage} setOpenimage= {setOpenimage}/>
    
   </div>
 );
};
export default Modalmess;

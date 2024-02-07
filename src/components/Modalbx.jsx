import React from 'react'
import {Modal, Button} from 'antd';
const Modalbx = ({open,handleOk,handleCancel,setOpentext,setOpenimage,setOpen}) => {
  return (
    <div>
        <Modal
       visible={open}
       title='Select a Block'
       onOk={handleOk}
       onCancel={handleCancel}
       className='modal_css'
       footer={[
         <Button key="text" type="primary" onClick={()=>{setOpentext(true);setOpen(false)}}>
           Add Text
         </Button>,
         <Button key="image" type="primary" onClick={() => {setOpenimage(true);setOpen(false)}}>
           Add Image
         </Button>,
       ]}
     >
     </Modal>
    </div>
  )
}

export default Modalbx
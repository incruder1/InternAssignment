import React, { useState } from 'react';
import { Button, Modal, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddImage = ({input,setInput,openimage,setOpenimage}) => {
   const [form] = Form.useForm();
   const [fileName, setFileName] = useState("select a file");
   const [selectedFile, setSelectedFile] = useState(new File([], '', { type: 'application/octet-stream' }));
   const [imageSelected, setImageSelected] = useState(false);



const handleOk = () => {
    // Check if an image is selected
    if (!imageSelected) {
        // Display a warning message if no image is selected
        Modal.warning({
            title: 'Warning',
            content: 'No image selected, Please select an image before clicking "Add".',
        });
        return; 
    }

    form.validateFields().then((values) => {
        setInput([...input, { type: 'image', value: URL.createObjectURL(selectedFile) }]);
        console.log(input);
        setOpenimage(false);
        setFileName("select a file");
        setImageSelected(false); 
    });
};
   const handleCancel = () => {
       setOpenimage(false);
       setFileName("select a file")
   };

   const props = {
    beforeUpload: file => {
        setSelectedFile(file);
        setFileName(file.name);
        setImageSelected(true);
        return false;
    },
    showUploadList: false,  
   };

   return (
       <Modal
           visible={openimage}
           title="Select image"
           onCancel={handleCancel}
           footer={[
               <Button key="cancel" onClick={ handleCancel}>
                  Cancel
               </Button>,
               <Button key="add" type="primary" onClick={handleOk}>
                  Add
               </Button>,
           ]}
       >
           <Form form={form} layout="vertical">
               <Form.Item name="image"  rules={[{ required: true }]}>
                  <Upload {...props}>
                      <Button icon={<UploadOutlined />}>{fileName}</Button>
                  </Upload>
               </Form.Item>
           </Form>
       </Modal>
   );
};

export default AddImage;

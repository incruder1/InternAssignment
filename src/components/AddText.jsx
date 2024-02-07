import React, { useState } from 'react';
import { Button,Modal, Form, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'; 
import 'react-quill/dist/quill.snow.css'; 



const AddText = ({input,setInput,opentext,setOpentext}) => {


    const [form] = Form.useForm();
    const [wordCount, setWordCount] = useState(0);
    const MAX_WORDS = 250;

    
    const handleTextChange = (value) => {

      if (value === '') {
        setWordCount(0);
      }
      else if(value === '<p><br></p>') {
        setWordCount(0);
        form.setFieldsValue({ Text: '' });
      }else {
        const words = value.split(/\s+/).filter((word) => word !== '');
        if (words.length >= MAX_WORDS) {
          value = words.slice(0, MAX_WORDS).join(' ');
        }
        setWordCount(words.length);
      }
      form.setFieldsValue({ Text: value });
    };
    
    


     const handlePaste = (event) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text');
      const words = text.split(/\s+/).filter(word => word !== '');
      if (words.length > MAX_WORDS) {
      const trimmedText = words.slice(0, MAX_WORDS).join(' ');
      event.target.value = trimmedText;
      setWordCount(MAX_WORDS);
      form.setFieldsValue({ Text: trimmedText });
      } else {
      event.target.value = text;
      setWordCount(words.length);
      form.setFieldsValue({ Text: text });
      }
     };
     
     const handleKeyPress = (event) => {
      const text = event.target.value + event.key;
      const words = text.split(/\s+/).filter(word => word !== '');
      if (words.length >= MAX_WORDS && event.key !== 'Backspace') {
      event.preventDefault();
      }
     };
     

    const handleOk = (e) => {
      const textValue = form.getFieldValue('Text') ||'';
      const kk = e.target.value;
      const words = textValue.split(/\s+/).filter(word => word !== '');

      if (textValue === '<p><br></p>' || textValue.trim() === '') {
        Modal.warning({
          title: 'Warning',
          content: 'Please write something before clicking "Add".',
        });
        return;
      }
    
      if (words.length > 0) {
        form.validateFields().then(() => {
          setInput([...input, { type: 'text', value: textValue }]);
          form.setFieldsValue({ Text: '' });
          console.log(words.length)
          console.log(words)
         
        });
      } else {
        Modal.warning({
          title: 'Warning',
          content: ' Please write something before clicking "Add".',
      });
      return; 
      }
      setWordCount(0);
      setOpentext(false);
    };
    


    const handleCancel = () => {
        setOpentext(false);
        setWordCount(0);
        form.setFieldsValue({ Text: '' });
       
    };

  return (
    <Modal
       visible={opentext}
       onCancel={handleCancel}
       title='Enter text'
       footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleOk}>
          Add
        </Button>,
      ]}
     >
       <Form form={form} layout="vertical">
         <Form.Item name="Text" rules={[{ required: true }]}>
           <ReactQuill
              placeholder="Enter the text"
              onChange= {handleTextChange}
              modules={{
              toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], 
                        [{ header: [1, 2, 3, 4, 5, 6] }],
                        ['link'],
                       ],
                      }}
          /> 
         </Form.Item>
         <p>{250-wordCount}/250</p>
       </Form>
     </Modal>
  );
};
export default AddText;


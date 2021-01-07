import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, {useState} from 'react';








const { Dragger } = Upload;

const AddEditProduct = () => {
    const [fileList, setFileList] = useState([]);             //holds the image file







    const onRemove = () => { setFileList([]) }

    const beforeUpload = file => {                                                    //checks file before adding to state
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if(!isJpgOrPng) message.error('You can only upload JPG/PNG file!');

        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) message.error('Image must smaller than 2MB!');

        if(isJpgOrPng && isLt2M)setFileList([file]);
        else if(fileList) return false;
        else setFileList([]);

        return false;
    }







  const draggerPlaceHolder = (<>
    <UploadOutlined />
    <h1>Drag image file here or click to select file</h1>
    <h3>Max file size: 2mb</h3>
    <h3>File types supported: .jpeg .png</h3>
  </>);
  
  
  





  return(
    <div>
    
       
          







        <div className="ae-product-devider" style={{backgroundColor:"red", left:0}}>
            <div className="ae-product-content-wrapper">
                <div style={{height: "500px", width: "500px"}}>
                    <Dragger onRemove = {onRemove} beforeUpload = {beforeUpload} fileList = {fileList} >
                    {fileList[0] ? <><img src={URL.createObjectURL(fileList[0])} style={{height: "400px", width: "400px"}}></img> 
                                        <div>To remove, hover over file name below and click the trash icon</div>
                                    </>
                    : draggerPlaceHolder}
                    </Dragger>
                </div> 
            </div>
        </div>
      
        <div className="ae-product-devider" style={{backgroundColor:"green", right:0}}>
            <div className="ae-product-content-wrapper">

            </div>
        </div>
    
       
    </div>
  );
}

export default AddEditProduct;
import React, {useState,useEffect} from 'react';
import axios from 'axios';

function FileUpload(props) {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [path, setPath] = useState();
    const [uploadedFile, setUploadedFile] = useState({});
    const [isUploaded, setIsUploaded] = useState(false);

    const onchange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    

    const onsubmit = async e =>{
        
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', file);

            try{
                const res = await axios.post('http://localhost:8080/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const {fileName, filePath} = res.data;
                setUploadedFile({fileName, filePath});
                props.parentCallBack(filePath);
                setPath(filePath);
                window.alert(filePath);
                // setIsUploaded(true);
            }catch(err){
                if(err.response.status === 500){
                    console.log('Problem at server level')
                }else{
                    console.log(err.response.data.msg);
                }
            }
    }
    
   
    return (
        <div className="file_upload_div">
            <form onSubmit={onsubmit}>
                <div>
                    <label htmlFor="customFile">{props.fieldName} </label>
                </div>
                <div>    
                    <input className="file_upload_input" type="file" id="customFile" onChange={onchange} />
                </div>
                {/* <div>
                    {isUploaded ?  
                    <span className="file_name_span uploaded_span">File Uploaded (Path: {path})</span>
                    : <span className="file_name_span">{fileName}</span>}
                </div> */}
                
                <input className="file_upload_btn" type="submit" value="Upload" />
            </form>
        </div>
    )
}

export default FileUpload

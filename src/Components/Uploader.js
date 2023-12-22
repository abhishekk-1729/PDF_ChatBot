import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './fileUpload.scss'

export default function Uploader({files,setFiles,removeFile,setPdfText}) {

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file]);

        // upload file
        const formData = new FormData();
        formData.append('file',file)
        console.log(file);

        axios.post('http://127.0.0.1:5001/extract_text', formData)
        .then((res) => {
            file.isUploading = false;
            setFiles([...files, file]);
            setPdfText(res.data.text);
            console.log(res.data.text);
        })
        .catch((err) => {
            // inform the user
            console.error(err);
            removeFile(file.name);
        });

        // axios.post('http://localhost:8000/upload', formData)
        //     .then((res) => {
        //         file.isUploading = false;
        //         setFiles([...files, file])
        //         setPdfText(res.data.result);
        //         console.log(res.data.result);
        //     })
        //     .catch((err) => {
        //         // inform the user
        //         console.error(err)
        //         removeFile(file.name)
        //     });
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input disabled={files.length != 0} type="file" onChange={uploadHandler} accept="application/pdf" required/>
                    <button >
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF</p>

            </div>
        </>
    )
}

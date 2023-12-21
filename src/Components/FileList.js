import axios from 'axios'
import React from 'react'
import FileItem from './FileItem'

const FileList = ({ files, removeFile ,pdfText}) => {
    const deleteFileHandler = (_name) => {
        axios.delete(`http://localhost:8000/upload?name=${_name}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} pdfText={pdfText} />))
            }
        </ul>
    )
}

export default FileList
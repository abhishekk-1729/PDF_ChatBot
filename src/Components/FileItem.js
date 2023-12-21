import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './FileItem.scss'
import axios from 'axios';

const FileItem = ({ file, deleteFile, pdfText}) => {


  const [result,setResult] = useState();
  const [input,setInput] = useState();

  const handleOnChange = (event) => {
    setInput(event.target.value);
  }

  const handleOnClick = async () => {
    try {
        // Make a request to the server to process the input
        const response = await axios.post('http://127.0.0.1:5000/give_ans', {
            pdfText: pdfText,
            input_text: input,
        });
  
        // Assuming the server returns the result in response.data.result
        setResult(response.data.result);
      } catch (error) {
        console.error('Error processing input:', error);
      }
}


    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{file.name}</p>
                <div className="actions">
                    <div className="loading"></div>
                    {file.isUploading && <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin"
                        onClick={() => deleteFile(file.name)} />
                    }
                    {!file.isUploading &&
                        <FontAwesomeIcon icon={faTrash}
                            onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>

            <div className="m-5">
                <p className="title2">Question:</p>

                <textarea value = {input} onChange={handleOnChange} class="form-control" id="exampleFormControlTextarea1" rows="2">
                </textarea>

            <div>
            <button type="button" class="btn btn-outline-primary m-2" onClick={handleOnClick}>Submit</button>
                <p className="title2">Ans:</p>
                <p>{result}</p>
            </div>


            </div>


        </>
    )
}

export default FileItem

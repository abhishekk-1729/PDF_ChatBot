import logo from './logo.svg';
// import './App.css';
import './App.scss'
import { useState } from 'react';
import CentreText from './Components/CentreText';
import FileList from './Components/FileList';
import Uploader from './Components/Uploader';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {


  const [files,setFiles] = useState([])
  const [pdfText,setPdfText] = useState("")

  const removeFile = (filename) => {
    setFiles([])
  }




  return (
   
    <>
    <NavBar/>
    <CentreText/>
    <div className="App">
        <p className="title">
            Upload file
        </p>
        <Uploader files={files} setFiles={setFiles} removeFile={removeFile} pdfText={pdfText} setPdfText={setPdfText} />

        <FileList files={files} removeFile={removeFile} pdfText={pdfText}/>

    </div>

    



    {/* <Footer/> */}
    </>
  );
}

export default App;

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tempDir = './temp/';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.post('/process_input', async (req, res) => {
    try {
      const { input_text } = req.body;
      const pythonScriptPath = 'my_script.py';
      const pythonProcess = spawn('/usr/bin/python3', [pythonScriptPath, input_text]);

      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error executing script: ${data.toString()}`);
        res.status(500).json({ error: 'Internal server error' });
      });
  
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log(`Script executed successfully: ${result}`);
          res.json({ result });
        } else {
          console.error(`Script failed with code ${code}`);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error('Error processing input:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.post('/upload', upload.single('pdf'), (req, res) => {
    try {
      const pdfBuffer = req.file.buffer;
  
      const tempFilePath = `./temp/${req.file.originalname}`;
      fs.writeFileSync(tempFilePath, pdfBuffer);
      
      const pythonProcess = spawn('/usr/bin/python3', ['to_text.py', tempFilePath]);
  
      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error executing script: ${data.toString()}`);
        res.status(500).json({ error: 'Internal server error' });
      });
  
      pythonProcess.on('close', (code) => {
        console.log(`Script execution completed with code ${code}`);
        fs.unlinkSync(tempFilePath);

        res.json({ result });
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8000, () => {
    console.log(`Server running on port 8000`)
});
import vector from "../assets/Vector.svg"
import { Button } from "./Header";
import {useRef, useState, useEffect} from 'react';
import Tesseract  from "tesseract.js";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Select } from 'antd';


const onSearch = (value) => {
  console.log('search:', value);
};

function Converter(){
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const [language, setLanguage] = useState("eng");
    const [result, setResult] = useState("");

    const onChange = (value) => {
      setLanguage(value)
    };
    

    const generateDocx = async (text) => {
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(text),
                  ],
                }),
              ],
            },
          ],
        });
     
        const blob = await Packer.toBlob(doc).then(blob =>{
            const docblob = blob.slice(0, blob.size)
            saveAs(docblob, "filename.docx")
        });
     
        return blob;
      };
    
    

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };
   
    const processImage = () => {
        setResult("");
        setProgress(0);
        Tesseract.recognize(file, language, {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(m.progress);
            }
          },
        }).then(({ data: { text } }) => {
          setResult(text);
          generateDocx(text);

        });
      };
    return(
        <section className="converter container">
             <div className="converter-place">
                <img src={vector} alt="Vector" />
                <h3>Choose your file</h3>
                <input type="file" name="file" onChange={onFileChange} />
                <a>Browse</a>
             </div>
             <div className="converter-result">
                <Button onClick={processImage}>Convert</Button>
                <div>
                    <progress value={progress} max={1} />
                </div>

                <Select
                    className="select-lang"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: 'kaz',
                        label: 'Kazakh',
                      },
                      {
                        value: 'rus',
                        label: 'Russian',
                      },
                      {
                        value: 'eng',
                        label: 'English'
                      },
                    ]}
                  />
                
                {result !== "" && (
                    
                    <div style={{ marginTop: 20, fontSize: 24, color: "#000"}} className="result-item">
                    Result: {result}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Converter;
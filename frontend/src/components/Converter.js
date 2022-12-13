import {useState} from 'react';
import range from "../assets/Range.svg";
import Tesseract  from "tesseract.js";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import kaz from "../assets/kaz.svg"
import eng from "../assets/eng.svg"
import rus from "../assets/rus.svg"
import { Select } from 'antd';
import Footer from './Footer';




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
          <div className='converter-all'>
             <div className="converter-place">
                 <img src={range} Alt=""/>
                <h3>Choose & Dropyour file</h3>
                <input type="file" name="file" onChange={onFileChange} />
                <a>Browse</a>
             </div>

             <div className="converter-result">
                <div className='converter-result--button'>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: 'rus',
                        label: 'Russian',
                      },
                      {
                        value: 'eng',
                        label: 'English',
                      },
                      {
                        value: 'kaz',
                        label: 'Kazakh',
                      },
                    ]}
                   />
                    <button onClick={processImage}>Convert</button>
                </div>
               
                
                
                    
                    <div style={{ marginTop: 20, fontSize: 24, color: "#000"}} className="result-item">
                       <p>Result</p>
                        {result !== "" && (
      
                            <p className='result-item--text'>{result}</p>
                        
                        )}
                    </div>
                
            </div>
            </div>

            <Footer></Footer>
        </section>
    )
}

export default Converter;
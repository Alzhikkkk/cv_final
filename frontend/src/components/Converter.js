import {useState, useEffect} from 'react';
import range from "../assets/Range.svg";
import Tesseract  from "tesseract.js";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Select} from 'antd';
import Footer from './Footer';
import axios, { AxiosError } from 'axios'

const { Option } = Select;




function Converter(){
    const [file, setFile] = useState();
    const [language, setLanguage] = useState("eng");
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [result, setResult] = useState("");
    const [languagesList, setLanguagesList] = useState([])
    const onChange = (value) => {
      setLanguage(value)
    };

    const onChangeLanguage = (value) => {
      setLanguageKey(value)
    };
    
    
    useEffect(() => {
      const fetchData = async () => {
        const data = await axios.get(`https://libretranslate.de/languages`)
          .then((response) => {
              setLanguagesList(response.data)
          })
      }
      
      fetchData().catch(console.error)
    }, [])

  const translateText = async (text, detectLanguageKey, selectedLanguageKey) => {
    let data = {
        q : text,
        source: detectLanguageKey==='eng'? 'en': detectLanguageKey==='rus'? 'ru': "",
        target: selectedLanguageKey
    }
    await axios.post(`https://libretranslate.de/translate`, data)
    .then((response) => {
        setResult(response.data.translatedText)
    }).catch(err =>{
      setResult(text)
      generateDocx(text)
    })
}


    useEffect(()=>{
        generateDocx(result)
    }, [result])
   
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
        console.log(languagesList)
    };
   
    const processImage = () => {
        setResult("");
        Tesseract.recognize(file, language, {
          logger: (m) => {
            if (m.status === "recognizing text") {
              
            }
          },
        }).then(({ data: { text } }) => {
            translateText(text, language, selectedLanguageKey )
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

              <Select
                    showSearch
                    placeholder="Select a language"
                    optionFilterProp="children"
                    onChange={onChangeLanguage}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    >
                    {languagesList.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)}
                   </Select>
                    <button onClick={processImage}>Convert</button>
                </div>
               
                
                
                    
                    <div style={{ marginTop: 20, fontSize: 24, color: "#000"}} className="result-item">
                       <p>Result</p>
                        {result !== "" && 
                        (
      
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
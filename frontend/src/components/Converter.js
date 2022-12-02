import vector from "../assets/Vector.svg"


function Converter(){
    return(
        <section className="converter container">
             <div className="converter-place">
                <img src={vector} alt="Vector" />
                <h3>Choose your file</h3>
                <input type="file" name="file" />
                <a>Browse</a>
             </div>
        </section>
    )
}

export default Converter;
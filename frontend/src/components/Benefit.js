import like from '../assets/like.svg';
import effective from "../assets/effectives.svg";
import power from "../assets/power.svg";



function Benefit(){
    let arr = [{img: effective, name:"Effective usage"}, {img: like, name: "Simply works"}, {img: power, name: "Quick response"}];
    console.log(arr);
    return(
        <section className="benefit container">
              <span className='benefit-title'>
                    <h1>We made for your success</h1>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
               </span>
               <div className="benefit-card">
                     {
                        arr.map((item, index) => (
                            <span className='benefit-card--item' key={index}>
                                     <img src={item.img}/>
                                     <h2>{item.name}</h2>
                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </span>
                        ))
                     }
               </div>
        </section>
    )
}

export default Benefit;
import { Button } from "./Header";
import icon from '../assets/icon.png';


function About(){
    return(
        <section className="about container">
              <div className="about-site">
                    <h1>Make conversion easily with us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    <Button secondary>Watch a video</Button>
              </div>
               
               <div className="about-img">
                    <img src={icon} Alt="Icon"/>
               </div>
        </section>
    )
}

export default About;
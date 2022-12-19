import ph1 from '../assets/Gif.svg';
import youtube from '../assets/youtube.jpg'

function About(){
    return(
        <section className="about container">
             <div className='about-team'>
                <span className="about-team--img">
                     <h5>team sixteen</h5>
                     <img src={ph1} alt="Photo"/>
                    
                </span>
                <span className='about-team--title'>
                    <h1>Ready to make conversion?</h1>
                </span>
             </div>

             <div className='about-work'>
                  <a href="">Let's start making conversion</a>
                  <a href="https://youtu.be/XfrDpwC7RwA">Watch latest video about how our conversion works  <img src={youtube} alt="YouTube"/></a>
             </div>
        </section>
    )
}

export default About;
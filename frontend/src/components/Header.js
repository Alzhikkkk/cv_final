import styled, { css } from 'styled-components';
import menu from '../assets/menu.png';

export const Button = styled.button`
    width:100px;
    height: 50px;
    border: 1px solid transparent;
    border-radius: 10px;
    color: #fff;
    background-color: #373737;
    text-transform: uppercase;
    text-decoration: wavy;
    font-weight: 600;
    letter-spacing: 2px;
    display:flex;
    align-items:center;
    justify-content: center;

    ${props => props.secondary && css`
    width:150px;
    border-radius: 50px;
    letter-spacing: none;
    font-size: 10px;
  `}
`;


function Header(){
     return(
        <header className="header container">
              <a href="#">Convesion</a>
              <span className='header-buttons'>
                  <Button>Login</Button>
                  <Button>Register</Button>
              </span>
              <img src={menu} className="menu" alt="Menu"/>
        </header>
     )
}

export default Header;
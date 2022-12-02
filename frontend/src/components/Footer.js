


function Footer(){
    return(
        <footer className="footer container">
                <a href="#">Convesion</a>

                <span>
                    {
                        ["Terms of Us", "About Us", "Services", "Contacts"].map((item, index)=>(
                            <a href="#">{item}</a>
                        ))
                    }
                </span>
        </footer>
    )
}

export default Footer;
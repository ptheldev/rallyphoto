import { useEffect } from "react";

function Contact() {

    useEffect(() => {
        document.querySelector(".at").insertAdjacentText('afterbegin', '@');
        document.querySelector(".dot").insertAdjacentText('afterbegin', '.');
    }, []);

    return (
        <div>
            <p className="text__title">Kontakt e-mail:</p>
            <p className="contact-mail">
                pthel
                <span className="at"></span>
                o2
                <span className="dot"></span>
                pl
            </p>
        </div>
    );
  }
  
  export default Contact;
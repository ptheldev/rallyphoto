import { useEffect } from "react";
import axios from 'axios';

function Contact() {

    useEffect(() => {
        document.querySelector(".at").insertAdjacentText('afterbegin', '@');
        document.querySelector(".dot").insertAdjacentText('afterbegin', '.');

        document.querySelector("#contact-form button").addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector(".loader").classList.remove("disable");
            if(document.querySelector(".message-box").firstElementChild) {
                document.querySelector(".message-box").firstElementChild.remove();
            }
            const url = 'https://piotrthel.ovh/email.php?key=uTpags4RH';
            axios
                .post(url, {
                    name: document.querySelector("#name").value,
                    mail: document.querySelector("#mail").value,
                    content: document.querySelector("#content").value,
                    source: "thelrallyphoto"
                })
                .then((response) => {
                    document.querySelector(".message-box").insertAdjacentHTML("beforeend", response.data);
                })
                .finally(() => {
                    document.querySelector(".loader").classList.add("disable");
                });
        })
    }, []);

    return (
        <div>
            <h2>Formularz kontaktowy:</h2>
            <form action="" method="post" id="contact-form">
                <input type="text" id="name" name="imie" className="contact-inputs" placeholder="Imię" />
                <input type="text" id="mail" name="poczta" className="contact-inputs" placeholder="Adres e-mail" />
                <textarea className="contact-textarea" id="content" placeholder="Treść wiadomości" name="tresc"></textarea>
                <div className="message-box"></div>
                <img src="/svg/loader.svg" alt="Wysyłanie..." className="loader contact-loader disable" />
                <button type="submit" className="btn-link">Wyślij wiadomość</button>
            </form>
            <h2 className="direct-mail">Bezpośredni adres e-mail:</h2>
            <h4 className="center">pthel<span className="at"></span>o2<span className="dot"></span>pl</h4>
        </div>
    );
  }
  
  export default Contact;
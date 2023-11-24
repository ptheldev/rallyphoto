import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bg from './Bg';
import Header from './Header';
import Main from './Main';
import Gallery from './Gallery';
import Contact from './Contact';
import PhotoGallery from './PhotoGallery';
import Footer from './Footer';

function App() {
    const [fullscreenGallery, setfullscreenGallery] = useState({
        active : false,
        name : "",
        date : "",
        dir : "",
        photos : 0,
        photo : 0,
    });

    // function setFullPropsFunc(directory, fullphotos)  {
    //     setfullscreenGallery(prevParams => ({
    //         ...prevParams,
    //         dir : directory,
    //         photos : fullphotos
    //     }))
    // };

    // let directory = "";
    // let fullphotos = 0;
    // let currentphoto = 0;
    // let fullGalleryActive = false;

    function fullGalleryInit(fullGalleryActive, eventName, eventDate, directory, fullphotos, currentphoto, ) {
        setfullscreenGallery({
            active : fullGalleryActive,
            name : eventName,
            date : eventDate,
            dir : directory,
            photos : fullphotos,
            photo : currentphoto,
        });
    }

    return (
        <BrowserRouter>
            <Bg />
            <Header />
            <main className="main-section">
                <div className="main-section__wrapper">
                    <Routes>
                    <Route exact path="/" element={<Main />}></Route>
                    <Route path="/gallery/:id/*" element={<Gallery fullscreenGallery={fullscreenGallery} fullGalleryInit={fullGalleryInit} />}></Route>
                    <Route exact path="/kontakt" element={<Contact />}></Route>              
                    <Route exact path="*" element={<Main />}></Route>
                    </Routes>
                </div>
            </main>
            <PhotoGallery fullscreenGallery={fullscreenGallery} fullGalleryInit={fullGalleryInit} />
            <Footer />
        </BrowserRouter>
    )
}

export default App;
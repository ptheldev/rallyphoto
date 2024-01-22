import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

let currentGalleryArrayPosition;
let galleryHeaderContent;
let thumbs = [];

function Gallery( {fullscreenGallery, fullGalleryInit}) {

    const urlData = useParams();

    const [apiLoaded, setApiLoaded] = useState(false);

    useEffect(() => {
      if(!apiLoaded) {
        thumbs = [];
        axios.get('/galleries.json')
          .then(function (response) {
            selectGallery(response.data);
            galleryHeader(response.data);
            createPhotos(response.data);
            setApiLoaded(true);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            document.querySelector(".loader").classList.add("disable");
          });
      }
    }, [apiLoaded, selectGallery, createPhotos]);

    function selectGallery(galleries) {
        galleries.map((item, index) => {
            if(item.id === urlData.id) {
                currentGalleryArrayPosition = index;
            }
            return null;
        });
    }

    function galleryHeader(galleries) {
        galleryHeaderContent = <div className="gallery__title">
        {galleries[currentGalleryArrayPosition].name}
        <span className="gallery__info">{galleries[currentGalleryArrayPosition].desc}</span>
        <span className="gallery__info">{galleries[currentGalleryArrayPosition].date}</span>
    </div>;
    }

    function createPhotos(galleries) {
        for(let i = 1 ; i <= galleries[currentGalleryArrayPosition].photos ; i++) {
            thumbs.push(
            <div className="gallery__thumbnail" key={i}>
                <a href={`/galeries/${galleries[currentGalleryArrayPosition].dir}/${i}.jpg`} onClick={ (event) => {event.preventDefault();fullGallerySet(i, galleries);} } className="gallery__thumbnail-link">
                    <img src={`/galeries/${galleries[currentGalleryArrayPosition].dir}/${i}.jpg`} alt={`${galleries[currentGalleryArrayPosition].name} - fot. Piotr Thel - Zdjęcie ${i}`} className="gallery__thumbnail-img" />
                </a>
            </div>
            );
        }
    }

    function fullGallerySet(currentPhoto, galleries) {
        fullGalleryInit(true, galleries[currentGalleryArrayPosition].name, galleries[currentGalleryArrayPosition].date, galleries[currentGalleryArrayPosition].dir, galleries[currentGalleryArrayPosition].photos, currentPhoto);
    }

    return (
        <>
        <img src="/svg/loader.svg" alt="Wczytywanie..." className="loader" />
        <div className="gallery">
            {galleryHeaderContent}
            <div className="gallery__thumbnails">
                {thumbs}
            </div>
        </div>
        <div className="btn">
            <Link to="/" className="btn-link">POWRÓT</Link>
        </div>
        </>
    );
  }
  
  export default Gallery;
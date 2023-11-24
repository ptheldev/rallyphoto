import galleries from './Galleries';
import { Link, useParams } from "react-router-dom";

function Gallery( {fullscreenGallery, fullGalleryInit}) {

    const urlData = useParams();
    let currentGalleryArrayPosition;

    galleries.map((item, index) => {
        if(item.id === urlData.id) {
            currentGalleryArrayPosition = index;
        }
        return null;
    });

    function fullGallerySet(currentPhoto) {
        fullGalleryInit(true, galleries[currentGalleryArrayPosition].name, galleries[currentGalleryArrayPosition].date, galleries[currentGalleryArrayPosition].dir, galleries[currentGalleryArrayPosition].photos, currentPhoto);
    }

    let thumbs = [];
    for(let i = 1 ; i <= galleries[currentGalleryArrayPosition].photos ; i++) {
        thumbs.push(
        <div className="gallery__thumbnail" key={i}>
            <a href={`/galeries/${galleries[currentGalleryArrayPosition].dir}/${i}.jpg`} onClick={ (event) => {event.preventDefault();fullGallerySet(i);} } className="gallery__thumbnail-link">
                <img src={`/galeries/${galleries[currentGalleryArrayPosition].dir}/${i}.jpg`} alt={`${galleries[currentGalleryArrayPosition].name} - fot. Piotr Thel - Zdjęcie ${i}`} className="gallery__thumbnail-img" />
            </a>
        </div>
        );
    }

    return (
        <>
        <div className="gallery">
            <div className="gallery__title">
                {galleries[currentGalleryArrayPosition].name}
                <span className="gallery__info">{galleries[currentGalleryArrayPosition].desc}</span>
                <span className="gallery__info">{galleries[currentGalleryArrayPosition].date}</span>
            </div>
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
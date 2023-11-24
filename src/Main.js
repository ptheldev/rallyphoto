import { useEffect } from 'react';
import galleries from './Galleries';
import { Link } from "react-router-dom";
import latinize from 'latinize';

function friendlyUrl(txt) {
  return encodeURIComponent(latinize(txt).replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase());
}

let mainSlider = [];

function correctPhotoText(txt) {
  let phrase;
  let stringTxt = `${txt}`;
  stringTxt = stringTxt.charAt(stringTxt.length-1);
  if(stringTxt === "2" || stringTxt === "3" || stringTxt === "4") {
    phrase = "zdjęcia";
  } else {
    phrase = "zdjęć";
  }
  return phrase;
}

for(let i=0; i < 3 ; i++) {
  mainSlider.push(
    <div className="main-slider__slide-container" key={i}>
      <div className="main-slider__slide-img" style={{backgroundImage: 'url(galeries/' + galleries[0].dir + '/' + galleries[0].slides[i] + '.jpg)'}}>
        <div className="main-slider__slides-caption">
          <span className="main-slider__slides-caption-title">{galleries[0].name}</span>
          <br />{galleries[0].desc}
          <br />{galleries[0].photos} {correctPhotoText(galleries[0].photos)}
        </div>
      </div>
    </div>
  );
}

let allGalleries = [];

galleries.map((item, index) => {
  let imgSrc = `galeries/${item.dir}/${item.slides[0]}.jpg`;
  let imgAlt = `${item.name}"- fot. Piotr Thel - Zdjęcie ${item.slides[0]}`;
  if(index > 0) {
    allGalleries.push(
      <div className="other-galleries__single-gallery" key={index}>
        <div className="other-galleries__single-gallery-container">
          <img src={imgSrc} alt={imgAlt} className="other-galleries__img" />
          <div className="other-galleries__title">{item.name}</div>
          <div className="other-galleries__desc">{item.desc}</div>
          <div className="other-galleries__photos">{item.photos}  {correctPhotoText(item.photos)}</div>
          <Link to={`/gallery/${item.id}/${friendlyUrl(item.name)}/`} className="other-galleries__link">{item.name}</Link>
        </div>
      </div>
    );
  }
  return null;
});


function Main() {

  useEffect(() => {
    let currentSlide = 0;
    let mainSliderInit = setInterval(() => {
      [...document.querySelectorAll(".main-slider__slide-container")][currentSlide].classList.remove("active");
      currentSlide++;
      if(currentSlide >= [...document.querySelectorAll(".main-slider__slide-container")].length) {
        currentSlide = 0;
      }
      [...document.querySelectorAll(".main-slider__slide-container")][currentSlide].classList.add("active");
    }, 3000);

    document.querySelector(".main-slider__slide-container").classList.add("active");
  
    return () => clearInterval(mainSliderInit);
  }, []);

  return (
    <div>
      <div className="main-slider">
        <div className="main-slider__slides">
          {mainSlider}
        </div>
        <Link to={`/gallery/${galleries[0].id}/${friendlyUrl(galleries[0].name)}/`} className="main-slider__link">{galleries[0].name}</Link>
      </div>
      <div className="other-galleries__container">
        {allGalleries}
      </div>
    </div>
  );
}



export default Main;
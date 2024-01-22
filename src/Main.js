import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import latinize from 'latinize';

let mainSlider = [];
let mainSliderLink = "";
let allGalleries = [];
let currentSlide = 0;
let mainSliderInit;

function createMainSlider(galleries) {
  for(let i=0; i < 3 ; i++) {
    mainSlider.push(
      <div className={`main-slider__slide-container${i === 0 ? ' active' : ''}`} key={i}>
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
  mainSliderLink = <Link to={`/gallery/${galleries[0].id}/${friendlyUrl(galleries[0].name)}/`} className="main-slider__link">{galleries[0].name}</Link>;
}

function createMainGalleries(galleries) {
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
}

function setSliderInterval() {
  const mainSliderSlides = [...document.querySelectorAll(".main-slider__slide-container")];
  if(mainSliderSlides.length > 0) {
    mainSliderInit = setInterval(() => {
      mainSliderSlides[currentSlide].classList.remove("active");
      currentSlide++;
      if(currentSlide >= mainSliderSlides.length) {
        currentSlide = 0;
      }
      mainSliderSlides[currentSlide].classList.add("active");
    }, 3000);
    document.querySelector(".main-slider__slide-container").classList.add("active");
  }
}

function friendlyUrl(txt) {
  return encodeURIComponent(latinize(txt).replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase());
}

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

function Main() {

  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    if(!apiLoaded) {
      mainSlider = [];
      mainSliderLink = "";
      allGalleries = [];
      axios.get('/galleries.json')
        .then(function (response) {
          // console.log(response.data);
          createMainSlider(response.data);
          createMainGalleries(response.data);
          setApiLoaded(true);
        }
        )
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          document.querySelector(".loader").classList.add("disable");
        });
    }

    setSliderInterval();
    return () => clearInterval(mainSliderInit);
  }, [apiLoaded]);

  return (
    <div>
      <img src="/svg/loader.svg" alt="Wczytywanie..." className="loader" />
      <div className="main-slider">
        <div className="main-slider__slides">
          {mainSlider}
        </div>
        {mainSliderLink}
      </div>
      <div className="other-galleries__container">
        {allGalleries}
      </div>
    </div>
  );
}

export default Main;
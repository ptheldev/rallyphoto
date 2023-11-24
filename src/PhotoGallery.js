function PhotoGallery( {fullscreenGallery, fullGalleryInit} ) {

  let galleryFlags = {
    first : false,
    last : false
  }

  if(fullscreenGallery.photo === 1) {
    galleryFlags.first = true;
  }
  if(fullscreenGallery.photo === fullscreenGallery.photos) {
    galleryFlags.last = true;
  }

  function close() {
    fullGalleryInit(false);
  }
  function prev() {
    if(fullscreenGallery.photo > 1) {
      document.querySelector(".expand-image").style.opacity = "0";
      setTimeout(() => {
        fullGalleryInit(true, fullscreenGallery.name, fullscreenGallery.date, fullscreenGallery.dir, fullscreenGallery.photos, (fullscreenGallery.photo - 1));
        document.querySelector(".expand-image").style.opacity = "1";
      }, 150);
    }
  }
  function next() {
    if(fullscreenGallery.photo < fullscreenGallery.photos) {
      document.querySelector(".expand-image").style.opacity = "0";
      setTimeout(() => {
        fullGalleryInit(true, fullscreenGallery.name, fullscreenGallery.date, fullscreenGallery.dir, fullscreenGallery.photos, (fullscreenGallery.photo + 1));
        document.querySelector(".expand-image").style.opacity = "1";
    }, 150);
    }
  }

  return (
    <div className={`expand-gallery${fullscreenGallery.active ? ` active` : ` ` }`}>
        <div className="expand-image-desc">
          <div className="expand-image-desc-name">{fullscreenGallery.name}</div>
          <div className="expand-image-desc-date">{fullscreenGallery.date}</div>
        </div>
        <img src="/svg/close.svg" alt="Zamknij" className="expand-close" onClick={close} />
        <img src="/svg/prev.svg" alt="Poprzednie zdjęcie" className={`expand-prev${galleryFlags.first ? ` disable` : ` `}`} onClick={prev} />
        <img src="/svg/next.svg" alt="Następne zdjęcie" className={`expand-next${galleryFlags.last ? ` disable` : ` `}`} onClick={next} />
        <div className="expand-image-container">
          <img src={`/galeries/${fullscreenGallery.dir}/${fullscreenGallery.photo}.jpg`} className="expand-image" alt="" />
        </div>
        <div className="expand-image-numbers">
          Zdjęcie {fullscreenGallery.photo} z {fullscreenGallery.photos}
        </div>
    </div>
  );
}

export default PhotoGallery;

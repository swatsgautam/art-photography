import React from 'react';

//import GalleryContext from '../context/artContext';

const Popup = ({image, setPopupData, images}) => {
    
  //const { toggleFavorite } = useContext(GalleryContext);
  //const isFavorite = favorites.some(fav => fav.id === image.id);

//   const handleToggleFavorite = () => {
//       toggleFavorite(image);
//   };

  if (!image) return null;

  console.log("Popup data:", image); // Debug log
 
 // Find the current image's index in the provided images array
 const currentIndex = images.findIndex(img => img.id === image.id);
 const totalImages = images.length;

 // Handle previous image navigation
 const handlePrevious = (e) => {
     e.stopPropagation(); // Prevent the popup from closing
     if (currentIndex > 0) {
         setPopupData(images[currentIndex - 1]); // Set to previous image
     } else {
         console.log("No previous image available.");
     }
 };

 // Handle next image navigation
 const handleNext = (e) => {
     e.stopPropagation(); // Prevent the popup from closing
     if (currentIndex < totalImages - 1) {
         setPopupData(images[currentIndex + 1]); // Set to next image
     } else {
         console.log("No next image available.");
     }
 };


    return (
      
      <div className="popup" id="popup" onClick={() => setPopupData(null)}>
            <span className="close" id="closePopup" onClick={(e) => { e.stopPropagation(); setPopupData(null); }}>&times;</span>
            <button className="navigation prev" id="prevImage" onClick={handlePrevious} disabled={currentIndex === 0}>&#10094;</button>

            <img id="popupImage" src={image.urls.full} alt={image.alt_description} />

            <button className="navigation next" id="nextImage" onClick={handleNext} disabled={currentIndex === totalImages - 1}>&#10095;</button>
            
            <div className="image-details" id="imageDetails">
                <p id="imageBio">{image.alt_description || 'No description available.'}</p>
                <h3 id="photographerName">Photographer: {image.user.name}</h3>
                <p id="location">Location: {image.location?.city || 'Unknown'}</p>
                <p id="year">Year: {new Date(image.created_at).getFullYear()}</p>
                
            </div>
        </div>
    );
};

export default Popup;

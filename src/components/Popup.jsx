import React, { useContext } from 'react';
import GalleryContext from '../context/artContext';

const Popup = ({ image, setPopupData }) => {
  const { toggleFavorite, favorites } = useContext(GalleryContext);
  const isFavorite = favorites.some(fav => fav.id === image.id);

  const handleToggleFavorite = () => {
      toggleFavorite(image);
  };

  if (!image) return null;

  console.log("Popup data:", image); // Debug log

    return (
      
      <div className="popup" id="popup" onClick={() => setPopupData(null)}>
            <span className="close" id="closePopup" onClick={(e) => { e.stopPropagation(); setPopupData(null); }}>&times;</span>
            <button className="navigation prev" id="prevImage">&#10094;</button>

            <img id="popupImage" src={image.urls.full} alt={image.alt_description} />

            <button className="navigation next" id="nextImage">&#10095;</button>
            
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

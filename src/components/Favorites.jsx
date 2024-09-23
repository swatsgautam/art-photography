import React, { useContext, useState } from 'react';
import Popup from './Popup';
import GalleryContext from '../context/artContext';

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(GalleryContext);
    const [popupData, setPopupData] = useState(null);

    const openPopup = (image) => {
        console.log("Opening popup for image:", image); // Debug log
        setPopupData(image);
    };

    return (
        <div className="favourites-container">
        <h1>Your Favorites</h1>
        <div className="gallery-grid">
            {favorites.length > 0 ? (
                favorites.map((image) => (
                    <div key={image.id} className="img-wrapper" onClick={() => openPopup(image)}>
                        <img src={image.urls.small} alt={image.alt_description} />
                        <span
                            className={`heart-icon liked`} 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent popup from opening
                                toggleFavorite(image); // Toggle favorite status
                            }}
                        >
                            ♥
                        </span>
                    </div>
                ))
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>

        {popupData && <Popup image={popupData} setPopupData={setPopupData} />}
    </div>

    );
};

export default Favorites;

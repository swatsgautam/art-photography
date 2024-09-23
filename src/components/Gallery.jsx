import React, { useContext, useEffect, useState } from 'react'
import GalleryContext from '../context/artContext'
import Popup from './Popup';


const Gallery = () => {


const { categoryImages, selectedCategory, selectCategory, toggleFavorite, favorites } = useContext(GalleryContext);
const [popupData, setPopupData] = useState(null);

const categories = [
  { id: 'all', name: 'All' },
  { id: 'painting', name: 'Painting' },
  { id: 'sculpture', name: 'Sculpture' },
  { id: 'photography', name: 'Photography' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'drawing', name: 'Drawing' },
  { id: 'street-art', name: 'Street Art' },
  { id: 'ceramics', name: 'Ceramics' },
  { id: 'collage', name: 'Collage' },
  { id: 'abstract-art', name: 'Abstract Art' },
  { id: 'portraiture', name: 'Portraiture' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'astro-photography', name: 'Astro Photography' }
];
useEffect(() => {
  if (selectedCategory) {
    selectCategory(selectedCategory); // Ensure the selected category's images are fetched
  }
}, [selectedCategory, selectCategory]);

// Filter images based on the selected category
const filteredImages = selectedCategory === 'all' 
? categoryImages 
: categoryImages.filter(image => image.category === selectedCategory); // Ensure each image has a 'category' property

const handleFavoriteToggle = (image) => {
  toggleFavorite(image); // Toggle favorite status
};
const handleImageClick = (image) => {
  setPopupData(image); // Set the clicked image data to show in the popup
};
    return (
      <div className="gallery-page">
      {/* Category Buttons */}
      <div className="categories">
          {categories.map(category => (
              <button
                  key={category.id}
                  className={`category ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => selectCategory(category.id)}
              >
                  {category.name}
              </button>
          ))}
      </div>

      {/* Image Grid */}
      <div className="gallery-grid">
          {filteredImages.length > 0 ? (
              filteredImages.map(image => (
                  <div className="grid-item" key={image.id} onClick={() => handleImageClick(image)}> {/* Trigger popup on click */}
                      <img src={image.urls.small} alt={image.alt_description} />
                      <span
                          className={`heart-icon ${favorites.some(fav => fav.id === image.id) ? 'liked' : ''}`}
                          onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteToggle(image);
                          }}
                      >
                          ♥
                      </span>
                  </div>
              ))
          ) : (
              <p>No images available for this category.</p>
          )}
      </div>

      {/* Popup Component */}
      {popupData && <Popup image={popupData} setPopupData={setPopupData} />} {/* Render Popup if popupData is set */}
  </div>
)
}

export default Gallery

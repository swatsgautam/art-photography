import React, { useContext, useEffect, useState } from 'react'
import GalleryContext from '../context/artContext'
import Hero from './Hero';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const { fetchCategoryImages, selectCategory } = useContext(GalleryContext);
  const categories = ['painting', 'sculpture', 'photography', 'digital-art', 'drawing', 'street-art', 'ceramics', 'collage', 'abstract-art', 'portraiture', 'landscape', 'astro-photography'];
  const [categoryImages, setCategoryImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await Promise.all(categories.map(category => fetchCategoryImages(category)));
        const imagesMap = {};

        images.forEach((imageArray, index) => {
          // Check if imageArray is defined and has a length
          if (Array.isArray(imageArray) && imageArray.length > 0) {
            imagesMap[categories[index]] = imageArray[0]?.urls?.small; // Store one image per category
          }
        });

        setCategoryImages(imagesMap);
      } catch (error) {
        console.error("Error fetching category images:", error);
      }
    };

    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategoryImages]);
// When a category is clicked, select the category and navigate to the Gallery page
const handleCategoryClick = (category) => {
  selectCategory(category); // Set the selected category in the context
  navigate('/gallery'); 
};
  return (
    <>
     <Hero />
      <section id="category-grid">
        <h2 className="category-heading">Art Categories</h2>
        <div className="grid-container">
          {categories.map(category => (
            <div key={category} className="grid-item" onClick={() => handleCategoryClick(category)}>
              <img src={categoryImages[category]} alt={category} />
              
            </div>
          ))}
        </div>
      </section>
    </>
    
  )
}

export default CategoryGrid

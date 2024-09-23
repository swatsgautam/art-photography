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
        // Check if images are already cached in local storage
        const cachedImages = localStorage.getItem('categoryImages');
        if (cachedImages) {
          console.log("Images found in cache:", cachedImages); 
          setCategoryImages(JSON.parse(cachedImages));
        } else {
          const images = await Promise.all(categories.map(category => fetchCategoryImages(category.id)));
          const imagesMap = {};

          images.forEach((imageArray, index) => {
            if (Array.isArray(imageArray) && imageArray.length > 0) {
              imagesMap[categories[index].id] = imageArray[0]?.urls?.small;
            }
          });

          // Store images in state and local storage
          setCategoryImages(imagesMap);
          localStorage.setItem('categoryImages', JSON.stringify(imagesMap));
        }
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
            <div key={category.id} className="grid-item" onClick={() => handleCategoryClick(category.id)}>
              <img src={categoryImages[category.id]} alt={category.name} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
    
  )
}

export default CategoryGrid

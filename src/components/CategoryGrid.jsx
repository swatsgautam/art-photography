import React, { useContext, useEffect, useState } from 'react'
import GalleryContext from '../context/artContext'
import Hero from './Hero';
import { useNavigate } from 'react-router-dom';

const categories = [
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
  { id: 'astro-photography', name: 'Astro Photography' },
];


const CategoryGrid = () => {
  const { fetchCategoryImages, selectCategory } = useContext(GalleryContext);
  const [categoryImages, setCategoryImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = {};

      for (const category of categories) {
        let cachedImages = localStorage.getItem(`categoryImages_${category.id}`);

        if (cachedImages) {
        
          const parsedImages = JSON.parse(cachedImages);
          fetchedImages[category.id] = parsedImages[0]?.urls.small; // Get the first image URL
        } else {
          const fetchedCategoryImages = await fetchCategoryImages(category.id);
          if (fetchedCategoryImages && fetchedCategoryImages.length > 0) {
            fetchedImages[category.id] = fetchedCategoryImages[0].urls.small;
          }
        }
      }

      setCategoryImages(fetchedImages); // Update state with the fetched images
    };

    loadImages();
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
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="grid-item" 
              onClick={() => handleCategoryClick(category.id)}
            >
              {categoryImages[category.id] ? (
                <img 
                  src={categoryImages[category.id]} // Display the respective category image
                  alt={category.name} 
                />
              ) : (
                <div className="placeholder">Loading...</div> // Placeholder while loading images
              )}
              <span className="category-label">{category.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
    
  )
}

export default CategoryGrid


// import React, { useContext, useEffect, useState } from 'react';
// import GalleryContext from '../context/artContext';
// import Hero from './Hero';
// import { useNavigate } from 'react-router-dom';

// const categories = [
//   { id: 'painting', name: 'Painting' },
//   { id: 'sculpture', name: 'Sculpture' },
//   { id: 'photography', name: 'Photography' },
//   { id: 'digital-art', name: 'Digital Art' },
//   { id: 'drawing', name: 'Drawing' },
//   { id: 'street-art', name: 'Street Art' },
//   { id: 'ceramics', name: 'Ceramics' },
//   { id: 'collage', name: 'Collage' },
//   { id: 'abstract-art', name: 'Abstract Art' },
//   { id: 'portraiture', name: 'Portraiture' },
//   { id: 'landscape', name: 'Landscape' },
//   { id: 'astro-photography', name: 'Astro Photography' },
// ];

// const CategoryGrid = () => {
//   const { fetchRandomImages } = useContext(GalleryContext);  // Use fetchRandomImages from context
//   const [categoryImages, setCategoryImages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadImages = async () => {
//       let cachedImages = localStorage.getItem('randomImages');
      
//       if (cachedImages) {
//         // Use cached images if available
//         cachedImages = JSON.parse(cachedImages);

//         // If cached images are fewer than expected, fetch more
//         if (cachedImages.length < categories.length) {
//           const additionalImages = await fetchRandomImages(categories.length - cachedImages.length);

//           // Combine cached images with newly fetched images
//           const allImages = [...cachedImages, ...additionalImages];
//           setCategoryImages(allImages);

//           // Update the cache
//           localStorage.setItem('randomImages', JSON.stringify(allImages));
//         } else {
//           setCategoryImages(cachedImages);
//         }
//       } else {
//         // Fetch random images from the API
//         const fetchedImages = await fetchRandomImages(categories.length);

//         // If fewer images were fetched, fall back to a default placeholder
//         if (fetchedImages.length < categories.length) {
//           const fallbackImages = fetchedImages.length > 0 ? fetchedImages : [{ urls: { small: 'placeholder-url.jpg' }}]; // Fallback
//           setCategoryImages(fallbackImages);
//         } else {
//           // Cache fetched images and update the state
//           localStorage.setItem('randomImages', JSON.stringify(fetchedImages));
//           setCategoryImages(fetchedImages);
//         }
//       }
//     };

//     loadImages();
//   }, [fetchRandomImages]);

//   // Handle category selection
//   const handleCategoryClick = (category) => {
//     navigate('/gallery');
//   };

//   return (
//     <>
//       <Hero />
//       <section id="category-grid">
//         <h2 className="category-heading">Art Categories</h2>
//         <div className="grid-container">
//           {categories.map((category, index) => (
//             <div 
//               key={category.id} 
//               className="grid-item" 
//               onClick={() => handleCategoryClick(category.id)}
//             >
//               {categoryImages[index] ? (
//                 <img 
//                   src={categoryImages[index]?.urls.small || 'placeholder-url.jpg'}  // Use one image per category
//                   alt={category.name} 
//                 />
//               ) : (
//                 <div className="placeholder">Loading...</div>
//               )}
//               <span className="category-label">{category.name}</span>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// export default CategoryGrid;

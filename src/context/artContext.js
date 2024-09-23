// src/context/GalleryContext.js
import React, { createContext, useState, useEffect } from 'react';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [heroImages, setHeroImages] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('all'); 
    const [popupData, setPopupData] = useState(null); 
    const [favorites, setFavorites] = useState(() => {
        // Load favorites from local storage if available
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const apiKey = '-fTQM4z15xugwA4TNvXC_E97PC--pnJ-bNqVwog_b8I';

    useEffect(() => {
        // Load cached hero images on initialization
        const cachedHeroImages = localStorage.getItem('heroImages');
        if (cachedHeroImages) {
            setHeroImages(JSON.parse(cachedHeroImages));
        } else {
            fetchHeroImages();
        }
    }, []);

    const fetchHeroImages = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?count=5&client_id=${apiKey}`);
            const data = await response.json();
            setHeroImages(data);
            localStorage.setItem('heroImages', JSON.stringify(data)); // Cache in local storage
        } catch (error) {
            console.error("Error fetching hero images:", error);
        }
    };

    const fetchCategoryImages = async (category) => {
        try {
            const cachedCategoryImages = localStorage.getItem(`categoryImages_${category}`);
            if (cachedCategoryImages) {
                setCategoryImages(JSON.parse(cachedCategoryImages));
            } else {
                const response = await fetch(`https://api.unsplash.com/photos/random?count=50&query=${category}&client_id=${apiKey}`);
                const data = await response.json();
                const imagesWithCategory = data.map(image => ({ ...image, category }));
                setCategoryImages(prev => {
                    const updatedCategoryImages = [...prev, ...imagesWithCategory];
                    localStorage.setItem(`categoryImages_${category}`, JSON.stringify(updatedCategoryImages)); // Cache in local storage
                    return updatedCategoryImages;
                });
            }
        } catch (error) {
            console.error(`Error fetching images for category ${category}:`, error);
        }
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        fetchCategoryImages(category);
    };

    const toggleFavorite = (image) => {
        const updatedFavorites = favorites.includes(image) 
            ? favorites.filter(fav => fav.id !== image.id) 
            : [...favorites, image];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
//     useEffect(() => {
//         fetchHeroImages();
//     }, []);

//     // Fetch random hero images
//     const fetchHeroImages = async () => {
//         try {
//             const response = await fetch(`https://api.unsplash.com/photos/random?count=5&client_id=${apiKey}`);
//             const data = await response.json();
//             setHeroImages(data);
//         } catch (error) {
//             console.error("Error fetching hero images:", error);
//         }
//     };

//     const fetchCategoryImages = async (category) => {
//         try {
//             const response = await fetch(`https://api.unsplash.com/photos/random?count=1&query=${category}&client_id=${apiKey}`);
//             const data = await response.json();
//             const imagesWithCategory = data.map(image => ({ ...image, category })); // Add category property
//             setCategoryImages(prev => [...prev, ...imagesWithCategory]); // Append the new images
//         } catch (error) {
//             console.error(`Error fetching images for category ${category}:`, error);
//         }
//     };

//     // Function to select a category and fetch its images
//     const selectCategory = (category) => {
//         setSelectedCategory(category); // Update the selected category
//         fetchCategoryImages(category); // Fetch images for the selected category
//     };

// // Function to add/remove from favorites
// const toggleFavorite = (image) => {
//     const updatedFavorites = favorites.includes(image) 
//         ? favorites.filter(fav => fav.id !== image.id) 
//         : [...favorites, image];

//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to local storage
// };
    return (
        <GalleryContext.Provider 
        value={{  heroImages, 
                categoryImages, 
                fetchCategoryImages, 
                selectedCategory, 
                selectCategory,
                popupData,
                setPopupData,
                favorites,
                toggleFavorite  }}>
            {children}
        </GalleryContext.Provider>
    );
};

export default GalleryContext;

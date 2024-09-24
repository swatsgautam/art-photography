import React, { useEffect, useContext } from 'react';
import GalleryContext from '../context/artContext';

const Hero = () => {
  const { heroImages } = useContext(GalleryContext);
  const [currentImage, setCurrentImage] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages]);
    
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImages[currentImage]?.urls?.regular})` }}>
      <div className="hero-text">
        <h1>Discover Art & Photography</h1>
        <p>Explore stunning artworks from around the world.</p>
      </div>
    </section>
  )
}

export default Hero

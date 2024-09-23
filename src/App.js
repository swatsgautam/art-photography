import './App.css';
import { GalleryProvider } from './context/artContext';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';

function App() {
  return (
    <GalleryProvider>
      <Router>
          <Header />          
          <Routes>
            <Route path="/" element={<CategoryGrid />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
      </Router>
    </GalleryProvider>
  );
}

export default App;

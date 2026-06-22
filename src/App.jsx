import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Hero from './pages/Hero'
import Navbar from './components/Navbar'
import Project from './pages/Project'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Secretpath from './pages/Secretpath'

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToHash />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hero" element={<><Navbar/> <Hero/> <Footer/></>} />
        <Route path="/project" element={<> <Navbar/> <Project/> <Footer/> </>} />
        <Route path="/secretpath" element={<Secretpath/> } />
      </Routes>
    </>
  )
}

export default App
import React, { useState } from 'react';
import CustomCursor from './components/Cursor/CustomCursor';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="app">
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            
            {/* Spaceholders for other sections */}
            <div id="about" style={{ height: '100vh' }}></div>
            <div id="experience" style={{ height: '100vh' }}></div>
            <div id="skills" style={{ height: '100vh' }}></div>
            <div id="projects" style={{ height: '100vh' }}></div>
            <div id="achievements" style={{ height: '100vh' }}></div>
            <div id="contact" style={{ height: '100vh' }}></div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;

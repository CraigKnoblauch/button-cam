import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "src/components/Navbar";

const App = () => {

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
          <div id="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
            <Portfolio />
          </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div id="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

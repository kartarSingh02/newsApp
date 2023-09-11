import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { BrowserRouter as Main, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize=15;
  const apiKey=process.env.REACT_APP_API_KEY;

  // state = {
  //   progress:0
  // }
   const [progress, setProgress] = useState(0) 


    return ( 
      <>
      <div>
        <Main>
        <NavBar/>
        <LoadingBar height={3} color='#f11946' progress={progress} />
          <Routes> 
          {/* adding routes */}
            <Route path="/" element={ <News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} /> 
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
            <Route path="/sports" element={<News setProgress={setProgress}  apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
          </Routes>
        </Main> 
      </div>
      </>
    )
}

export default App;
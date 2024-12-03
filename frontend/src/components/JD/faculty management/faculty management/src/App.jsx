
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Faculty from './Faculty-Management/Faculty'

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Faculty/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App


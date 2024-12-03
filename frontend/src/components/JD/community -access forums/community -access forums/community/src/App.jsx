import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
// import CreatePollModal from './Chatbox/CreatePollModal'
import PollDashboard from './Chatbox/PollDashboard'
// import PollCard from './Chatbox/PollCard'

function App() {
  

  return (
    <>
       <Router>
        <Routes>
          <Route path='/' element={<PollDashboard/>}></Route>
          {/* <Route path='/CreatePollModal' element={<CreatePollModal/>}></Route> */}
          {/* <Route path='/PollCard' element={<PollCard/>}></Route> */}
        </Routes>
       </Router>
    </>
  )
}

export default App

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Authenticate from './components/Authenticate';
import Home from './components/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/authenticate' element={<Authenticate />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

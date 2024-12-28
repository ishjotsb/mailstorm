import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Authenticate from './components/Authenticate';
import Home from './components/Home';
import { UserProvider } from './context/user-context';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/authenticate' element={<Authenticate />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

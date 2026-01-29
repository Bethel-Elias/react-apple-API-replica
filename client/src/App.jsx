import React from 'react'

import "./assets/css/bootstrap.css";
import "./assets/css/styles.css";
import { Route, Routes } from 'react-router-dom'
import Main from './PageComponents/Main/Main';
import Mac from './PageComponents/Mac/Mac'
import Iphone from './PageComponents/Iphone/Iphone'
import Ipad from './PageComponents/Ipad/Ipad'
import Watch from './PageComponents/Watch/Watch'
import Tv from './PageComponents/Tv/Tv'
import Music from './PageComponents/Music/Music'
import Support from './PageComponents/Support/Support'
import Search from './PageComponents/Search/Search'
import Cart from './PageComponents/Cart/Cart'
import Four04 from './PageComponents/Four04/Four04'
import SharedComponents from './PageComponents/SharedComponents/SharedComponents';
import SingleAppleProduct from './PageComponents/SingleAppleProduct/SingleAppleProduct';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedComponents />}>
        <Route path="/" element={<Main />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/iphone/:ID" element={<SingleAppleProduct />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/Music" element={<Music />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Four04 />} />
      </Route>
    </Routes>
    
  );
}

export default App
import "css/styles.scss"

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Movie from 'pages/Movie';
import Play from 'pages/Play';
import Search from 'pages/Search';
import Categories from 'pages/Categories';
import Category from 'pages/Category';
import WtachLater from 'pages/WatchLater';
import About from 'pages/About';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="movie/*" element={<Movie />}></Route>
            <Route path="play/*" element={<Play />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="categories" element={<Categories />}></Route>
            <Route path="category/*" element={<Category />}></Route>
            <Route path="watch-later" element={<WtachLater />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

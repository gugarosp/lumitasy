import "css/styles.scss"

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Movie from 'pages/Movie';
import Play from 'pages/Play';
import Search from 'pages/Search';
import Categories from 'pages/Categories';
import Category from 'pages/Category';
import WatchLater from 'pages/WatchLater';
import About from 'pages/About';
import { MoviesProvider } from "context/movies";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MoviesProvider>
              <Home />
            </MoviesProvider>
          }>
          </Route>
          <Route path="movie/*" element={<Movie />}></Route>
          <Route path="play/*" element={<Play />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="category/*" element={<Category />}></Route>
          <Route path="watch-later" element={<WatchLater />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

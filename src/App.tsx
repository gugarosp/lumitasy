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
import { PlayMovieProvider } from "context/playMovie";
import { CategoriesProvider } from "context/categories";
import ScreenBlocker from "components/ScreenBlocker";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <CategoriesProvider>
              <MoviesProvider>
                <Home />
              </MoviesProvider>
            </CategoriesProvider>
          }>
          </Route>
          <Route path="movie/*" element={
            <MoviesProvider>
              <Movie />
            </MoviesProvider>
          }></Route>
          <Route path="play/*" element={
            <MoviesProvider>
              <PlayMovieProvider>
                <Play />
              </PlayMovieProvider>
            </MoviesProvider>
          }></Route>
          <Route path="search" element={
            <MoviesProvider>
              <Search />
            </MoviesProvider>
          }></Route>
          <Route path="categories" element={
            <CategoriesProvider>
              <Categories />
            </CategoriesProvider>
          }></Route>
          <Route path="category/*" element={
            <CategoriesProvider>
              <MoviesProvider>
                <Category />
              </MoviesProvider>
            </CategoriesProvider>
          }></Route>
          <Route path="watch-later" element={
            <MoviesProvider>
              <WatchLater />
            </MoviesProvider>
          }></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <CategoriesProvider>
        <MoviesProvider>
          <ScreenBlocker />
        </MoviesProvider>
      </CategoriesProvider>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import Recipeitem from "../../component/recipe-item/Recipeitem";
import FavoriteItem from "../../component/favorite-item/FavoriteItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "../../component/search/Search";
import "./style.css";
import Navbar from "../navbar/Navbar";

const Homepage = () => {
  const [loadingstate, setLoadingState] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [apicallsuccess, setApicallsuccess] = useState(false);

  const getdata = (data) => {
    setLoadingState(true);
    // console.log(data, "data is here");
    const getrecipy = async () => {
      const responce = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${data}&number=20`
      );
      const result = await responce.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApicallsuccess(true);
      }
    };
    getrecipy();
  };
  // console.log(loadingstate, recipes);

  const addtofavorite = (getcurrentrecipe) => {
    // console.log(getcurrentrecipe);

    let cpyFavorites = [...favorites];
    // console.log(cpyFavorites);

    const index = cpyFavorites.findIndex(
      (item) => item.id === getcurrentrecipe.id
    );
    if (index === -1) {
      cpyFavorites.push(getcurrentrecipe);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    } else {
      alert("item is already present in favorites");
    }
  };

  const removefavitem = (curritemid) => {
    // console.log(item);
    // const rmitm = favorites.filter((removeitm) => removeitm.id !== item.id);
    // // console.log(rmitm.id, item.id);
    // setFavorites(rmitm);
    let copyfav = [...favorites];

    copyfav = copyfav.filter((item) => item.id !== curritemid);
    setFavorites(copyfav);
    localStorage.setItem("favorites", JSON.stringify(copyfav));
    // console.log(copyfav);
  };
  // console.log(favorites);
  useEffect(() => {
    const extractfromlocalstorage = JSON.parse(
      localStorage.getItem("favorites")
    );
    if (extractfromlocalstorage === null) {
      console.log("hello");
    } else {
      setFavorites(extractfromlocalstorage);
    }
    // console.log(extractfromlocalstorage);
  }, []);
  // console.log(favorites);

  return (
    <div className="homepage">
      <BrowserRouter>
        <Navbar />
        <Search
          getdata={getdata}
          apicallsuccess={apicallsuccess}
          setApicallsuccess={setApicallsuccess}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="recipe-title">Welcome to Food World</h1>

                <div className="items">
                  {recipes && recipes.length > 0
                    ? recipes.map((item) => (
                        <Recipeitem
                          addtofavorite={() => addtofavorite(item)}
                          key={item.id}
                          image={item.image}
                          title={item.title}
                        />
                      ))
                    : null}
                </div>
              </>
            }
          />
          <Route
            path="/favorite"
            element={
              <FavoriteItem
                favorites={favorites}
                removefavitem={removefavitem}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      {/* loading content */}

      {loadingstate && (
        <div className="loading"> Loading recipes ! please wait</div>
      )}
    </div>
  );
};
export default Homepage;

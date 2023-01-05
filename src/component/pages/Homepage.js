import { useEffect, useState } from "react";
import Recipeitem from "../../component/recipe-item/Recipeitem";
import FavoriteItem from "../../component/favorite-item/FavoriteItem";

import Search from "../../component/search/Search";
import "./style.css";

const Homepage = () => {
  const [loadingstate, setLoadingState] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const getdata = (data) => {
    setLoadingState(true);
    // console.log(data, "data is here");
    const getrecipy = async () => {
      const responce = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEE}&query=${data}&number=50`
      );
      const result = await responce.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
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
    console.log(copyfav);
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
      <Search getdata={getdata} />

      <div className="favorites-wrapper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {favorites && favorites.length > 0
            ? favorites.map((item) => (
                <FavoriteItem
                  key={item.id}
                  removefavitem={() => removefavitem(item.id)}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {/* loading content */}

      {loadingstate && (
        <div className="loading"> Loading recipes ! please wait</div>
      )}

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
    </div>
  );
};
export default Homepage;

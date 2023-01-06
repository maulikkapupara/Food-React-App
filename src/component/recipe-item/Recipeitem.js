import "./Recipeitem.css";
import Search from "../search/Search";
const Recipeitem = (props) => {
  const { recipes, addtofavorite, getdata, apicallsuccess, setApicallsuccess } =
    props;
  return (
    <>
      <Search
        getdata={getdata}
        apicallsuccess={apicallsuccess}
        setApicallsuccess={setApicallsuccess}
      />
      <h1 className="recipe-title">Welcome to Food World</h1>
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <div className="recipe-item" key={item.id}>
                <div className="recipe-img">
                  <img
                    src={item.image}
                    alt="food-items"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <p>{item.title}</p>
                <button type="button" onClick={() => addtofavorite(item)}>
                  Add To Favorite
                </button>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
export default Recipeitem;

import "./style.css";
const FavoriteItem = (props) => {
  const { removefavitem, favorites } = props;
  return (
    <div className="favorites-wrapper">
      <h1 className="favorites-title">Favorites</h1>
      <div className="favorites">
        {favorites && favorites.length > 0
          ? favorites.map((item) => (
              // <FavoriteItem
              //   key={item.id}
              //   removefavitem={() => removefavitem(item.id)}
              //   image={item.image}
              //   title={item.title}
              // />
              <div className="favorite-item" key={item.id}>
                <div>
                  <img
                    src={item.image}
                    alt="food-items"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <p>{item.title}</p>
                <button type="button" onClick={() => removefavitem(item.id)}>
                  Remove from Favorite
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default FavoriteItem;

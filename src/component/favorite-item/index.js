import "./style.css";
const FavoriteItem = (props) => {
  const { image, title, removefavitem } = props;
  return (
    <div  className="favorite-item">
      <div>
        <img src={image} alt="food-items" style={{borderRadius:"10px"}} />
      </div>
      <p>{title}</p>
      <button type="button" onClick={removefavitem}>
        Remove from Favorite
      </button>
    </div>
  );
};
export default FavoriteItem;

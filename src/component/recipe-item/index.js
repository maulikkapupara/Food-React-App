import "./style.css";
const Recipeitem = (props) => {
  const { image, title, addtofavorite } = props;
  return (
    <div className="recipe-item">
      <div className="recipe-img">
        <img src={image} alt="food-items" style={{borderRadius:"10px"}} />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addtofavorite}>
        Add To Favorite
      </button>
    </div>
  );
};
export default Recipeitem;

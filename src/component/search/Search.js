import { useEffect, useState } from "react";
import "./style.css";

const Search = (props) => {
  const { getdata, apicallsuccess, setApicallsuccess } = props;

  const [inputvalue, setInputValue] = useState("");

  const handleInputvalue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  //   console.log(inputvalue);

  const handleSubmit = (e) => {
    e.preventDefault();
    getdata(inputvalue);
  };
  useEffect(() => {
    if (apicallsuccess) {
      setInputValue("");
      setApicallsuccess(false);
    }
  }, [apicallsuccess]);
  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="search"
        onChange={handleInputvalue}
        value={inputvalue}
        placeholder="search recipes"
        id="search"
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default Search;

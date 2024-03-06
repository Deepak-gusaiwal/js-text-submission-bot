import React from "react";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={name}
      />
      <button
        id="submit"
        onClick={() => {
          if (!name) {
            alert("please enter name first");
            return;
          }
          setData((prv) => [...prv, name]);
          setName("");
          setCount(count +1);
          console.log("click count", count);
        }}
        type="submit"
      >
        Submit
      </button>

      <hr />
      {data.length > 0 &&
        data.map((data) => {
          return <h2 key={data + Math.random()}>Data is {data}</h2>;
        })}
    </div>
  );
};

export default Home;

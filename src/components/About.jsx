import React, { useEffect, useState } from "react";

const About = ({ getName }) => {
  const [name, setName] = useState(false);
  useEffect(() => {
    console.log("calling the getName function in about page");
    setName(getName);
  }, [getName]);
  return (
    <div>
      <h1>Name in About Page is {name ? "hello" : "bye"}</h1>
    </div>
  );
};

export default About;

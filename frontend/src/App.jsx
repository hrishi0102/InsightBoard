import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
    const response = await axios.get("http://localhost:3000/health");
    setData(response.data);
  };

  return (
    <div>
      <h1 className="justify-center text-xl">Hello User</h1>
      <button onClick={handleSubmit} className="border rounded-sm border-black">
        Click me
      </button>
      <p>{data}</p>
    </div>
  );
};

export default App;

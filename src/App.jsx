import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  function addNewTransaction(e) {
    e.preventDefault();

    // The REACT_APP_API_URL should be defined in your .env file
    // and should contain the URL of your backend API.
    const url = process.env.REACT_APP_API_URL + "/transaction";
    console.log(url);
    const price = name.split(" ")[0];

    // Make a POST request to the backend API
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
      // Send the data in the request body
    }).then((response) => {
      response.json().then((json) => {
        // Clear the input fields after submitting the form
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
        // You can handle the response from the server here if needed
      });
    });
  }

  return (
    <main>
      <h1>
        $400 <span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="+200 new Samsung TV"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <button type="submit">Add new transactions</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="ne">New Samsung TV</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">12-16-2023 12:24</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="ne">web client credit</div>
            <div className="description">it was time for new tv</div>
          </div>
          <div className="right">
            <div className="price green">+$200</div>
            <div className="datetime">12-16-2023 12:24</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="ne">New macbook m1 pro</div>
            <div className="description">it was time for laptop</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">12-16-2023 12:24</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

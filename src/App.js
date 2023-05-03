import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  // 1. Post Data
  const postData = () => {
    axios
      .post("https://6451e10cbce0b0a0f737603e.mockapi.io/users", {
        name: name,
        age: 28,
        countryVisited: ["India", "Nepal", "Japan"]
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 2. Get Data
  const getData = () => {
    axios
      .get("https://6451e10cbce0b0a0f737603e.mockapi.io/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //  3. Update Data
  const updateData = (id) => {
    axios
      .put(`https://6451e10cbce0b0a0f737603e.mockapi.io/users/${id}`, {
        name: name,
        age: 28,
        countryVisited: ["India", "Nepal", "Japan"]
      })
      .then((response) => {
        console.log(response.data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //  4. Delete Data
  const deleteData = (id) => {
    axios
      .delete(`https://6451e10cbce0b0a0f737603e.mockapi.io/users/${id}`)
      .then((response) => {
        getData();
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Use Effect for rendering
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />

      <button onClick={postData}> POST DATA </button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>
              {" "}
              {user.id} - {user.name}{" "}
            </h1>
            <button onClick={() => updateData(user.id)}> UPDATE DATA </button>
            <button onClick={() => deleteData(user.id)}> DELETE DATA </button>
          </div>
        );
      })}
    </div>
  );
}

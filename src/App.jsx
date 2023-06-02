import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Agrega el nombre del archivo CSS que creaste

const RandomUserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const fetchRandomUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=3');
      const { results } = response.data;
      setUsers(results);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const newUser = response.data.results[0];
      setUsers(prevUsers => [...prevUsers, newUser]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = index => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(index, 1);
      return updatedUsers;
    });
  };

  return (
    <div className="container">
      <button className="button" onClick={addUser}>Agregar usuario</button>
      {users.map((user, index) => (
        <div className="card" key={index}>
          <img src={user.picture.large} alt="User" />
          <p>Nombre: {`${user.name.first} ${user.name.last}`}</p>
          <button className="button" onClick={() => removeUser(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default RandomUserComponent;

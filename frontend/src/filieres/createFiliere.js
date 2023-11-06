import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateFiliere() {
  const [filiereData, setFiliereData] = useState({
    libelle: '',
    code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiliereData({
      ...filiereData,
      [name]: value,
    });
  };

  const Root = `http://localhost:8080/api/v1/filieres`;
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Request Data:', filiereData);
    navigate('/filieres');

    try {
      const response = await axios.post(Root + `/create`, filiereData);
      console.log('Filiere created:', response.data);
      // Optionally, you can redirect to another page or perform other actions after successful creation.
    } catch (error) {
      console.error('Error creating filiere:', error);
    }
  };

  return (
    <div>
      <h2>Create Filiere</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="libelle" className="form-label">
            Libelle
          </label>
          <input
            type="text"
            className="form-control"
            name="libelle"
            id="libelle"
            value={filiereData.libelle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <textarea
            className="form-control"
            name="code"
            id="code"
            value={filiereData.code}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Filiere
        </button>
      </form>
    </div>
  );
}

export default CreateFiliere;

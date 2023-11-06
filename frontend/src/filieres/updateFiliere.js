import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateFiliere() {
  const { id } = useParams(); // Get the filiere ID from the URL
  const navigate = useNavigate();

  const [filiereData, setFiliereData] = useState({
    id: 0, // Initialize with default values
    libelle: '',
    code: '',
  });

  useEffect(() => {
    // Fetch filiere data by ID
    axios.get(`http://localhost:8080/api/v1/filieres/${id}`)
      .then((response) => {
        const { id, libelle, code } = response.data;
        setFiliereData({
          id,
          libelle,
          code,
        });
      })
      .catch((error) => console.error('Error fetching filiere data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiliereData({
      ...filiereData,
      [name]: value,
    });
  };

  const Root = `http://localhost:8080/api/v1/filieres`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${Root}/update/${id}`, filiereData);
      console.log('Filiere updated:', response.data);
      navigate('/filieres');
    } catch (error) {
      console.error('Error updating filiere:', error);
    }
  };

  return (
    <div>
      <h2>Update Filiere</h2>
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
          <input
            type="text"
            className="form-control"
            name="code"
            id="code"
            value={filiereData.code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Filiere
        </button>
      </form>
    </div>
  );
}

export default UpdateFiliere;

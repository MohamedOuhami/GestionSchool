import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudent() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    id: 0,
    roles: [],
    username: '',
    password: '',
    name: '',
    phone: 0,
    email: '',
    filiere: {
      id: 0,
      code: '',
      libelle: ''
    }
  });

  const [filieres, setFilieres] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch available filieres
    axios.get('http://localhost:8080/api/v1/filieres')
      .then((response) => setFilieres(response.data))
      .catch((error) => console.error('Error fetching filieres:', error));

    // Fetch available roles
    axios.get('http://localhost:8080/api/v1/roles')
      .then((response) => setRoles(response.data))
      .catch((error) => console.error('Error fetching roles:', error));

    // Fetch student data by ID and set it in studentData
    axios.get(`http://localhost:8080/api/v1/student/${id}`)
      .then((response) => setStudentData(response.data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'filiereId') {
      // Handle filiere selection
      const selectedFiliere = filieres.find((filiere) => filiere.id === parseInt(value));
      setStudentData({
        ...studentData,
        filiere: {
          id: selectedFiliere.id,
          code: selectedFiliere.code,
          libelle: selectedFiliere.libelle
        }
      });
    } else if (name === 'roleId') {
      // Handle role selection
      const selectedRole = roles.find((role) => role.id === parseInt(value));
      setStudentData({
        ...studentData,
        roles: [
          {
            id: selectedRole.id,
            name: selectedRole.name
          }
        ]
      });
    } else {
      // Handle other input fields
      setStudentData({
        ...studentData,
        [name]: value
      });
    }
  };

  const Root = `http://localhost:8080/api/v1/student`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${Root}/update/${id}`, studentData);
      console.log('Student updated:', response.data);
      navigate('/students');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            value={studentData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={studentData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Telephone
          </label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            value={studentData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="filiereId" className="form-label">
            Filiere
          </label>
          <select
            name="filiereId"
            id="filiereId"
            className="form-select"
            value={studentData.filiere.id}
            onChange={handleChange}
            required
          >
            <option value="">Select Filiere</option>
            {filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>
                {filiere.libelle}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="roleId" className="form-label">
            Role
          </label>
          <select
            name="roleId"
            id="roleId"
            className="form-select"
            value={studentData.roles.length > 0 ? studentData.roles[0].id : ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Render other form input fields similar to CreateStudent component */}
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default UpdateStudent;

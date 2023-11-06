import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [studentData, setStudentData] = useState({
    id: 0,
    roles: [
      {
        id: 0,
        name: 'string'
      }
    ],
    username: '',
    password: '',
    name: '',
    phone: 0,
    email: '',
    filiere: {
      id: 0,
      code: 'string',
      libelle: 'string'
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'filiereId') {
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
      setStudentData({
        ...studentData,
        [name]: value
      });
    }
  };

  const Root = `http://localhost:8080/api/v1/student`;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${Root}/create`, studentData);
      console.log('Student created:', response.data);

      // Redirect to the root path after successful creation
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h2 className='pt-4 pb-4'>Create Student</h2>
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
            value={studentData.roles[0].id}
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
        <button type="submit" className="btn btn-primary">
          Create Student
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;

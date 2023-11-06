import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRole() {
  const [roleData, setRoleData] = useState({
    name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData({
      ...roleData,
      [name]: value,
    });
  };

  const Root = `http://localhost:8080/api/v1/roles`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(Root + `/create`, roleData);
      console.log('Role created:', response.data);

      // Redirect to the role list or a success page
      navigate('/roles');
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  return (
    <div>
      <h2 className="my-4">Create Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={roleData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Role
        </button>
      </form>
    </div>
  );
}

export default CreateRole;

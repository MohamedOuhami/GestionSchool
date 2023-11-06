import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRole() {
  const { id } = useParams(); // Get the role ID from the URL
  const navigate = useNavigate();

  const [roleData, setRoleData] = useState({
    name: '',
  });

  useEffect(() => {
    // Fetch role data by ID and set it in roleData
    const fetchRoleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/roles/${id}`);
        setRoleData(response.data);
      } catch (error) {
        console.error('Error fetching role data:', error);
      }
    };

    fetchRoleData();
  }, [id]);

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
      const response = await axios.put(`${Root}/update/${id}`, roleData);
      console.log('Role updated:', response.data);

      // Redirect to the role list or a success page
      navigate('/roles');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div>
      <h2 className="my-4">Update Role</h2>
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
          Update Role
        </button>
      </form>
    </div>
  );
}

export default UpdateRole;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentByFiliere() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filiere, setFiliere] = useState(1); // State to store the selected filiere ID
    const [filieres, setFilieres] = useState([]); // State to store the available filieres

    const Root = 'http://localhost:8080/api/v1/student';

    const fetchData = async () => {
        try {
            const response = await axios.get(`${Root}/filiere/${filiere}`);
            console.log(`${Root}/filiere/${filiere}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${Root}/delete/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting the student: ' + error);
        }
    }

    // Fetch the list of available filieres
    const fetchFilieres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/filieres');
            setFilieres(response.data);
        } catch (error) {
            console.error('Error fetching filieres:', error);
        }
    }

    useEffect(() => {
        fetchFilieres(); // Fetch available filieres
    }, []);

    useEffect(() => {
        fetchData();
    }, [filiere]);

    // Function to handle filiere selection
    const handleFiliereChange = (e) => {
        setFiliere(e.target.value);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4 ">Students By Filiere</h1>

            {/* Select dropdown to choose a filiere */}
            <div className="mb-3">
                <label htmlFor="filiereSelect" className="form-label">Select Filiere</label>
                <select
                    id="filiereSelect"
                    className="form-select"
                    value={filiere}
                    onChange={handleFiliereChange}
                >
                    {filieres.map((filiere) => (
                        <option key={filiere.id} value={filiere.id}>
                            {filiere.libelle}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Filiere</th>
                        <th>Roles</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.filiere.libelle}</td>
                            <td>
                                {item.roles.map((role) => (
                                    <span key={role.id}>{role.name}, </span>
                                ))}
                            </td>
                            <td>
                                <Link to={`/students/update/${item.id}`} className="btn btn-primary">
                                    Update
                                </Link>
                            </td>
                            <td>
                                <form onSubmit={(e) => { e.preventDefault(); handleDelete(item.id) }}>
                                    <button type='submit' className="btn btn-danger">Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentByFiliere;

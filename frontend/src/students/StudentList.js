import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function StudentList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Root = `http://localhost:8080/api/v1/student`;
    const fetchData = async () => {
        try {
            const response = await axios.get(Root);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(Root + `/delete/${id}`)
            fetchData();
        }
        catch (error) {
            console.error("Error deleting the filiere : " + error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">Students</h1>
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
                            <td><td>
                                <form onSubmit={(e) => { e.preventDefault(); handleDelete(item.id) }}>
                                    <button type='submit' className="btn btn-danger">Delete</button>
                                </form>
                            </td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RoleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Root = `http://localhost:8080/api/v1/roles`;

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
            console.error("Error deleting the role : " + error);
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
            <h1 className="my-4">Roles</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Link to={`/roles/update/${item.id}`} className="btn btn-primary">
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

export default RoleList;

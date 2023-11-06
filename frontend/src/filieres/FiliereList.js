import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FiliereList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Root = `http://localhost:8080/api/v1/filieres`;


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
            <h1 className="my-4">filieres</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Libelle</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.code}</td>
                            <td>{item.libelle}</td>
                            <td>
                                <Link to={`/filieres/update/${item.id}`} className="btn btn-primary">
                                    Update
                                </Link>
                            </td>
                            <td>
                                <form onSubmit={(e) => {e.preventDefault(); handleDelete(item.id)}}>
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

export default FiliereList;

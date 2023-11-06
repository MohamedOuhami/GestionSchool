// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import './App.css'; // Import custom CSS for additional styling
import StudentList from './students/StudentList';
import FiliereList from './filieres/FiliereList';
import RoleList from './roles/RoleList';
import CreateFiliere from './filieres/createFiliere';
import UpdateStudent from './students/updateStudent';
import CreateStudent from './students/createStudent';
import UpdateFiliere from './filieres/updateFiliere';
import CreateRole from './roles/createRole';
import UpdateRole from './roles/updateRole';
import StudentByFiliere from './students/StudentByFiliere';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                    Gestion des étudiants
                  </h6>
                  <ul className="sub-menu">
                    <li className="nav-item">
                      <Link to="/students" className="nav-link">Liste des étudiants</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/students/filterFiliere" className="nav-link">Liste des étudiants par filiere</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/students/create" className="nav-link">Créer un étudiant</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                    Gestion des filières
                  </h6>
                  <ul className="sub-menu">
                    <li className="nav-item">
                      <Link to="/filieres" className="nav-link">Liste des filières</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/filieres/create" className="nav-link">Créer une filière</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                    Gestion des rôles
                  </h6>
                  <ul className="sub-menu">
                    <li className="nav-item">
                      <Link to="/roles" className="nav-link">Liste des rôles</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/roles/create" className="nav-link">Créer un rôle</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/students" element={<StudentList />} />
              <Route path="/filieres" element={<FiliereList />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/students/create" element={<CreateStudent />} />
              <Route path="/filieres/create" element={<CreateFiliere />} />
              <Route path="/roles/create" element={<CreateRole />} />
              <Route path="/students/update/:id" element={<UpdateStudent />} />
              <Route path="/filieres/update/:id" element={<UpdateFiliere />} />
              <Route path="/roles/update/:id" element={<UpdateRole />} />
              <Route path="/students/filterFiliere" element={<StudentByFiliere />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

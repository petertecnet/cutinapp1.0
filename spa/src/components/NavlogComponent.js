import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import authService from "../services/AuthService";
import { storageUrl } from "../config";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.me();
        setUser(userData);
      } catch (error) {
        console.error(error);
        window.location.href = "/logout";
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/loadingimage.gif"
            alt="Logo"
            className="logo rounded-circle img-thumbnail"
            style={{ width: "50px", height: "50px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" onClick={toggleMenu} />
        <Navbar.Collapse id="navbarNav" className={`${isMenuOpen ? "show" : ""}`}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events">
              Eventos
            </Nav.Link>
            <Nav.Link as={Link} to="/productions">
              Produções
            </Nav.Link>
            <Nav.Link as={Link} to="/artists">
              Artistas
            </Nav.Link>
<<<<<<< HEAD
            {user && (
              <NavDropdown title="Administrador" id="admin-dropdown">
<<<<<<< HEAD
                <NavDropdown.Item as={Link} to="/users">Usuários</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/create">Perfis</NavDropdown.Item>
=======
                <NavDropdown.Item as={Link} to="/user/list">Usuários</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/list">Perfis</NavDropdown.Item>
>>>>>>> main
              </NavDropdown>
            )}
          </Nav>
          {user && (
            <div className="user-menu dropdown">
               <img
                src={user.avatar ? `${storageUrl}/${user.avatar}` : "/images/loadingimage.gif"}
                alt="User Avatar"
                className="avatar dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ maxWidth: "50px", borderRadius: "50%" }}
              />
              {isMenuOpen ? (
                <BsChevronRight
                  className="dropdown-toggle" 
                  style={{ color: "#fff", cursor: "pointer", transform: "rotate(90deg)" }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
              ) : (
                <BsChevronDown
                  className="dropdown-toggle" 
                  style={{ color: "#fff", cursor: "pointer" }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
              )}
              <ul className="dropdown-menu dropdown-menu-end upperall p-4 " >
                <li>
                  <p className="dropdown-item text-center">
                    <BsPerson /> {user.first_name.slice(0, 10).toUpperCase()}
                  </p>
                </li>
                <li>
                  <Nav.Link as={Link} to="/user/edit" className="dropdown-item m-4">
                    <BsPerson /> Meu perfil
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/profile" className="dropdown-item m-4">
                    <BsPerson /> Minha carteira
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/settings" className="dropdown-item m-4" >
                    <BsCalendar /> Meus eventos
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/settings" className="dropdown-item m-4">
                    <BsMusicNoteList /> Minhas produções
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/settings" className="dropdown-item m-4">
                    <BsGear /> Configurações
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/logout" className="dropdown-item m-4">
                    <BsBoxArrowRight /> Sair
                  </Nav.Link>
                </li>
              </ul>
            </div>
=======
            <NavDropdown title="Administrativo" id="admin-dropdown">
              <NavDropdown.Item as={Link} to="/user/list">
                Usuários
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile/list">
                Perfis
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/production/list">
                Produções
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/event/list">
                Eventos
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Corporativo" id="corporate-dropdown">
              <NavDropdown.Item as={Link} to="/my-productions">
                Minhas Produções
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/my-events">
                Meus Eventos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/my-sales">
                Minhas Vendas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>   {user && (
            <img
              src={user.avatar ? `${storageUrl}/${user.avatar}` : "/images/loadingimage.gif"}
              alt="Avatar"
              className="avatar text-center"
              style={{ maxWidth: "40px", borderRadius: "40%" }}
            />
>>>>>>> main
          )}
          {user && (
            
            <NavDropdown title={user.first_name} id="profile-dropdown" className=" text-white auth-dropdown">
             
              <NavDropdown.Item as={Link} to={`/user/edit`}>
              Gerenciar conta
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">
                Minha Carteira
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                Configurações
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          )}
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

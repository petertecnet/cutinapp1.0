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
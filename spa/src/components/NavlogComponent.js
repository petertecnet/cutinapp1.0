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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar expand="lg" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" onClick={toggleMenu} />
        <Navbar.Collapse
          id="navbarNav"
          className={`${isMenuOpen ? "show" : ""}`}
        >
          <Nav className="me-auto" onClick={closeMenu}>
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
              <NavDropdown.Item as={Link} to="/production/admin/list">
                Produções
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/event/list">
                Eventos
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Corporativo" id="corporate-dropdown">
              <NavDropdown.Item as={Link} to="/production/corp/list">
                Minhas Produções
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/my-events">
                Meus Eventos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/my-sales">
                Minhas Vendas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user && (
              <NavDropdown
                title={user.first_name}
                id="profile-dropdown"
                className="text-white dropstart h5"
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/user/edit`}
                  onClick={closeMenu}
                >
                  Gerenciar conta
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile" onClick={closeMenu}>
                  Minha Carteira
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings" onClick={closeMenu}>
                  Configurações
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout" onClick={closeMenu}>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <img
              src={
                user && user.avatar
                  ? `${storageUrl}/${user.avatar}`
                  : "/images/loadingimage.gif"
              }
              alt="Avatar"
              className="avatar m-2"
              style={{ maxWidth: "40px", borderRadius: "40%" }}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
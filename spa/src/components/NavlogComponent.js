import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import authService from "../services/AuthService";
import { storageUrl } from "../config";

import {
  BsPerson,
  BsCalendar,
  BsMusicNoteList,
  BsGear,
  BsBoxArrowRight,
  BsChevronDown,
  BsChevronRight // Adicionado o ícone de seta para a direita
} from "react-icons/bs";
import "../css/navlog.css";

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
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
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
            <Nav.Link as={Link} to="/evetns">
              Eventos
            </Nav.Link>
            <Nav.Link as={Link} to="/productions">
              Produções
            </Nav.Link>
            <Nav.Link as={Link} to="/artits">
              Artistas
            </Nav.Link>
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
              {isMenuOpen ? ( // Adicionada a classe condicional para determinar a orientação da seta
                <BsChevronRight // Ícone da seta virado para a direita
                  className="dropdown-toggle" 
                  style={{ color: "#fff", cursor: "pointer", transform: "rotate(90deg)" }} // Rotação da seta
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
              ) : (
                <BsChevronDown // Ícone da seta para baixo
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
                  <Nav.Link as={Link} to="/profile" className="dropdown-item m-4">
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
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

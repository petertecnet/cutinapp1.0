import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import authService from "../../services/AuthService";
import userService from "../../services/UserService";
import NavlogComponent from "../../components/NavlogComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { storageUrl } from "../../config";

const UserViewPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.me();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          "Erro ao carregar os dados do usuário. Por favor, tente novamente."
        );
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const showAlertWithTimer = (type, message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertType(type);

    // Limpar o temporizador atual, se existir
    if (timerId) {
      clearTimeout(timerId);
    }

    // Definir um novo temporizador para ocultar o alerta após 3 segundos
    const id = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Atualizar o estado com o ID do temporizador
    setTimerId(id);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavlogComponent />
      <Container fluid>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Alert
                  show={showAlert}
                  variant={alertType}
                  onClose={() => {
                    setShowAlert(false);
                    clearTimeout(timerId); // Limpar temporizador ao fechar manualmente
                  }}
                  dismissible
                >
                  {alertMessage}
                </Alert>

                <div className="text-center mt-4">
                  <img
                    src={
                      user.avatar.startsWith("http")
                        ? user.avatar
                        : `${storageUrl}/${user.avatar}`
                    }
                    alt="Avatar"
                    className="avatar"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <h3 className="text-center mt-4">
                  {`${user.first_name} ${user.last_name}`}
                </h3>
                <p className="text-center">
                  {`${user.city}, ${user.uf}`}
                </p>
                <p className="text-center">{`Telefone: ${user.phone}`}</p>
                <p className="text-center">{`CPF: ${user.cpf}`}</p>
                <p className="text-center">{`Data de Nascimento: ${user.birthdate}`}</p>
                <p className="text-center">{`Gênero: ${user.gender}`}</p>
                <p className="text-center">{`Ocupação: ${user.occupation}`}</p>
                <p className="text-center">{`Sobre: ${user.about}`}</p>
                <p className="text-center">{`Artista Favorito: ${user.favorite_artist}`}</p>
                <p className="text-center">{`Gênero Favorito: ${user.favorite_genre}`}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserViewPage;

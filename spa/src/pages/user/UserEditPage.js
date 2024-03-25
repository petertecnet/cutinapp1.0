import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import authService from "../../services/AuthService";
import userService from "../../services/UserService";
import NavlogComponent from "../../components/NavlogComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { storageUrl } from "../../config";

const ProfileEditPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    avatar: null,
    cpf: "",
    address: "",
    phone: "",
    city: "",
    uf: "",
    postal_code: "",
    birthdate: "",
    gender: "",
    marital_status: "",
    occupation: "",
    about: "",
    favorite_artist: "",
    favorite_genre: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.me();
        setUser(userData);
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          cpf: userData.cpf,
          address: userData.address,
          phone: userData.phone,
          city: userData.city,
          uf: userData.uf,
          postal_code: userData.postal_code,
          birthdate: userData.birthdate,
          gender: userData.gender,
          marital_status: userData.marital_status,
          occupation: userData.occupation,
          about: userData.about,
          favorite_artist: userData.favorite_artist,
          favorite_genre: userData.favorite_genre,
          avatar: userData.avatar,
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Atualiza a pré-visualização da nova foto
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(file);

    // Atualiza o estado do formulário com o novo arquivo de imagem
    setFormData({
      ...formData,
      avatar: file,
    });
  };

  const handleSubmit = async () => {
    try {
      // Crie um objeto para armazenar apenas os campos modificados
      const modifiedData = {};
      // Iterar sobre os campos do formulário e adicionar apenas os modificados ao objeto
      for (const key in formData) {
        if (formData[key] !== user[key]) {
          modifiedData[key] = formData[key];
        }
      }
      // Verificar se há campos modificados antes de fazer a atualização
      if (Object.keys(modifiedData).length === 0) {
        // Se não houver campos modificados, não há necessidade de fazer uma chamada à API
        return;
      }
      const success = await userService.update(user.id, modifiedData);
      if (success) {
        // Atualiza os dados do usuário após a atualização bem-sucedida
        const updatedUserData = await authService.me();
        console.log(updatedUserData.data);
        showAlertWithTimer("sucess", updatedUserData.message);

        setUser(updatedUserData);
      }
    } catch (error) {
      console.error(error.data);

      showAlertWithTimer("danger", error);

      setError("Erro ao atualizar o usuário. Por favor, tente novamente.");
    }
  };

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
          <Col md={4}>
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

                <Form>
                  <Form.Group controlId="formAvatar">
                    <div className="avatar-container d-flex justify-content-center">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview Avatar"
                          className="avatar"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : user && user.avatar ? (
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
                      ) : (
                        <img
                          src={
                            user.avatar
                              ? `${storageUrl}/${user.avatar}`
                              : "/images/loadingimage.gif"
                          }
                          alt="Default Avatar"
                          className="avatar"
                          style={{
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </div>
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="secondary"
                      className="w-100 mt-4"
                      onClick={() =>
                        document.getElementById("avatarInput").click()
                      }
                    >
                      Alterar Foto{" "}
                    </Button>
                  </Form.Group>

                  <Form.Group controlId="formFirstName" className="mt-4">
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formLastName" className="mt-4">
                    <Form.Control
                      type="text"
                      placeholder="Sobrenome"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone" className="mt-4">
                    <Form.Control
                      type="text"
                      placeholder="Telefone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formCPF" className="mt-4">
                    <Form.Control
                      type="text"
                      placeholder="CPF"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBirthdate" className="mt-4">
                    <Form.Control
                      type="date"
                      placeholder="Data de nascimento"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="m-4"
                    onClick={handleSubmit}
                  >
                    Salvar Alterações
                  </Button>
                </Form>
                {/* Exibir o alerta com temporizador */}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8}>
            <Card>
              <Card.Body>
                <p className="text-center mt-4 h2">INFORMAÇÕES EXTRA</p>
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
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="formGender" className="mt-4">
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                      </Form.Control>
                    </Form.Group>{" "}
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formOccupation" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Ocupação"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>{" "}
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formFavoriteArtist" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Artista favorito"
                        name="favorite_artist"
                        value={formData.favorite_artist}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>{" "}
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formFavoriteGenre" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Gênero favorito"
                        name="favorite_genre"
                        value={formData.favorite_genre}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>{" "}
                  </Col>
                </Row>
                <Row></Row>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formAddress" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Endereço"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formCity" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Cidade"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId="formUf" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="UF"
                        name="uf"
                        value={formData.uf}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="formPostalCode" className="mt-4">
                      <Form.Control
                        type="text"
                        placeholder="CEP"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formAbout" className="mt-4">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Sobre"
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  {/* Adicione mais dois campos de formulário semelhantes aqui */}
                </Row>

                <Button
                  variant="primary"
                  className="m-4"
                  onClick={handleSubmit}
                >
                  Salvar Alterações
                </Button>
                <Link to="/password" className="btn bg-info m-4">
                  Alterar senha
                </Link>
                {/* Exibir o alerta com temporizador */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileEditPage;

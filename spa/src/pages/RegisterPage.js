import React, { Component } from "react";
import authService from "../services/AuthService";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
      showAlert: false,
      alertType: "success",
      alertMessage: "",
      timerId: null, // Adicione o ID do temporizador ao estado
    };
  }

  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  };

  onChangeUserEmail = (e) => {
    this.setState({ userEmail: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { firstName, userEmail, password } = this.state;

    try {
      const registrationResponse = await authService.register({
        first_name: firstName,
        email: userEmail,
        password: password,
      });

      const modalMessage =
        registrationResponse?.data?.message || "Registro bem-sucedido";

      this.setState({
        showAlert: true,
        alertMessage: modalMessage,
        alertType: "success",
      });

      // Iniciar temporizador para ocultar o alerta após 5 segundos
      const timerId = setTimeout(() => {
        this.setState({ showAlert: false });
      }, 5000); // 5000 milissegundos = 5 segundos

      // Salvar o ID do temporizador no estado
      this.setState({ timerId: timerId });
    } catch (error) {
      let modalMessage = "Erro durante o registro. Por favor, tente novamente.";
      let errorMessages = [];

      if (error.email || error.first_name || error.password) {
        if (error.email) {
          errorMessages.push(error.email[0]);
        }
        if (error.first_name) {
          errorMessages.push(error.first_name[0]);
        }
        if (error.password) {
          errorMessages.push(error.password[0]);
        }

        if (errorMessages.length > 0) {
          modalMessage = errorMessages.join("<br>");
        }
      }

      this.setState({
        showAlert: true,
        alertMessage: modalMessage,
        alertType: "danger",
      });
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <Card>
              <Card.Body>
                <div className="text-center">
                  {" "}
                  {/* Div para centralizar o conteúdo */}
                  <img
                    src="/images/loadingimage.gif"
                    alt="Logo"
                    className="logo rounded-circle img-thumbnail"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                <Card.Title>Cadastrar-se</Card.Title>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      onChange={this.onChangeFirstName}
                      value={this.state.firstName}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Insira o Email"
                      onChange={this.onChangeUserEmail}
                      value={this.state.userEmail}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Insira a Senha"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirme a Senha"
                      onChange={this.onChangeConfirmPassword}
                      value={this.state.confirmPassword}
                    />
                  </Form.Group>
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                  <p className="forgot-password text-right">
                    Já está registrado? <a href="/login">Entrar</a>
                  </p>
                  <p className="forgot-password text-right">
                    Esqueceu a senha?{" "}
                    <a href="/password-email">Recuperar senha</a>
                  </p>
                </Form>
                <Alert
                  show={this.state.showAlert}
                  variant={this.state.alertType}
                  onClose={() => {
                    clearTimeout(this.state.timerId); // Limpar temporizador ao fechar manualmente
                    this.setState({ showAlert: false });
                  }}
                  dismissible
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.alertMessage,
                    }}
                  />
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterPage;

import React, { Component } from "react";
import authService from "../services/AuthService";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

class PasswordEmailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showAlert: false,
      alertType: "success",
      alertMessage: "",
      loading: false,
      showPasswordResetForm: false,
      code: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmitEmail = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      await authService.passwordEmail(this.state.email);
      this.setState({
        showAlert: true,
        alertType: "success",
        alertMessage:
          "Email enviado com sucesso. Verifique sua caixa de entrada.",
        showPasswordResetForm: true,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage:
          "Erro ao enviar o email de recuperação. Por favor, tente novamente.",
        loading: false,
      });
    }
  };

  onChangeCode = (e) => {
    this.setState({ code: e.target.value });
  };

  onChangeNewPassword = (e) => {
    this.setState({ newPassword: e.target.value });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onSubmitResetPassword = async (e) => {
    e.preventDefault();
    const { code, newPassword, confirmPassword } = this.state;

    try {
      const email = this.state.email;
      await authService.passwordReset(
        email,
        code,
        newPassword,
        confirmPassword
      );
      this.setState({
        showAlert: true,
        alertType: "success",
        alertMessage: "Senha redefinida com sucesso.",
        showPasswordResetForm: false,
        code: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage:
          "Erro ao redefinir a senha. Por favor, verifique o código e tente novamente.",
      });
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center mt-1">
          <Col md={6}>
            <Card>
              <Card.Body>
                <div className="text-center">
                  <img
                    src="/images/loadingimage.gif"
                    alt="Logo"
                    className="logo rounded-circle img-thumbnail m-2"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                {!this.state.showPasswordResetForm ? (
                  <Form onSubmit={this.onSubmitEmail}>
                    <Card.Title className="text-center">Recuperar senha</Card.Title>
                    <Form.Group className="m-3">
                      <Form.Control
                        type="email"
                        placeholder="Insira o email"
                        onChange={this.onChangeEmail}
                        value={this.state.email}
                        required
                      />
                    </Form.Group>
                    <Button
                    className="m-3"
                      variant="primary"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      {this.state.loading
                        ? "Enviando..."
                        : "Enviar Código de Recuperação"}
                        
                    </Button>
                    <p className="forgot-password text-right">
                      Já está registrado? <Link to="/login">Entrar</Link>
                    </p>
                    <p className="forgot-password text-right">
                      Não tem uma conta?{" "}
                      <Link to="/register">Novo cadastro</Link>
                    </p>
                  </Form>
                ) : (
                  <Form onSubmit={this.onSubmitResetPassword}>
                    <h3>Redefinir Senha</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Código de Verificação</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira o código"
                        onChange={this.onChangeCode}
                        value={this.state.code}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nova Senha</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Digite a nova senha"
                        onChange={this.onChangeNewPassword}
                        value={this.state.newPassword}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirme a Nova Senha</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirme a nova senha"
                        onChange={this.onChangeConfirmPassword}
                        value={this.state.confirmPassword}
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? "Enviando..." : "Redefinir Senha"}
                    </Button>
                    <p className="forgot-password text-right">
                      Não tenho cadastro: <Link to="/register">Cadastro</Link>
                    </p>
                  </Form>
                )}
                <Alert
                  show={this.state.showAlert}
                  variant={this.state.alertType}
                  onClose={() => this.setState({ showAlert: false })}
                  dismissible
                >
                  <Alert.Heading>
                    {this.state.alertType === "success" ? "Sucesso" : "Erro"}
                  </Alert.Heading>
                  <p>{this.state.alertMessage}</p>
                  {!this.state.showPasswordResetForm ? (
                    <p className="forgot-password text-right">
                      Agora que recuperou sua senha. Faça login:{" "}
                      <Link to="/login">Fazer login</Link>
                    </p>
                  ) : null}
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PasswordEmailPage;

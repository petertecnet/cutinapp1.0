import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavlogComponent from '../components/NavlogComponent';
import AlertModalComponent from '../components/AlertModalComponent';
import ButtonComponent from '../components/ButtonComponent';
import authService from '../services/AuthService'; 
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const SettingPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.me();
        setFormData({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.updateSettings(formData);
      setAlertMessage('Configurações atualizadas com sucesso!');
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setAlertMessage('Ocorreu um erro ao atualizar as configurações.');
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <NavlogComponent />
      <Container>
        <h1 className="text-center">Configurações</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control type="text" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </Col>
                  </Row>
                  <ButtonComponent type="submit" className="btn-primary m-2">Salvar Alterações</ButtonComponent>
                  <Link to="/password" className="btn btn-info m-2">Alterar senha</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AlertModalComponent show={showAlert} onHide={handleAlertClose} type="success" message={alertMessage} />
    </div>
  );
};

export default SettingPage;

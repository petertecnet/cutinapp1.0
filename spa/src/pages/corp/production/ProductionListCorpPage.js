import React, { useState, useEffect } from "react"; // Adicionando importação dos hooks
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import productionService from "../../../services/ProductionService";
import NavlogComponent from "../../../components/NavlogComponent";
import { storageUrl } from "../../../config";
import authService from "../../../services/AuthService";
import userService from "../../../services/UserService";

const ProductionListCorpPage = () => {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductionId, setSelectedProductionId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const fetchProductions = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.me();
      console.log(userData.user_name);
      const response = await userService.view(userData.user_name);
      if (response.user && response.user.productions) {
        // Verifica se response.user e response.user.productions não são undefined
        setProductions(response.user.productions);
      } else {
        setError("Nenhuma produção encontrada para este usuário.");
      }
    } catch (error) {
      console.log(error);
      setError("Erro ao buscar as produções do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  const handleDeleteProduction = async (id) => {
    try {
      await productionService.delete(id);
      fetchProductions();
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedProductionId(null);
  };

  const handleShowConfirmModal = (id) => {
    setSelectedProductionId(id);
    setShowConfirmModal(true);
  };

  return (
    <>
      <NavlogComponent />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12} className="mt-5">
            <Card className="mt-5">
              <Card.Body>
                <Card.Title>Suas produções</Card.Title>
                <Row>
          {productions.map((production) => (
            <Col key={production.id} md={12}>
              <Card>
              <Link
                      to={`/production/view/${production.slug}`}
                      style={{ textDecoration: "none", color: "white",  textTransform: "uppercase"  }}
                    >
                <Card.Title className="text-center bg-black  rounded-5 p-4">
                  {production.name}
                </Card.Title></Link>

                <Row>
                  <Col md={4}>
                    <Link
                      to={`/production/view/${production.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        variant="top"
                        src={`${storageUrl}/${production.logo}`}
                        className="rounded-circle"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={8}>
                    
                    <Card.Body>
                      <Button variant="info" size="sm" className="m-1">
                        <Link
                          to={`/production/update/${production.id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="m-1"
                        onClick={() => handleShowConfirmModal(production.id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}

        </Row>
                {loading && <p>Loading...</p>}
                {error && <Alert variant="danger">{error}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Link to="/production/create">
          <Button
            variant="primary"
            disabled={loading}
            style={{
              position: "fixed",
              bottom: "50px",
              right: "20px",
              zIndex: "1000",
            }}
          >
            {loading ? "Loading..." : "Add"}
          </Button>
        </Link>
      </Container>

      <Modal
        className="text-dark"
        show={showConfirmModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja excluir essa produção? Isso será irreversível.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteProduction(selectedProductionId);
              handleCloseModal();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        variant="success"
        show={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        dismissible
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: "1050",
        }}
      >
        Produção deletada com sucesso
      </Alert>

      <Alert
        variant="danger"
        show={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        dismissible
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: "1050",
        }}
      >
        Não foi possível deletar produção
      </Alert>
    </>
  );
};

export default ProductionListCorpPage;

import React, { useState, useEffect } from "react"; // Adicionando importação dos hooks
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
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
                <Table
                  striped
                  bordered
                  hover
                  className="table-dark text-white rounded"
                >
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Produção</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productions.map((production) => (
                      <tr key={production.id}>
                        <td className="text-center">
                          <Link
                            to={`/production/view/${production.slug}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <img
                              src={
                                production.logo
                                  ? `${storageUrl}/${production.logo}`
                                  : "/images/loadingimage.gif"
                              }
                              alt="User Avatar"
                              className="avatar"
                              style={{ maxWidth: "50px", borderRadius: "50%" }}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/production/view/${production.slug}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {production.name}
                          </Link>
                        </td>
                        <td>
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
                            onClick={() =>
                              handleShowConfirmModal(production.id)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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

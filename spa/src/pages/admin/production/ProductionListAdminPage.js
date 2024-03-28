import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import productionService from "../../../services/ProductionService";
import NavlogComponent from "../../../components/NavlogComponent";
import { storageUrl } from "../../../config";

const ProductionListAdminPage = () => {
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
      const fetchedProductions = await productionService.list();
      setProductions(fetchedProductions);
    } catch (error) {
      console.error("Error fetching productions:", error);
      setError("Error fetching productions. Please try again.");
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
      console.error("Error deleting production:", error);
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
                <Card.Title>Lista de produções</Card.Title>
                <Table striped bordered hover className="table-dark text-white rounded">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Produção</th>
                      <th>Produtor</th>
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
                            ><img
                            src={
                              production.logo
                                ? `${storageUrl}/${production.logo}`
                                : "/images/loadingimage.gif"
                            }
                            alt="User Avatar"
                            className="avatar "
                            style={{ maxWidth: "50px", borderRadius: "50%" }}
                          /></Link>
                        </td>
                        <td>  <Link
                              to={`/production/view/${production.slug}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >{production.name}</Link></td>
                        <td>    <Link
                    to={`/user/${production.user.user_name}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >   {production.user.avatar && (
                 
                  <img
                        src={`${storageUrl}/${production.user.avatar}`}
                        alt={`${production.user.first_name} Produtor da produção ${production.name} da Logo`}
                        className="rounded-circle m-2"
                        style={{ width: "50px", height: "50px" }}
                      />

                    )}{production.user.first_name}</Link> </td>
                        <td>
                          <Button variant="info" size="sm" className="m-1">
                            <Link
                              to={`/production/update/${production.id}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              Edit
                            </Link>
                          </Button>

                          <Button variant="danger" size="sm" className="m-1" onClick={() => handleShowConfirmModal(production.id)}>
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

      <Modal className="text-dark" show={showConfirmModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão </Modal.Title>
        </Modal.Header>
        <Modal.Body >Deseja excluir essa produção? Isso sera inrreversivel</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { handleDeleteProduction(selectedProductionId); handleCloseModal(); }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert variant="success" show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible style={{ position: "fixed", top: "10px", right: "10px", zIndex: "1050" }}>
       Produção deletada com sucesso
      </Alert>

      <Alert variant="danger" show={showErrorAlert} onClose={() => setShowErrorAlert(false)} dismissible style={{ position: "fixed", top: "10px", right: "10px", zIndex: "1050" }}>
        Nâo foi possivel deletar produção
      </Alert>
    </>
  );
};

export default ProductionListAdminPage;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card,  Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavlogComponent from "../../components/NavlogComponent";
import productionService from "../../services/ProductionService";
import { storageUrl } from "../../config";

const ProductionPage = () => {
  const [productions, setProductions] = useState([]);

  const [showAllSegments, setShowAllSegments] = useState({});

  const toggleSegments = (productionId) => {
    setShowAllSegments({
      ...showAllSegments,
      [productionId]: !showAllSegments[productionId],
    });
  };

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const fetchedProductions = await productionService.list();
        setProductions(fetchedProductions);
      } catch (error) {
        console.error("Error fetching productions:", error);
      }
    };

    fetchProductions();
  }, []);

  return (
    <div>
    <NavlogComponent />
      <Container>
      <Row>
  <p className="labeltitle h2 text-center text-uppercase">Produções</p>
  {productions.map((production) => (
    
    <Col key={production.id} md={4}>
   
      
   <Card className="card-production" >
                      <div
    className="background-image"
    style={{
      backgroundImage: `url('${storageUrl}/${production.background}')`,
    }}
  />
                    <Link
        to={`/production/${production.slug}`}
        style={{ textDecoration: "none" }}
      >  <Card.Img
                      variant="top"
                      src={`${storageUrl}/${production.logo}`}
                      className="rounded-circle img-logo-production"
                    />
                    </Link>
                    <Card.Body>
                      <Link
                        to={`/production/${production.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card.Title className="text-uppercase text-center labeltitle">
                          {production.name}
                        </Card.Title>
                      </Link>
                      <div className="d-flex flex-wrap justify-content-center">
                        {production.segments.slice(0, 3).map((segment, index) => (
                          <p key={index} className="seguiments text-center text-uppercase ">
                            {segment}
                          </p>
                        ))}
                        {production.segments.length > 3 && (
                  
                        <Button
                        variant="link"
                        onClick={() => toggleSegments(production.id)}
                        style={{ textDecoration: "none" }} // Removendo o sublinhado
                      >
                        <p className="seguiments text-center"> +</p>
                      </Button>
                      
                        )}
                      </div>
                      {/* Modal para mostrar todos os seguimentos */}
                      <Modal
                        show={showAllSegments[production.id]}
                        onHide={() => toggleSegments(production.id)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Seguimentos de {production.name}  </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {production.segments.map((segment, index) => (
                            <p key={index} className="seguiments text-center">
                              {segment}
                            </p>
                          ))}
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
    </Col>
  ))}
</Row>

      </Container>
    </div>
  );
};

export default ProductionPage;

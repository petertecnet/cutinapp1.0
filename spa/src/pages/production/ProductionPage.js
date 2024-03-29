import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavlogComponent from "../../components/NavlogComponent";
import productionService from "../../services/ProductionService";
import { storageUrl } from "../../config";

const ProductionPage = () => {
  const [productions, setProductions] = useState([]);

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
        <h1>Productions</h1>
        
          
        <Card>
        <Row>
          {productions.map((production) => (
            <Col key={production.id} md={4}>
              <Link
                to={`/production/view/${production.slug}`}
                style={{ textDecoration: "none" }}
              >
                 <Card>
                <Card.Img
                  variant="top"
                  src={`${storageUrl}/${production.logo}`}
                  className="rounded-circle"
                />
                <Card.Body>
                  <Card.Title>{production.name}</Card.Title>
                </Card.Body>
              </Card>
              </Link>
            </Col>
          ))}
        </Row>
          </Card>
      </Container>
    </div>
  );
};

export default ProductionPage;

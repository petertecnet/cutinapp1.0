import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavlogComponent from "../../components/NavlogComponent";
import productionService from "../../services/ProductionService";
import { storageUrl } from "../../config";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";

const ProductionViewPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const response = await productionService.view(slug);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching production:", error);
        setLoading(false);
      }
    };

    fetchProduction();
  }, [slug]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavlogComponent />
      <Container>
        <Row>
          <Col md={12}>
            <Card
              style={{
                backgroundImage: `url('${storageUrl}/${data.production.background}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              <Card className="card-production">
                <div className="text-center rounded img-production-logo align-right">
                  {data.production.logo && (
                    <img
                      src={`${storageUrl}/${data.production.logo}`}
                      alt="Preview da Logo"
                      className="img-fluid rounded-circle img-logo-production"
                    />
                  )}
                </div>
                <Card.Text className="text-center h1">
                  {data.production.name}
                </Card.Text>
                <Card.Text className="text-center">
                  {data.production.establishment_type}
                </Card.Text>
              {data.views}  Vizualizações
              </Card>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Text className="text-center">
                <a
                  href={data.production.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Google Maps
                </a>
              </Card.Text>
              <Card.Text>
                {data.production.city} {data.production.uf}
              </Card.Text>
              <Card.Text>{data.production.address}</Card.Text>
              <Card.Text>{data.production.instagram_url}</Card.Text>
              <Card.Text>{data.production.youtube_url}</Card.Text>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Text className="text-center">
                {data.production.description}
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>Outras Produções</h2>
          </Col>
          {data.productions.map((production) => (
            <Col md={4} key={production.id}>
              <Link
                to={`/production/view/${production.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={`${storageUrl}/${production.logo}`}
                  />
                  <Card.Body>
                    <Card.Title>{production.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductionViewPage;

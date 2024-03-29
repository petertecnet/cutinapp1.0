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
      {data.production.logo && (
        <img
          src={`${storageUrl}/${data.production.background}`}
          alt="Preview da Logo"
          className="img-fluid"
        />
      )}
      {data.production.logo && (
        <img
          src={`${storageUrl}/${data.production.logo}`}
          alt="Preview da Logo"
          className="img-fluid rounded-circle img-logo-production"
        />
      )}
      <Container>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Text className="text-center text-uppercase h1">
                {data.production.name}
              </Card.Text>
              <Card.Text className="text-center text-uppercase">
                {data.production.establishment_type} |
                <strong>
                  
                  {data.views} <i className="fa fa-eye" aria-hidden="true"></i>
                </strong>
                |
                <strong>
                  
                  {data.production.city} {data.production.uf}
                </strong>
              </Card.Text>
              <Card.Text className="text-center">
                <a
                  href={data.production.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-geo-alt btn btn-outline-light"></i>
                </a>
                <a
                  href={data.production.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-instagram m-2 btn btn-outline-light"></i>
                </a>
              </Card.Text>

              <Link
                to={`/user/${data.production.user.user_name}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rounded-circle m-2">
                  {data.production.user.avatar && (
                    <img
                      src={`${storageUrl}/${data.production.user.avatar}`}
                      alt={`${data.production.user.first_name} Produtor da produção ${data.production.name} da Logo`}
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </div>
              </Link>

              <Card.Text>
                <i className="bi bi-file-earmark-person  m-2 "></i>
                {data.production.user.first_name}
              </Card.Text>
              <Card.Text>
                <i className="bi bi-map m-2"></i>
                {data.production.address}
              </Card.Text>
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

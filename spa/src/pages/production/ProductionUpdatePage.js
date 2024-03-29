import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import productionService from "../../services/ProductionService";
import NavlogComponent from "../../components/NavlogComponent";
import cepService from "../../utils/cep";
import { Link, useParams } from "react-router-dom";
import { storageUrl } from "../../config";
import LoadingComponent from "../../components/LoadingComponent";

const ProductionUpdatePage = () => {
  const { id } = useParams(); // Obter o ID da produção da URL
  const [formData, setFormData] = useState({
    // Estado inicial dos dados do formulário
    name: "",
    phone: "",
    type: "",
    establishment_type: "",
    description: "",
    segments: [],
    city: "",
    location: "",
    cep: "",
    address: "",
    user_id: "",
    is_featured: false,
    is_published: false,
    is_approved: false,
    is_cancelled: false,
    additional_info: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
    other_information: "",
    ticket_price_min: 0,
    ticket_price_max: 0,
    total_tickets_sold: 0,
    total_tickets_available: 0,
    logo: null,
    background: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const production = await productionService.show(id); // Utilizar a função show para obter os detalhes da produção
        setFormData(production);
        // Set logo preview if logo exists
        if (production.logo) {
          setLogoPreview(`${storageUrl}/${production.logo}`);
        }
        if (production.background) {
          setBackgroundPreview(`${storageUrl}/${production.background}`);
        }
      } catch (error) {
        setError("Erro ao carregar informações da produção.");
      }
    };

    fetchProduction();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com a alteração do logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
    // Preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Função para lidar com a alteração do background
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      background: file,
    });
    // Preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await productionService.update(id, formData); // Chamar o método de atualização do serviço
      setSuccessMessage(response);
      setTimeout(() => setSuccessMessage(null), 5000); // Limpar a mensagem de sucesso após 5 segundos
    } catch (error) {
      setError("Erro ao atualizar a produção. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a alteração do CEP
  const handleCepChange = async (e) => {
    const cep = e.target.value;
    setFormData({ ...formData, cep });
    if (cep.length === 8) {
      try {
        const addressInfo = await cepService.getAddressInfo(cep);
        if (addressInfo) {
          setFormData({
            ...formData,
            uf: addressInfo.uf,
            city: addressInfo.cidade,
            address: `${addressInfo.logradouro} - ${addressInfo.bairro}`,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar informações do CEP:", error);
      }
    }
  };

  // Efeito para limpar mensagens de erro ou sucesso após 5 segundos
  useEffect(() => {
    let timer;
    if (error || successMessage) {
      timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [error, successMessage]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <NavlogComponent />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Card>
              <Form.Group controlId="formLogo">
                <div className="text-center p-5 bg-secondary rounded">
                  <label
                    htmlFor="logoInput"
                    style={{ cursor: "pointer", display: "block" }}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Preview da Logo"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    ) : (
                      <i className="fas fa-camera fa-3x img-fluid rounded-circle"></i>
                    )}
                  </label>
                  <Form.Control
                    id="logoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    style={{ display: "none" }}
                    required
                    className="mt-3"
                  />
                </div>
                <Form.Text className="text-white text-center mt-2">
                  Faça upload da logo da produção (Resolução recomendada :
                  300x300)
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Digite o nome da produção"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-3"
                />
              </Form.Group>
              <Form.Group controlId="formEstablishmentType">
                <Form.Control
                  as="select"
                  name="establishment_type"
                  value={formData.establishment_type                  }
                  onChange={handleInputChange}
                  required
                  className="mt-3"
                >
                  <option value="">Estabelecimento</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Bar">Bar</option>
                  <option value="Clube">Clube</option>
                  <option value="Café">Café</option>
                  <option value="Pub">Pub</option>
                  <option value="Lounge">Lounge</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Teatro">Teatro</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Sala de Concertos">Sala de Concertos</option>
                  <option value="Boate">Boate</option>
                  <option value="Academia">Academia</option>
                  <option value="Spa">Spa</option>
                  <option value="Padaria">Padaria</option>
                  <option value="Museu">Museu</option>
                  <option value="Galeria de Arte">Galeria de Arte</option>
                  <option value="Parque">Parque</option>
                  <option value="Praia">Praia</option>
                  <option value="Piscina">Piscina</option>
                  <option value="Cassino">Cassino</option>
                  <option value="Boliche">Boliche</option>
                  <option value="Sinuca">Sinuca</option>
                  <option value="Karaoke">Karaoke</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-3"
                />
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="URL Google Maps"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="mt-3"
                />
              </Form.Group>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formBackground">
                    <div className="text-center p-5 bg-secondary ">
                      <label
                        htmlFor="BackgroundInput"
                        style={{ cursor: "pointer", display: "block" }}
                      >
                        {backgroundPreview ? (
                          <img
                            src={backgroundPreview}
                            alt="Preview da Background"
                            className="img-fluid"
                            style={{ maxWidth: "100%", height: "auto" }} 
                          />
                        ) : (
                          <i className="fas fa-camera fa-3x"></i>
                        )}
                      </label>
                      <Form.Control
                        id="BackgroundInput"
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundChange}
                        style={{ display: "none" }}
                        required
                        className="mt-3"
                      />
                    </div>
                    <Form.Text className="text-white text-center mt-2">
                      Selecione uma imagem de fundo (Resolução recomendada:
                      1920x1080)
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formCEP">
                    <Form.Control
                      type="text"
                      name="cep"
                      placeholder="Digite o CEP"
                      value={formData.cep}
                      onChange={handleCepChange}
                      required
                      className="mt-3"
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="formUf">
                    <Form.Control
                      as="select"
                      name="uf"
                      value={formData.uf}
                      onChange={handleInputChange}
                      required
                      className="mt-3"
                    >
                      <option value="">UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formCity">
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Digite a cidade"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-3"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formAddress">
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Digite o endereço"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-3"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-2">
                  <Form.Control
                    type="text"
                    name="facebook_url"
                    placeholder="URL do Facebook"
                    value={formData.facebook_url}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} className="mt-2">
                  <Form.Control
                    type="text"
                    name="twitter_url"
                    placeholder="URL do Twitter"
                    value={formData.twitter_url}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} className="mt-2">
                  <Form.Control
                    type="text"
                    name="instagram_url"
                    placeholder="URL do Instagram"
                    value={formData.instagram_url}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} className="mt-2">
                  <Form.Control
                    type="text"name="youtube_url"
                    placeholder="URL do YouTube"
                    value={formData.youtube_url}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                {/* Descrição */}
                <Col md={12} className="mt-2">
                  <Form.Group controlId="formDescription">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Digite a descrição da produção"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="mt-4 btn-lg"
                onClick={handleSubmit}
              >
                {loading ? "Carregando..." : "Salvar"}
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage(null)}
          dismissible
          style={{
            position: "fixed",
            top: "150px",
            right: "10px",
            zIndex: "1050",
          }}
        >
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
          style={{
            position: "fixed",
            top: "150px",
            right: "10px",
            zIndex: "1050",
          }}
        >
          {error}
        </Alert>
      )}
      <Link to={`/production/list`}>
        <Button
          variant="secondary"
          disabled={loading}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "100px",
            zIndex: "1000",
          }}
        >
          {loading ? "Carregando..." : "Voltar"}
        </Button>
      </Link>
    </>
  );
};

export default ProductionUpdatePage;

                   


import axios from "axios";
import { apiBaseUrl } from "../config";

const apiServiceUrl = "production";

const productionService = {
  getToken: () => localStorage.getItem("token"),

  // Função para criar uma nova produção
  store: async (formData) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/${apiServiceUrl}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Define o tipo de conteúdo como multipart/form-data para enviar arquivos
            Authorization: `Bearer ${productionService.getToken()}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },

  // Função para obter a lista de produções cadastradas
  list: async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/${apiServiceUrl}`, {
        headers: {
          Authorization: `Bearer ${productionService.getToken()}`,
        },
      });
      return response.data.productions;
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },

  update: async (productionId, formData) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/${apiServiceUrl}/${productionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Define o tipo de conteúdo como multipart/form-data para enviar arquivos
            Authorization: `Bearer ${productionService.getToken()}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },

  show: async (productionId) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/${apiServiceUrl}/${productionId}`,
        {
          headers: {
            Authorization: `Bearer ${productionService.getToken()}`,
          },
        }
      );
      return response.data.production; // Retornar os detalhes da produção
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },
  view: async (slug) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/${apiServiceUrl}/view/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${productionService.getToken()}`,
          },
        }
      );
      return response; // Retorna o JSON com os detalhes da produção
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },

  delete: async (productionId) => {
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/${apiServiceUrl}/${productionId}`,
        {
          headers: {
          Authorization: `Bearer ${productionService.getToken()}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        return error.response.data.error;
      } else {
        return "Erro ao se conectar ao servidor.";
      }
    }
  },
};

export default productionService;

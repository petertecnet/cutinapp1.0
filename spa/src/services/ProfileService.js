import axios from "axios";
import { apiBaseUrl } from "../config";

const apiServiceUrl = "profile";

const profileService = {
  getToken: () => localStorage.getItem("token"),

  index: async () => {
    try {
      const token = profileService.getToken();

      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${apiBaseUrl}/${apiServiceUrl}`, {
        headers,
      });

      return response.data.profiles;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter a lista de perfis.");
    }
  },

  show: async (id) => {
    try {
      const token = profileService.getToken();

      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${apiBaseUrl}/${apiServiceUrl}/${id}`, {
        headers,
      });

      return response.data.profile;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter o perfil.");
    }
  },

  update: async (id, data) => {
    try {
      const token = profileService.getToken();

      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${apiBaseUrl}/${apiServiceUrl}/${id}`,
        data,
        { headers }
      );

      return response.data.profile;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o perfil.");
    }
  },

  delete: async (id) => {
    try {
      const token = profileService.getToken();

      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`${apiBaseUrl}/${apiServiceUrl}/${id}`, {
        headers,
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir o perfil.");
    }
  },

  create: async (data) => {
    try {
      const token = profileService.getToken();

      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${apiBaseUrl}/${apiServiceUrl}`, data, {
        headers,
      });

      return response.data.profile;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar o perfil.");
    }
  },
};

export default profileService;

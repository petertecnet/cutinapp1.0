import axios from "axios";
import { apiBaseUrl } from "../config";

const apiServiceUrl = "user";

const userService = {
  getToken: () => localStorage.getItem("token"),

  update: async (userId, userData) => {
    try {
      const token = userService.getToken();
      
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${apiBaseUrl}/${apiServiceUrl}/${userId}`,
        userData,
        { headers }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          "Erro ao atualizar o usuário. Por favor, tente novamente."
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        "Erro ao atualizar o usuário. Por favor, tente novamente."
      );
    }
  },
};

export default userService;

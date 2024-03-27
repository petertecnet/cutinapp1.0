import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const CityInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`API_ENDPOINT?query=${query}`);
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setIsLoading(false);
  };

  return (
    <AsyncTypeahead
      id="city-typeahead"
      isLoading={isLoading}
      labelKey={(option) => `${option.city}-${option.uf}`}
      onSearch={handleSearch}
      options={options}
      placeholder="Digite o nome da cidade"
    />
  );
};

export default CityInput;

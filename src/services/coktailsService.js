import http from "../services/httpService";
import config from "../config.json";

const param = "/cocktails.php";

export function getCocktails() {
  return http.get(config.apiEndpoint + param);
}

export function getCocktailsById(id) {
  return http.get(config.apiEndpoint + param + "/" + id);
}
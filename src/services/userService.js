import http from "../services/httpService";
import config from "../config.json";

const param = "users.php";

export function register(data) {
  return http.post(config.apiEndpoint + param, data);
}

export function getUsers(){
  return http.get(config.apiEndpoint + param);
}

export function deleteUser(id){
  return http.delete(config.apiEndpoint + param + '/' + id);
}
import axios from 'axios'
import { utilFunctionService } from "@/utils/utils.service"
// const SERVER_URL = process.env.APP_URL
// const V1_VERSION = process.env.V1_VERSION
const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export default {

  async execute(method, resource, data, config) {
    let accessToken = utilFunctionService.getAuthToken();
    return instance({
      method: 'POST',
      url: resource,
      data,
      headers: {
        Authorization: `${accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, X-Auth-Token"
      },
      ...config
    })
  },
  async executeFormData(method, resource, data, config) {
    let accessToken = utilFunctionService.getAuthToken();

    return instance({
      method: method,
      url: resource,
      data,
      headers: {
        Authorization: `${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      ...config
    })
  },

  loginRegisterUser(email_or_phone) {
    let _result = this.execute('POST', '/api/v1/registrations', { email_or_phone })
    const result = JSON.stringify(_result["data"])
    utilFunctionService.setLocalStorageService("user", result)
    return _result
  }
}

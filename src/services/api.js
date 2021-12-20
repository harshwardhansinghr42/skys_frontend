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
      method: method,
      url: resource,
      data,
      headers: {
        AuthenticationToken: `${accessToken}`,
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
        AuthenticationToken: `${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      ...config
    })
  },

  loginRegisterUser(email_or_phone) {
    return this.execute('POST', '/api/v1/registrations', { email_or_phone })
  },

  verifyOtp(otp){
    let user = utilFunctionService.getLocalStorageService('user')
    let params = {
      otp: otp
    }
    return this.execute('POST', '/api/v1/users/'+ user.id +'/otp_verifications', params)
  },

  fetchStates(){
    return this.execute('GET', '/api/v1/states')
  },

  fetchCities(state_code){
    return this.execute('GET', '/api/v1/cities?state_code='+state_code)
  },

  buySubscription(form_params){
    let user = utilFunctionService.getLocalStorageService('user')
    return this.execute('POST', '/api/v1/users/'+ user.id +'/razorpay_orders', form_params)
  },

  savePaymentSuccessResponse(database_order_id, form_params){
    return this.execute('POST', '/api/v1/razorpay_orders/'+ database_order_id +'/payment_successes', form_params)
  },

  fetchOrders(){
    let user = utilFunctionService.getLocalStorageService('user')
    return this.execute('GET', '/api/v1/users/'+ user.id +'/razorpay_orders')
  },

  fetchSubscriptionAmount(){
    return this.execute('GET', '/api/v1/subscriptions')
  }
}

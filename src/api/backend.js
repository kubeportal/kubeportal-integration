import axios from 'axios'
import to from 'await-to-js'
import store from '../store.js'

function canReadURLFromEnv () {
  return !!process.env['VUE_APP_BASE_URL']
}

function canReadTokenFromVuex (item) {
  return !!store.getters[`api/${item}`]
}

function setAuthorizationHeader () {
  return canReadTokenFromVuex('access_token') ? `Bearer ${store.getters['users/access_token']}` : undefined
}

function setCSRFToken () {
  return canReadTokenFromVuex('csrf_token') ? store.getters['api/get_csrf_token'] : undefined
}

export function setBaseURLWithDefaultOrEnvValue () {
  const defaultUrl = 'http://127.0.0.1:8000/api'
  const baseUrl = canReadURLFromEnv() ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  const API_VERSION = 'v1.4.0'
  return `${baseUrl}/${API_VERSION}`
}

let config = {
  baseURL: setBaseURLWithDefaultOrEnvValue(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

export let axiosInstance = axios.create(config)
export let precall = axios.create(config) // only used for the initial request

export async function read (collection) {
  if(collection === '/api/') {
    precall.defaults.baseURL = 'http://localhost:8000'
    let error, response
    [error, response] = await to(precall.get(collection))
    response === undefined ? console.log(error.message) : console.log(response)
    return response
  }
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.get(collection))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function readByField (collection, field) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.get(`${collection}/${field}/`))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function readByIDAndResource (collection, id, resource) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.get(`${collection}/${id}/${resource}/`))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function create (collection, payload) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.post(collection, payload))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function updateById (collection, id, payload) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await axiosInstance.patch(`${collection}/${id}`, payload)
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

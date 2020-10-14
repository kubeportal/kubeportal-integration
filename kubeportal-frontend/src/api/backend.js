import axios from 'axios'
import to from 'await-to-js'
import store from '../store.js'

function canReadURLFromEnv () {
  return !!process.env['VUE_APP_BASE_URL']
}

function readTokenFromVuex (item) {
  return store.getters[`api/get_${item}`]
}

function setAuthorizationHeader () {
  let tmp = readTokenFromVuex('access_token')
  // eslint-disable-next-line
  return !!tmp ? 'Bearer ' + tmp : undefined
}

function setCSRFToken () {
  return readTokenFromVuex('csrf_token')
}

export function setBaseURLWithDefaultOrEnvValue () {
  const defaultUrl = 'http://127.0.0.1:8000/api'
  const baseUrl = canReadURLFromEnv() ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  const API_VERSION = 'v1.4.0'
  console.log(`${baseUrl}/${API_VERSION}`)
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

export async function read (relative_path) {
  if(relative_path === '/api/') {
    precall.defaults.baseURL = 'http://localhost:8000'
    let error, response
    [error, response] = await to(precall.get(relative_path))
    response === undefined ? console.log(error.message) : console.log(response)
    return response
  }
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.get(relative_path))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function create (relative_path, payload) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.post(relative_path, payload))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function update (relative_path, payload) {
  axiosInstance.defaults.headers['Authorization'] = setAuthorizationHeader()
  axiosInstance.defaults.headers['X-CSRFToken'] = setCSRFToken()
  let error, response
  [error, response] = await to(axiosInstance.patch(relative_path, payload))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

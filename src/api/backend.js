import axios from 'axios'
import to from 'await-to-js'

function canReadURLFromEnv () {
  return !!process.env['VUE_APP_BASE_URL']
}

function canReadTokenFromLocalStorage (item) {
  return !!localStorage.getItem(item)
}

function setAuthorizationHeader () {
  return canReadTokenFromLocalStorage('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : undefined
}

function setCSRFToken () {
  return canReadTokenFromLocalStorage('csrf_token') ? localStorage.getItem('csrf_token') : undefined
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
  [error, response] = await axiosInstance.patch(relative_path, payload)
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

import axios from 'axios'
import to from 'await-to-js'
import * as user_store from './users'

const API_BASE_URL = setBaseURLWithDefaultOrEnvValue()

function canReadURLFromEnv () {
  return !!process.env['VUE_APP_BASE_URL']
}

export function setBaseURLWithDefaultOrEnvValue () {
  const API_VERSION = 'v1.3.0'
  const defaultUrl = 'http://127.0.0.1:8000/api'
  const baseUrl = canReadURLFromEnv() ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  return `${baseUrl}/${API_VERSION}`
}

const config = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  Authorization:  `Bearer ${user_store.default.module.getters['users/get_user_token']}`
}

export const axiosInstance = axios.create(config)

export async function read (collection) {
  console.log(axiosInstance.defaults.headers.common['Authorization'])
  let error, response
  [error, response] = await to(axiosInstance.get(collection))
  error ? console.log(error) : console.log(response)
  return response
}

export async function readByField (collection, id) {
  let error, response
  [error, response] = await to(axiosInstance.get(`${collection}/${id}`))
  error ? console.log(error) : console.log(response)
  return response
}

export async function readByFieldRessource (collection, id, ressource) {
  let error, response
  [error, response] = await to(axiosInstance.get(`${collection}/${id}/${ressource}`))
  error ? console.log(error) : console.log(response)
  return response
}

export async function create (collection, payload) {
  if(collection === 'login') {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
  let error, response
  [error, response] = await to(axiosInstance.post(collection, payload))
  error ? console.log(error) : console.log(response)
  return response
}

export async function updateById (collection, payload) {
  let error, response
  [error, response] = await axiosInstance.patch(collection, payload)
  error ? console.log(error) : console.log(response)
  return response
}

import axios from 'axios'

const API_BASE_URL = setBaseURLWithDefaultOrEnvValue()

function canReadURLFromEnv () {
  return !!process.env['VUE_APP_BASE_URL']
}

export function setBaseURLWithDefaultOrEnvValue () {
  const API_VERSION = 'v1.3.0'
  const defaultUrl = 'http://127.0.0.1:8000/api'
  const baseUrl = canReadURLFromEnv() ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  console.log(`${baseUrl}/${API_VERSION}`)
  return `${baseUrl}/${API_VERSION}`
}

const config = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const axiosInstance = axios.create(config)

export async function read (collection, token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  try {
    const response = await axiosInstance.get(collection)
    console.log(`READ ${collection}`)
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function readByField (collection, id, token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  try {
    const response = await axiosInstance.get(`${collection}/${id}`)
    console.log(`READ ${collection}/${id}`)
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function readByFieldRessource (collection, id, ressource, token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  try {
    const response = await axiosInstance.get(`${collection}/${id}/${ressource}`)
    return response
  } catch (e) {
    console.log(e)
  }
}

export async function create (collection, payload, token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axiosInstance.post(collection, payload)
  console.log(response)
  return response
}

export async function updateById (collection, payload, token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axiosInstance.patch(collection, payload)
  console.log(response)
  return response
}

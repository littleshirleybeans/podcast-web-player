import axios from 'axios'

// const baseUrl = 'http://localhost:3001's
const baseUrl = '/api/pod'

const getPodcasts = async (keyword) => {
  const request = axios.get(baseUrl + `/search/${keyword}`)
  const response = await request
  return response.data
}

const getEpisodes = async (id) => {
  const request = axios.get(baseUrl + `/podcast/${id}`)
  const response = await request
  return response.data
}

const getPopularPods = async (code) => {
  const request = axios.get(baseUrl + `/${code}`)
  const response = await request
  return response.data
}

const getLatestReleaseDate = async (idArr) => {
  const request = axios.all(idArr.map(id => axios.get(baseUrl + `/updates/${id}`)))
  const response = await request
  return response.map(r => r.data)
}

const getPodDesc = async (id) => {
  const request = axios.get(baseUrl + `/podcast/${id}/desc`)
  const response = await request
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPodcasts,
  getEpisodes,
  getPopularPods,
  getLatestReleaseDate,
  getPodDesc
}
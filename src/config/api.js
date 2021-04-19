/**
 * @Date:   2021-03-16T09:15:40+00:00
 * @Last modified time: 2021-04-19T15:25:18+01:00
 */
import axios from 'axios'

export default axios.create({
  baseURL: 'https://college-api-jodie.herokuapp.com/api'
})

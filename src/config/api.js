/**
 * @Date:   2021-03-16T09:15:40+00:00
 * @Last modified time: 2021-03-16T09:20:40+00:00
 */
import axios from 'axios'

export default axios.create({
  baseURL: 'http://college.api:8000/api'
})

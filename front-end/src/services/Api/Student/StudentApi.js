import { axiosClient } from "../../../../api/axios.jsx"

const StudentApi = {
   create: async (payload) => {
     return await axiosClient.post('/admin/students', payload)
   },
   update: async (id, payload) => {
     return await axiosClient.put(`/admin/students/${id}`, {...payload, id})
   },
   delete: async (id) => {
     return await axiosClient.delete(`/admin/students/${id}`)
   },
   index: async () => {
     return await axiosClient.get('/admin/students')
   },
 }
 export default StudentApi
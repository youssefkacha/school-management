import { axiosClient } from "../../../api/axios"

const   ParentApi={
    create:async(payload)=>{
        return await axiosClient.post('/admin/parents',payload)
     },
     index:async(columns=[])=>{
      return await axiosClient.get('/admin/parents',{
         params:{
            columns: columns
         }
      })
   },
   delete:async(id)=>{
      return await axiosClient.delete(`/admin/parents/${id}`)
   },
    
   update:async(id,payload)=>{
      return await axiosClient.put(`/admin/parents/${id}`,{...payload,id})
   },
}

export default ParentApi
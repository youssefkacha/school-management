import { axiosClient } from "../../../api/axios"

const UserApi={
getCsrfToken:async ()=>{
    return await axiosClient.get('/sanctum/csrf-cookie',{
        baseURL:import.meta.env.VITE_BACKEND_URL
      })
},
login:async(email,password)=>{
   return await axiosClient.post('/login',{email,password})
//    .then((value)=>{
//         if(value.status===204)
//           {
//             window.localStorage.setItem("ACCESS_TOKEN",'test')
//               navigate(STUDENT_DASHBORD_ROUTE)
//           }
//       }).catch((reason)=>{
       
//           console.log(reason.response.data.errors)
//           
        
//       })
},
logout:async()=>{
    return await axiosClient.post('/logout')
}
,
getUser:async()=>{
    return await  axiosClient.get('/me')
}
}

export default UserApi
 
import { z } from "zod"
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {zodResolver} from '@hookform/resolvers/zod'
import {Loader, LoaderCircle, WaypointsIcon} from 'lucide-react'
const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(50),
})
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { axiosClient } from "../../../api/axios"
import { ADMIN_DASHBORD_ROUTE, PARENT_DASHBOARD_ROUTE, redirectToDashboard, STUDENT_DASHBORD_ROUTE, TEACHER_DASHBORD_ROUTE } from "../../router"
import { useUsercontext } from "../../context/StudentContext"


export default function UserLogin()
{
  const navigate=useNavigate()
 // 1. Define your form.
 const {login,setAuthenticated,setToken}=useUsercontext()
//  const context=useUsercontext()
 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email:'youssef@kacha.com',
        password:'123456789'
    }
   
  })
 
  // 2. Define a submit handler.
  
  const onSubmit= async values => {
       await login(values.email,values.password).then(({data,status})=>{
        if(status===200)
        {
           setAuthenticated(true)
           const {role}=data.user
           setToken(data.token)
          //  const role=data.user.role
           console.log(role,data)
          navigate(redirectToDashboard(role))
        }
       }).catch((reason)=>{
        form.setError('email',{message:reason.response.data.errors.email.join()})
       })
        
  }
    return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type={"password"} placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>}Submit</Button>
      </form>
    </Form>
    </>
}
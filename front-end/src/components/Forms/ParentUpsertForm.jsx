 
import { object, setErrorMap, z } from "zod"
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {zodResolver} from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {InfoIcon, Loader, LoaderCircle, Phone, WaypointsIcon} from 'lucide-react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";
import {Textarea} from "../ui/textarea.jsx";
import { ToastAction } from "@/components/ui/toast"
import { toast } from "sonner"
const formSchema = z.object({
    first_name:z.string().max(50),
    last_name:z.string().max(50),
    date_of_birth:z.string(),
    gender:z.string(),
    blood_type:z.string(),
    address:z.string().max(255),
    phone:z.string().max(10),
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
import { axiosClient } from "../../../api/axios.jsx"
import { ADMIN_DASHBORD_ROUTE, STUDENT_DASHBORD_ROUTE, TEACHER_DASHBORD_ROUTE } from "../../router/index.jsx"
import { useUsercontext } from "../../context/StudentContext.jsx"
import { useState } from "react"


export default function UserLogin({handleSubmit,values})
{
  const  isUpdate=values!==undefined 
  const navigate=useNavigate()
 // 1. Define your form.
//  const context=useUsercontext()
 const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues:{
    //     email:'youssef@kacha.com',
    //     password:'123456789'
    // }
    defaultValues:values||{}
   
  })
 
  // 2. Define a submit handler.
  
  const onSubmit= async values => {
    const loaderMsg=isUpdate?'Updating In Progress':'Adding Parent'
    const loader = toast.loading(loaderMsg)
   
      await handleSubmit(values).then(({data,status})=>{

       


        if(status===200)
        {
          toast.success(data.message)    
          form.reset
         }
       }).catch((reason)=>{
        Object.entries(reason.response.data.errors).forEach((error)=>{
          const [fieldName,errorMessage]=error
          form.setError(fieldName,{
            message:errorMessage.join()
          })
        })
        // form.setError('email',{message:reason.response.data.errors.email.join()})
       }).finally(()=>
      {
        toast.dismiss(loader)
      })
        
  }
    return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>first_name</FormLabel>
              <FormControl>
                <Input placeholder="first_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>last_name</FormLabel>
              <FormControl>
                <Input placeholder="last_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date_of_birth</FormLabel>
              <FormControl>
                <Input type={'date'} placeholder="date_of_birth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="gender"
          render={({field}) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="m"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="f"/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="blood_type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Blood Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bloodType, key) =>
                    <SelectItem key={key} value={bloodType}>{bloodType}</SelectItem>)
                  }
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({field}) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>}
          {isUpdate?"update":"create"}
          {/* {values?"update":"create"} */}
          </Button>
      </form>
    </Form>
    </>
}
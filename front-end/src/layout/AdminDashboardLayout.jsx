import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { useUsercontext } from "../context/StudentContext";
import { Button } from "@/components/ui/button"
import AdminDropDownMenu from "./drop-down-menu/AdminDropDownMenu";
import { LOGIN_ROUTE, STUDENT_DASHBORD_ROUTE } from "../router";
import { GaugeIcon } from "lucide-react";
import StudentDashboard from "../components/student/StudentDashboard";
import { StudentAdministrationSidebar } from "./Administration/StudentAdministrationSidebar";
import { ModeToggle } from "../components/mode-toggle";
import { AdminAdministrationSidebar } from "./Administration/AdminAdministrationSidebar";
import UserApi from "../services/Api/UserApi";

export default function  AdminDashboardLayout()
{
  const navigate=useNavigate()
  const context=useUsercontext()
  const [isLoading,setIsLoading]=useState(false)
  const {setUser,setAuthenticated,logout:contextLogout,authenticated}=useUsercontext()
  useEffect(()=>{
    console.log(authenticated)
        if(authenticated===true)//hna khdmna b authenticated bolean cuz bdlna liha type f context
        {
          UserApi.getUser().then(({data})=>{
            setIsLoading(false)
            console.log(data)
            const {role}=data
            if(role!=='admin')
            {
              navigate(redirectToDashboard(role))
            }
            setUser(data)
            setAuthenticated(true)
          }).catch((reason)=>{
            contextLogout()
            navigate(LOGIN_ROUTE)
          })
        }
        else
        {
          navigate(LOGIN_ROUTE)
        }
      
    
  },[])

  if(isLoading)
  {
    return<></>
  }
    return <>
    <header>
        

<div className="1items-center justify-between flex bg-opacity-98 px-12 py-4 mb-4 mx-auto">
      <div className="text-2xl font-semibold inline-flex items-center">
      Student    
      
     </div>
     <div>
     <ul className="flex place-items-center">
        <li className="ml-5 px-2 py-1">
            <Link className="flex" to={STUDENT_DASHBORD_ROUTE}><GaugeIcon className="mx-1"/>Dashboard</Link>
        </li>
        <li className="ml-5 px-2 py-1">
        <AdminDropDownMenu/>
        </li>
        <li className="ml-5 px-2 py-1">
              <ModeToggle/>
        </li>


      </ul>
     </div>
      
    </div>

    </header>
        <main className="mx-auto px-10 space-y-4 py-4">
          <div className="flex">
            <div className="w-100 md:w-2/12 mr-2 border rounded-l">
            <AdminAdministrationSidebar/>

            </div>
            <div className="w-100 md:w-10/12 border rounded-l">
            <Outlet/>

            </div>
          </div>
        </main>
        <footer>Footer</footer>
     
    </>
}
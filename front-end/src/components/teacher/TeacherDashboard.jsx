import { Outlet } from "react-router-dom"
import { useUsercontext } from "../../context/StudentContext"

export default function TeacherDashboard()
{
    const {user}=useUsercontext()
    return <>
            <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-50 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400">
               <tr>
               <td scope="col" className="px-6 py-3">
                    ID
                  </td>
                  <td scope="col" className="px-6 py-3">
                    NAME
                  </td>
                  <td scope="col" className="px-6 py-3">
                    EMAIL
                  </td>
                  <td scope="col" className="px-6 py-3">
                    DATE
                  </td>
               </tr>
                
               </thead>
               <tbody >
                <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal">
                  {user.id}
                  </th>
                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal">
                   {user.name}
                   </th>
                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal">
                   {user.email}

                   </th>
                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal">
                  {user.created_at}

                   </th>
                </tr>

               </tbody>
            </table>

          </div>
    </> 
}
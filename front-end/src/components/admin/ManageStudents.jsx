import { Outlet } from "react-router-dom"
import { useUsercontext } from "../../context/StudentContext"
import { Button } from "../ui/button"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"
import { PlusCircleIcon } from "lucide-react"
import ParentUpsertForm from "../Forms/ParentUpsertForm"
import AdminParentList from "../datatable/parents/AdminParentList"
import ParentApi from "../../services/Api/ParentApi"
import AdminStudentList from "../datatable/students/AdminStudentList"
import StudentUpsertForm from "../Forms/StudentUpsertForm"
import StudentApi from "../../services/Api/Student/StudentApi"

export default function ManageStudents() {
  return <>
    <div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="items_list" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="items_list" className="relative">
                          Students
                        </TabsTrigger>
                        <TabsTrigger value="add_item">Add new student</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="items_list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1 w-full">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            All students
                          </h2>
                          <AdminStudentList/>
                        </div>
                      </div>
                      <Separator className="my-4"/>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="add_item">
                      <div className="space-y-1">
                        <StudentUpsertForm handleSubmit={(values) => StudentApi.create(values)}/>
                      </div>
                      <Separator className="my-4"/>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
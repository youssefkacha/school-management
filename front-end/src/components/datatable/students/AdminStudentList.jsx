import { useEffect, useState } from "react"
import { DataTable } from "../DataTable"
import { Button } from '../../ui/button';
import { toast } from "sonner"
import ParentUpsertForm from "../../Forms/ParentUpsertForm"

import { DataTableColumnHeader } from '../DataTableColumnHeader';
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Trash2Icon } from "lucide-react";
import StudentApi from "../../../services/Api/Student/StudentApi";
import StudentUpsertForm from "../../Forms/StudentUpsertForm";

export default function AdminStudentList() {
  const [data, setData] = useState([])
  const [openUpdateDialog,setOpenUpdateDialog]=useState(false)


  const StudentsColumns = [
    {
      accessorKey: "id",
      header: "#ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="last_name" />
        // const isAsc=column.getIsSorted() === "asc"

        // return (
        //   <Button onClick={() => column.toggleSorting(isAsc)}>
        //     last_name
        //     {isAsc?<ArrowUp className="ml-2 h-4 w-4" />:<ArrowDown className="ml-2 h-4 w-4" />                }
        //   </Button>
        // )
      },
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="date_of_birth" />
      },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Gender" />
      },
      cell: ({ row }) => {
        const value = row.getValue("gender")
        const gender = value === 'm' ? 'Male' : 'Female'
        return <>{gender}</>
      },
    },
    {
      accessorKey: "blood_type",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Blood_type" />
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Email" />
      },
    }
    ,
    {
      accessorKey: "formatted_updated_at",
      header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Updated at"/>
      },
      cell: ({row}) => {
        const date = (row.getValue("formatted_updated_at"))

        return <div className="text-right font-medium">{date}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const {id,first_name,last_name,date_of_birth,gender,blood_type,address,phone,email,updated_at}=row.original
        const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

        return (
          <div className="flex gap-x-1">
            
            <Sheet open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
              <SheetTrigger>
                <Button size={'sm'}>Update</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Update student {first_name} {last_name}</SheetTitle>
                  <SheetDescription>
                    Make changes to your student here. Click save when you're done.
                    <StudentUpsertForm values={row.original} handleSubmit={(values) => {
                      const promise = StudentApi.update(id, values)
                      promise.then((response) => {
                        const {student} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return student
                          }
                          return item
                        })
                        setData(elements)
                        setOpenUpdateDialog(false);
                      });

                      return promise
                    }}/>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <AlertDialog>
              <AlertDialogTrigger asChild>
               <Button size={'sm'} variant={'destructive'}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure to delete <span className='font-bold'>{first_name} {last_name}</span>?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => {
                    const deletingLoader = toast.loading('Deleting In Progress')
                    const response = await StudentApi.delete(id)
                    toast.dismiss(deletingLoader)
                    if (response.status === 200) {
                      setData(data.filter((parent) => parent.id !== id))
                      // toast("Event has been created.")

                      toast.success("Student deleted", {
                        description: `Student deleted successfully. ${first_name} ${last_name} `,
                        action: {
                          label: "Undo",
                        },
                        icon: <Trash2Icon />
                      })

                    }


                  }}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },

    // ...
  ]
  useEffect(() => {


    StudentApi.index().then(({ data }) => setData(data.data))
    console.log(data)

  }, [])
  return <>
    <DataTable columns={StudentsColumns} data={data} />
  </>
}
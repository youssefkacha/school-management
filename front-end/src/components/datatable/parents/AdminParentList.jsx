import { useEffect, useState } from "react"
import { DataTable } from "../DataTable"
import { AdminParentColumns } from "./AdminParentColumns"
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
import ParentApi from "../../../services/Api/ParentApi";

export default function AdminParentList() {
  const [data, setData] = useState([])
  const [openUpdateDialog,setOpenUpdateDialog]=useState(false)


  const AdminParentColumns = [
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
      accessorKey: "address",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Address" />
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Phone" />
      },
      cell: ({ row }) => {
        const phone = row.getValue("phone")
        return <div className="text-right font-medium">+212-{phone}</div>
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
        // const admin = row.original
        // const id = admin.id
        // const firstname = admin.first_name
        // const lastname = admin.last_name
        const {id,first_name,last_name,date_of_birth,gender,blood_type,address,phone,email,updated_at}=row.original
        const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

        return (
          <div className="flex gap-x-1">
            {/* <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} variant="outline">Edit Parent</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Parent {first_name} {last_name}</DialogTitle>
          <DialogDescription>
            Make changes to parent here. Click save when you're done.

          </DialogDescription>
        </DialogHeader>
        <ParentUpsertForm values={row.original} handleSubmit={(values,id)=>ParentApi.update(values,id)}/>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}
            <Sheet open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
              <SheetTrigger>
                <Button>Update</Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Update Parent {first_name} {last_name}</SheetTitle>
                  <SheetDescription>
                  <ParentUpsertForm values={row.original} handleSubmit={(values) => {
                      const promise = ParentApi.update(id, values)
                      promise.then((response) => {
                        const {parent} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return parent
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
                    const response = await ParentApi.delete(id)
                    toast.dismiss(deletingLoader)
                    if (response.status === 200) {
                      setData(data.filter((parent) => parent.id !== id))
                      // toast("Event has been created.")

                      toast.success("Parent deleted", {
                        description: `Parent deleted successfully. ${first_name} ${last_name} `,
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


    ParentApi.index().then(({ data }) => setData(data.data))
    console.log(data)

  }, [])
  return <>
    <DataTable columns={AdminParentColumns} data={data} />
  </>
}
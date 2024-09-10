import { Button } from '../../ui/button';
import { DataTableColumnHeader } from '../DataTableColumnHeader';
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
export const AdminParentColumns = [
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
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updated_at = row.getValue("updated_at")
      const formatted = new Date(updated_at).toString()

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const admin = row.original
      const id = admin.id
      const firstname = admin.first_name
      const lastname = admin.last_name
      return (
        <>
          <AlertDialog>

            <AlertDialogTrigger asChild>
              <Button size={'sm'} variant={'destructive'}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure to delete <span className='font-bold'>{firstname} {lastname}</span>?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },

  // ...
]
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"


  import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
import { LOGIN_ROUTE } from "../../router/index"
import { useUsercontext } from "../../context/StudentContext"
import { useNavigate } from "react-router-dom"
import DefaultDropDownMenu from "./DefaultDropDownMenu"

  export default function StudentDropDownMenu()
  {
    return (
      <DefaultDropDownMenu>

      </DefaultDropDownMenu>
  )
  }
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
import UserApi from "../../services/Api/UserApi"

  export default function DefaultDropDownMenu({children})
  {
    const {logout:contextLogout,user}=useUsercontext()
   const navigate=useNavigate()
    const logout=async ()=>{
        UserApi.logout().then(()=>{
          contextLogout()
          navigate(LOGIN_ROUTE)
    
        })
      }
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><User className="mr-2 h-4 w-4" />{/*user.name||*/user.first_name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {children} 
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }
import { useContext } from "react"
import {  useUsercontext } from "../context/StudentContext"

export default function Home()
{
    const context=useUsercontext()
    return <>
    {/* {context.user.name} */}
    Hi from Home Page
    </>
}
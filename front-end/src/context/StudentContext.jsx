import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../services/Api/UserApi";
export const StudentStateContext = createContext(
    {
        user: {},
        authenticated: false,
        setUser: () => {
        },
        login: (email, password) => { },
        logout: () => {
        },

        setAuthenticated: () => { }
        ,
        setToken: () => { }
    }
)
export default function StudentContext({ children }) {
    const [user, setUser] = useState({})
    const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))

    const login = async (email, password) => {
        //await StudentApi.getCsrfToken()
        return UserApi.login(email, password)


    }
    const logout = () => {
        setUser({})
        setAuthenticated(false)

    }
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
    }
    const setToken = (token) => {
        window.localStorage.setItem('token',token)
    }
    return <>
        <StudentStateContext.Provider value={{
            // user:user,
            // setUser:setUser,
            // logout:logout()
            setToken,
            user,
            setUser,
            login,
            authenticated,
            setAuthenticated,
            logout,

        }}>
            {children}
        </StudentStateContext.Provider>
    </>
}

export const useUsercontext = () => useContext(StudentStateContext)
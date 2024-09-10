import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';
import Layout from '../layout/layout';
import GuestLayout from '../layout/GuestLayout';
import StudentDashboardLayout from '../layout/StudentDashboardLayout';
import StudentDashboard from '../components/student/StudentDashboard';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import TeacherDashboardLayout from '../layout/TeacherDashboardLayout';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import ManageParents from '../components/admin/ManageParents';
import ParentDashboardLayout from '../layout/ParentDashboardLayout';
import ManageStudents from '../components/admin/ManageStudents';

export const STUDENT_DASHBORD_ROUTE = '/student/dashboard'
export const TEACHER_DASHBORD_ROUTE = '/teacher/dashboard'
const ADMIN_BASE_ROUTE='/admin'
export const LOGIN_ROUTE='/login'
export const ADMIN_DASHBORD_ROUTE = ADMIN_BASE_ROUTE+'/dashboard'
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE+'/manage-parents'
export const ADMIN_MANAGE_STUDENTS_ROUTE = ADMIN_BASE_ROUTE+'/manage-student'
export const  PARENT_DASHBOARD_ROUTE='/parent/dashboard'
export const redirectToDashboard = (roleType) => {
    switch (roleType) {
      case 'student':
        return (STUDENT_DASHBORD_ROUTE);
      case 'admin':
        return (ADMIN_DASHBORD_ROUTE)
      case 'teacher':
        return (TEACHER_DASHBORD_ROUTE)
      case 'parent':
        return (PARENT_DASHBOARD_ROUTE)
    }
  }
  
export const router = createBrowserRouter(
    [
        {

            element: <Layout />,
            children:
                [
                    {
                        path: '/',
                        element: <Home />
                    },
                    {
                        path: '*',
                        element: <NotFound />
                    },
                ]
        },
        {

            element: <GuestLayout />,
            children:
                [
                    {
                        path: LOGIN_ROUTE,
                        element: <Login />
                    },   
                ]
        },
        {

            element: <StudentDashboardLayout/>,
            children:
                [
                    {

                        path: STUDENT_DASHBORD_ROUTE,
                        element: <StudentDashboard/>
                    }
                ]
        },
        {

            element: <AdminDashboardLayout/>,
            children:
                [
                    {

                        path: ADMIN_DASHBORD_ROUTE,
                        element: <AdminDashboard/>
                    },
                    {

                        path: ADMIN_MANAGE_PARENTS_ROUTE,
                        element: <ManageParents/>
                    },
                    {

                        path: ADMIN_MANAGE_STUDENTS_ROUTE,
                        element: <ManageStudents/>
                    }
                ]
        },
        {

            element: <TeacherDashboardLayout/>,
            children:
                [
                    {

                        path: TEACHER_DASHBORD_ROUTE,
                        element: <TeacherDashboard/>
                    }
                ]
        },
        {

            element: <ParentDashboardLayout/>,
            children:
                [
                    {

                        path: PARENT_DASHBOARD_ROUTE,
                        element: <AdminDashboard/>
                    }
                ]
        },

    ]
)
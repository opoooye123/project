import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store.js'

//Unique route
import PrivateRoute from './component/PrivateRoute.jsx';

//Authentication
import Login from './pages/Auth/Login.jsx'
//Registeration
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';

import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<PrivateRoute />} >
        <Route path='profile' element={<Profile />} />
      </Route>

      {/* //Admin route */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='userlist' element={<UserList />} />
      </Route>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

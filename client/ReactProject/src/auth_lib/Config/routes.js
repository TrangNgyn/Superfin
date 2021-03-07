
import React from "react";

import HomepageAdmin from "../../Pages/HomepageAdmin/HomepageAdmin";
import Login from "../../Pages/Login/Login";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";


const routes =[
  {
    path:'/login',
    component: Login,
    isPrivate: false
  },
  {
    path:'/admin',
    component: HomepageAdmin,
    isPrivate: true
  },
  {
    path:'/*',
    component: PageNotFound,
    isPrivate: true
  },
]
 
export default routes
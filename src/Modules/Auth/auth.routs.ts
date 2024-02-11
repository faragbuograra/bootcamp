import { Router }   from 'express'

import { Multer }   from '../../Middlewares/multer'
import { Login } from './login'
import { register } from './register'


export const PublicAuthRoutes = (router: Router, prefix: string) => {

    // router.post(
    //     `${ prefix }/admin/web-login`,
    //     Multer.none,
    //     webLogin
    // )
    // router.post(
    //     `${ prefix }/login`,
    //     Multer.none,
    //     Login
    // )
    // router.post(
    //     `${ prefix }/register`,
    //     Multer.none,
    //     register
    // )

    // .route(`${prefix}/users/activePhone`)
    // .patch(
    //     // Multer.single("users","users", "img"),
    //     UserController.activePhone
    // )


   
}

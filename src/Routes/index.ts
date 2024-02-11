import { Router } from "express";
import { errorHandler } from "../Middlewares/error.handler";
import { JWT } from "../Middlewares/Jwt";
import { Locale } from "../Middlewares/locale";
import { RoleMiddleware } from "../Middlewares/RoleMiddleware";
import { PublicAuthRoutes } from "../Modules/Auth/auth.routs";


import { AdminSystemInfoRoutes, PublicSystemInfoRoutes } from "../Modules/SystemInfo/systemInfo.routes";


import { me } from "../Modules/Auth/me";
import { logout } from "../Modules/Auth/logout";


import { AdminEmployRoutes } from "../Modules/employ/employ.routes";




export const applyRoutes = (): Router => {
  const router = Router();

  /**
   * -------------------------------------------------------
   * Authentication, Authorization and locale middlewares are first
   * to be registered on the Router
   * -------------------------------------------------------
   * */
  // TODO: add (authentication) and locale middlewares here

  router.use(Locale);

  /**
   * -------------------------------------------------------
   * All application routes can go here
   * -------------------------------------------------------
   * */
  const prefix = "/api/v1";

  const user_prefix = prefix + "/user"; // domain:8000/api/v1/user
  const admin_prefix = prefix + "/admin"; 
  /**
   * ------------------------------------------------------------------------------
   *  PUBLIC ROUTES
   * ------------------------------------------------------------------------------
   */
  // domain:8000/api/v1
  // insert any public middlewares above this line;

  PublicAuthRoutes(router, prefix);
  // router.use(JWT);

  PublicSystemInfoRoutes(router, prefix);



  // PublicDecisionsRoutes(router, prefix);

  // PublicDepartmentRoutes(router, prefix);

  /**
   * ------------------------------------------------------------------------------
   *  USER ROUTES
   * ------------------------------------------------------------------------------
   */
  // router.use(user_prefix, RoleMiddleware(2));



  router.get(`${prefix}/me`, me);

  router.get(`${prefix}/logout`, logout);

 
  /**
   * ------------------------------------------------------------------------------
   *  ADMIN ROUTES
   * ------------------------------------------------------------------------------
   */
  // router.use( admin_prefix, RoleMiddleware('admin'));
  AdminEmployRoutes(router, admin_prefix);

  AdminSystemInfoRoutes(router, admin_prefix);

  /**
   * ------------------------------------------------------------------------------
   * !!!! The Error handler is the last middleware on the router !!!!
   * ------------------------------------------------------------------------------
   * */
  router.use(errorHandler);

  return router;
};

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Register from "../components/Register/Register";

const RegisterPage = () => {


   return (
      <div className='max-w-[1440px] w-[95%] mx-auto'>
         <title>SignUp</title>
         <Register></Register>

      </div>
   );
};

export default RegisterPage;
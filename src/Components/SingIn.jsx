import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Providers/AuthProvider";

const SingIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singInUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    singInUser(email, password)
      .then((result) => {
        console.log(result);
        toast.success("Login Successfully");
        const user = {
          email,
          lastSignInTime: result?.user?.metadata?.lastSignInTime,
        };
        // Update last logged in database
        fetch('https://coffee-store-server-ruddy.vercel.app/user',{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        toast.error("invalid login information");
      });
  };
  return (
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="flex justify-center px-5"
      >
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-xl my-3 dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-2xl font-bold text-center">SingIn</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                    {...register("password", { required: true })}
                  />
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="-ml-6 text-lg"
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">
              SignIn
            </button>
          </form>
          <ToastContainer />
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Do not have an account yet?
            <Link
              to="/register"
              className="hover:underline dark:text-violet-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingIn;

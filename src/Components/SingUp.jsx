import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const SingUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  //   const { creatUser } = useContext(AuthContext);
  const { creatUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    creatUser(email, password)
      .then((result) => {
        console.log(result);
        toast.success("SingUp successful!");
        // New user has been created
        const createdAt =result.user?.metadata?.creationTime

        const user = { email,createdAt: createdAt };
        fetch('https://coffee-store-server-ruddy.vercel.app/user',{
            method:"POST",
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
        console.log(error);
        toast.error("An error occurred during singUp.");
      });
  };
  return (
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1500"
        className="flex justify-center my-3 px-5"
      >
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">SingUp your account</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="text" className="block mb-2 text-sm text-left">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  {...register("FullName", { required: true })}
                />
                {errors.FullName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="">
                <label htmlFor="text" className="block mb-2 text-sm text-left">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo url"
                  placeholder="Photo URL"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  {...register("image")}
                />
                {errors.image && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm text-left">
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  id="text"
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
              <p className="px-6 text-sm text-center dark:text-gray-600">
                Go to Login page
                <Link
                  to="/login"
                  className="hover:underline dark:text-violet-600"
                >
                  Login
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">
                 SingUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingUp;

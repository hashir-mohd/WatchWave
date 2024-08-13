import React , {useState}from 'react';
import { useForm } from 'react-hook-form';
import { Logo, Input, SpButton } from '../components/index.js';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineCloudUpload } from "react-icons/md";
import {Link} from "react-router-dom";

function Signup() {
    const schema = z.object({
        fullname: z.string().nonempty("Full Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        username: z.string()
            .min(3, "Username must be at least 3 characters long")
            .max(20, "Username must not exceed 20 characters")
            .refine(value => !/\s/.test(value), {
                message: "Username must not contain spaces",
            }),
    });

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(schema),
    });

    const [profilePic,setProfilePic] = useState(null);
    const [coverPic,setCoverPic] = useState(null);
    const[selectedProfile,setSelectedProfile] = useState(null);
    const [selectedCover,setSelectedCover] = useState(null);

    function handleImageSelect(e,setImage){
        const file = e.target.files[0];
        if(file){
            
            const reader = new FileReader();
            reader.onloadend =() =>{
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    
  
}
    const createAccount = (data) => {
        console.log("form-data", data);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex justify-center items-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <Logo className="w-24" />
                </div>
                <div className="w-full flex flex-col items-center justify-center mb-6 text-white">
          <h1 className="text-2xl">Signup</h1>
          <span>
            already have an account?
            <Link to="/login" className="text-blue-500 inline">
              Login
            </Link>
          </span>
        </div>
                <h2 className="text-2xl font-semibold text-center mb-4 text-white">Create an Account</h2>
                <form onSubmit={handleSubmit(createAccount)} className="space-y-4">

                        
                <div
            className="w-full rounded-lg  bg-gray-300 text-purple-700  bg-cover bg-center bg-no-repeat items-center"
            style={{
              backgroundImage: `url(${selectedCover})`,
            }}
          >
            <div
              className={`mx-auto mt-6 flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat border-2 border-purple-700 `}
              style={{ backgroundImage: `url(${selectedProfile})` }}
            >
              <div className="bg-white/90 flex justify-center items-center rounded-full w-7 h-7 text-center ml-28 mt-[106px]">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profileImg"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("profileImg", { required: true })}
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                    handleImageSelect(e, setSelectedProfile);
                  }}
                />

                <label
                  htmlFor="profileImg"
                  className="
                   cursor-pointer"
                >
                  <MdOutlineCloudUpload />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <input
                style={{ display: "none" }}
                type="file"
                id="coverphoto"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("coverphoto", { required: false })}
                onChange={(e) => {
                  setCoverPic(e.target.files[0]);
                  handleImageSelect(e, setSelectedCover);
                }}
              />

              <div className="bg-white/90 text-purple-700 flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                <label
                  htmlFor="coverphoto"
                  className="inline-flex items-center gap-1 cursor-pointer"
                >
                  Cover
                  <MdOutlineCloudUpload />
                </label>
              </div>
            </div>
          </div>










                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-white">Full Name</label>
                        <Input 
                            placeholder="John Doe"
                            id="fullname"
                            type="text"
                            {...register("fullname", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.fullname && <p className="text-red-400 text-xs mt-1">{errors.fullname.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                        <Input 
                            placeholder="johndoe"
                            id="username"
                            type="text"
                            {...register("username", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                        <Input 
                            placeholder="johndoe89@example.com"
                            id="email"
                            type="email"
                            {...register("email", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <Input 
                            placeholder="********"
                            id="password"
                            type="password"
                            {...register("password", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex justify-center">
                    <SpButton 
                            type="submit"
                            className={`py-2 px-4 rounded-lg text-white font-semibold ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Sign Up'}
                        </SpButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

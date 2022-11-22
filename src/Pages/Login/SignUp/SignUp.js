import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    console.log(data);
    console.log(errors);
    setSignUpError("");
    createUser(data.email, data.passowrd)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User Created Successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up!</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-xs"
              placeholder=""
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is Required" })}
              className="input input-bordered w-full max-w-xs"
              placeholder=""
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("passowrd", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 charachters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message: "Password must be strong",
                },
              })}
              className="input input-bordered w-full max-w-xs"
              placeholder=""
            />
            {errors.passowrd && (
              <p className="text-red-500">{errors.passowrd.message}</p>
            )}
            <label className="label">
              <span className="label-text">Forgot Your Password?</span>
            </label>
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Login"
            type="submit"
          />
          {signUpError && <p className="text-red-700">{signUpError}</p>}
        </form>
        <p>
          Already Have an Account?
          <Link to="/login" className="text-secondary">
            Please Login
          </Link>
        </p>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">OR</div>
          <button className="btn btn-outline uppercase">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

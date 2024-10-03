"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  role: yup.string().required("Role is required"),
  email: yup.string().required("Email is required"),
  organisation: yup.string().required("organisation is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SignupForm() {
  const [SignupFunction, { data, loading, error }] = useLazyQuery(serverFetch);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      organisation: "",
      role: "EMPLOYEE",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      SignupFunction(
        `mutation SignUp($signUpData: signUpData) {
                    signUp(signUpData: $signUpData) {
                      otp
                      msg
                      id
                    }
                  }`,
        {
          signUpData: {
            email: values.email,
            password: values.password,
            userName: values.username,
            role: values.role,
          },
        },
        {
          cache: "no-store",
        }
      );
    },
  });

  useEffect(() => {
    console.log(data, "signin");
    if (data) {
      if (data.signUp.msg === "User Registered Successfully") {
        router.push("/signin");
      }
    }
  }, [data, loading, error]);
  return (
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="flex-1 bg-green-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background.svg')`,
          }}
        ></div>
      </div>

      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
        {/* logo if any */}
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold">Create Your Account Now!</h3>
        </div>
        <div className="mt-0 flex flex-col items-center">
          <div className="w-full flex-1 mt-5">
            <form className="mx-auto max-w-xs" onSubmit={formik.handleSubmit}>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="User name"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.username}
                </div>
              ) : null}

              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.email}
                </div>
              ) : null}
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.password}
                </div>
              ) : null}
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="text"
                id="organisation"
                name="organisation"
                onChange={formik.handleChange}
                value={formik.values.organisation}
                placeholder="Organisation"
              />
              {formik.touched.organisation && formik.errors.organisation ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.organisation}
                </div>
              ) : null}

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-">Sign Up</span>
              </button>
            </form>

            <p className="text-sm font-light text-center mt-5 text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                className="font-medium text-green-400 hover:underline dark:text-green-500"
                href="/signin"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
// import { ClipLoader } from "react-spinners";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SiginForm() {
  const [loginpage, { data, loading, error }] = useLazyQuery(serverFetch);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [googleSignin, setGoogleSigin] = useState(false);
  const [microsoftSignin, setMicrosoftSigin] = useState(false);
  // Handle redirection after login based on the user's role
  useEffect(() => {
    if (status === "authenticated") {
      // Check user role and redirect accordingly
      console.log(session);
      if (session.user) {
        redirect("/user/home");
      }
    }
  }, [session, status, router]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await signIn("credentials", {
        email: values.username,
        password: values.password,
        redirect: false,
      });
      console.log(data, "iadhiasdhasjk");

      // loginpage(
      //   `mutation Login($userName: String, $password: String) {
      //     login(userName: $userName, password: $password) {
      //       msg
      //       token
      //       role
      //       user
      //     }
      //   }
      //         `,
      //   {
      //     userName: values.username,
      //     password: values.password,
      //   }
      // );
    },
  });

  useEffect(() => {
    console.log(data, "signin");
  }, [data, loading, error]);

  return (
    <div className="max-w-screen-xl  m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  flex flex-col justify-center">
        {/* logo if any */}
        <div className="mt-0 flex flex-col items-center">
          <div className="w-full flex-1 mt-5">
            <div className="flex flex-col items-center gap-5">
              <button
                onClick={async () => {
                  try {
                    setGoogleSigin(true);
                    await signIn("google");
                  } catch (error) {
                    setGoogleSigin(false);
                  } finally {
                    setGoogleSigin(false);
                  }
                }}
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                {googleSignin ? (
                  <svg
                    version="1.1"
                    id="loader-1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30px"
                    height="30px"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="#000"
                      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                    >
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                ) : (
                  <>
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </>
                )}
              </button>
              <button
                onClick={async () => {
                  try {
                    setMicrosoftSigin(true);
                    await signIn("azure-ad");
                  } catch (error) {
                    setMicrosoftSigin(false);
                  } finally {
                    setMicrosoftSigin(false);
                  }
                }}
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                {microsoftSignin ? (
                  <svg
                    version="1.1"
                    id="loader-1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30px"
                    height="30px"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="#000"
                      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                    >
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                ) : (
                  <>
                    <div className="bg-white p-2 rounded-full">
                      <img src="/microsoft_icon.svg" width={15} height={15} />
                    </div>
                    <span className="ml-4">Sign In with Microsoft</span>
                  </>
                )}
              </button>
            </div>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign In with E-mail
              </div>
            </div>

            <form className="mx-auto max-w-xs" onSubmit={formik.handleSubmit}>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                id="username"
                name="username"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.username}
                </div>
              ) : null}

              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm ">
                  {formik.errors.password}
                </div>
              ) : null}

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <span className="ml-">Sign In</span>
              </button>
            </form>
            <div className="text-center mt-2">
              <button
                className="0 mx-5 px-5 cursor-pointer font-normal text-sm rounded-lg text-gray-500  "
                onClick={() => router.push("/forgotpassword")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
              </button>
            </div>

            <p className="text-sm font-light text-center mt-5 text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                className="font-medium text-green-400 hover:underline dark:text-green-500"
                href="/signup"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-green-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background.svg')`,
          }}
        ></div>
      </div>
    </div>
  );
}

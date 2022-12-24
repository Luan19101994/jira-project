import React, { useEffect, useState } from "react";
import AOS from "aos";
import SignInForm from "../../components/auth/signIn";
import SignUpForm from "../../components/auth/signUp";

export default function Login(props) {
  useEffect(() => {
    AOS.init({ offset: 100, delay: 0 });
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div className="h-screen flex justify-center items-center bg-prim-90 bg-[url('https://img.freepik.com/free-vector/white-technology-background-concept_23-2148403398.jpg?w=2000')] bg-center bg-cover bg-no-repeat relative after:absolute after:content-[''] after:w-full after:h-full after:bg-black/30 after:z-[0]">
        <div className="w-[600px] mx-8 flex flex-col justify-between p-10 bg-white max-h-[800px] relative z-[1] overflow-hidden rounded-lg">
          <h2 className="text-4xl font-bold mb-8">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {isLogin ? (
            <>
              <SignInForm />
              <p className="mt-5">
                Don't have account?{" "}
                <span
                  className="cursor-pointer hover:text-prim-100 duration-300"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <SignUpForm />
              <p className="mt-5">
                You have account?{" "}
                <span
                  className="cursor-pointer hover:text-prim-100 duration-300"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login
                </span>
              </p>
            </>
          )}
          <span className="mt-3 text-xl block text-right">Jira by Trinh Luan</span>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from "@/services/auth/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    accountType: "",
    email: "",
    password: "",
  });

  // const submit = async (e: any) => {
  //   e.preventDefault();
  //   console.log(formData)
  //   try {
  //     const res = await fetch("http://localhost:3000/api/v1/auth/register", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //     });
  //     const response = await res.json();

  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log(res.data);

      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  if (isAuthenticated) {
    return <div>User session already exists</div>;
  }

  return (
    <div className="bg-white flex flex-1 rounded-md p-4">
      <div className="px-10 w-full">
        <h2 className="font-space-grotesk text-2xl">Create an Account</h2>
        <label htmlFor="" className="text-sm">
          Create an account
        </label>
        <form onSubmit={submit}>
          <div className="border w-full mt-4 rounded-md p-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className="border"
                placeholder="John"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
              />
            </div>

            {/* Second input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="border"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            {/* Third input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Doe"
                className="border"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* Fourth input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Doe"
                className="border"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {/* Fifth input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountType: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Are you a shopper or seller?
                </option>
                <option value="SHOPPER">SHOPPER</option>
                <option value="SELLER">SELLER</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 my-5">
            <input type="checkbox" />
            <label htmlFor="checkbox">
              I agree with the
              <a href="/terms-and-conditions">Terms and Conditions</a>
            </label>
          </div>
          <button type="submit" className="border  p-2">
            Sign Up
          </button>
        </form>

        <div className="flex items-center gap-4 text-sm">
          <label htmlFor="login">Already have an account?</label>
          <Link
            to="/auth/login"
            className="underline underline-offset-4 font-medium text-base"
          >
            Login Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

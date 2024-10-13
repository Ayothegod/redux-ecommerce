/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from "@/services/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/lib/schema";
// import { AuthState } from "@/services/auth/types";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AuthState } from "@/services/auth/types";

type RegisterSchemaType = z.infer<typeof registrationSchema>;

export function Register({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) {
  const [register, { isLoading }] = useRegisterMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log(data);

    try {
      const response = await register(data).unwrap();
      console.log(response);

      toast({
        title: `Welcome to Ecorn, ${response.data.userRes.accountType}`,
        description: ``,
      });

      if (response.data.userRes.accountType === "SELLER") {
        return navigate("/seller/dashboard");
      }
      return navigate("/");
    } catch (error: any) {
      console.log({ error });

      if (error.data) {
        toast({
          variant: "destructive",
          description: `${error.data.message}`,
        });
        return;
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return null;
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (authState.user?.accountType === "SHOPPER") {
        return navigate("/");
      }
      if (authState.user?.accountType === "SELLER") {
        return navigate("/seller/dashboard");
      }
    }
    return;
  }, [isAuthenticated, navigate, authState.user?.accountType]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-white flex flex-1 rounded-md p-4 items-center justify-center">
      <div className="px-2 md:px-10 w-full sm:w-2/3 md:w-full">
        <h2 className="font-space-grotesk text-2xl">Create an Account</h2>
        <Label htmlFor="">Create an account</Label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border w-full mt-4 rounded-md p-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                type="text"
                placeholder="John"
                {...registerInput("firstName")}
              />
              {errors.firstName && (
                <Label className="text-xs text-red-500">
                  {errors.firstName?.message}
                </Label>
              )}
            </div>

            {/* Second input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                type="text"
                placeholder="Doe"
                {...registerInput("lastName")}
              />
              {errors.lastName && (
                <Label className="text-xs text-red-500">
                  {errors.lastName?.message}
                </Label>
              )}
            </div>

            {/* Third input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Example@gmail.com"
                className="border"
                {...registerInput("email")}
              />
              {errors.email && (
                <Label className="text-xs text-red-500">
                  {errors.email?.message}
                </Label>
              )}
            </div>

            {/* Fourth input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password..."
                className="border"
                {...registerInput("password")}
              />
              {errors.password && (
                <Label className="text-xs text-red-500">
                  {errors.password?.message}
                </Label>
              )}
            </div>

            {/* Fifth input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Account Type</label>
              <select id="accountType" {...registerInput("accountType")}>
                <option value="">Are you a shopper or seller?</option>
                <option value="SHOPPER">SHOPPER</option>
                <option value="SELLER">SELLER</option>
              </select>
              {errors.accountType && (
                <Label className="text-xs text-red-500">
                  {errors.accountType?.message}
                </Label>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 my-5">
            <input type="checkbox" />
            <Label htmlFor="checkbox" className="flex items-center gap-2">
              I agree with the
              <a
                href="/terms-and-conditions"
                className="text-blue-600 underline"
              >
                Terms and Conditions
              </a>
            </Label>
          </div>
          <Button type="submit" className="w-full mt-4 border">
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center gap-4 text-sm my-4">
          {" "}
          <label htmlFor="login">Already have an account?</label>
          <Link
            to="/auth/login"
            className="text-blue-600 underline underline-offset-4 font-medium text-sm"
          >
            Login Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/schema";
// import { AuthState } from "@/services/auth/types";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/services/auth/authSlice";
import { Loader2 } from "lucide-react";

type LoginSchemaType = z.infer<typeof loginSchema>;

export function Login({
  isAuthenticated,
}: // authState,
{
  isAuthenticated: boolean;
  // authState: AuthState;
}) {
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await login(data).unwrap();
      console.log(response);

      toast({
        title: `Welcome back, ${response.data.userRes.accountType}`,
        description: ``,
      });
      return null;
      return navigate("/login");
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
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-white  flex items-center justify-center flex-col flex-1 rounded-md p-4">
      <div className="px-10 w-1/2">
        <h2 className="font-space-grotesk text-3xl">Sign In</h2>
        <label htmlFor="" className="text-sm">
          Login to your account
        </label>
        <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="border px-2 py-4 rounded-md w-full gap-4 md:gap-6 flex  flex-col">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Example@gmail.com"
                className="border"
                {...register("email")}
              />
              {errors.email && (
                <Label className="text-xs text-red-500">
                  {errors.email?.message}
                </Label>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password..."
                className="border"
                {...register("password")}
              />
              {errors.password && (
                <Label className="text-xs text-red-500">
                  {errors.password?.message}
                </Label>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label htmlFor="checkbox" className="text-sm">
                Remember me
              </label>
            </div>
            <Link
              to="/auth/login"
              className="underline underline-offset-2 font-medium text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <div className="flex items-center gap-4 text-sm">
        <label htmlFor="login">Don't have an account?</label>
          <Link
            to="/auth/register"
            className="underline underline-offset-4 font-medium text-sm"
          >
            Register Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/schema";
// import { AuthState } from "@/services/auth/types";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/services/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

type LoginSchemaType = z.infer<typeof loginSchema>;

export function Login() {
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
      // console.log(response);

      toast({
        title: `Welcome back, ${response.data.userRes.accountType}`,
        description: ``,
      });

      if (response.data.userRes.accountType === "SELLER") {
        return navigate("/seller/dashboard");
      }
      if (response.data.userRes.accountType === "ADMIN") {
        return navigate("/admin/dashboard");
      }
      return navigate("/");
    } catch (error: any) {
      // console.log({ error });

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

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (authState.user?.accountType === "SHOPPER") {
  //       return navigate("/");
  //     }
  //     if (authState.user?.accountType === "SELLER") {
  //       return navigate("/seller/dashboard");
  //     }
  //   }
  //   return;
  // }, [isAuthenticated, navigate, authState.user?.accountType]);

  // if (isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="bg-white  flex items-center justify-center flex-col flex-1 rounded-md p-4">
      <div className="px-4 md:px-10 w-full sm:w-2/3">
        <h2 className="font-space-grotesk text-3xl">Sign In</h2>
        <Label htmlFor="">Login to your account</Label>
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
              className="text-blue-600 underline underline-offset-2 font-medium text-sm"
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
            className="text-blue-600 underline underline-offset-4 font-medium text-sm"
          >
            Register Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

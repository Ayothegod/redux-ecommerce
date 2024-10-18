/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/lib/schema";
import { useAdminCreateUserMutation } from "@/services/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type RegisterSchemaType = z.infer<typeof registrationSchema>;

export function AdminCreateUser() {
  const [register, { isLoading }] = useAdminCreateUserMutation();
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
        description: `User created successfully`,
      });

      return navigate("/admin/dashboard");
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
  return (
    <div className="border border-white bg-white shadow-sm w-full px-3 py-2 rounded-md flex-1">
      <h2 className="font-semibold text-lg mt-4">Create User</h2>

      <div className="bg-white flex flex-1 rounded-md p-4 items-center justify-center">
        <div className="px-2 w-full">
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
                  <option value="">
                    What type of user do you want to create?
                  </option>
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

            <Button type="submit" className="w-full mt-4 border">
              {isLoading ? <Loader2 className="animate-spin" /> : "Create User"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

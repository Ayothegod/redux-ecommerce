/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUsersQuery,
  useLazyDeleteUserQuery,
} from "@/services/auth/authSlice";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const { data } = useGetUsersQuery();
  console.log(data);

  return (
    <div className="border border-white bg-white shadow-sm w-full px-3 py-2 rounded-md flex-1">
      <div className="border border-white bg-white shadow-sm w-full px-3 py-2 rounded-md flex-1">
        <Link to="/admin/user/new">
          <Button
            variant="basePrimary"
            className="flex items-center gap-2 ml-auto rounded-full"
          >
            <PlusCircle />
            Add User
          </Button>
        </Link>
      </div>
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>

      <div>
        <UsersTable users={data?.data?.users || []} />
      </div>
    </div>
  );
}

export function UsersTable({ users }: any) {
  const { toast } = useToast();
  const [triggerDeleteUser] = useLazyDeleteUserQuery();

  const deleteUser = async (id: string) => {
    try {
      const response = await triggerDeleteUser(id).unwrap();
      console.log(response);

      toast({
        description: `User deleted successfully`,
      });
    } catch (error: any) {
      console.log(error);

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
    <>
      {users && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.accountType}</TableCell>
                <TableCell onClick={() => deleteUser(user.id)}>
                  <Button variant="outline">Delete User</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

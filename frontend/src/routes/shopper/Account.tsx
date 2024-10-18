import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { clearState } from "@/services/auth/authSlice";

export function UserAccount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
    dispatch(clearState());

    navigate("/auth/login");
  };

  return (
    <div className="w-full py-10 rounded-md flex-1 mb-20 flex items-center justify-center flex-col ">
      <h2 className="font-semibold text-lg">Settings</h2>

      <div className="mt-4">
        <Button onClick={logout} variant="basePrimary" className="rounded-full">
          Log out
        </Button>
      </div>
    </div>
  );
}

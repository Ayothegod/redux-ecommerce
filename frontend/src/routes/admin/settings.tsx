import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { clearState } from "@/services/auth/authSlice";

export function AdminSettings() {
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
    <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-20">
      <h2 className="font-semibold text-lg">Settings</h2>

      <div>
        <Button onClick={logout} variant="basePrimary" className="rounded-full">
          Log out
        </Button>
      </div>
    </div>
  );
}

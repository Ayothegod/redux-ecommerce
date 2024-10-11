/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthState } from "@/services/auth/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Login({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return <div>This is login, yahhh</div>;
}

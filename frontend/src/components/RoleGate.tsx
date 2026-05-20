import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../utils/types";

const RoleGate = ({ allow, children }: { allow: Role[]; children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return null;
  if (!allow.includes(user.role)) return null;
  return <>{children}</>;
};

export default RoleGate;

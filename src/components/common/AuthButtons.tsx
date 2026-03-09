import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  className?: string;
  onLogin?: () => void;
  onRegister?: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  className = "flex gap-4 mt-2",
  onLogin,
  onRegister,
}) => {
  const router = useRouter();

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      router.push("/login");
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      router.push("/register");
    }
  };

  return (
    <div className={className}>
      <Button
        className="h-15 px-8 rounded-full text-lg hover:bg-primary/80"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button
        variant="outline"
        className="h-15 px-8 rounded-full text-lg hover:bg-accent border-slate-400 dark:border-stone-600"
        onClick={handleRegister}
      >
        Register
      </Button>
    </div>
  );
};

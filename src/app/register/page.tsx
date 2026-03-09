"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { registerFormSchema, RegisterFormValues } from "@/types/register";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { registerApiUrl } from "../../../api-endpoints";

export default function RegisterCard() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await fetch(`${registerApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();

      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl border-0 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Register to start using the app</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your first name"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your last name"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />

                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="pl-9 pr-9"
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />

                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="pl-9 pr-9"
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Register"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-primary font-medium cursor-pointer hover:underline"
              onClick={handleLogin}
            >
              Login
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

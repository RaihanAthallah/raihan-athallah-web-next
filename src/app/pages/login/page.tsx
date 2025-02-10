"use client";

import { useState } from "react";
import { UserService } from "@/app/services/user";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
// import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  message: string;
  field?: keyof LoginFormData;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error?.field === name) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError({ field: "email", message: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError({ field: "email", message: "Invalid email format" });
      return false;
    }
    if (!formData.password) {
      setError({ field: "password", message: "Password is required" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      await UserService.login(formData);
      router.push("admin-dashboard");
      // Handle successful login - you might want to use a proper state management solution here
      //   console.log("Logged in successfully:", token);
      // Redirect to dashboard after successful login
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-20 w-full max-w-7xl rounded-lg p-8 bg-gray-700/50" aria-labelledby="login-heading">
      <div className="mx-auto max-w-md">
        <h1 id="login-heading" className="text-2xl font-bold text-cyan-400 mb-6">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <fieldset disabled={isLoading} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cyan-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${error?.field === "email" ? "ring-2 ring-red-500" : ""}`}
                placeholder="Enter your email"
                aria-invalid={error?.field === "email"}
                aria-describedby={error?.field === "email" ? "email-error" : undefined}
              />
              {error?.field === "email" && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {error.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-cyan-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${error?.field === "password" ? "ring-2 ring-red-500" : ""}`}
                placeholder="Enter your password"
                aria-invalid={error?.field === "password"}
                aria-describedby={error?.field === "password" ? "password-error" : undefined}
              />
              {error?.field === "password" && (
                <p id="password-error" className="text-sm text-red-500 mt-1">
                  {error.message}
                </p>
              )}
            </div>

            {/* {error && !error.field && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )} */}

            <div className="flex justify-end space-x-2 pt-4">
              <button type="submit" className="rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

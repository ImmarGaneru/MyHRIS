// app/auth/login/page.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from 'sonner';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Successfully logged in')
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to login.")
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter you email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
}
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

// Helper to get user-friendly error messages
const getErrorMessage = (error: string | undefined): string => {
  if (!error) return 'An unexpected error occurred. Please try again.';
  
  const errorLower = error.toLowerCase();
  
  if (errorLower.includes('email not confirmed')) {
    return 'Please verify your email address. Check your inbox for the confirmation link.';
  }
  if (errorLower.includes('invalid login credentials') || errorLower.includes('invalid email or password')) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }
  if (errorLower.includes('too many requests')) {
    return 'Too many login attempts. Please wait a few minutes before trying again.';
  }
  if (errorLower.includes('network')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  if (errorLower.includes('user not found')) {
    return 'No account found with this email. Please sign up first.';
  }
  
  return error;
};

export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
    sessionStorage.removeItem('redirectAfterLogin');
    navigate(redirectTo, { replace: true });
    return null;
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setFormError(null);
    
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        // Get intended destination or default to dashboard
        const from = (location.state as any)?.from?.pathname || 
                     sessionStorage.getItem('redirectAfterLogin') || 
                     '/dashboard';
        
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(from, { replace: true });
      } else {
        setFormError(getErrorMessage(result.error));
      }
    } catch (error: any) {
      setFormError(getErrorMessage(error.message));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      {...field}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        {...field}
                        disabled={isLoading}
                        autoComplete="current-password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <Button variant="link" onClick={() => navigate('/register')} disabled={isLoading}>
            Don't have an account? Sign up
          </Button>
          <Button variant="link" onClick={() => navigate('/password-reset')} disabled={isLoading}>
            Forgot password?
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, Eye, EyeOff, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const passwordRequirements = [
  { label: 'At least 6 characters', test: (pwd: string) => pwd.length >= 6 },
];

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

// Helper to get user-friendly error messages
const getErrorMessage = (error: string | undefined): string => {
  if (!error) return 'An unexpected error occurred. Please try again.';
  
  const errorLower = error.toLowerCase();
  
  if (errorLower.includes('user already registered') || errorLower.includes('already exists')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (errorLower.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (errorLower.includes('password') && errorLower.includes('weak')) {
    return 'Password is too weak. Please use a stronger password with at least 6 characters.';
  }
  if (errorLower.includes('network')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  if (errorLower.includes('rate limit')) {
    return 'Too many registration attempts. Please wait a few minutes before trying again.';
  }
  
  return error;
};

export function RegisterForm() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setFormError(null);
    
    try {
      const result = await register(values.email, values.password);
      
      if (result.success) {
        setRegistrationSuccess(true);
        toast({
          title: 'Registration successful!',
          description: 'Please check your email to verify your account.',
        });
      } else {
        setFormError(getErrorMessage(result.error));
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: getErrorMessage(result.error),
        });
      }
    } catch (error: any) {
      const errorMsg = getErrorMessage(error.message);
      setFormError(errorMsg);
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (registrationSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Next Steps</AlertTitle>
            <AlertDescription>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Return here to sign in</li>
              </ol>
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/login')} className="w-full">
            Go to Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Register to access MethodIQ's research platform
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
                        autoComplete="new-password"
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
                  {password && (
                    <div className="space-y-1 mt-2">
                      {passwordRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 
                            className={`h-3 w-3 ${req.test(password) ? 'text-green-500' : 'text-muted-foreground'}`} 
                          />
                          <span className={req.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field}
                        disabled={isLoading}
                        autoComplete="new-password"
                        className="pr-10"
                      />
                      <Button 
                        type="button" 
                        variant="ghost"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => navigate('/login')} disabled={isLoading}>
          Already have an account? Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}

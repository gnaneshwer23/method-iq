
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setFormError(null);
    
    try {
      console.log('Form submitted with values:', values);
      const result = await register(values.email, values.password);
      console.log('Registration result:', result);
      
      if (result.success) {
        toast({
          title: 'Registration successful',
          description: 'Please check your email for verification link',
        });
        navigate('/login');
      } else {
        setFormError(result.error || 'An error occurred during registration. Please try again.');
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: result.error || 'An error occurred during registration',
        });
      }
    } catch (error: any) {
      console.error('Registration form error:', error);
      setFormError(error.message || 'An unexpected error occurred. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-300">
      <CardHeader className="bg-gray-100 rounded-t-md">
        <CardTitle className="text-2xl font-bold text-gray-900">Create an Account</CardTitle>
        <CardDescription className="text-gray-700">
          Register to access MethodIQ's research platform
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-white">
        {formError && (
          <Alert variant="destructive" className="mb-4 border-red-400 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{formError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} className="border-gray-300 bg-white text-gray-900" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        className="border-gray-300 bg-white text-gray-900 pr-10" 
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-0 h-full px-3 py-2"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        className="border-gray-300 bg-white text-gray-900 pr-10" 
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-0 top-0 h-full px-3 py-2"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={isLoading}>
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
      <CardFooter className="flex justify-center border-t border-gray-200 pt-4 bg-white">
        <Button variant="link" onClick={() => navigate('/login')} className="text-blue-600">
          Already have an account? Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}

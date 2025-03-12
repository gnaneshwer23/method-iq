
import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

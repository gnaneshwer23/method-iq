
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

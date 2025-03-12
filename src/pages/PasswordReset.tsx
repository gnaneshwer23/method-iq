
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PasswordReset = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <PasswordResetForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordReset;

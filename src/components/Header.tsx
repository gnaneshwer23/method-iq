
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { NotificationsDropdown } from "./federated/NotificationsDropdown"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, logout, loading } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MethodIQ
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link to="/about" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  About Us
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/technology" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Technology
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/benefits" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Benefits
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/how-it-works" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  How It Works
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/protocols" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Protocols
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/experiments" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Experiments
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/digital-twins" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Digital Twins
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/iot-devices" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  IoT Devices
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/federated-learning" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Federated Learning
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {!loading && (
            isAuthenticated ? (
              <>
                <NotificationsDropdown />
                <Button variant="outline" size="sm" onClick={handleDashboard}>Dashboard</Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLogin}>Log in</Button>
                <Button size="sm" onClick={handleSignup}>Sign up</Button>
              </>
            )
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-3 mt-4">
                <Link to="/about" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  About Us
                </Link>
                <Link to="/features" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Features
                </Link>
                <Link to="/technology" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Technology
                </Link>
                <Link to="/benefits" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Benefits
                </Link>
                <Link to="/how-it-works" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  How It Works
                </Link>
                <Link to="/blog" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
                <Link to="/protocols" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Protocols
                </Link>
                <Link to="/experiments" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Experiments
                </Link>
                <Link to="/digital-twins" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Digital Twins
                </Link>
                <Link to="/iot-devices" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  IoT Devices
                </Link>
                <Link to="/federated-learning" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Federated Learning
                </Link>
                <Link to="/pricing" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link to="/contact" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  {!loading && (
                    isAuthenticated ? (
                      <>
                        <Button variant="outline" onClick={() => { handleDashboard(); setIsOpen(false); }}>Dashboard</Button>
                        <Button variant="ghost" onClick={() => { handleLogout(); setIsOpen(false); }}>Log out</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => { handleLogin(); setIsOpen(false); }}>Log in</Button>
                        <Button onClick={() => { handleSignup(); setIsOpen(false); }}>Sign up</Button>
                      </>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

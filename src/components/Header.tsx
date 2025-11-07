
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
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 text-sm">Platform</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/protocols"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Protocols</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Discover and share research protocols
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/experiments"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Experiments</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track and analyze your experiments
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/digital-twins"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Digital Twins</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Virtual experiment simulation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/iot-devices"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">IoT Devices</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Connect and manage lab devices
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/federated-learning"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Federated Learning</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Collaborative ML training
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 text-sm">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/features"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Features</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explore all platform capabilities
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/benefits"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Benefits</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Why researchers choose MethodIQ
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/how-it-works"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">How It Works</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn the platform workflow
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/pricing"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Pricing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find the right plan for you
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 text-sm">Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Our mission and team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/technology"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Technology</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Our technical approach
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/blog"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Blog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Latest news and insights
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">
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
        <div className="lg:hidden">
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

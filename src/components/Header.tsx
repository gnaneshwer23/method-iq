
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { useToast } from "./ui/use-toast"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    // For now, we'll show a toast since login functionality isn't implemented yet
    toast({
      title: "Coming Soon",
      description: "Login functionality will be available soon!",
      duration: 3000,
    });
  };

  const handleSignup = () => {
    // For now, we'll show a toast since signup functionality isn't implemented yet
    toast({
      title: "Coming Soon",
      description: "Sign up functionality will be available soon!",
      duration: 3000,
    });
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
                <NavigationMenuTrigger className="bg-background h-9 px-4">About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] bg-background p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/about"
                      >
                        About Us
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features" className="h-9 px-4 py-2 text-sm hover:text-primary">
                  Features
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
          <Button variant="ghost" size="sm" onClick={handleLogin}>Log in</Button>
          <Button size="sm" onClick={handleSignup}>Sign up</Button>
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
                  About
                </Link>
                <Link to="/features" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Features
                </Link>
                <Link to="/benefits" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Benefits
                </Link>
                <Link to="/how-it-works" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  How It Works
                </Link>
                <Link to="/pricing" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link to="/contact" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" onClick={() => { handleLogin(); setIsOpen(false); }}>Log in</Button>
                  <Button onClick={() => { handleSignup(); setIsOpen(false); }}>Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MethodIQ
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                          to="/about"
                        >
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn more about our mission and team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features" className="px-4 py-2">
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/benefits" className="px-4 py-2">
                  Benefits
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/how-it-works" className="px-4 py-2">
                  How It Works
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing" className="px-4 py-2">
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="px-4 py-2">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Log in</Button>
          <Button>Sign up</Button>
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
              <div className="flex flex-col space-y-4 mt-4">
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
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Log in</Button>
                  <Button onClick={() => setIsOpen(false)}>Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import useAuth from "../../hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

export default function NavigationComponent() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(); // Call the logout function
  };

  return (
    <header className='flex items-center justify-between px-4 py-3  border-b md:px-24'>
      <Link to='#' className='flex items-center gap-2 text-lg font-semibold'>
        <MountainIcon className='w-6 h-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <nav className='hidden md:flex items-center justify-center flex-1 gap-6 text-sm font-medium'>
        <Link
          to='/'
          className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors font-semibold text-md'
        >
          Home
        </Link>
        <Link
          to='/projects/all'
          className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors font-semibold text-md'
        >
          Discover
        </Link>
        <Link
          to='/my/projects'
          className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors font-semibold text-md'
        >
          My Projects
        </Link>
        <Link
          to='/my/investments'
          className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors font-semibold text-md'
        >
          My Investments
        </Link>
      </nav>
      {auth.user ? (
        <div className='hidden md:flex items-center gap-2'>
          <Button asChild variant={"outline"}>
            <Link
              to='/projects/create'
              className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              Create Project
            </Link>
          </Button>
          <Button
            className='flex items-center gap-2 px-4 py-2 rounded-md bg-black text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            asChild
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback className='text-black'>
                      {auth.user.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <Link to='/user/profile' className='flex items-center gap-2'>
                    <div className='h-4 w-4' />
                    <span>View Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to='/user/bookmarks'
                    className='flex items-center gap-2'
                  >
                    <div className='h-4 w-4' />
                    <span>View Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2'
                  >
                    <div className='h-4 w-4' />
                    <span>Logout</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
        </div>
      ) : (
        <div className='hidden md:flex items-center gap-2'>
            <Link to='/login'>Login</Link>  
            <Link to='/signup'>Sign Up</Link>
        </div>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='md:hidden'>
            <MenuIcon className='w-6 h-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='top' className='md:hidden'>
          <nav className='grid gap-4 py-6'>
            <Link
              to='/'
              className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              Home
            </Link>
            <Link
              to='/projects/all'
              className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              Discover
            </Link>
            <Link
              to='/my/projects'
              className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              My Projects
            </Link>
            <Link
              to='/my/investments'
              className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              My Investments
            </Link>
          </nav>
          {auth.user ? (
            <div className='flex items-center gap-2'>
              <Button asChild variant={"outline"}>
                <Link
                  to='/projects/create'
                  className='px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'
                >
                  Create Project
                </Link>
              </Button>
              <Button className='flex items-center gap-2 px-4 py-2 rounded-md bg-black text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src='/placeholder-user.jpg' />
                  <AvatarFallback className='text-black'>JD</AvatarFallback>
                </Avatar>
                <span className='font-medium'>John Doe</span>
              </Button>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Button variant='outline'>Login</Button>
              <Button>Sign Up</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}

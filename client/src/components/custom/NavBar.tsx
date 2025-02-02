import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";

function NavBar() {
  const auth = useAuth();

  return (
    <nav className='px-16 py-8 flex justify-between'>
      <div className='flex gap-16 items-center'>
        <span className='font-bold text-3xl'>LOGO</span>
        <ul className='flex gap-4 text-xl font-semibold'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/projects/all'>Discover</Link>
          </li>
          <li>
            <a href='#'>Categories</a>
          </li>
          <li>
            <a href='#'>My Projects</a>
          </li>
          <li>
            <a href='#'>My Investments</a>
          </li>
        </ul>
      </div>
      <div className='flex gap-4'>
        {auth.user ? (
          <div className='flex gap-4'>
            <Link
              to={"/user/profile"}
              className=' border-black  flex items-center gap-2'
            >
              <IconUser size={40} />
              {auth.user.username}
            </Link>
            <Link
              to={"/projects/create"}
              className='font-semibold text-white bg-blue-400 px-3 py-1 rounded-md'
            >
              Start a project
            </Link>
            <button
              onClick={() => {
                auth.logout();
              }}
              className='font-semibold text-white bg-red-400 px-3 py-1 rounded-md'
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className='  px-3 rounded-md border-black border-2'
          >
            Login
          </Link>
        )}

        {/* {user && (
          <button className=' bg-green-300 font-semibold rounded-md py-1 px-3 ml-4'>
            <Link to={"/user/profile"}>My Profile</Link>
          </button>
        )} */}
      </div>
    </nav>
  );
}

export default NavBar;

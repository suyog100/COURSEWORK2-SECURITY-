import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.svg";
import phoneImg from "../../assets/phone.png";
import { motion } from "framer-motion";
import "../../styles/timeline.css";
import NavigationComponent from "../../components/custom/Navigation";

function HomePage() {
  return (
    <main className=' bg-heroLrGradient'>
      <NavigationComponent />
      <section className=' grid medium:grid-cols-2 pt-36 items-center px-16 '>
        <div className=' text-center items-center relative z-50'>
          <motion.div
            className='absolute h-48 w-48 bg-blue-100 rounded-[50%] -z-10 -bottom-24'
            animate={{
              scale: [1, 1.25, 1.25, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["50%", "0%", "50%", "0%", "50%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              // times: [0, 0.2, 0.5, 0.8, 1],
            }}
          />
          <div className='absolute h-48 w-48 bg-blue-100 rounded-[50%] -z-20 right-6 -top-24'></div>
          <h1 className='text-5xl font-bold leading-normal'>
            <span className='text-blue-400'>Empower</span> Dreams, Fund Futures:
            <span className='text-blue-400'> Join Our Crowd!</span>
          </h1>
          <p className='text-lg mt-4'>
            Be a part of the breakthrough and make someone’s dream come true.
          </p>
          <div>
            <button className='bg-blue-400 text-white px-4 py-2 rounded-md mt-4 shadow-2xl shadow-blue-900'>
              <Link to={"/projects/create"}>Start a project</Link>
            </button>
            <Link
              to='/projects/all'
              className='border border-black px-4 py-2 rounded-md ml-4 mt-4'
            >
              Discover Projects
            </Link>
          </div>
        </div>
        <div className='hidden medium:block bg-blue-200 text-center rounded-bl-[200px] rounded-tr-[200px]'>
          <img src={heroImg} className='w-1/2 mx-auto' alt='IMAGE' />
        </div>
      </section>
      <section className='py-36 pt-64 px-16 '>
        <span className='uppercase text-gray-400 font-semibold'>
          modern crowdfunding platform
        </span>
        <h2 className='text-4xl font-semibold'>
          Invest and support <span className='text-blue-400'>easily</span>,{" "}
          <span className='text-blue-400'>quickly</span>, and{" "}
          <span className='text-blue-400'>transparently</span>.
        </h2>
        <div className='flex justify-between mt-16 items-center flex-col md:flex-row'>
          <motion.div
            className='flex-1'
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.25 }}
            viewport={{
              amount: "some",
            }}
          >
            <img src={phoneImg} className=' h-[500px]' alt='' />
          </motion.div>
          <div className='flex-1'>
            <h1 className='text-4xl md:text-5xl'>
              Help the <span className='text-blue-400'>people</span> to achieve
              their <span className='text-blue-400'>goals</span> one step at a
              time and show them they can{" "}
              <span className='text-blue-400'>do it.</span>
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

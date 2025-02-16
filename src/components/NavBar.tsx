import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className='w-full bg-secondary py-2 px-8 flex items-center'>
      <Link className='flex items-center gap-1' href='/'>
        <Image src='/logo.png' alt="logo" width={40} height={100} />
        <h1 className='text-xl font-semibold'>FoodFile</h1>
      </Link>

      <span className='flex ml-auto gap-2'>
        <Link href='/login' className={buttonVariants({ size: 'sm'})}>Login</Link>
        <Link href='/sign-up' className={buttonVariants({ size: 'sm'})}>Sign Up</Link>
      </span>
    </div>
  )
}
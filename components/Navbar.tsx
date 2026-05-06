import Link from "next/link";
import { Button } from "@base-ui/react";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center py-5 px-4 md:px-8">
      <div className="text-lg font-semibold">
        <Link href={"/"}>AISum</Link>
      </div>
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  )
}

export default Navbar
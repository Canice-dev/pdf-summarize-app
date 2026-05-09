import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="bg-[#faf9f6] text-black flex justify-between items-center py-5 px-4 md:px-8">
      <div className="text-lg font-semibold">
        <Link href={"/"}>SumPDF📝</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/pdf-tools">PDFtools</Link>
        <Link href="/features">Features</Link>
        <Link href="/how-it-works">How it Works</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div className="flex items-center gap-6">
        <Button variant="outline">Upgrade to Pro</Button>
        <Button>Sign in</Button>
      </div>
      
    </div>
  )
}

export default Navbar
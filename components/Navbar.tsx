"use client";


import React, { useEffect } from 'react'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInWithPopup, signOut } from "firebase/auth"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import { auth, db, provider } from "@/config/firebaseConfig"
import { use, useState } from "react"
import { LogOut, SettingsIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

type AuthInfo = {
  userId: string
  userEmail: string
  name: string
  isAuth: boolean
}

// const Navbar = () => {
//   return (
//     <div className="bg-[#faf9f6] text-black flex justify-between items-center py-5 px-4 md:px-8">
//       <div className="text-lg font-semibold">
//         <Link href={"/"}>SumPDF📝</Link>
//       </div>
//       <div className="flex items-center gap-6">
//         <Link href="/pdf-tools">PDFtools</Link>
//         <Link href="/features">Features</Link>
//         <Link href="/how-it-works">How it Works</Link>
//         <Link href="/faq">FAQ</Link>
//       </div>
//       <div className="flex items-center gap-6">
//         <Button variant="outline">Upgrade to Pro</Button>
//         <Button>Sign in</Button>
//       </div>
      
//     </div>
//   )
// }

// export default Navbar



// const MenuIcon = () => (
//   <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//     <line x1="3" y1="6" x2="19" y2="6" />
//     <line x1="3" y1="12" x2="19" y2="12" />
//     <line x1="3" y1="18" x2="19" y2="18" />
//   </svg>
// );

// const CloseIcon = () => (
//   <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//     <line x1="4" y1="4" x2="18" y2="18" />
//     <line x1="18" y1="4" x2="4" y2="18" />
//   </svg>
// );

// function Frame({ label, width, children }: { label: string; width: number; children: React.ReactNode }) {
//   return (
//     <div>
//       <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{label}</p>
//       <div style={{ width: typeof width === 'number' ? `${width}px` : width, maxWidth: "100%" }} className="rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-white">
//         <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
//           <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
//           <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
//           <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
//           <span className="ml-2 text-xs text-gray-400">localhost:3000</span>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// // SMALL: logo + hamburger only
// function NavbarSmall() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="bg-[#faf9f6] text-black">
//       <div className="flex justify-between items-center py-5 px-4">
//         <span className="text-base font-semibold">SumPDF📝</span>
//         <button onClick={() => setOpen(o => !o)}>
//           {open ? <CloseIcon /> : <MenuIcon />}
//         </button>
//       </div>
//       <div className="overflow-hidden transition-all duration-300 border-t border-gray-100" style={{ maxHeight: open ? "400px" : "0px" }}>
//         <div className="flex flex-col px-4 pb-5 pt-3 gap-1">
//           {["PDFtools", "Features", "How it Works", "FAQ"].map(l => (
//             <a key={l} href="#" className="py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100 last:border-0">{l}</a>
//           ))}
//           <div className="flex flex-col gap-2 mt-3">
//             <button className="w-full border border-black text-black rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-all">Upgrade to Pro</button>
//             <button className="w-full bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-800 transition-all">Sign in</button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-5 py-8 flex flex-col gap-3">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-100 rounded w-full" />
//         <div className="h-3 bg-gray-100 rounded w-5/6" />
//       </div>
//     </div>
//   );
// }

// // MEDIUM: logo + PDFtools + Features + hamburger (How it Works, FAQ, buttons in dropdown)
// function NavbarMedium() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="bg-[#faf9f6] text-black">
//       <div className="flex justify-between items-center py-5 px-6">
//         <span className="text-base font-semibold">SumPDF📝</span>
//         <div className="flex items-center gap-6 text-sm text-gray-700">
//           <a href="#" className="hover:text-black">PDFtools</a>
//           <a href="#" className="hover:text-black">Features</a>
//         </div>
//         <button onClick={() => setOpen(o => !o)}>
//           {open ? <CloseIcon /> : <MenuIcon />}
//         </button>
//       </div>
//       <div className="overflow-hidden transition-all duration-300 border-t border-gray-100" style={{ maxHeight: open ? "400px" : "0px" }}>
//         <div className="flex flex-col px-6 pb-5 pt-3 gap-1">
//           {["How it Works", "FAQ"].map(l => (
//             <a key={l} href="#" className="py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100 last:border-0">{l}</a>
//           ))}
//           <div className="flex gap-2 mt-3">
//             <button className="flex-1 border border-black text-black rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-all">Upgrade to Pro</button>
//             <button className="flex-1 bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-800 transition-all">Sign in</button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-6 py-8 flex flex-col gap-3">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-100 rounded w-full" />
//         <div className="h-3 bg-gray-100 rounded w-5/6" />
//       </div>
//     </div>
//   );
// }

// // LARGE: full navbar, no hamburger
// function NavbarLarge() {
//   return (
//     <div className="bg-[#faf9f6] text-black">
//       <div className="flex justify-between items-center py-5 px-8">
//         <span className="text-lg font-semibold">SumPDF📝</span>
//         <div className="flex items-center gap-6 text-sm text-gray-700">
//           {["PDFtools", "Features", "How it Works", "FAQ"].map(l => (
//             <a key={l} href="#" className="hover:text-black">{l}</a>
//           ))}
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="border border-black text-black rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-all">Upgrade to Pro</button>
//           <button className="bg-black text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-all">Sign in</button>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-8 py-8 flex flex-col gap-3">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-100 rounded w-full" />
//         <div className="h-3 bg-gray-100 rounded w-5/6" />
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-10">
//       <Frame label="Small (~375px) — hamburger only" width={375}>
//         <NavbarSmall />
//       </Frame>
//       <Frame label="Medium (~768px) — PDFtools + Features + hamburger" width={768}>
//         <NavbarMedium />
//       </Frame>
//       <Frame label="Large (~1024px+) — full navbar, no hamburger" width={1024}>
//         <NavbarLarge />
//       </Frame>
//     </div>
//   );
// }



const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="19" y2="6" />
    <line x1="3" y1="12" x2="19" y2="12" />
    <line x1="3" y1="18" x2="19" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="4" x2="18" y2="18" />
    <line x1="18" y1="4" x2="4" y2="18" />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null)

// Read auth from localStorage on mount
useEffect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth")
    if (stored) {
      try {
        setAuthInfo(JSON.parse(stored))
      } catch {
        // malformed — ignore
      }
    }
  }
}, [])

  // const {isAuth,userEmail} = useGetUserInfo();


  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);

    // console.log("results:", results);

    const authInfo = {
      userId: results.user.uid,
      userEmail: results.user.email,
      name: results.user.displayName,
      isAuth: true
    };

    if(typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(authInfo));
    }
  };

  const handleSignOut = async () => {
  await signOut(auth)
  localStorage.removeItem("auth")
  setAuthInfo(null)
}

// Get initials from name e.g. "Canice Eze" → "CE"
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

// Get avatar URL from Google (Firebase gives us the photoURL on the user object)
// We store email only, so we use ui-avatars as fallback
const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(authInfo?.name ?? "")}&background=random&color=fff&size=128`

  return (
    <div className="bg-[#faf9f6] text-black">
      <div className="flex justify-between items-center py-5 px-4 md:px-8">
        <div className="text-lg font-semibold">
          <Link href="/">SumPDF📝</Link>
        </div>

        {/* Medium only: PDFtools + Features inline */}
        <div className="hidden md:flex lg:hidden items-center gap-6 text-sm text-gray-700">
          <Link href="/pdf-tools" className="hover:text-black">PDFtools</Link>
          <Link href="/features" className="hover:text-black">Features</Link>
        </div>

        {/* Large only: all links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/pdf-tools">PDFtools</Link>
          <Link href="/features">Features</Link>
          <Link href="/how-it-works">How it Works</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        {/* Large only: buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline">Upgrade to Pro</Button>

          {authInfo?.isAuth ? (
            // ── Signed in → show avatar with dropdown 
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/60 transition-all">
                    <AvatarImage src={avatarUrl} alt={authInfo.name} />
                    <AvatarFallback className="text-sm font-medium">
                      {getInitials(authInfo.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{authInfo.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {authInfo.userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SettingsIcon />
                        Settings
                    </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Dark Mode</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
            <>
              <Button variant="default" onClick={() => setOpen(!open)}>
                Sign In
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign in with google</DialogTitle>
                    <DialogDescription>
                      Please sign in with your google account to continue. This will allow you to upload and manage your documents, and have personalized interactions with the chatbot.
                      {/* Please Sign in with your Google account to continue. */}
                    </DialogDescription>
                    <Button className="mt-8" onClick={signInWithGoogle}>Sign In with Google</Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )
        }
          {/* <Button>Sign in</Button> */}
        </div>

        {/* Small + Medium: hamburger */}
        <button className="lg:hidden" onClick={() => setOpen(o => !o)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Dropdown — small + medium only */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 border-t border-gray-100"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <div className="flex flex-col px-4 md:px-8 pb-5 pt-3 gap-1">

          {/* Small only: show all 4 links */}
          <Link href="/pdf-tools" onClick={() => setOpen(false)}
            className="md:hidden py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100">
            PDFtools
          </Link>
          <Link href="/features" onClick={() => setOpen(false)}
            className="md:hidden py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100">
            Features
          </Link>

          {/* Small + Medium: last 2 links */}
          <Link href="/how-it-works" onClick={() => setOpen(false)}
            className="py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100">
            How it Works
          </Link>
          <Link href="/faq" onClick={() => setOpen(false)}
            className="py-2.5 text-sm text-gray-700 hover:text-black border-b border-gray-100">
            FAQ
          </Link>

          <div className="flex flex-col md:flex-row gap-2 mt-3">
            <Button variant="outline" className="flex-1 pt-2 pb-2">Upgrade to Pro</Button>
            <Button className="flex-1 pt-2 pb-2">Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

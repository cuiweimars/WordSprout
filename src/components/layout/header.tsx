"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Sight Words",
    href: "/sight-words",
    children: [
      { label: "Dolch Word List", href: "/sight-words/dolch" },
      { label: "Fry Word List", href: "/sight-words/fry" },
      { label: "By Grade Level", href: "/sight-words/kindergarten" },
    ],
  },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Worksheets", href: "/worksheets" },
  { label: "Games", href: "/games" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sprout-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-heading font-bold text-xl text-sprout-700">
              WordSprout
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-sprout-600 transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-white rounded-lg shadow-lg border py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-sprout-50 hover:text-sprout-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-20 h-8 bg-gray-100 rounded-full animate-pulse" />
            ) : session?.user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-sprout-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-sprout-100 flex items-center justify-center">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt=""
                        className="w-7 h-7 rounded-full"
                      />
                    ) : (
                      <User size={14} className="text-sprout-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {session.user.name || "Account"}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
                    <Link
                      href="/learn"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-sprout-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-gray-700 hover:text-sprout-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="bg-sprout-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-sprout-600 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 border-t" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-2 bg-white">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block py-1 pl-4 text-sm text-gray-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-2 border-t space-y-2">
            {session?.user ? (
              <>
                <Link
                  href="/learn"
                  className="block py-2 text-gray-700 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 py-2 text-gray-700 font-medium"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="block py-2 text-gray-700 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block text-center bg-sprout-500 text-white font-medium px-4 py-2 rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

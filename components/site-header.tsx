"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { getPersonalInfo } from "@/lib/data"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const personalInfo = getPersonalInfo()

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container-narrow border-b border-border">
        <div className="flex items-center justify-between py-4">
          {/* Name on left */}
          <Link href="/" className="text-xl font-bold !no-underline">
            {personalInfo.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/blog" className="text-sm hover:opacity-70 transition-opacity !no-underline">
              Posts
            </Link>
            <Link href="/about" className="text-sm hover:opacity-70 transition-opacity !no-underline">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/blog"
                className="text-sm hover:opacity-70 transition-opacity !no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Posts
              </Link>
              <Link
                href="/about"
                className="text-sm hover:opacity-70 transition-opacity !no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


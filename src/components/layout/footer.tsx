import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="bg-sprout-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span>🌱</span> WordSprout
            </h3>
            <p className="text-sprout-200 text-sm">
              Making sight word learning fun and effective for children ages 4-7.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Sight Words</h4>
            <ul className="space-y-2 text-sm text-sprout-200">
              <li><Link href="/sight-words/dolch" className="hover:text-white transition-colors">Dolch Words</Link></li>
              <li><Link href="/sight-words/fry" className="hover:text-white transition-colors">Fry Words</Link></li>
              <li><Link href="/sight-words/kindergarten" className="hover:text-white transition-colors">Kindergarten</Link></li>
              <li><Link href="/sight-words/first-grade" className="hover:text-white transition-colors">1st Grade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-sprout-200">
              <li><Link href="/flashcards" className="hover:text-white transition-colors">Flashcards</Link></li>
              <li><Link href="/worksheets" className="hover:text-white transition-colors">Worksheets</Link></li>
              <li><Link href="/games" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-sprout-200">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-sprout-700 text-center text-sm text-sprout-300">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

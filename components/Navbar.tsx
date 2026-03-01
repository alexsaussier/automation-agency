import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  activePage?: 'home' | 'about' | 'blog';
}

export default function Navbar({ activePage = 'home' }: NavbarProps) {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image 
              src="/logo_dark.jpeg" 
              alt="Teamdesk AI Logo" 
              width={50} 
              height={50}
              className="object-contain"
            />
            
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                activePage === 'home'
                  ? 'text-accent font-semibold'
                  : 'hover:text-accent'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`text-sm transition-colors ${
                activePage === 'about'
                  ? 'text-accent font-semibold'
                  : 'hover:text-accent'
              }`}
            >
              About
            </Link>

            <Link
              href="/blog"
              className={`text-sm transition-colors ${
                activePage === 'blog'
                  ? 'text-accent font-semibold'
                  : 'hover:text-accent'
              }`}
            >
              Blog
            </Link>
          </div>
          <a href="/#get-started" className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}

import Link from 'next/link';

interface NavbarProps {
  activePage?: 'home' | 'about';
}

export default function Navbar({ activePage = 'home' }: NavbarProps) {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold font-[family-name:var(--font-inter)]">
              <span className="text-accent">
                {process.env.NEXT_PUBLIC_COMPANY_NAME}
              </span>
            </h1>
          </div>
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
          </div>
          <a href="/#get-started" className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            &copy; 2026 {process.env.NEXT_PUBLIC_COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-sm text-foreground/60 hover:text-accent transition-colors">
              Blog
            </a>
            <a href="/privacy" className="text-sm text-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

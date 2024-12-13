interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full" />
    </a>
  );
}
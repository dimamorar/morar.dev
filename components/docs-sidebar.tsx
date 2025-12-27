"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface DocsSidebarProps {
  sections: SidebarSection[];
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-20 pr-6">
        <nav className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-mono text-sm font-medium mb-2">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-sm py-1 text-muted-foreground hover:text-foreground transition-colors",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}


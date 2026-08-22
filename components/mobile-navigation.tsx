"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/content/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("menuOpen", open);
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
      if (event.key !== "Tab" || !open || !menuRef.current) return;
      const focusable = [...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.classList.remove("menuOpen");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [open]);

  return (
    <>
      <button ref={buttonRef} className="menuToggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <div ref={menuRef} id="mobile-menu" className="mobileMenu" hidden={!open} role="dialog" aria-modal="true" aria-label="Site navigation">
        <nav aria-label="Mobile navigation">
          {[...navigation, { href: "/contact", label: "Contact" }].map((item, index) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}</Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </>
  );
}

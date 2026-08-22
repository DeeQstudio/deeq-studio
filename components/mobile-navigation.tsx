"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menuOpen", open);
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("menuOpen");
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <>
      <button ref={buttonRef} className="menuToggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <div id="mobile-menu" className="mobileMenu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {[...navigation, { href: "/contact", label: "Contact" }].map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}</Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </>
  );
}

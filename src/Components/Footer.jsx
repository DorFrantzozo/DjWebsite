import React from "react";
import { profile } from "../data";
const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
        <p>
          © {new Date().getFullYear()} {profile.stageName}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white inline-flex items-center gap-1"
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { profile } from "../data";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10">
      <div
        className="mx-auto max-w-screen-xl px-4 py-10 
                      flex flex-col sm:flex-row items-center 
                      justify-between gap-4 text-white/60 text-sm"
      >
        <p className="text-center sm:text-left min-w-0 shrink">
          © {new Date().getFullYear()} {profile.stageName}. All rights reserved.
        </p>

        {/* שימי לב: w-full במקום w-screen + עטיפה */}
        <div
          className="flex w-full sm:w-auto flex-wrap items-center 
                        justify-center sm:justify-end gap-x-4 gap-y-2"
        >
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white inline-flex items-center gap-1 max-w-full"
            >
              <s.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

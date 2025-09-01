import React from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { Button } from "./ui/button";
import profilePic from "../assets/Img/dorProfile.jpg";
import banner from "../assets/Img/evyatarsPartsy.jpg";
const Hero = ({ profile }) => {
  return (
    <>
      <section className="relative  -top-10 isolate">
        <div
          className="absolute inset-0  -z-10"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            filter: "brightness(0.45)",
          }}
        />
        <div className="container mx-auto px-4 py-28 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h1 className="mt-6 text-4xl/tight sm:text-6xl/tight font-extrabold tracking-tight text-white">
              {profile.stageName}
            </h1>

            <p className="mt-3 text-lg text-white/80">{profile.tagline}</p>
            <p className="mt-1 text-sm text-white/60">{profile.city}</p>

            {/* תמונת פרופיל */}
            <div className="mt-6">
              <img
                src={profilePic}
                alt="Profile"
                className="h-32 w-32  rounded-full ring-4 ring-white/20 object-cover object-[80%_20%] shadow-lg"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.socials.map((s) => (
                <Button
                  key={s.label}
                  asChild
                  variant="secondary"
                  className="rounded-2xl bg-white/80  transition duration-200 hover:bg-white/20"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <s.icon className="h-5 w-5" /> {s.label}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
          <div>
            <button className="bg-orange-500 mt-10 rounded-2xl cursor-pointer hover:bg-orange-600 hover:scale-105 duration-300  p-2 text-white w-40">
              <a href="https://wa.me/972534314774"> Book Me</a>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>
    </>
  );
};

export default Hero;

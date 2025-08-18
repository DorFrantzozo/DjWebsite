import React from "react";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Footer from "../Components/Footer";
import { profile, mediaItems } from "../data";
import UpcomingEvents from "@/Components/UpcomingEvents";
import SoundCloud from "@/Components/SoundCloud";
import MediaGallery from "../Components/MediaGallery";
import BentoGallery from "@/Components/BentoGallery";

const HomePage = () => {
  return (
    <div>
      <Hero profile={profile} />

      <section className="container mx-auto px-4 py-14">
        <About profile={profile} />
      </section>
      <UpcomingEvents />
      <SoundCloud />
      <div className="mt-20">
        <BentoGallery items={mediaItems} />
      </div>
      <Footer profile={profile} />
    </div>
  );
};

export default HomePage;

import { Instagram, Youtube } from "lucide-react";
import { Facebook } from "lucide-react";
import { AudioLines } from "lucide-react";
import { LinkIcon } from "lucide-react";
import profilePic from "./assets/Img/profilePic.jpg";
import sunkiss from "./assets/Img/sunkissEvent.jpg";
import vidSunkiss from "./assets/Img/vidSunkiss.mp4";
import theWell1 from "./assets/Img/theWell1.jpg";
import rotch1 from "./assets/Img/rotch1.jpg";
import herovideo from "./assets/Img/heroVideo.mp4";
import theWell2 from "./assets/Img/theWell2.jpg";
import dorAndBarak from "./assets/Img/DorAndBarakSet.jpg";
import shtobiya from "./assets/Img/shtobiya.jpg";
import sunkissVid from "./assets/Img/VID-20250818-WA0003.mp4";

const profile = {
  stageName: "Dj DØR",
  tagline: "Electronic • House • Afro House • Techno • MainStream ",
  city: "Tel Aviv, Israel",
  heroImage:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop", // תמונת רקע גדולה

  about:
    "Passionate DJ specializing in Afro House and modern House grooves. Every set is a journey — blending rhythm, soul, and raw energy to create an unforgettable dancefloor experience. Driven by connection. Fueled by sound.",

  socials: [
    {
      label: "SoundCloud",
      href: "https://soundcloud.com/dor-frantzozo",
      icon: AudioLines,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/dor_frantzozo/",
      icon: Instagram,
    },
    {
      label: "youtube",
      href: "https://www.youtube.com/@DjDorFr",
      icon: Youtube,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100004617544310",
      icon: Facebook,
    },
    {
      label: "Linktree",
      href: "https://linktr.ee/dorfrant",
      icon: LinkIcon,
    },
    // { label: "Links", href: "https://linktr.ee/", icon: LinkIcon },
  ],
  contact: {
    email: "dorfrant@gmail.com.com",
    phone: "+972-53-431-4774",
  },
};

const events = [
  {
    title: "Sphera",
    date: "October 8, 2025",
    location: "Rehovot, Hamada St 18",
    hour: "20:00",
  },
  {
    title: "Rotch.64",
    date: "October 10, 2025",
    location: "Rishon Lezion,  rothschild bvld 64",
    hour: "12:00",
  },
  {
    title: "Rotch.64",
    date: "October 14, 2025",
    location: "Rishon Lezion,  rothschild bvld 64",
    hour: "21:00",
  },
  {
    title: "Rotch.64",
    date: "October 18, 2025",
    location: "Rishon Lezion,  rothschild bvld 64",
    hour: "21:00",
  },
  {
    title: "Sphera",
    date: "October 21, 2025",
    location: "Rehovot, Hamada St 18",
    hour: "21:00",
  },
  {
    title: "Sphera",
    date: "October 22, 2025",
    location: "Rehovot, Hamada St 18",
    hour: "21:00",
  },

  {
    title: "Rotch.64",
    date: "October 24, 2025",
    location: "Rishon Lezion,  rothschild bvld 64",
    hour: "21:00",
  },
];

const mediaItems = [
  {
    type: "video",
    src: herovideo,
    alt: "DJ Set Video",
  },
  {
    type: "image",
    src: shtobiya,
    alt: "Event Image 3",
  },
  { type: "image", src: profilePic, alt: "Profile Picture" },
  {
    type: "image",
    src: theWell1,
    alt: "Event Image 1",
  },
  { type: "image", src: dorAndBarak, alt: "Sunkiss Event" },
  {
    type: "image",
    src: rotch1,
    alt: "Rotch 64 Event Image",
  },

  {
    type: "video",
    src: vidSunkiss,
    alt: "Sunkiss Event Video",
  },

  { type: "image", src: theWell2 },
  { type: "image", src: sunkiss, alt: "Sunkiss Event" },
];

export { profile, events, mediaItems };

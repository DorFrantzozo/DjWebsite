import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../Components/ui/card";
import { CalendarDays, PartyPopper, MapPin, Clock } from "lucide-react";
import { get, ENDPOINTS } from "../services/apiClient";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const data = await get(ENDPOINTS.GIGS);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchGigs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  if (!events || events.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white flex items-center gap-3 drop-shadow-md"
        >
          Upcoming Gigs
          <PartyPopper className="h-7 w-7 text-orange-400" />
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100px" }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-orange-500 to-transparent mt-2 rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {events.map((event, index) => (
          <motion.div key={event._id || index} variants={cardVariants}>
            <Card
              className="group h-full relative overflow-hidden bg-black/40 backdrop-blur-md text-white/90 border border-white/10 hover:border-orange-500/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(234,88,12,0.15)] rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-xl flex items-center gap-3 font-medium tracking-wide">
                  <div className="bg-gradient-to-tr from-orange-600 via-orange-500 to-orange-400 p-2.5 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                    <CalendarDays className="h-5 w-5 text-white" />
                  </div>
                  {event.venueName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-white/70 text-base relative z-10 space-y-1.5 ml-[52px]">
                <p className="flex items-center gap-2 font-medium text-white/80">
                  <span className="text-orange-400/80">•</span> {event.date}
                </p>
                {event.description && (
                  <p className="flex items-center gap-2">
                    <span className="text-orange-400/80">•</span> {event.description}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <span className="text-orange-400/80">•</span> {event.time}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default UpcomingEvents;

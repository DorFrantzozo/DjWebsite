import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../Components/ui/card";
import { CalendarDays, PartyPopper } from "lucide-react";
import { events } from "../data";
const UpcomingEvents = () => {
  return (
    <section className="container mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          This Month Events{" "}
          <PartyPopper className="inline-block h-6 w-6  ms-2   text-white" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card
              key={event.title + event.date}
              className="bg-white/5 text-white/90 border-white/10 hover:border-orange-400 hover:scale-105 transition-all duration-200"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" /> {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-white/70 text-sm">
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>{event.hour}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default UpcomingEvents;

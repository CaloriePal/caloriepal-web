'use client';

import { motion } from "framer-motion";
import { Dumbbell, Flame, Trophy, Sparkles, Shield, Swords } from "lucide-react";
import { FeatureCard } from "./components";
import { GoogleSignInButton } from "@components";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime/30 bg-lime/5 text-xs text-lime mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Level up your fitness journey
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-cream leading-tight mb-4"
            >
              Turn every rep into{" "}
              <span className="text-lime">XP</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base lg:text-lg text-sand mb-8 max-w-md leading-relaxed"
            >
              CaloriePal is the RPG-style fitness tracker that rewards your workouts,
              nutrition, and habits with quests, loot, and legendary streaks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 max-w-sm"
            >
              <GoogleSignInButton />

              <p className="text-xs text-dim text-center pt-1">
                By signing in, you agree to our Terms &amp; Privacy Policy.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-border bg-card p-8 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl border border-lime/10 pointer-events-none" />

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-32 h-32 rounded-full border-2 border-lime/50 bg-lime/10 flex items-center justify-center"
                    style={{ boxShadow: '0 0 32px rgba(200,245,122,0.15)' }}>
                    <Swords className="w-14 h-14 text-lime" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-lime text-black font-heading font-bold text-sm w-10 h-10 rounded-full flex items-center justify-center border-2 border-card">
                    14
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-cream">Draven Ironfist</h3>
                <p className="text-sm text-sand mb-5">Iron Guardian · Warrior</p>

                <div className="w-full mb-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-lime font-heading font-semibold">Level 14</span>
                    <span className="text-sand">2,340 / 4,000 XP</span>
                  </div>
                  <div className="h-2.5 bg-subtle rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-lime"
                      initial={{ width: 0 }}
                      animate={{ width: "58%" }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      style={{ boxShadow: '0 0 8px rgba(200,245,122,0.5)' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                  {[
                    { icon: Flame, label: "Streak", value: "18d", color: "text-rose" },
                    { icon: Trophy, label: "Quests", value: "47", color: "text-lime" },
                    { icon: Shield, label: "Rank", value: "#312", color: "text-cream" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-subtle border border-border p-3">
                      <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                      <div className="font-heading font-bold text-sm text-cream">{stat.value}</div>
                      <div className="text-[10px] text-sand uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={Dumbbell}
            title="Train & Earn XP"
            description="Log workouts and watch your character level up with every set, mile, and PR."
            iconClass="bg-lime/10 text-lime"
            delay={0.4}
          />
          <FeatureCard
            icon={Swords}
            title="Daily Quests"
            description="Take on quests for hydration, protein, and movement. Build streaks that pay off."
            iconClass="bg-sky/10 text-sky"
            delay={0.5}
          />
          <FeatureCard
            icon={Trophy}
            title="Climb the Ranks"
            description="Unlock achievements, collect loot, and rise through global and friend leaderboards."
            iconClass="bg-gold/10 text-gold"
            delay={0.6}
          />
        </div>
      </main>

      <footer className="relative border-t border-border mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-sand">
            ⚔️ Forged for warriors. Built for the long grind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

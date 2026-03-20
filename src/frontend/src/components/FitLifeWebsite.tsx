import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Apple,
  Check,
  ChevronRight,
  Dumbbell,
  Facebook,
  Heart,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Star,
  Twitter,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetTestimonials } from "../hooks/useQueries";

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Diet Plans", href: "#diet" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Reviews", href: "#reviews" },
];

const JOURNEY_CARDS = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Youth Fitness",
    age: "Ages 13–25",
    desc: "High-energy workouts that build athleticism, coordination, and healthy habits for life.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Dumbbell className="w-8 h-8" />,
    title: "Adult Strength",
    age: "Ages 26–50",
    desc: "Progressive strength programs that build lean muscle, boost metabolism, and improve posture.",
    color: "from-violet-500 to-blue-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Senior Vitality",
    age: "Ages 51+",
    desc: "Low-impact programs focused on mobility, balance, and longevity for active senior living.",
    color: "from-orange-400 to-rose-500",
  },
  {
    icon: <Apple className="w-8 h-8" />,
    title: "Diet Plans",
    age: "All Ages",
    desc: "Personalized nutrition strategies tailored to your age, goals, and lifestyle.",
    color: "from-green-400 to-emerald-500",
  },
];

const PROGRAMS = [
  {
    id: 1,
    title: "Youth Energy Blast",
    category: "Youth",
    level: "Beginner",
    duration: "30 min",
    frequency: "4x / week",
    image: "/assets/generated/program-youth.dim_800x500.jpg",
    desc: "Dynamic cardio, plyometrics, and bodyweight circuits designed for teens and young adults.",
  },
  {
    id: 2,
    title: "Intermediate Strength",
    category: "Adult",
    level: "Intermediate",
    duration: "50 min",
    frequency: "5x / week",
    image: "/assets/generated/program-strength.dim_800x500.jpg",
    desc: "Compound lifts, progressive overload principles, and hypertrophy-focused training.",
  },
  {
    id: 3,
    title: "Senior Strength & Balance",
    category: "Senior",
    level: "Beginner",
    duration: "40 min",
    frequency: "3x / week",
    image: "/assets/generated/program-senior.dim_800x500.jpg",
    desc: "Gentle resistance training and balance exercises for active aging and injury prevention.",
  },
  {
    id: 4,
    title: "Core & Flexibility",
    category: "All Ages",
    level: "All Levels",
    duration: "35 min",
    frequency: "3x / week",
    image: "/assets/generated/program-core.dim_800x500.jpg",
    desc: "Deep core activation, yoga-inspired flows, and mobility drills for full-body function.",
  },
  {
    id: 5,
    title: "Advanced Power Build",
    category: "Adult",
    level: "Advanced",
    duration: "60 min",
    frequency: "5x / week",
    image: "/assets/generated/program-strength.dim_800x500.jpg",
    desc: "High-intensity powerlifting meets athletic conditioning for serious peak performance.",
  },
  {
    id: 6,
    title: "Beginner Full Body",
    category: "All Ages",
    level: "Beginner",
    duration: "45 min",
    frequency: "3x / week",
    image: "/assets/generated/program-beginner.dim_800x500.jpg",
    desc: "The perfect starting point — learn proper form, build foundational strength and endurance.",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "All Levels": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const DIET_PLANS = [
  {
    title: "Weight Loss",
    tag: "Calorie Deficit",
    desc: "A science-backed approach to sustainable fat loss without sacrificing muscle.",
    features: [
      "1,600–1,900 kcal / day",
      "High protein 40%",
      "Meal timing protocol",
      "Weekly cheat meal",
      "Supplement guide",
    ],
    color: "border-t-4 border-t-rose-500",
  },
  {
    title: "Muscle Building",
    tag: "Calorie Surplus",
    desc: "Fuel serious gains with strategic macros and timed nutrient intake.",
    features: [
      "2,800–3,400 kcal / day",
      "High carb + protein",
      "Pre/post-workout meals",
      "Creatine protocol",
      "Bulking vs cutting cycles",
    ],
    color: "border-t-4 border-t-fit-blue",
  },
  {
    title: "Senior Nutrition",
    tag: "Healthy Aging",
    desc: "Nutrient-dense meals that support bone health, joint function, and cognitive wellness.",
    features: [
      "Anti-inflammatory foods",
      "Calcium & vitamin D rich",
      "Omega-3 focus",
      "Hydration strategy",
      "Easy meal prep",
    ],
    color: "border-t-4 border-t-orange-400",
  },
  {
    title: "Youth Performance",
    tag: "Athletic Fuel",
    desc: "Optimized nutrition for growing bodies with high energy demands and rapid recovery.",
    features: [
      "2,200–2,800 kcal / day",
      "Complex carbs priority",
      "Post-school snack plan",
      "Recovery smoothies",
      "Avoid junk food guide",
    ],
    color: "border-t-4 border-t-green-400",
  },
];

const COACHES = [
  {
    name: "Marcus Rivera",
    specialty: "Strength & Hypertrophy",
    experience: 10,
    bio: "Former competitive powerlifter turned certified personal trainer. Specializes in helping adults achieve peak physical performance.",
    image: "/assets/generated/coach-marcus.dim_400x400.jpg",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "Sarah Chen",
    specialty: "Yoga & Mobility",
    experience: 8,
    bio: "Certified yoga instructor and mobility specialist helping clients of all ages move better, feel better, and live pain-free.",
    image: "/assets/generated/coach-sarah.dim_400x400.jpg",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "James Mitchell",
    specialty: "Senior Fitness",
    experience: 15,
    bio: "Dedicated senior fitness expert with a background in physical therapy. Helping those 50+ reclaim vitality and independence.",
    image: "/assets/generated/coach-james.dim_400x400.jpg",
    socials: { instagram: "#", twitter: "#" },
  },
];

const SAMPLE_TESTIMONIALS = [
  {
    id: 1n,
    name: "Alex Thompson",
    age: 28n,
    rating: 5n,
    review:
      "FitLife completely changed my approach to training. Lost 22 lbs in 3 months while gaining serious strength. Best investment I've made.",
    transformation: "Lost 22 lbs, gained lean muscle",
  },
  {
    id: 2n,
    name: "Maria Santos",
    age: 62n,
    rating: 5n,
    review:
      "After my knee surgery, I never thought I'd be this active again. Coach James designed the perfect program. I feel 20 years younger!",
    transformation: "Post-surgery recovery, regained full mobility",
  },
  {
    id: 3n,
    name: "Jake Williams",
    age: 19n,
    rating: 5n,
    review:
      "Started as a total beginner. Now I'm training 5x a week and my confidence is through the roof. The youth program is incredible!",
    transformation: "Gained 15 lbs of muscle, improved athleticism",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${
            n <= rating ? "fill-fit-gold text-fit-gold" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  label,
  title,
  subtitle,
  light = false,
}: { label?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-14">
      {label && (
        <span
          className={`text-xs font-bold uppercase tracking-[0.25em] ${
            light ? "text-fit-blue" : "text-fit-blue"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-heading text-3xl md:text-4xl font-extrabold uppercase mt-2 ${
          light ? "text-[oklch(0.15_0_0)]" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base max-w-xl mx-auto ${
            light ? "text-gray-500" : "text-fit-light-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FitLifeWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSending, setContactSending] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  // Review form
  const [reviewForm, setReviewForm] = useState({
    name: "",
    age: "",
    rating: 5,
    text: "",
    transformation: "",
  });
  const [reviewSending, setReviewSending] = useState(false);

  const { data: backendTestimonials } = useGetTestimonials();

  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials.map((t) => ({
          id: t.id,
          name: t.name,
          age: t.age,
          rating: t.rating,
          review: t.review,
          transformation: t.transformation,
        }))
      : SAMPLE_TESTIMONIALS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactSending(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setContactSent(true);
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setContactSending(false);
    }
  }

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    setReviewSending(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Thank you for your review!");
      setReviewForm({
        name: "",
        age: "",
        rating: 5,
        text: "",
        transformation: "",
      });
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setReviewSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy font-body">
      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-navy"
        }`}
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <div className="w-8 h-8 rounded bg-fit-blue flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-extrabold uppercase text-white tracking-widest">
                FitLife
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-fit-light-gray hover:text-white transition-colors uppercase tracking-wide"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="hidden md:flex bg-fit-blue hover:bg-fit-blue-bright text-white font-bold uppercase tracking-wider text-xs"
                data-ocid="nav.primary_button"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join Now
              </Button>
              <button
                type="button"
                className="md:hidden text-white p-1"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="nav.toggle"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-mid border-t border-border"
              data-ocid="nav.panel"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold text-fit-light-gray hover:text-white uppercase tracking-wide py-2"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  size="sm"
                  className="mt-2 bg-fit-blue text-white font-bold uppercase tracking-wider text-xs"
                  data-ocid="nav.primary_button"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-fitness.dim_1920x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-fit-blue mb-4">
              Welcome to FitLife
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold uppercase text-white leading-tight mb-6">
              Fitness For <span className="text-fit-blue">Every</span>
              <br />
              Age
            </h1>
            <p className="text-lg md:text-xl text-fit-light-gray mb-10 max-w-xl mx-auto">
              Tailored programs for youth, adults, and seniors. Your journey to
              a stronger, healthier life starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-fit-blue hover:bg-fit-blue-bright text-white font-bold uppercase tracking-widest px-8"
                data-ocid="hero.primary_button"
                onClick={() =>
                  document
                    .getElementById("programs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Programs
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 font-bold uppercase tracking-widest px-8"
                data-ocid="hero.secondary_button"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Meet Our Coaches
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-fit-blue" />
          <span className="text-xs text-fit-light-gray uppercase tracking-widest">
            Scroll
          </span>
        </div>
      </section>

      {/* ── CHOOSE YOUR JOURNEY ── */}
      <section className="py-24 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Find Your Path"
            title="Choose Your Journey"
            subtitle="Wherever you are in life, we have a program built specifically for you."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-navy-card rounded-lg p-6 border border-border hover:border-fit-blue/50 transition-all group cursor-pointer"
                data-ocid={`journey.item.${i + 1}`}
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {card.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-fit-blue mb-1">
                  {card.age}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 uppercase">
                  {card.title}
                </h3>
                <p className="text-sm text-fit-light-gray leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center text-fit-blue text-xs font-bold uppercase tracking-wide gap-1">
                  Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Workout Plans"
            title="Featured Workout Programs"
            subtitle="Science-backed training programs designed by certified coaches for every fitness level."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-navy-card rounded-lg overflow-hidden border border-border hover:border-fit-blue/50 hover:shadow-glow transition-all group"
                data-ocid={`programs.item.${i + 1}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-card/80 to-transparent" />
                  <Badge
                    className={`absolute top-3 right-3 text-xs font-bold uppercase border ${
                      LEVEL_COLORS[prog.level] ?? "bg-gray-500/20 text-gray-400"
                    }`}
                    variant="outline"
                  >
                    {prog.level}
                  </Badge>
                  <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-widest text-fit-blue bg-navy/70 px-2 py-0.5 rounded">
                    {prog.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-white uppercase mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-fit-light-gray mb-4 leading-relaxed">
                    {prog.desc}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-fit-light-gray mb-4">
                    <span>⏱ {prog.duration}</span>
                    <span>📅 {prog.frequency}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-fit-blue/50 text-fit-blue hover:bg-fit-blue hover:text-white font-bold uppercase tracking-wider text-xs"
                    data-ocid={`programs.item.${i + 1}`}
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIET PLANS ── */}
      <section id="diet" className="py-24 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Nutrition"
            title="Diet Plans"
            subtitle="Fuel your transformation with expertly crafted nutrition plans for every goal and every age."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIET_PLANS.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-navy-card rounded-lg p-6 border border-border hover:border-fit-blue/40 transition-all ${plan.color}`}
                data-ocid={`diet.item.${i + 1}`}
              >
                <div className="mb-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest bg-fit-blue/20 text-fit-blue px-2 py-1 rounded">
                    {plan.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-2">
                  {plan.title}
                </h3>
                <p className="text-sm text-fit-light-gray mb-5 leading-relaxed">
                  {plan.desc}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-fit-light-gray"
                    >
                      <Check className="w-4 h-4 text-fit-blue shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  className="mt-6 w-full bg-fit-blue/20 hover:bg-fit-blue text-fit-blue hover:text-white border border-fit-blue/30 font-bold uppercase tracking-wider text-xs transition-all"
                  data-ocid={`diet.item.${i + 1}`}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get This Plan
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <img
              src="/assets/generated/diet-nutrition.dim_800x500.jpg"
              alt="Healthy nutrition"
              className="w-full max-h-64 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ── REVIEWS / TRANSFORMATIONS ── */}
      <section id="reviews" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Success Stories"
            title="Transformations & Reviews"
            subtitle="Real results from real people. See how FitLife has changed lives across every age group."
          />

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={String(t.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[oklch(0.22_0.05_252)] rounded-lg p-6 border border-fit-blue/30"
                data-ocid={`reviews.item.${i + 1}`}
              >
                <StarRating rating={Number(t.rating)} />
                <p className="mt-4 text-sm text-fit-light-gray leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-fit-blue/20">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-fit-light-gray mt-0.5">
                    Age {String(t.age)}
                  </div>
                  {t.transformation && (
                    <div className="mt-2 text-xs font-semibold text-fit-blue">
                      🏆 {t.transformation}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit review form */}
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-white uppercase text-center mb-8">
              Share Your Story
            </h3>
            <form
              onSubmit={handleReview}
              className="bg-navy-card rounded-lg p-8 border border-border space-y-4"
              data-ocid="review.panel"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="review-name"
                    className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <Input
                    id="review-name"
                    required
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Alex Johnson"
                    className="bg-navy border-border text-white placeholder:text-gray-600"
                    data-ocid="review.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="review-age"
                    className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                  >
                    Age
                  </label>
                  <Input
                    id="review-age"
                    required
                    type="number"
                    min={13}
                    max={100}
                    value={reviewForm.age}
                    onChange={(e) =>
                      setReviewForm((p) => ({ ...p, age: e.target.value }))
                    }
                    placeholder="28"
                    className="bg-navy border-border text-white placeholder:text-gray-600"
                    data-ocid="review.input"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5">
                  Rating
                </p>
                <div className="flex gap-2" data-ocid="review.select">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewForm((p) => ({ ...p, rating: star }))
                      }
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= reviewForm.rating
                            ? "fill-fit-gold text-fit-gold"
                            : "text-gray-600 hover:text-fit-gold"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="review-text"
                  className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                >
                  Your Review
                </label>
                <Textarea
                  id="review-text"
                  required
                  rows={3}
                  value={reviewForm.text}
                  onChange={(e) =>
                    setReviewForm((p) => ({ ...p, text: e.target.value }))
                  }
                  placeholder="Tell us about your experience with FitLife..."
                  className="bg-navy border-border text-white placeholder:text-gray-600 resize-none"
                  data-ocid="review.textarea"
                />
              </div>
              <div>
                <label
                  htmlFor="review-transform"
                  className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                >
                  Transformation (optional)
                </label>
                <Input
                  id="review-transform"
                  value={reviewForm.transformation}
                  onChange={(e) =>
                    setReviewForm((p) => ({
                      ...p,
                      transformation: e.target.value,
                    }))
                  }
                  placeholder="e.g. Lost 15 lbs in 2 months"
                  className="bg-navy border-border text-white placeholder:text-gray-600"
                  data-ocid="review.input"
                />
              </div>
              <Button
                type="submit"
                disabled={reviewSending}
                className="w-full bg-fit-blue hover:bg-fit-blue-bright text-white font-bold uppercase tracking-widest"
                data-ocid="review.submit_button"
              >
                {reviewSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Submit Review
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ── ABOUT US / COACHES ── */}
      <section id="about" className="py-24 bg-[oklch(0.97_0_0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="About FitLife"
            title="Expert Coaches"
            subtitle="Meet the certified professionals dedicated to guiding your fitness journey at every stage of life."
            light
          />

          {/* Mission */}
          <div className="bg-navy rounded-lg p-8 mb-14 text-center max-w-3xl mx-auto border border-border">
            <h3 className="font-heading text-xl font-bold text-white uppercase mb-3">
              Our Mission
            </h3>
            <p className="text-fit-light-gray text-base leading-relaxed">
              FitLife was founded on the belief that fitness is a lifelong
              journey — not a phase. We create evidence-based programs that meet
              you where you are, whether you&apos;re 13 or 75, just starting out
              or training for competition. Every body deserves expert guidance,
              community support, and results that last.
            </p>
          </div>

          {/* Coach cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COACHES.map((coach, i) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-card text-center border border-gray-100"
                data-ocid={`about.item.${i + 1}`}
              >
                <div className="bg-navy-mid p-8 flex justify-center">
                  <Avatar className="w-24 h-24 border-4 border-fit-blue">
                    <AvatarImage src={coach.image} alt={coach.name} />
                    <AvatarFallback className="bg-fit-blue text-white font-bold text-2xl">
                      {coach.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-[oklch(0.15_0_0)] uppercase">
                    {coach.name}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-widest text-fit-blue mt-1 mb-3">
                    {coach.specialty}
                  </div>
                  <div className="inline-block bg-fit-blue/10 text-fit-blue text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {coach.experience} Years Experience
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {coach.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={coach.socials.instagram}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-fit-blue hover:text-white transition-colors text-gray-600"
                      data-ocid={`about.item.${i + 1}`}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={coach.socials.twitter}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-fit-blue hover:text-white transition-colors text-gray-600"
                      data-ocid={`about.item.${i + 1}`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Get In Touch"
            title="Contact Us"
            subtitle="Have questions about our programs? Our team is ready to help you start your fitness journey."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4">
                  Ready to Transform?
                </h3>
                <p className="text-fit-light-gray leading-relaxed">
                  Join over 10,000 members who have transformed their lives with
                  FitLife. Fill out the form and one of our expert coaches will
                  reach out within 24 hours to discuss your goals.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "hello@fitlife.com",
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: "+1 (800) FIT-LIFE",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Location",
                    value: "New York, NY · Los Angeles, CA · Chicago, IL",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-fit-blue/20 flex items-center justify-center text-fit-blue shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-fit-light-gray">
                        {item.label}
                      </div>
                      <div className="text-white font-semibold mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              className="bg-navy-card rounded-lg p-8 border border-border"
              data-ocid="contact.panel"
            >
              {contactSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-fit-light-gray text-sm">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6 border-fit-blue/50 text-fit-blue font-bold uppercase"
                    onClick={() => setContactSent(false)}
                    data-ocid="contact.secondary_button"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                    >
                      Full Name
                    </label>
                    <Input
                      id="contact-name"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="bg-navy border-border text-white placeholder:text-gray-600"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      className="bg-navy border-border text-white placeholder:text-gray-600"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-bold uppercase tracking-wider text-fit-light-gray mb-1.5 block"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell us about your fitness goals..."
                      className="bg-navy border-border text-white placeholder:text-gray-600 resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactSending}
                    className="w-full bg-fit-blue hover:bg-fit-blue-bright text-white font-bold uppercase tracking-widest"
                    data-ocid="contact.submit_button"
                  >
                    {contactSending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-fit-blue flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading text-xl font-extrabold uppercase text-white tracking-widest">
                  FitLife
                </span>
              </div>
              <p className="text-sm text-fit-light-gray leading-relaxed mb-5">
                Transforming lives through science-backed fitness programs for
                every age, every goal, every journey.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Instagram className="w-4 h-4" />,
                    href: "#",
                    name: "instagram",
                  },
                  {
                    icon: <Twitter className="w-4 h-4" />,
                    href: "#",
                    name: "twitter",
                  },
                  {
                    icon: <Facebook className="w-4 h-4" />,
                    href: "#",
                    name: "facebook",
                  },
                  {
                    icon: <Youtube className="w-4 h-4" />,
                    href: "#",
                    name: "youtube",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="w-9 h-9 rounded bg-navy-card flex items-center justify-center text-fit-light-gray hover:text-white hover:bg-fit-blue transition-all"
                    data-ocid="footer.link"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-fit-light-gray hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-4">
                Programs
              </h4>
              <ul className="space-y-2">
                {[
                  "Youth Energy Blast",
                  "Intermediate Strength",
                  "Senior Balance",
                  "Core & Flexibility",
                  "Advanced Power Build",
                ].map((p) => (
                  <li key={p}>
                    <a
                      href="#programs"
                      className="text-sm text-fit-light-gray hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-4">
                Newsletter
              </h4>
              <p className="text-sm text-fit-light-gray mb-4">
                Get weekly workouts and nutrition tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-navy-card border-border text-white placeholder:text-gray-600 text-sm"
                  data-ocid="footer.input"
                />
                <Button
                  size="sm"
                  className="bg-fit-blue hover:bg-fit-blue-bright text-white shrink-0"
                  data-ocid="footer.submit_button"
                  onClick={() => toast.success("Subscribed! Check your inbox.")}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fit-light-gray">
            <span>
              &copy; {new Date().getFullYear()} FitLife. All rights reserved.
            </span>
            <span>
              Built with{" "}
              <Heart className="w-3 h-3 inline text-rose-500 fill-rose-500" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fit-blue hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

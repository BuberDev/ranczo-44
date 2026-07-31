"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Review {
  author: string;
  text: string;
  avatar: string;
  avatarAlt: string;
}

const reviews: Review[] = [
  {
    author: "S.P.",
    text: "Przecudowne miejsce na relaks i ucieczkę od szumu miasta. Domki są w pełni wyposażone, przestronne, z pięknie zaaranżowanym wnętrzem i klimatycznym oświetleniem.",
    avatar: "/reviews/s-p-avatar.png",
    avatarAlt: "Awatar S. P. z profilu Google",
  },
  {
    author: "Adrianna",
    text: "Cudowny pobyt! Domek przepięknie urządzony, bardzo dobrze wyposażony i pełen klimatu. Widoki absolutnie niesamowite — człowiek od razu czuje, że odpoczywa.",
    avatar: "/reviews/adrianna-knura-avatar.png",
    avatarAlt: "Zdjęcie profilowe Adrianny w Google",
  },
  {
    author: "Jacek",
    text: "Świetne miejsce z klimatem oraz bardzo pomocnymi właścicielami! Na pewno jeszcze wrócimy.",
    avatar: "/reviews/jacek-rabaszowski-avatar.png",
    avatarAlt: "Zdjęcie profilowe Jacka w Google",
  },
  {
    author: "Aleksandra",
    text: "Świetne miejsce, przemili właściciele. Polecam gorąco na wypoczynek!",
    avatar: "/reviews/aleksandra-musik-avatar.png",
    avatarAlt: "Zdjęcie profilowe Aleksandry w Google",
  },
  {
    author: "Hubert",
    text: "Przyjemni, gościnni właściciele. Konie pod domkami.",
    avatar: "/reviews/hubert-x-avatar.png",
    avatarAlt: "Awatar Huberta z profilu Google",
  },
  {
    author: "David G.",
    text: "Anna and Rafael are fabulous hosts. They make you feel at home the moment you arrive. There are separate well-appointed cabins in which to stay.",
    avatar: "/reviews/david-g-avatar.png",
    avatarAlt: "Awatar Davida G. z profilu Google",
  },
];
const starKeys = [1, 2, 3, 4, 5];
const marqueeSpeed = 0.06;

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.61 20H24v8h11.3C33.65 32.66 29.22 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-4Z"
      />
      <path
        fill="#FF3D00"
        d="m6.31 14.69 6.57 4.82C14.65 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4c-7.68 0-14.34 4.34-17.69 10.69Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.17 0 9.86-1.98 13.41-5.19l-6.19-5.24A11.93 11.93 0 0 1 24 36c-5.2 0-9.62-3.32-11.28-7.95L6.2 33.08C9.5 39.56 16.23 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20H24v8h11.3a12.04 12.04 0 0 1-4.08 5.57l6.19 5.24C36.97 39.2 44 34 44 24c0-1.34-.14-2.65-.39-4Z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="w-[min(84vw,370px)] shrink-0 md:w-[410px]">
      <figure className="flex min-h-[310px] h-full flex-col rounded-[1.5rem] bg-ranczo-cream/80 p-7 shadow-[0_18px_55px_rgba(24,52,37,0.08)] ring-1 ring-ranczo-charcoal/8 md:p-8">
        <Quote className="h-8 w-8 text-ranczo-terracotta/55" />
        <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-ranczo-charcoal/82">
          „{review.text}”
        </blockquote>
        <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-ranczo-charcoal/10 pt-5">
          <span className="flex min-w-0 items-center gap-3">
            <Image
              src={review.avatar}
              alt={review.avatarAlt}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full bg-white object-cover shadow-sm ring-1 ring-ranczo-charcoal/10"
            />
            <span className="truncate font-semibold text-ranczo-charcoal">
              {review.author}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ranczo-charcoal/55">
            <GoogleLogo className="h-4 w-4" />
            Google
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const x = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const track = trackRef.current;
    const firstList = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstList) return;

    const updateLoopWidth = () => {
      loopWidthRef.current = firstList.offsetWidth + 24;
      if (offsetRef.current >= loopWidthRef.current) {
        offsetRef.current = 0;
        x.set(0);
      }
    };

    updateLoopWidth();
    const observer = new ResizeObserver(updateLoopWidth);
    observer.observe(firstList);
    return () => observer.disconnect();
  }, [x]);

  useAnimationFrame((_time, delta) => {
    if (reducedMotion || pausedRef.current || loopWidthRef.current === 0) {
      return;
    }

    offsetRef.current =
      (offsetRef.current + delta * marqueeSpeed) % loopWidthRef.current;
    x.set(-offsetRef.current);
  });

  const pauseMarquee = () => {
    pausedRef.current = true;
  };

  const resumeMarquee = () => {
    pausedRef.current = false;
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,_rgba(225,195,139,0.22),_transparent_28%),radial-gradient(circle_at_90%_78%,_rgba(47,107,69,0.10),_transparent_32%)]" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-ranczo-terracotta">
            Opinie gości
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ranczo-charcoal md:text-5xl lg:text-6xl">
            Miejsce, do którego{" "}
            <span className="italic font-normal text-ranczo-green">
              chce się wracać
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ranczo-charcoal/65">
            Najlepiej opowiadają o Ranczu osoby, które naprawdę tu odpoczywały.
            Poniżej wybrane fragmenty opinii pozostawionych w Google.
          </p>

          <div className="mt-7 inline-flex items-center gap-4 rounded-full bg-ranczo-cream px-5 py-3 ring-1 ring-ranczo-charcoal/8">
            <span className="font-serif text-2xl font-semibold text-ranczo-charcoal">
              5/5
            </span>
            <GoogleLogo className="h-6 w-6" />
            <div>
              <div className="flex gap-0.5 text-[#d89c33]" aria-label="5 na 5 gwiazdek">
                {starKeys.map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-0.5 text-left text-xs text-ranczo-charcoal/55">
                7 opinii w Google
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="reviews-marquee-viewport relative z-10 mt-14 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-4"
        tabIndex={0}
        role="region"
        aria-label="Automatycznie przewijane opinie gości. Najedź kursorem lub ustaw fokus, aby zatrzymać animację."
        onPointerEnter={pauseMarquee}
        onPointerLeave={resumeMarquee}
        onFocus={pauseMarquee}
        onBlur={resumeMarquee}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          className="reviews-marquee-track flex w-max gap-6 py-3"
          style={{ x }}
        >
          <ul className="flex gap-6" role="list">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </ul>
          <ul
            className="reviews-marquee-duplicate flex gap-6"
            aria-hidden="true"
          >
            {reviews.map((review) => (
              <ReviewCard key={`duplicate-${review.author}`} review={review} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

const eventVideo = {
  title: "Kolacja pod gwiazdami",
  description:
    "Długi drewniany stół, girlandy świateł i ognisko pod otwartym niebem — tak wygląda kolacja plenerowa na Ranczo 44.",
  src: "/videos/outdoor-dinner-tour.mp4",
  poster: "/videos/outdoor-dinner-tour-poster.jpg",
};

export default function EventsMedia() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#102d20] via-ranczo-charcoal to-[#254d36] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(201,101,57,0.13),_transparent_30%),radial-gradient(circle_at_90%_75%,_rgba(132,163,107,0.14),_transparent_35%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-ranczo-terracotta">
            Poczuj atmosferę
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
            Wydarzenia na filmie
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/60">
            {eventVideo.description}
          </p>
        </div>

        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/15">
          <video
            controls
            playsInline
            preload="none"
            poster={eventVideo.poster}
            aria-label={eventVideo.title}
            className="aspect-video max-h-[520px] w-full bg-black object-cover"
          >
            <source src={eventVideo.src} type="video/mp4" />
            Twoja przeglądarka nie obsługuje odtwarzania wideo.
          </video>
          <figcaption className="p-5">
            <h3 className="font-serif text-xl font-semibold text-white">{eventVideo.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Zobacz nastrój wieczornych spotkań przy wspólnym stole.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

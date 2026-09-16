import Image from 'next/image'
import Link from 'next/link'

export default function VolunteerBannerSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
          alt="Volunteers working together"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-earth-600/85" />
      </div>

      <div className="relative z-10 container-wide text-center">
        <p className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Join The Movement
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
          "The best way to find yourself is to lose yourself in the service of others."
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-4 font-light italic">
          — Mahatma Gandhi
        </p>
        <p className="text-white/80 max-w-xl mx-auto mb-10 text-base">
          Hundreds of volunteers have already joined our mission. There's room for you too.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/volunteer" className="btn-amber">
            Become a Volunteer
          </Link>
          <Link href="/donate" className="btn-outline-white">
            Support Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}

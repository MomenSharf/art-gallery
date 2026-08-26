import { ArtistProfile } from "@/types/artist-profile";
import {
  ArrowUpLeft,
  Globe,
  SquareDotIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

interface ArtistIntroductionProps {
  profile: ArtistProfile | null;
}

export default function ArtistIntroduction({
  profile,
}: ArtistIntroductionProps) {
  const name = profile?.name || "اسم الفنان";
  const bio = profile?.bio || "مساحة لمشاركة الأعمال الفنية والتجارب البصرية.";

  const socialLinks = [
    {
      href: profile?.instagram,
      label: "Instagram",
      icon: SquareDotIcon,
    },
    {
      href: profile?.website,
      label: "الموقع",
      icon: Globe,
    },
  ].filter((item): item is typeof item & { href: string } =>
    Boolean(item.href),
  );

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-10 md:pb-36 md:pt-24">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[500px] rounded-full bg-black/[0.025] blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[400px] rounded-full bg-black/[0.02] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Main artist area */}
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-20">
          {/* Artist */}
          <div>
            <div className="flex items-start gap-6 md:gap-8">
              {/* Avatar */}
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm md:size-28">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-black/[0.025] text-3xl font-light text-black/25 md:text-4xl">
                    {name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="pt-1">
                <p className="mb-3 text-[10px] font-medium tracking-[0.28em] text-black/30 md:text-xs">
                  الفنان
                </p>

                <h1 className="text-4xl font-light tracking-tight md:text-6xl">
                  {name}
                </h1>

                {(profile?.artStyle || profile?.specialty) && (
                  <p className="mt-3 text-sm text-black/40 md:text-base">
                    {profile.artStyle || profile.specialty}
                    {profile.artStyle && profile.specialty
                      ? ` · ${profile.specialty}`
                      : null}
                  </p>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="mt-8 flex flex-wrap gap-2">
              {profile?.location && (
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3.5 py-2 text-xs text-black/45">
                  <MapPin className="size-3.5" />
                  {profile.location}
                </div>
              )}

              {profile?.availableForWork && (
                <div className="flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-900/[0.035] px-3.5 py-2 text-xs text-emerald-900/60">
                  <span className="size-1.5 rounded-full bg-emerald-700/60" />
                  متاح للأعمال
                </div>
              )}
            </div>
          </div>

          {/* Biography */}
          <div>
            <p className="mb-5 text-[10px] font-medium tracking-[0.28em] text-black/30 md:text-xs">
              نبذة عن الفنان
            </p>

            <p className="max-w-3xl text-xl font-light leading-[1.9] tracking-tight text-black/65 md:text-3xl md:leading-[1.8]">
              {bio}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-16 grid border-y border-black/[0.08] md:mt-24 md:grid-cols-3">
          {/* Specialty */}
          <InfoItem label="التخصص" value={profile?.specialty} />

          {/* Art style */}
          <InfoItem label="المجال" value={profile?.artStyle} />

          {/* Location */}
          <InfoItem label="الموقع" value={profile?.location} />
        </div>

        {/* Contact + Social */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Contact */}
          <div className="flex flex-wrap items-center gap-3">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2 text-xs text-black/40 transition-colors hover:text-black"
              >
                <Mail className="size-3.5" />
                <span>{profile.email}</span>
              </a>
            )}

            {profile?.phone && (
              <a
                href={`tel:${profile.phone}`}
                dir="ltr"
                className="group flex items-center gap-2 text-xs text-black/40 transition-colors hover:text-black"
              >
                <Phone className="size-3.5" />
                <span>{profile.phone}</span>
              </a>
            )}
          </div>

          {/* Social */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="group flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/50 text-black/40 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-sm"
                  >
                    <Icon className="size-4 transition-transform group-hover:scale-105" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Gallery introduction */}
        <div className="mt-28 md:mt-40">
          <p className="mb-6 text-[10px] font-medium tracking-[0.3em] text-black/30 md:text-xs">
            المعرض الفني
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-5xl text-5xl font-light leading-[1.08] tracking-tight md:text-7xl lg:text-[7.5rem]">
              مساحة للإبداع،
              <br />
              <span className="text-black/25">والتعلّم، والألوان.</span>
            </h2>

            <div className="flex shrink-0 items-center gap-3 text-xs text-black/35">
              <span>استكشف الأعمال</span>
              <ArrowUpLeft className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="border-b border-black/[0.08] py-6 first:pt-6 md:border-b-0 md:border-l md:px-8 md:py-8 md:first:pr-0 md:last:border-l-0">
      <p className="text-[10px] font-medium tracking-[0.22em] text-black/25">
        {label}
      </p>

      <p className="mt-3 text-sm text-black/55">{value || "—"}</p>
    </div>
  );
}

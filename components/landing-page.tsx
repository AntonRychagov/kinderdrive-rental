"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  ChevronDown,
  Clock,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { iconMap, landingData } from "@/lib/landing-data";

type IconKey = keyof typeof iconMap;

const data = landingData;

const galleryHeightClasses: Record<string, string> = {
  "h-72": "h-72",
  "h-72 sm:h-80": "h-72 sm:h-80",
  "h-80 sm:h-96": "h-80 sm:h-96"
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

function getIcon(name: string) {
  return iconMap[name as IconKey] ?? Sparkles;
}

function MotionSection({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  text: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <motion.div variants={fadeUp} className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p
        className={`mb-3 text-sm font-extrabold uppercase tracking-[0.2em] ${
          isDark ? "text-brand-amber" : "text-brand-blue"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${
          isDark ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg ${
          isDark ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

function PrimaryButton({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "focus-ring group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition sm:min-h-14 sm:px-7 sm:text-base";

  if (variant === "secondary") {
    return (
      <a
        href={href}
        className={`${base} border border-slate-200 bg-white/75 text-brand-ink shadow-sm backdrop-blur hover:border-brand-blue/30 hover:bg-white`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`${base} bg-brand-blue text-white shadow-soft hover:-translate-y-0.5 hover:bg-blue-700`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="section-shell glass-panel flex h-16 items-center justify-between rounded-3xl px-3 sm:px-5">
        <a
          href="#top"
          className="focus-ring flex min-w-0 items-center gap-3 rounded-2xl"
          aria-label={data.brand.name}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-blue text-white shadow-soft">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black leading-none text-brand-ink">
              {data.brand.name}
            </span>
            <span className="mt-1 block truncate text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {data.brand.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {data.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-2xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-white/70 hover:text-brand-ink xl:px-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={data.brand.phoneHref}
            className="focus-ring hidden items-center gap-2 rounded-2xl px-3 py-2 text-sm font-extrabold text-brand-ink transition hover:bg-white/70 xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-brand-blue" aria-hidden />
            {data.brand.phone}
          </a>
          <PrimaryButton href="#booking">{data.buttons.book}</PrimaryButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/80 text-brand-ink shadow-sm lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="section-shell mt-2 rounded-3xl border border-white/70 bg-white/95 p-3 shadow-premium backdrop-blur lg:hidden">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {data.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-2xl px-4 py-3 text-sm font-extrabold text-brand-ink hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 rounded-2xl bg-brand-blue px-4 py-3 text-center text-sm font-extrabold text-white"
            >
              {data.buttons.book}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-fine-grid bg-[size:28px_28px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[linear-gradient(115deg,rgba(37,99,235,.16),rgba(245,158,11,.12)_45%,rgba(20,184,166,.11))]" />

      <div className="section-shell grid items-center gap-9 lg:grid-cols-[1fr_0.92fr] lg:gap-10">
        <motion.div
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-extrabold text-brand-ink shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
            <span className="leading-snug">{data.hero.badge}</span>
          </div>

          <h1 className="max-w-[calc(100vw-32px)] break-words text-[2.05rem] font-black leading-[1.05] tracking-tight text-brand-ink [overflow-wrap:anywhere] min-[380px]:text-[2.18rem] sm:max-w-4xl sm:text-5xl sm:[overflow-wrap:normal] lg:text-7xl">
            {data.hero.title}
          </h1>
          <p className="mt-6 max-w-[calc(100vw-32px)] text-base leading-8 text-slate-600 sm:max-w-2xl sm:text-xl">
            {data.hero.text}
          </p>

          <div className="mt-8 flex max-w-[calc(100vw-32px)] flex-col gap-3 sm:max-w-none sm:flex-row">
            <PrimaryButton href="#booking">{data.buttons.book}</PrimaryButton>
            <PrimaryButton href="#catalog" variant="secondary">
              {data.buttons.catalog}
            </PrimaryButton>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {data.trustBadges.map((badge) => {
              const Icon = getIcon(badge.icon);
              return (
                <div
                  key={badge.label}
                  className="glass-panel flex min-h-16 items-center gap-3 rounded-3xl px-4 py-3"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand-blue">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-extrabold leading-snug text-brand-ink">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          transition={{ delay: 0.12, duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-premium sm:rounded-[2rem]">
            <Image
              src={data.hero.image}
              alt={data.hero.imageAlt}
              width={900}
              height={760}
              className="h-[360px] w-full object-cover sm:h-[520px] lg:h-[560px]"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(15,23,42,.72))]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/30 bg-white/18 p-4 text-white backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white/78">{data.hero.availabilityLabel}</p>
                  <p className="text-xl font-black sm:text-2xl">{data.hero.availabilityValue}</p>
                </div>
                <div className="rounded-2xl bg-brand-amber px-4 py-3 text-sm font-black text-brand-ink">
                  {data.hero.priceBadge}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-8 hidden animate-floaty rounded-3xl border border-white/70 bg-white/85 p-4 shadow-premium backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <BatteryCharging className="h-6 w-6 text-emerald-600" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {data.hero.floatingLabel}
                </p>
                <p className="text-sm font-black text-brand-ink">{data.hero.floatingValue}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-premium min-[430px]:grid-cols-3">
            {data.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-slate-100 p-4 last:border-b-0 min-[430px]:border-b-0 min-[430px]:border-r min-[430px]:last:border-r-0"
              >
                <p className="text-lg font-black text-brand-ink sm:text-2xl">{metric.value}</p>
                <p className="mt-1 text-xs font-bold leading-snug text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <MotionSection id="benefits" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.benefits} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.benefits.map((benefit) => {
            const Icon = getIcon(benefit.icon);
            return (
              <motion.article
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group rounded-[1.5rem] border border-white bg-white p-5 shadow-sm transition hover:shadow-premium sm:rounded-[1.75rem] sm:p-6"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="text-xl font-black text-brand-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Catalog() {
  return (
    <MotionSection id="catalog" className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.catalog} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.cars.map((car) => (
            <motion.article
              key={car.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 shadow-sm transition hover:shadow-premium sm:rounded-[1.75rem]"
            >
              <div className="relative h-60 overflow-hidden bg-slate-200 sm:h-64">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-brand-blue shadow-sm backdrop-blur">
                  {car.tag}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {car.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-brand-ink">{car.name}</h3>
                <div className="mt-4 grid gap-2 text-sm min-[460px]:grid-cols-3">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="font-bold text-slate-500">{data.catalogLabels.age}</p>
                    <p className="mt-1 font-black text-brand-ink">{car.age}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="font-bold text-slate-500">{data.catalogLabels.time}</p>
                    <p className="mt-1 font-black text-brand-ink">{car.time}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="font-bold text-slate-500">{data.catalogLabels.price}</p>
                    <p className="mt-1 font-black text-brand-ink">{car.price}</p>
                  </div>
                </div>
                <a
                  href="#booking"
                  className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-ink px-4 py-3 text-sm font-black text-white transition hover:bg-brand-blue"
                >
                  {data.buttons.bookModel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function UseCases() {
  return (
    <MotionSection id="use-cases" className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.useCases} />

        <div className="grid gap-5 lg:grid-cols-3">
          {data.useCases.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`group relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-premium ${
                  index === 0 ? "lg:col-span-1" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,.12),rgba(15,23,42,.86))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/18 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur">
                    <Icon className="h-4 w-4 text-brand-amber" aria-hidden />
                    {item.meta}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-slate-200">{item.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Process() {
  return (
    <MotionSection id="process" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.process} />

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent lg:block" />
          {data.steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={fadeUp}
              className="relative rounded-[1.5rem] border border-white bg-white p-5 shadow-sm sm:rounded-[1.75rem] sm:p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-blue text-xl font-black text-white shadow-soft">
                  {index + 1}
                </span>
                <Clock className="h-6 w-6 text-brand-amber" aria-hidden />
              </div>
              <h3 className="text-xl font-black text-brand-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Gallery() {
  return (
    <MotionSection id="gallery" className="bg-brand-ink py-16 text-white sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.gallery} tone="dark" />

        <div className="masonry">
          {data.gallery.map((item) => {
            const heightClass = galleryHeightClasses[item.height] ?? "h-72";

            return (
              <motion.figure
                key={item.image}
                variants={fadeUp}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-white/10 sm:rounded-[1.75rem]"
              >
                <div className={`relative ${heightClass} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  <figcaption className="absolute bottom-4 left-4 right-4 text-lg font-black">
                    {item.title}
                  </figcaption>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Faq() {
  const [active, setActive] = useState(0);

  return (
    <MotionSection id="faq" className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading {...data.sections.faq} />

        <div className="mx-auto max-w-3xl space-y-3">
          {data.faq.map((item, index) => {
            const opened = active === index;
            return (
              <motion.div
                key={item.question}
                variants={fadeUp}
                className="rounded-[1.25rem] border border-slate-100 bg-slate-50 sm:rounded-[1.35rem]"
              >
                <button
                  type="button"
                  onClick={() => setActive(opened ? -1 : index)}
                  className="focus-ring flex w-full items-center justify-between gap-4 rounded-[1.25rem] px-4 py-5 text-left sm:rounded-[1.35rem] sm:px-5"
                  aria-expanded={opened}
                >
                  <span className="text-base font-black text-brand-ink sm:text-lg">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-blue transition ${opened ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {opened ? (
                  <div className="px-4 pb-5 text-sm leading-7 text-slate-600 sm:px-5 sm:text-base">
                    {item.answer}
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function BookingCta() {
  return (
    <MotionSection id="booking" className="py-16 sm:py-24">
      <div className="section-shell">
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-[1.75rem] bg-brand-ink text-white shadow-premium sm:rounded-[2rem]"
        >
          <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1fr_0.82fr] lg:p-10">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-black text-blue-50">
                {data.booking.badge}
              </p>
              <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {data.booking.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {data.booking.text}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={data.brand.phoneHref}
                  className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-amber px-5 py-3 text-base font-black text-brand-ink transition hover:bg-amber-400 sm:px-6"
                >
                  <Phone className="h-5 w-5" aria-hidden />
                  {data.buttons.bookNow}
                </a>
                <a
                  href={data.brand.whatsappHref}
                  className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white/12 px-5 py-3 text-base font-black text-white transition hover:bg-white/18 sm:px-6"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {data.buttons.whatsapp}
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-4 sm:p-5">
              <p className="text-lg font-black">{data.booking.checklistTitle}</p>
              <div className="mt-5 grid gap-3">
                {data.booking.checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-blue">
                      <Sparkles className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm font-bold leading-snug text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-2 min-[430px]:grid-cols-3">
                {data.booking.serviceHighlights.map((item) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={item.text} className="rounded-2xl bg-white/10 p-3 text-center">
                      <Icon className="mx-auto h-5 w-5 text-brand-amber" aria-hidden />
                      <p className="mt-2 text-xs font-black leading-snug text-blue-50">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-slate-200 bg-white pb-24 pt-10 sm:pb-10">
      <div className="section-shell grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue text-white">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-xl font-black text-brand-ink">{data.brand.name}</p>
              <p className="text-sm font-bold text-slate-500">{data.brand.description}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{data.footer.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.footer.contacts.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <a
                key={item.label}
                href={item.href}
                className="focus-ring rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-brand-blue/30 hover:bg-white hover:shadow-sm"
              >
                <Icon className="h-5 w-5 text-brand-blue" aria-hidden />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-black text-brand-ink">{item.value}</p>
              </a>
            );
          })}
        </div>
      </div>
      <div className="section-shell mt-8 flex flex-col gap-2 border-t border-slate-100 pt-6 text-sm font-bold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {data.brand.name}. Все права защищены.
        </p>
        <p>{data.brand.copyrightNote}</p>
      </div>
    </footer>
  );
}

function FloatingMobileCta() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
      <a
        href="#booking"
        className="focus-ring flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-blue px-5 py-3 text-base font-black text-white shadow-premium"
      >
        {data.buttons.book}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-brand-mist text-brand-ink">
      <Header />
      <Hero />
      <Benefits />
      <Catalog />
      <UseCases />
      <Process />
      <Gallery />
      <Faq />
      <BookingCta />
      <Footer />
      <FloatingMobileCta />
    </main>
  );
}

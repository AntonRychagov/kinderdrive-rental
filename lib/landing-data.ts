import {
  BadgeCheck,
  BatteryCharging,
  CalendarCheck2,
  Headphones,
  HeartHandshake,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  WalletCards,
  Wrench
} from "lucide-react";
import rawLandingData from "@/data/landing.json";

export const landingData = rawLandingData;

export type IconName =
  | "badgeCheck"
  | "batteryCharging"
  | "calendarCheck"
  | "headphones"
  | "heartHandshake"
  | "instagram"
  | "mapPin"
  | "messageCircle"
  | "phone"
  | "send"
  | "shieldCheck"
  | "sparkles"
  | "truck"
  | "walletCards"
  | "wrench";

export const iconMap = {
  badgeCheck: BadgeCheck,
  batteryCharging: BatteryCharging,
  calendarCheck: CalendarCheck2,
  headphones: Headphones,
  heartHandshake: HeartHandshake,
  instagram: Instagram,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  phone: Phone,
  send: Send,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  truck: Truck,
  walletCards: WalletCards,
  wrench: Wrench
} satisfies Record<IconName, typeof Sparkles>;

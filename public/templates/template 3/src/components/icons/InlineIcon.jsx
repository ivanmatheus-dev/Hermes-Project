import {
  BadgeCheck,
  CalendarCheck,
  CalendarClock,
  Camera,
  ChevronDown,
  Clipboard,
  Facebook,
  Heart,
  HeartHandshake,
  HeartPulse,
  Instagram,
  MapPin,
  MessageCircle,
  ScanFace,
  ScanLine,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Smile,
  Star,
  Utensils,
  ArrowRight,
} from 'lucide-react';

const icons = {
  'arrow-right': ArrowRight,
  'badge-check': BadgeCheck,
  'calendar-check': CalendarCheck,
  'calendar-clock': CalendarClock,
  camera: Camera,
  'chevron-down': ChevronDown,
  clipboard: Clipboard,
  facebook: Facebook,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse,
  instagram: Instagram,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  'scan-face': ScanFace,
  'scan-line': ScanLine,
  search: Search,
  shield: Shield,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  smile: Smile,
  star: Star,
  utensils: Utensils,
};

export function InlineIcon({ name, className = '', size = 20, strokeWidth = 2 }) {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

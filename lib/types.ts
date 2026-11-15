import type { ComponentType, SVGProps } from 'react';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type WatchStatus = 'disponible' | 'reservado' | 'vendido';

export type WatchCondition =
  | 'Nuevo / Sin uso'
  | 'Excelente'
  | 'Muy bueno'
  | 'Bueno';

export type WatchDelivery =
  | 'Full Set (Caja y papeles)'
  | 'Solo caja'
  | 'Solo papeles'
  | 'Solo reloj';

export type WatchMovement = 'Automático' | 'Cuerda manual' | 'Cuarzo';

export interface WatchItem {
  id: string;
  slug: string;
  brand: string;
  model: string;
  reference: string;
  year: number | null;
  price: number;
  condition: WatchCondition;
  delivery: WatchDelivery;
  caseSizeMm: number | null;
  movement: WatchMovement;
  description: string;
  images: string[];
  status: WatchStatus;
  featured: boolean;
  createdAt: string;
  publishedChannels: {
    web: boolean;
    telegram: boolean;
    whatsapp: boolean;
    telegramMessageId?: number | null;
  };
}

export interface CreateWatchInput {
  brand: string;
  model: string;
  reference?: string;
  year?: number | null;
  price: number;
  condition: WatchCondition;
  delivery: WatchDelivery;
  caseSizeMm?: number | null;
  movement?: WatchMovement;
  description: string;
  images: string[];
  status?: WatchStatus;
  featured?: boolean;
  channels: {
    web: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
}

export interface ChannelDispatchResult {
  channel: 'web' | 'telegram' | 'whatsapp';
  ok: boolean;
  mode: 'auto' | 'manual_ready' | 'skipped';
  detail: string;
  externalUrl?: string;
  messageId?: number | null;
}

export interface SiteMetrics {
  telegramMembers: number | null;
  youtubeSubscribers: number | null;
  tiktokFollowers: number | null;
  operations: number | null;
  years: number | null;
}

export interface NavItem {
  href: string;
  label: string;
  highlight?: boolean;
}

export interface ProfileItem {
  title: string;
  desc: string;
}

export interface CommunityPillar {
  iconName: 'handshake' | 'shield' | 'book' | 'chart' | 'scale' | 'users' | 'sparkles';
  title: string;
  desc: string;
}

export interface VideoItem {
  id: string | null;
  title: string;
  tag?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EbookChapter {
  title: string;
  desc: string;
}

export interface EbookPainPoint {
  title: string;
  desc: string;
}

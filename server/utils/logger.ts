import fs from 'node:fs';
import path from 'node:path';
import type { H3Event } from 'h3';
import { getRequestIP } from 'h3';
import type { AuthSession } from './auth';

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  formattedTime: string;
  timestampWIB?: string;
  userId: number;
  username: string;
  fullName: string;
  groups: string[];
  user?: any;
  action: 'UPDATE_CONTENT' | 'UPLOAD_MEDIA' | 'OTHER';
  section: string;
  sectionLabel: string;
  summary: string;
  details?: any;
  ip: string;
}

const SECTION_LABELS: Record<string, string> = {
  home: 'Beranda (Home)',
  aboutUs: 'About Us',
  bodBoc: 'BOC & BOD',
  customers: 'Our Customers',
  certificate: 'Certificate',
  awards: 'Awards & Achievements',
  aeroEngine: 'MRO Aero Engine',
  industrial: 'MRO Industrial',
  training: 'Training Services',
  fieldServices: 'Field Services',
  facilities: 'Our Facilities',
  contactInfo: 'Corporate Contact',
  salesMarketing: 'Sales & Marketing',
  career: 'Career (Karir)',
  contact: 'Footer & Quick Contact',
  media: 'Media / Galeri Gambar'
};

const LOGS_DIR = path.resolve(process.cwd(), 'server/data/logs');

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

export function getCurrentMonthKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function getLogFilePath(monthKey: string): string {
  ensureLogsDir();
  return path.join(LOGS_DIR, `activity-${monthKey}.json`);
}

export function recordActivity(options: {
  event: H3Event;
  user: AuthSession;
  action: 'UPDATE_CONTENT' | 'UPLOAD_MEDIA' | 'OTHER';
  section: string;
  summary: string;
  details?: any;
}): ActivityLogEntry {
  const { event, user, action, section, summary, details } = options;
  const monthKey = getCurrentMonthKey();
  const filePath = getLogFilePath(monthKey);

  const now = new Date();
  const formattedTime = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Jakarta'
  }).format(now);

  const ip = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1';

  const entry: ActivityLogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: now.toISOString(),
    formattedTime: `${formattedTime} WIB`,
    timestampWIB: `${formattedTime} WIB`,
    userId: user.id,
    username: user.username,
    fullName: user.fullName || user.username,
    groups: user.groups || [],
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName || user.username,
      groups: user.groups || []
    },
    action,
    section,
    sectionLabel: SECTION_LABELS[section] || section,
    summary,
    details: details || null,
    ip
  };

  let entries: ActivityLogEntry[] = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      entries = JSON.parse(raw);
      if (!Array.isArray(entries)) entries = [];
    } catch {
      entries = [];
    }
  }

  // Masukkan log baru di awal (newest first)
  entries.unshift(entry);

  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');
  return entry;
}

export function getAvailableLogMonths(): string[] {
  ensureLogsDir();
  try {
    const files = fs.readdirSync(LOGS_DIR);
    const months = files
      .filter(f => /^activity-\d{4}-\d{2}\.json$/.test(f))
      .map(f => f.replace('activity-', '').replace('.json', ''))
      .sort((a, b) => b.localeCompare(a)); // urutkan terbaru di awal

    const current = getCurrentMonthKey();
    if (!months.includes(current)) {
      months.unshift(current);
    }
    return months;
  } catch {
    return [getCurrentMonthKey()];
  }
}

export function getLogsForMonth(monthKey: string): ActivityLogEntry[] {
  const filePath = getLogFilePath(monthKey);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

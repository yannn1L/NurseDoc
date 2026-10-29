export interface UserProfile {
  name: string;
  title: string;
  institution: string;
  faculty: string;
  nim: string;
  avatarText: string;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Ns. Christian Claudio Sumual',
  title: 'Perawat Praktik',
  institution: 'POLTEKKES Kemenkes',
  faculty: 'Jurusan Keperawatan',
  nim: 'PO7120121001',
  avatarText: 'CS',
};

export const CURRENT_USER: UserProfile = DEFAULT_USER_PROFILE;

export function generateAvatarInitials(name: string): string {
  if (!name) return 'ND';
  const clean = name
    .replace(/^Ns\.\s*/i, '')
    .replace(/,\s*[A-Za-z.\s]+$/i, '')
    .trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'ND';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

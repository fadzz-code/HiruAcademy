export type PublicSensei = {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly avatarSrc?: string;
  readonly expertise: readonly string[];
};

export const publicSensei: readonly PublicSensei[] = [
  { id: "s1", name: "Sensei Hilmy", initials: "SH", avatarSrc: "/sensei/guru1.png", expertise: ["N4", "Grammar", "Speaking", "Cohort Coaching"] },
  { id: "s2", name: "Sensei Putri", initials: "SP", avatarSrc: "/sensei/guru2.png", expertise: ["N5", "Foundation", "Reading"] },
  { id: "s3", name: "Sensei Akira", initials: "SA", avatarSrc: "/sensei/guru3.png", expertise: ["N3", "JLPT Strategy"] },
  { id: "s4", name: "Sensei Hana", initials: "SH", avatarSrc: "/sensei/guru1.png", expertise: ["Interview", "SSW"] },
  { id: "s5", name: "Sensei Ren", initials: "SR", avatarSrc: "/sensei/guru2.png", expertise: ["N4", "Listening"] },
];

export interface Cabin {
  id: string;
  name: string;
  capacity: string;
}

// Domek 1 (Mustang) i Domek 3 (Sioux) nie istnieją — ukryte do odwołania.
export const CABINS: Cabin[] = [
  { id: "2", name: "Domek nr 2", capacity: "do 5 osób" },
  { id: "4", name: "Domek nr 4 – Kowbojski", capacity: "do 6 osób" },
];

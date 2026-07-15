export interface Cabin {
  id: string;
  name: string;
  capacity: string;
}

export const CABINS: Cabin[] = [
  { id: "1", name: "Domek 1 – Mustang", capacity: "do 4 osób" },
  { id: "2", name: "Domek 2 – Apache", capacity: "do 4 osób" },
  { id: "3", name: "Domek 3 – Sioux", capacity: "do 6 osób" },
  { id: "4", name: "Domek 4 – Comanche", capacity: "do 6 osób" },
];

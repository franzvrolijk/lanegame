export default interface GameNode {
  x: number;
  y: number;
  type: NodeType;
}

export enum NodeType {
  OFFENSESPAWN = "OFFENSESPAWN",
  DEFENSESPAWN = "DEFENSESPAWN",
  SITE = "SITE",
  OTHER = "OTHER",
}

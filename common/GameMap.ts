import GameNode, { NodeType } from "./GameNode";
import GameEdge from "./GameEdge";

export interface GameMapData {
  layers: GameNode[][];
  edges: GameEdge[];
}

const layers: GameNode[][] = [
  [
    { x: 250, y: 125, type: NodeType.SITE },
    { x: 500, y: 125, type: NodeType.DEFENSESPAWN },
    { x: 750, y: 125, type: NodeType.SITE },
  ],
  [
    { x: 375, y: 375, type: NodeType.OTHER },
    { x: 625, y: 375, type: NodeType.OTHER },
  ],
  [
    { x: 313, y: 625, type: NodeType.OTHER },
    { x: 500, y: 625, type: NodeType.OTHER },
    { x: 688, y: 625, type: NodeType.OTHER },
  ],
  [{ x: 500, y: 875, type: NodeType.OFFENSESPAWN }],
];

export const map: GameMapData = {
  layers: layers,
  edges: [
    { startNode: layers[0][0], endNode: layers[0][1] },
    { startNode: layers[0][1], endNode: layers[0][2] },

    { startNode: layers[0][0], endNode: layers[1][0] },
    { startNode: layers[1][0], endNode: layers[0][1] },
    { startNode: layers[0][1], endNode: layers[1][1] },
    { startNode: layers[1][1], endNode: layers[0][2] },

    { startNode: layers[1][0], endNode: layers[1][1] },

    { startNode: layers[2][0], endNode: layers[1][0] },
    { startNode: layers[1][0], endNode: layers[2][1] },
    { startNode: layers[2][1], endNode: layers[1][1] },
    { startNode: layers[1][1], endNode: layers[2][2] },

    { startNode: layers[2][0], endNode: layers[2][1] },
    { startNode: layers[2][1], endNode: layers[2][2] },

    { startNode: layers[2][0], endNode: layers[3][0] },
    { startNode: layers[2][1], endNode: layers[3][0] },
    { startNode: layers[3][0], endNode: layers[2][2] },
  ],
} as GameMapData;

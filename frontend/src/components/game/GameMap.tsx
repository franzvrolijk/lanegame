import { map } from "../../../../common/GameMap";
import { CSSProperties } from "react";
import { NodeType } from "../../../../common/GameNode";
import ColorScheme from "../ui/ColorScheme";

const GameMap = () => {
  const nodeSize = 100;

  return (
    <div style={{ position: "relative", height: "1000px", width: "1000px" }}>
      {map.layers.map((layer, layerIndex) => {
        return layer.map((node, nodeIndex) => {
          return (
            <div
              key={`${layerIndex}${nodeIndex}`}
              className="node"
              style={{
                position: "absolute",
                top: `${node.y}px`,
                left: `${node.x - nodeSize * 0.5}px`,
                backgroundColor: nodeColorMap(node.type),
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                borderRadius: "12%",
                zIndex: 1,
              }}
            ></div>
          );
        });
      })}
      {map.edges.map(({ startNode, endNode }, index) => {
        const edgeStyle: CSSProperties = {
          position: "absolute",
          top: `${startNode.y + 0.5 * nodeSize}px`,
          left: `${startNode.x}px`,
          width: `${Math.sqrt(Math.pow(endNode.x - startNode.x, 2) + Math.pow(endNode.y - startNode.y, 2))}px`,
          transformOrigin: "top left",
          transform: `rotate(${Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x)}rad)`,
          borderBottom: `1px ${ColorScheme.mainLighter}`,
          borderStyle: "solid",
        };
        return <div key={index} style={edgeStyle}></div>;
      })}
    </div>
  );
};

const nodeColorMap = (nodeType: NodeType) => {
  switch (nodeType) {
    case NodeType.DEFENSESPAWN:
      return ColorScheme.defense;
    case NodeType.OFFENSESPAWN:
      return ColorScheme.offense;
    case NodeType.OTHER:
      return ColorScheme.mainDark;
    case NodeType.SITE:
      return ColorScheme.attention;
  }
};

export default GameMap;

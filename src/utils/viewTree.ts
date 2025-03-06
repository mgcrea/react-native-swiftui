// swiftuiUtils.ts
import React from "react";
import type { ViewTreeNode } from "src/types";

export function buildViewTree(nodes: Map<string, { node: ViewTreeNode; parentId?: string }>): ViewTreeNode {
  const treeMap = new Map<string, ViewTreeNode>();
  const rootNodes: ViewTreeNode[] = [];

  nodes.forEach(({ node }) => {
    treeMap.set(node.id, { ...node, children: [] });
  });

  nodes.forEach(({ node, parentId }) => {
    const currentNode = treeMap.get(node.id)!;
    if (parentId && treeMap.has(parentId)) {
      treeMap.get(parentId)!.children!.push(currentNode);
    } else {
      rootNodes.push(currentNode);
    }
  });

  return {
    type: "Group",
    id: "root",
    children: rootNodes,
  };
}

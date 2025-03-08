import type { ViewTreeNode } from "src/types";

export function buildViewTree(
  nodes: Map<string, { node: ViewTreeNode; parentId?: string }>,
  renderSequence: string[],
): ViewTreeNode {
  const treeMap = new Map<string, ViewTreeNode>();
  const rootNodes: ViewTreeNode[] = [];
  const parentChildrenMap = new Map<string, ViewTreeNode[]>();

  nodes.forEach(({ node }) => {
    treeMap.set(node.id, { ...node, children: [] });
  });

  nodes.forEach(({ node, parentId }) => {
    const currentNode = treeMap.get(node.id)!;
    if (parentId && treeMap.has(parentId)) {
      if (!parentChildrenMap.has(parentId)) {
        parentChildrenMap.set(parentId, []);
      }
      parentChildrenMap.get(parentId)!.push(currentNode);
    } else {
      rootNodes.push(currentNode);
    }
  });

  // Optimize sorting with a lookup map
  const sequenceIndexMap = new Map<string, number>();
  renderSequence.forEach((id, index) => sequenceIndexMap.set(id, index));

  // Sort children for each parent
  parentChildrenMap.forEach((children, parentId) => {
    children.sort((a, b) => {
      const indexA = sequenceIndexMap.get(a.id) ?? Infinity; // Fallback for safety
      const indexB = sequenceIndexMap.get(b.id) ?? Infinity;
      return indexA - indexB;
    });
    treeMap.get(parentId)!.children = children;
  });

  // Sort root nodes
  rootNodes.sort((a, b) => {
    const indexA = sequenceIndexMap.get(a.id) ?? Infinity;
    const indexB = sequenceIndexMap.get(b.id) ?? Infinity;
    return indexA - indexB;
  });

  return {
    type: "Group",
    id: "root",
    children: rootNodes,
  };
}

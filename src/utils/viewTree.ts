// swiftuiUtils.ts
import React from "react";

interface ViewTreeNode {
  type: string;
  id?: string;
  props?: Record<string, any>;
  children?: ViewTreeNode[];
}

function getComponentName(type: any): string {
  // Handle intrinsic elements (e.g., 'div')
  if (typeof type === "string") return type;

  // Handle functional components
  if (typeof type === "function") {
    // Use displayName or name if available
    const name = type.displayName || type.name;
    console.log("name", name);
    if (name) {
      // For SwiftUI sub-components, strip 'SwiftUI.' prefix if present
      return name.startsWith("SwiftUI") ? name.replace("SwiftUI", "") : name;
    }
    // Fallback for unnamed functions (shouldn't happen with SwiftUI.*)
    return "Unknown";
  }

  return "Unknown"; // Fallback
}

function convertJsxToViewTree(
  children: React.ReactNode,
  idCounter: { current: number } = { current: 0 }
): ViewTreeNode[] {
  const nodes: ViewTreeNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return; // Skip non-elements
    }

    const { type, props: childProps } = child;
    const props = childProps as { id: string; [key: string]: any };
    const node: ViewTreeNode = { type: getComponentName(type) };

    // Auto-generate ID if not provided
    if (!props.id) {
      node.id = `auto-${idCounter.current++}`;
    } else {
      node.id = props.id;
    }

    // Handle props (excluding children)
    const { children: childChildren, ...restProps } = props;
    if (Object.keys(restProps).length > 0) {
      node.props = restProps;
    }

    // Special case conversions
    if (node.type === "Picker" && restProps.selection) {
      node.props = { ...node.props, selection: restProps.selection.toString() };
    }
    if (node.type === "DatePicker" && restProps.selection instanceof Date) {
      node.props = {
        ...node.props,
        selection: restProps.selection.toISOString(),
      };
    }

    // Recursively process children
    if (childChildren) {
      node.children = convertJsxToViewTree(childChildren, idCounter);
    }

    nodes.push(node);
  });

  return nodes;
}

export { convertJsxToViewTree };

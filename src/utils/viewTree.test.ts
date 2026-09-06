import { describe, expect, it } from "@jest/globals";
import type { ViewTreeNode } from "src/types";

import { buildViewTree } from "./viewTree";

type Registry = Map<string, { node: ViewTreeNode; parentId?: string }>;

const registry = (entries: [ViewTreeNode, string?][]): Registry =>
  new Map(entries.map(([node, parentId]) => [node.id, { node, parentId }]));

const ids = (nodes: ViewTreeNode[] | undefined) => nodes?.map((node) => node.id);

describe("buildViewTree", () => {
  it("nests children under their parent and wraps everything in a root Group", () => {
    const tree = buildViewTree(
      registry([
        [{ id: "form", type: "Form" }, "__root"],
        [{ id: "field", type: "TextField", props: { text: "x" } }, "form"],
      ]),
      ["form", "field"],
    );

    expect(tree).toEqual({
      type: "Group",
      id: "root",
      props: {},
      children: [
        {
          id: "form",
          type: "Form",
          children: [{ id: "field", type: "TextField", props: { text: "x" }, children: [] }],
        },
      ],
    });
  });

  it("orders siblings by render sequence, not registration order", () => {
    const tree = buildViewTree(
      registry([
        [{ id: "c", type: "Text" }, "form"],
        [{ id: "a", type: "Text" }, "form"],
        [{ id: "form", type: "Form" }, "__root"],
        [{ id: "b", type: "Text" }, "form"],
      ]),
      ["form", "a", "b", "c"],
    );

    expect(ids(tree.children?.[0]?.children)).toEqual(["a", "b", "c"]);
  });

  it("promotes a node whose parent is not registered to the root", () => {
    const tree = buildViewTree(registry([[{ id: "orphan", type: "Text" }, "missing"]]), ["orphan"]);
    expect(ids(tree.children)).toEqual(["orphan"]);
  });

  it("keeps nodes absent from the render sequence after the sequenced ones", () => {
    const tree = buildViewTree(
      registry([
        [{ id: "unsequenced", type: "Text" }, "__root"],
        [{ id: "first", type: "Text" }, "__root"],
      ]),
      ["first"],
    );
    expect(ids(tree.children)).toEqual(["first", "unsequenced"]);
  });
});

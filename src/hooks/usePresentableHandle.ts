import { useImperativeHandle, useRef, type Ref, type RefObject } from "react";

/** Imperative API of a native view that can be shown and hidden. */
export type PresentableHandle = {
  present: () => void;
  dismiss: () => void;
};

type Presentable = { setNativeProps: (props: { isPresented: boolean }) => void };

/**
 * Exposes `present()`/`dismiss()` on `ref` by toggling the native `isPresented`
 * prop. `SwiftUISheet` and `SwiftUISheetPicker` carried this block verbatim.
 */
export const usePresentableHandle = <TNative extends Presentable>(
  ref: Ref<PresentableHandle>,
): RefObject<TNative | null> => {
  const nativeRef = useRef<TNative>(null);
  useImperativeHandle(ref, () => ({
    present: () => nativeRef.current?.setNativeProps({ isPresented: true }),
    dismiss: () => nativeRef.current?.setNativeProps({ isPresented: false }),
  }));
  return nativeRef;
};

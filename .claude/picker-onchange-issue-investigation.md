# Picker onChange Issue Investigation

## Problem Description
When using multiple Picker components in a form, changing one picker causes other pickers to revert to their original values. Specifically:
- User changes gender picker from "male" to "female" ✅
- User changes ski level picker from "B" to "I" 
- This triggers onChange events that revert gender back to "male" and ski level back to "B" ❌

## Root Cause Analysis

### Key Findings

1. **Form Library Behavior**: The app uses TanStack Form with a custom `useAppForm` hook that wraps SwiftUI components. When any field changes, the form re-renders all fields.

2. **View Tree Rebuilding**: Every time a picker changes:
   - React form re-renders and calls `updateChildProps` for the changed picker
   - This was triggering `updateSwiftUIView` which rebuilds the entire SwiftUI view tree
   - When SwiftUI views are recreated, the `.onChange` modifier fires for all pickers

3. **Event Sequence** (from logs):
   ```
   1. User changes picker A → onChange fires correctly
   2. Form re-renders → updateChildProps called for picker A
   3. View tree rebuilds → ALL picker views are recreated
   4. SwiftUI .onChange modifiers fire for ALL pickers with their current values
   5. These spurious onChange events revert the values
   ```

## Attempted Solutions

### 1. ✅ Prevented unnecessary view tree rebuilds
**File**: `src/contexts/SwiftUIContext.tsx`
- Modified `registerNode` to only increment `nodeRegistryVersion` when structure actually changes
- This should have prevented the view tree from rebuilding on prop updates
- **Result**: Still didn't work, suggesting view rebuilds might be happening elsewhere

### 2. ✅ Moved onChange handling to binding setter
**Files**: `ios/components/Picker/PickerView.swift`, `DatePickerView.swift`, `MultiPickerView.swift`
- Initially moved onChange from `.onChange` modifier to the binding setter
- **Result**: Binding setter was still being called during view rebuilds

### 3. ✅ Added state tracking to prevent duplicate onChange
**Files**: Same as above
- Added `@State private var lastReportedValue` to track the last value sent
- Only fire onChange when value differs from lastReportedValue
- **Result**: Still didn't work, suggesting the issue might be in the React/form layer

### 4. ✅ Conditional prop updates
**File**: `ios/components/Picker/PickerProps.swift`
- Modified `merge()` to only update properties that actually changed
- **Result**: No improvement

## Current State of Code

### Modified Files:
1. `src/contexts/SwiftUIContext.tsx` - Prevents unnecessary nodeRegistryVersion increments
2. `ios/components/Picker/PickerView.swift` - Tracks lastReportedValue
3. `ios/components/DatePicker/DatePickerView.swift` - Tracks lastReportedValue
4. `ios/components/MultiPicker/MultiPickerView.swift` - Tracks lastReportedSelections
5. `ios/components/Picker/PickerProps.swift` - Conditional updates in merge()
6. `ios/components/MultiPicker/MultiPickerProps.swift` - Conditional updates in merge()
7. `ios/components/DatePicker/DatePickerProps.swift` - Conditional updates in merge()

## Suspected Issues to Investigate

### 1. **TanStack Form Integration**
The form might be:
- Resetting all field values when one changes
- Calling onChange for all fields during re-render
- Managing state in a way that causes all fields to update

**Files to check**:
- `/Users/olivier/Projects/skitrust/skitrust-mobile/src/hooks/useAppForm.ts`
- The `createAppField` wrapper might be triggering onChange unnecessarily

### 2. **React Re-rendering Pattern**
The form components might be:
- Unmounting and remounting on each change
- Losing their identity keys causing React to treat them as new components
- Not properly memoized

### 3. **Event Propagation**
Check if:
- The form's `handleChange` is being called for all fields
- There's circular event triggering between React and Native

## Next Steps

1. **Add logging to the React side**:
   ```typescript
   // In useAppForm.ts createAppField wrapper
   onChange: (value) => {
     console.log(`Field onChange called with value: ${value}`);
     field.handleChange(value);
   }
   ```

2. **Check if components are remounting**:
   - Add useEffect with cleanup to track mount/unmount
   - Check if component keys are stable

3. **Investigate TanStack Form behavior**:
   - Check if form is resetting all fields on change
   - Look for form validation that might trigger resets
   - Check if `handleChange` is called for all fields

4. **Alternative approach**:
   - Consider using local state in each picker component
   - Only sync with form on blur or explicit submit
   - Use uncontrolled components with refs

## Logs for Reference

### Pattern observed:
```
1. Change gender to "female" → works ✅
2. Change ski level to "I" → triggers:
   - onChange for ski level with "I" ✅
   - onChange for gender with "male" (revert) ❌
   - onChange for ski level with "B" (revert) ❌
```

This suggests the form is somehow resetting or re-initializing all field values when any field changes.

## Contact Points
- Form implementation: `/Users/olivier/Projects/skitrust/skitrust-mobile/src/hooks/useAppForm.ts`
- Form usage: `/Users/olivier/Projects/skitrust/skitrust-mobile/src/components/profile/ProfilePersonalFieldset.tsx`
- Screen: `/Users/olivier/Projects/skitrust/skitrust-mobile/src/screens/GetStartedScreen.tsx`
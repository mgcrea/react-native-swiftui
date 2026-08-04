import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { ScreenContainer } from '../components';

/**
 * Exercises the paths nothing else in the example reaches.
 *
 * NumberField appears in no other screen at all, and no screen sends a picker
 * config with a zero step or a slider/stepper whose bounds are inverted. Those
 * are exactly the inputs that used to crash or hang natively:
 *
 * - `min > max` on Slider/Stepper trapped SwiftUI's `Slider(in:)`/`Stepper(in:)`
 *   with "Range requires lowerBound <= upperBound". Bounds are now ordered
 *   before use, so these render instead of crashing.
 * - `step: 0` on a Picker/MultiPicker config drove `while current <= max
 *   { current += step }` forever on the main thread. Option generation now
 *   guards the step and returns an empty list.
 * - NumberField clamps to min/max on both the decode and merge paths, which
 *   previously disagreed: `{ value: 100, min: 0, max: 10 }` stayed 100.
 * - A MultiPicker whose component count changes at runtime hit
 *   `ForEach(0..<count)`, which SwiftUI only supports for a *constant* range.
 *   Nothing else varies the count, so the mis-diff never showed up.
 *
 * Every control below should render, stay responsive, and clamp — nothing here
 * should freeze or crash the app.
 */

const SAFE_CONFIG = { min: 0, max: 50, step: 10, suffix: ' pt' };
// step: 0 is the hang case; it should yield no options rather than spin.
const ZERO_STEP_CONFIG = { min: 0, max: 100, step: 0 };

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}`,
  value: `${i}`,
}));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}`,
  value: `${i}`,
}));
const SECONDS = MINUTES;

const WHEELS = [
  { label: 'hour', options: HOURS },
  { label: 'min', options: MINUTES },
  { label: 'sec', options: SECONDS },
];

export function EdgeCasesScreen() {
  const [amount, setAmount] = useState<number | null>(5);
  const [inverted, setInverted] = useState(false);
  const [sliderValue, setSliderValue] = useState(20);
  const [stepperValue, setStepperValue] = useState(3);
  const [safePick, setSafePick] = useState('10');
  const [zeroStepPick, setZeroStepPick] = useState('');
  const [wheelCount, setWheelCount] = useState(3);
  const [duration, setDuration] = useState<string[]>(['1', '30', '45']);

  // Flipping this sends minimum > maximum in a single update, which is the
  // merge path that used to trap: init validated the ordering, merge did not.
  const minimum = inverted ? 80 : 0;
  const maximum = inverted ? 10 : 100;

  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section
            header="NumberField"
            footer="Clamped to 0...10. Setting 100 should land on 10, not 100.">
            <SwiftUI.NumberField
              label="Amount"
              placeholder="0"
              value={amount}
              min={0}
              max={10}
              onChange={setAmount}
            />
            <SwiftUI.Button
              title="Set above max (100)"
              onPress={() => setAmount(100)}
            />
            <SwiftUI.Button
              title="Set below min (-50)"
              onPress={() => setAmount(-50)}
            />
            <SwiftUI.Button title="Clear" onPress={() => setAmount(null)} />
          </SwiftUI.Section>

          <SwiftUI.Section
            header="Inverted bounds"
            footer={
              inverted
                ? 'minimum 80 > maximum 10 — bounds are reordered, not trapped'
                : 'minimum 0, maximum 100'
            }>
            <SwiftUI.Slider
              label="Slider"
              value={sliderValue}
              minimum={minimum}
              maximum={maximum}
              step={1}
              onChange={setSliderValue}
            />
            <SwiftUI.Stepper
              label="Stepper"
              value={stepperValue}
              minimum={minimum}
              maximum={maximum}
              step={1}
              onChange={setStepperValue}
            />
            <SwiftUI.Button
              title={inverted ? 'Restore bounds' : 'Invert bounds'}
              onPress={() => setInverted(v => !v)}
            />
          </SwiftUI.Section>

          <SwiftUI.Section
            header="Generated options"
            footer="The second picker has step: 0 and should simply be empty.">
            <SwiftUI.Picker
              label="Step 10"
              config={SAFE_CONFIG}
              value={safePick}
              onChange={setSafePick}
            />
            <SwiftUI.Picker
              label="Step 0"
              config={ZERO_STEP_CONFIG}
              value={zeroStepPick}
              onChange={setZeroStepPick}
            />
          </SwiftUI.Section>

          <SwiftUI.Section
            header="Varying wheel count"
            footer={`${wheelCount} wheel(s). Toggling should re-render cleanly and keep each selection on its own wheel.`}>
            <SwiftUI.Text text={`Selections: ${duration.join(', ')}`} />
            <SwiftUI.MultiPicker
              label="Duration"
              components={WHEELS.slice(0, wheelCount)}
              selections={duration.slice(0, wheelCount)}
              onChange={setDuration}
              style={{ height: 216 }}
            />
            <SwiftUI.Button
              title={wheelCount === 3 ? 'Drop to 2 wheels' : 'Back to 3 wheels'}
              onPress={() => setWheelCount(c => (c === 3 ? 2 : 3))}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </ScreenContainer>
  );
}

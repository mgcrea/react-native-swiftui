import {
  SwiftUI,
  type NativeLazyVGridProps,
} from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import logoImage from '../assets/logo.png';
import { ScreenContainer } from '../components';

export function LayoutScreen() {
  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <LazyVGridSection />
          <ImageSection />
          <RectangleSection />
        </SwiftUI.Form>
      </SwiftUI>
    </ScreenContainer>
  );
}

function RectangleSection() {
  const [color, setColor] = useState('blue');
  return (
    <SwiftUI.Section header="Rectangle Example">
      <SwiftUI.HStack
        spacing={25}
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        <SwiftUI.Rectangle
          style={{ backgroundColor: color, width: 25, height: 50 }}
        />
        <SwiftUI.Rectangle
          style={{ backgroundColor: 'red', width: 25, height: 50 }}
        />
      </SwiftUI.HStack>
      <SwiftUI.Button
        title={`Change flag to ${color === 'blue' ? 'Italy' : 'France'}`}
        onPress={() => setColor(color === 'blue' ? 'green' : 'blue')}
      />
    </SwiftUI.Section>
  );
}

function ImageSection() {
  const [icon, setIcon] = useState('iphone');
  return (
    <SwiftUI.Section header="Image Example">
      <SwiftUI.HStack>
        <SwiftUI.Image
          source={logoImage}
          resizeMode="contain"
          style={{
            width: 128,
            height: 128,
            borderWidth: 1,
            borderColor: 'blue',
            borderRadius: 64,
          }}
        />
        <SwiftUI.Image
          name={`system:${icon}`}
          style={{ width: 128, height: 128, fontSize: 64, color: 'blue' }}
        />
      </SwiftUI.HStack>
      <SwiftUI.Button
        title={`Change icon to ${icon === 'iphone' ? 'ipad' : 'iphone'}`}
        onPress={() => setIcon(icon === 'iphone' ? 'ipad' : 'iphone')}
      />
    </SwiftUI.Section>
  );
}

function LazyVGridSection() {
  const alignmentValues: NativeLazyVGridProps['alignment'][] = [
    'leading',
    'center',
    'trailing',
  ];
  const [index, setIndex] = useState(1);

  return (
    <SwiftUI.Section header="LazyVGrid Example">
      <SwiftUI.LazyVGrid
        columns={[
          { type: 'flexible', minimum: 100 },
          { type: 'flexible', minimum: 100 },
        ]}
        spacing={10}
        alignment={alignmentValues[index]}
      >
        <SwiftUI.Text text="Item 1" />
        <SwiftUI.Text text="Item 2" />
        <SwiftUI.Text text="Item 3" />
        <SwiftUI.Text text="Item 4" />
      </SwiftUI.LazyVGrid>
      <SwiftUI.Button
        title={`Change alignment to ${
          alignmentValues[(index + 1) % alignmentValues.length]
        }`}
        onPress={() => setIndex((index + 1) % alignmentValues.length)}
      />
    </SwiftUI.Section>
  );
}

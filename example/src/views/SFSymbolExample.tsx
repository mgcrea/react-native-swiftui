import {
  SFSymbol,
  type SFSymbolProps,
} from '@mgcrea/react-native-swiftui/src';
import { useState, type FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RenderingMode = NonNullable<SFSymbolProps['renderingMode']>;
type Weight = NonNullable<SFSymbolProps['weight']>;

export const SFSymbolExample: FunctionComponent = () => {
  const [variableValue, setVariableValue] = useState(0.5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.title}>SFSymbol Example</Text>
        <Text style={styles.subtitle}>
          Standalone SF Symbols with full customization
        </Text>

        {/* Basic Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Basic Usage</Text>
          <View style={styles.symbolRow}>
            <SFSymbol name="star.fill" style={styles.symbol} />
            <SFSymbol name="heart.fill" style={styles.symbol} />
            <SFSymbol name="bell.fill" style={styles.symbol} />
            <SFSymbol name="gear" style={styles.symbol} />
            <SFSymbol name="person.fill" style={styles.symbol} />
          </View>
        </View>

        {/* Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Colors</Text>
          <View style={styles.symbolRow}>
            <SFSymbol name="heart.fill" color="#FF3B30" style={styles.symbol} />
            <SFSymbol name="star.fill" color="#FF9500" style={styles.symbol} />
            <SFSymbol name="bolt.fill" color="#FFCC00" style={styles.symbol} />
            <SFSymbol name="leaf.fill" color="#34C759" style={styles.symbol} />
            <SFSymbol name="drop.fill" color="#007AFF" style={styles.symbol} />
          </View>
          <Text style={styles.caption}>Using color prop</Text>
          <View style={styles.symbolRow}>
            <SFSymbol
              name="circle.fill"
              style={[styles.symbol, { color: '#AF52DE' }]}
            />
            <SFSymbol
              name="square.fill"
              style={[styles.symbol, { color: '#FF2D55' }]}
            />
            <SFSymbol
              name="triangle.fill"
              style={[styles.symbol, { color: '#5856D6' }]}
            />
          </View>
          <Text style={styles.caption}>Using style.color</Text>
        </View>

        {/* Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Point Sizes</Text>
          <View style={styles.symbolRow}>
            <SFSymbol name="star.fill" size={12} color="#007AFF" />
            <SFSymbol name="star.fill" size={18} color="#007AFF" />
            <SFSymbol name="star.fill" size={24} color="#007AFF" />
            <SFSymbol name="star.fill" size={32} color="#007AFF" />
            <SFSymbol name="star.fill" size={48} color="#007AFF" />
          </View>
          <Text style={styles.caption}>12, 18, 24, 32, 48pt</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Text Styles</Text>
          <View style={styles.symbolColumn}>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="caption2" color="#666" />
              <Text style={styles.textStyleLabel}>caption2</Text>
            </View>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="footnote" color="#666" />
              <Text style={styles.textStyleLabel}>footnote</Text>
            </View>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="body" color="#666" />
              <Text style={styles.textStyleLabel}>body</Text>
            </View>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="headline" color="#666" />
              <Text style={styles.textStyleLabel}>headline</Text>
            </View>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="title" color="#666" />
              <Text style={styles.textStyleLabel}>title</Text>
            </View>
            <View style={styles.textStyleRow}>
              <SFSymbol name="textformat" size="largeTitle" color="#666" />
              <Text style={styles.textStyleLabel}>largeTitle</Text>
            </View>
          </View>
        </View>

        {/* Weights */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Weights</Text>
          <View style={styles.symbolRow}>
            {(
              [
                'ultraLight',
                'thin',
                'light',
                'regular',
                'medium',
                'semibold',
                'bold',
                'heavy',
                'black',
              ] as Weight[]
            ).map(weight => (
              <SFSymbol
                key={weight}
                name="circle"
                size={24}
                weight={weight}
                color="#333"
              />
            ))}
          </View>
          <Text style={styles.caption}>
            ultraLight → black
          </Text>
        </View>

        {/* Scales */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Scales</Text>
          <View style={styles.symbolRow}>
            <View style={styles.scaleItem}>
              <SFSymbol
                name="star.fill"
                size={24}
                scale="small"
                color="#FF9500"
              />
              <Text style={styles.scaleLabel}>small</Text>
            </View>
            <View style={styles.scaleItem}>
              <SFSymbol
                name="star.fill"
                size={24}
                scale="medium"
                color="#FF9500"
              />
              <Text style={styles.scaleLabel}>medium</Text>
            </View>
            <View style={styles.scaleItem}>
              <SFSymbol
                name="star.fill"
                size={24}
                scale="large"
                color="#FF9500"
              />
              <Text style={styles.scaleLabel}>large</Text>
            </View>
          </View>
        </View>

        {/* Rendering Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Rendering Modes</Text>

          <View style={styles.renderingModeRow}>
            <View style={styles.renderingModeItem}>
              <SFSymbol
                name="cloud.sun.rain.fill"
                size={40}
                renderingMode="monochrome"
                color="#007AFF"
              />
              <Text style={styles.renderingModeLabel}>monochrome</Text>
            </View>
            <View style={styles.renderingModeItem}>
              <SFSymbol
                name="cloud.sun.rain.fill"
                size={40}
                renderingMode="hierarchical"
                color="#007AFF"
              />
              <Text style={styles.renderingModeLabel}>hierarchical</Text>
            </View>
          </View>

          <View style={styles.renderingModeRow}>
            <View style={styles.renderingModeItem}>
              <SFSymbol
                name="cloud.sun.rain.fill"
                size={40}
                renderingMode="palette"
                colors={['#007AFF', '#FF9500', '#34C759']}
              />
              <Text style={styles.renderingModeLabel}>palette</Text>
            </View>
            <View style={styles.renderingModeItem}>
              <SFSymbol
                name="cloud.sun.rain.fill"
                size={40}
                renderingMode="multicolor"
              />
              <Text style={styles.renderingModeLabel}>multicolor</Text>
            </View>
          </View>
        </View>

        {/* Palette Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Palette Examples</Text>
          <View style={styles.symbolRow}>
            <SFSymbol
              name="person.crop.circle.badge.checkmark"
              size={32}
              renderingMode="palette"
              colors={['#007AFF', '#34C759']}
            />
            <SFSymbol
              name="folder.fill.badge.plus"
              size={32}
              renderingMode="palette"
              colors={['#FF9500', '#34C759']}
            />
            <SFSymbol
              name="bell.badge.fill"
              size={32}
              renderingMode="palette"
              colors={['#FF9500', '#FF3B30']}
            />
            <SFSymbol
              name="envelope.badge.fill"
              size={32}
              renderingMode="palette"
              colors={['#007AFF', '#FF3B30']}
            />
          </View>
        </View>

        {/* Variable Symbols */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Variable Symbols</Text>
          <Text style={styles.caption}>
            variableValue: {variableValue.toFixed(2)}
          </Text>
          <View style={styles.variableRow}>
            <SFSymbol
              name="speaker.wave.3.fill"
              size={32}
              variableValue={variableValue}
              color="#007AFF"
            />
            <SFSymbol
              name="wifi"
              size={32}
              variableValue={variableValue}
              color="#34C759"
            />
            <SFSymbol
              name="chart.bar.fill"
              size={32}
              variableValue={variableValue}
              color="#FF9500"
            />
          </View>
          <View style={styles.sliderContainer}>
            {[0, 0.25, 0.5, 0.75, 1].map(value => (
              <Text
                key={value}
                style={[
                  styles.sliderButton,
                  variableValue === value && styles.sliderButtonActive,
                ]}
                onPress={() => setVariableValue(value)}
              >
                {value}
              </Text>
            ))}
          </View>
        </View>

        {/* Common Use Cases */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Common Use Cases</Text>

          <View style={styles.useCaseRow}>
            <View style={styles.tabBarItem}>
              <SFSymbol name="house.fill" size={24} color="#007AFF" />
              <Text style={styles.tabBarLabel}>Home</Text>
            </View>
            <View style={styles.tabBarItem}>
              <SFSymbol name="magnifyingglass" size={24} color="#8E8E93" />
              <Text style={[styles.tabBarLabel, { color: '#8E8E93' }]}>
                Search
              </Text>
            </View>
            <View style={styles.tabBarItem}>
              <SFSymbol name="bell.fill" size={24} color="#8E8E93" />
              <Text style={[styles.tabBarLabel, { color: '#8E8E93' }]}>
                Alerts
              </Text>
            </View>
            <View style={styles.tabBarItem}>
              <SFSymbol name="person.fill" size={24} color="#8E8E93" />
              <Text style={[styles.tabBarLabel, { color: '#8E8E93' }]}>
                Profile
              </Text>
            </View>
          </View>
          <Text style={styles.caption}>Tab bar icons</Text>

          <View style={styles.listItem}>
            <SFSymbol
              name="checkmark.circle.fill"
              size={22}
              color="#34C759"
            />
            <Text style={styles.listItemText}>Completed task</Text>
          </View>
          <View style={styles.listItem}>
            <SFSymbol name="circle" size={22} color="#8E8E93" />
            <Text style={styles.listItemText}>Pending task</Text>
          </View>
          <View style={styles.listItem}>
            <SFSymbol
              name="exclamationmark.circle.fill"
              size={22}
              color="#FF3B30"
            />
            <Text style={styles.listItemText}>Important task</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  caption: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
  symbol: {
    width: 32,
    height: 32,
  },
  symbolRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  symbolColumn: {
    gap: 8,
  },
  textStyleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textStyleLabel: {
    fontSize: 12,
    color: '#666',
  },
  scaleItem: {
    alignItems: 'center',
    gap: 4,
  },
  scaleLabel: {
    fontSize: 11,
    color: '#666',
  },
  renderingModeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  renderingModeItem: {
    alignItems: 'center',
    gap: 8,
  },
  renderingModeLabel: {
    fontSize: 11,
    color: '#666',
  },
  variableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  sliderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#E5E5EA',
    fontSize: 12,
    color: '#333',
    overflow: 'hidden',
  },
  sliderButtonActive: {
    backgroundColor: '#007AFF',
    color: 'white',
  },
  useCaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    marginBottom: 12,
  },
  tabBarItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabBarLabel: {
    fontSize: 10,
    color: '#007AFF',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  listItemText: {
    fontSize: 15,
    color: '#333',
  },
});

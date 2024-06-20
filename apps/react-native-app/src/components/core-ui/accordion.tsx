import React, { createContext, useContext, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { ds } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Text from './text';

interface IAccordionContextProps {
  activeSections: string[];
  toggleSection: (id: string) => void;
  type: 'single' | 'multiple';
  collapsible: boolean;
}
const AccordionContext = createContext<IAccordionContextProps>({
  activeSections: [],
  toggleSection: () => {},
  type: 'multiple',
  collapsible: false
});

interface IAccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  children: React.ReactNode;
}
function Accordion({ type = 'multiple', collapsible = false, children }: IAccordionProps) {
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSections(prevActiveSections => {
      if (type === 'single') {
        if (prevActiveSections.includes(id)) {
          return collapsible ? [] : prevActiveSections;
        }

        return [id];
      }

      return prevActiveSections.includes(id)
        ? prevActiveSections.filter(sectionId => sectionId !== id)
        : [...prevActiveSections, id];
    });
  };

  return (
    <AccordionContext.Provider value={{ activeSections, toggleSection, type, collapsible }}>
      <View style={ds.gap10}>{children}</View>
    </AccordionContext.Provider>
  );
}

interface IAccordionItemProps {
  value: string;
  children: React.ReactNode;
}
function AccordionItem({ value, children }: IAccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <View>{children}</View>
    </AccordionItemContext.Provider>
  );
}

const AccordionItemContext = createContext<string>('');

interface IAccordionTriggerProps {
  children: React.ReactNode;
}
function AccordionTrigger({ children, ...props }: IAccordionTriggerProps) {
  const { activeSections, toggleSection } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);
  const { configs } = useThemeState();

  const isActive = activeSections.includes(value);

  return (
    <Pressable
      style={[ds.px12, ds.py10, ds.row, ds.justifyBetween, ds.bgWhite, isActive ? ds.roundedT8 : ds.rounded8]}
      onPress={() => toggleSection(value)}
      {...props}
    >
      <View style={[ds.pr28, ds.grow]}>
        <Text fontWeight="Bold">{children}</Text>
      </View>
      <View style={[ds.absolute, ds.right10, ds.top10]}>
        {isActive ? <ChevronUpIcon color={configs.primary} /> : <ChevronDownIcon color={configs.primary} />}
      </View>
    </Pressable>
  );
}

interface IAccordionContentProps {
  children: React.ReactNode;
}
function AccordionContent({ children }: IAccordionContentProps) {
  const { activeSections } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);

  if (!activeSections.includes(value)) return null;

  return <View style={[ds.p12, ds.roundedB8, ds.bgWhite]}>{children}</View>;
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

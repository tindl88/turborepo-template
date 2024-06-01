import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import Box from '@/components/common/box';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/core-ui/accordion';
import Divider from '@/components/core-ui/divider';
import Text from '@/components/core-ui/text';
import SearchBox from '@/components/search-box';

type HelpCenterProps = {};

const HelpCenter: FC<HelpCenterProps> = () => {
  return (
    <>
      <Divider />
      <SearchBox value={''} onChange={_text => {}} />
      <Box hasBg={false} style={ds.flex1}>
        <Box style={ds.flex1}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
            <Accordion collapsible type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger>Lorem ipsum dolor sit.</AccordionTrigger>
                <AccordionContent>
                  <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Lorem ipsum dolor sit amet consetur adipisicing elit.</AccordionTrigger>
                <AccordionContent>
                  <Text>Yes, it is responsive.</Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
                <AccordionContent>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque doloremque voluptatem odit dolorum,
                    consequatur voluptates. Cupiditate nulla quasi temporibus dolores quod mollitia repellendus fuga
                    inventore, libero veniam non ab saepe incidunt sint? Facere quos totam fuga illo repellendus nisi
                    iste saepe.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Lorem ipsum dolor sit amet consectetur.</AccordionTrigger>
                <AccordionContent>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla perferendis facere consectetur fuga
                    corporis velit officia molestias natus earum ipsam..
                  </Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollView>
        </Box>
      </Box>
    </>
  );
};

export default HelpCenter;

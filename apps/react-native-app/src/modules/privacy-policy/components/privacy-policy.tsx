import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import Box from '@/components/common/box';
import RenderHTML from '@/components/render-html';

const source = {
  html: `
    <h3>Introduction</h3>
    <p>Welcome to our Mobile Travel App. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our app.</p>
  
    <h3>Information We Collect</h3>
    <p>We collect various types of information to provide and improve our services, including:</p>
    <p><strong>Personal Information:</strong> When you create an account, we may collect your name, email address, phone number, and payment information.</p>
    <p><strong>Location Data:</strong> To provide travel recommendations and services, we may collect your precise location data.</p>
    <p><strong>Usage Data:</strong> We collect information on how you interact with the app, such as the features you use and the time spent on the app.</p>
  
    <h3>How We Use Your Information</h3>
    <p>We use the collected information for various purposes, including:</p>
    <p>1. To provide and maintain our services.</p>
    <p>2. To process your transactions and manage your bookings.</p>
    <p>3. To send you updates, promotions, and notifications related to our services.</p>
    <p>4. To improve our app and develop new features.</p>
    <p>5. To ensure the security and integrity of our services.</p>
  
    <h3>Sharing Your Information</h3>
    <p>We do not share your personal information with third parties except in the following cases:</p>
    <p><strong>Service Providers:</strong> We may share your information with third-party vendors to perform certain functions on our behalf, such as payment processing and customer support.</p>
    <p><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
    <p><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</p>
  
    <h3>Security of Your Information</h3>
    <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of electronic storage or transmission is 100% secure.</p>
  
    <h3>Your Privacy Choices</h3>
    <p>You have the right to access, update, or delete your personal information. You can manage your privacy settings within the app or contact us directly for assistance.</p>
    <p>You may also opt out of receiving promotional communications from us by following the unsubscribe instructions included in those communications.</p>
  
    <h3>Children's Privacy</h3>
    <p>Our app is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it as soon as possible.</p>
  
    <h3>Changes to This Privacy Policy</h3>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
  
    <h3>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
    <p>Email: support@mobiletravelapp.com</p>
    <p>Address: 123 Travel Lane, Wanderlust City, Country</p>
    `
};

type PrivacyPolicyProps = {};

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  return (
    <Box hasBg={false} style={ds.flex1}>
      <Box style={ds.flex1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RenderHTML html={source} />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;

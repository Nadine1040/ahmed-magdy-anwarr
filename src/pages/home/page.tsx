import HeroSection from './components/HeroSection';
import AboutPreviewSection from './components/AboutPreviewSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseSection from './components/WhyChooseSection';
import CTASection from './components/CTASection';
import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'Cairo Counseling Psychologist | Ahmed Magdy Anwar',
    description:
      'Professional counseling psychologist in Cairo. 1:1 sessions, CBT, family & marriage counseling. Book online or via WhatsApp today.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage:
      'https://static.readdy.ai/image/f6fdc0763ab361c6e2fc557f01e9705e/67da6a16bec6d43dbba06f1f282c3afc.jpeg',
    structuredData: [
      {
        '@type': 'WebPage',
        name: 'Ahmed Magdy Anwar',
        description:
          'Professional counseling psychologist in Cairo. 1:1 sessions, CBT, family & marriage counseling.',
        url: '/',
        mainEntity: {
          '@type': 'Person',
          name: 'Ahmed Magdy Anwar',
          jobTitle: 'Counseling Psychologist',
          description:
            'Professional counseling psychologist helping individuals achieve better mental well-being and personal growth in Cairo, Egypt.',
          url: '/',
          image:
            'https://static.readdy.ai/image/f6fdc0763ab361c6e2fc557f01e9705e/67da6a16bec6d43dbba06f1f282c3afc.jpeg',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cairo',
            addressCountry: 'EG',
          },
          telephone: '+201098945682',
          knowsAbout: [
            'Clinical Psychology',
            'Cognitive Behavioral Therapy',
            'Family Counseling',
            'Marriage Counseling',
            'Mental Health',
            'Positive Psychology',
          ],
          offers: {
            '@type': 'Service',
            name: 'Counseling Sessions',
            description:
              '1:1 counseling sessions for mental health, family, marriage, career, and life challenges.',
            areaServed: {
              '@type': 'City',
              name: 'Cairo',
            },
          },
        },
      },
    ],
  });

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutPreviewSection />
      <ServicesSection />
      <WhyChooseSection />
      <CTASection />
    </main>
  );
}
import { InfoCard } from '@/components/info-card';
import { Logo } from '@/components/logo';
import { BeamsWrapper } from '@/components/beams-wrapper';
import { Input } from '@/components/input';

export default function Home() {
  return (
    <BeamsWrapper>
      <Logo />
      <InfoCard />
      <Input />
    </BeamsWrapper>
  );
}

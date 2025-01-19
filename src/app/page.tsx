import { InfoCard } from '@/components/info-card';
import { Logo } from '@/components/logo';
import { BeamsWrapper } from '@/components/beams-wrapper';
import { EmployeesAutocomplete } from '@/components/autocomplete';

export default function Home() {
  return (
    <BeamsWrapper>
      <Logo />
      <InfoCard />
      <EmployeesAutocomplete />
    </BeamsWrapper>
  );
}

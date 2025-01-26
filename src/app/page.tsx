import { InfoCard } from '@/components/info-card';
import { Logo } from '@/components/logo';
import { BeamsWrapper } from '@/components/beams-wrapper';
import { EmployeesAutocomplete } from '@/components/autocomplete';
import { PeopleFoundOut } from '@/components/people-found-out';
import { YesterdaysEmployee } from '@/components/yesterdays-employee';
import { GuessTable } from '@/components/guess-table';

export default function Home() {
  return (
    <BeamsWrapper>
      <Logo />
      <InfoCard />
      <EmployeesAutocomplete />
      <GuessTable />
      <PeopleFoundOut />
      <YesterdaysEmployee />
    </BeamsWrapper>
  );
}

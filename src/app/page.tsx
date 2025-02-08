import { InfoCard } from '@/components/info-card';
import { Logo } from '@/components/logo';
import { BeamsWrapper } from '@/components/beams-wrapper';
import { EmployeesAutocomplete } from '@/components/autocomplete';
import { PeopleFoundOut } from '@/components/people-found-out';
import { YesterdaysEmployee } from '@/components/yesterdays-employee';
import { GuessTable } from '@/components/guess-table/guess-table';
import { WinningCard } from '@/components/winning-card';

export default function Home() {
  return (
    <BeamsWrapper>
      <Logo />
      <InfoCard />
      <WinningCard />
      <EmployeesAutocomplete />
      <GuessTable />
      <PeopleFoundOut />
      <YesterdaysEmployee />
    </BeamsWrapper>
  );
}

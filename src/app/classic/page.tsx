import { InfoCard } from '@/components/info-card';
import { Logo } from '@/components/logo';
import { Wrapper } from '@/components/wrapper';
import { EmployeesAutocomplete } from '@/components/autocomplete';
import { PeopleFoundOut } from '@/components/people-found-out';
import { YesterdaysEmployee } from '@/components/yesterdays-employee';
import { GuessTable } from '@/components/guess-table/guess-table';
import { WinningCard } from '@/components/winning-card';

export default function Home() {
  return (
    <Wrapper>
      <Logo />
      <InfoCard />
      <WinningCard />
      <EmployeesAutocomplete />
      <GuessTable />
      <PeopleFoundOut />
      <YesterdaysEmployee />
    </Wrapper>
  );
}

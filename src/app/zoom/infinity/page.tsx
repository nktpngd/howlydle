'use client';

import React from 'react';
import { Wrapper } from '@/components/wrapper';
import { Logo } from '@/components/logo';
import { ZoomGameProvider, useZoomGame } from '@/contexts/zoom-game-context';
import { ZoomEmployeesAutocomplete } from '@/components/zoom/zoom-autocomplete';
import { ZoomGuessTable } from '@/components/zoom/zoom-guess-table';
import { ZoomWinningCard } from '@/components/zoom/zoom-winning-card';
import { ZoomPhotoCard } from '@/components/zoom/zoom-photo-card';

const ZoomInfinityContent = () => {
  useZoomGame();
  return (
    <>
      <Logo />
      <ZoomWinningCard />
      <div className="flex flex-col gap-4 items-center">
        <ZoomPhotoCard />
        <ZoomEmployeesAutocomplete />
        <ZoomGuessTable />
      </div>
    </>
  );
};

export default function ZoomInfinityPage() {
  return (
    <Wrapper>
      <ZoomGameProvider mode="infinite">
        <ZoomInfinityContent />
      </ZoomGameProvider>
    </Wrapper>
  );
}

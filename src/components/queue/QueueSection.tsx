'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { IPlaybackQueue } from '../../lib/models';
import { QueryKeys } from '../../lib/query.keys';
import { getPlaybackQueue } from '../../server/actions';
import { Section } from '../Section';
import { AddSongButton } from '../form/AddSongButton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';
import { SongCard } from './SongCard';

export function QueueSection() {
  const { data, isLoading, isError, error, isFetching } =
    useQuery<IPlaybackQueue>({
      queryKey: [QueryKeys.playbackQueue],
      queryFn: () => getPlaybackQueue(),
      refetchInterval: 20000,
      refetchOnWindowFocus: false,
    });
  return (
    <Section
      id='queue'
      title='Song Queue'
      loading={isLoading || isFetching}
      className='gap-5'
    >
      <AddSongButton />
      {isError && (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      )}
      {!isError && (
        <div className='space-y-2'>
          {data?.currentlyPlaying && (
            <SongCard {...data.currentlyPlaying} currentlyPlaying />
          )}
          <div>
            <Separator className='my-4'></Separator>
          </div>
          {data?.queue.map((song, index) => <SongCard key={index} {...song} />)}
        </div>
      )}
    </Section>
  );
}

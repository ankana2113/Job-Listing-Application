'use client';
import TimeAgo from 'react-timeago';

export default function TimeAgoComponent({createdAt}:{createdAt:string}) {
  return (
    <>
      <TimeAgo date={createdAt}/>
    </>
  );
}

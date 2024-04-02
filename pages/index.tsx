import Input from '@/components/Input';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <br />
      <br />
      <Link href='/shared'>shared</Link>
      <br />
      <br />
      <Link href='/folder'>folder</Link>
      <br />
      <br />
      <Link href='/signin'>signin</Link>
      <br />
      <br />
    </>
  );
}

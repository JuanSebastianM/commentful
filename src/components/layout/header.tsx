import Link from 'next/link';

import { User } from 'next-auth';

import SignOutButton from '~/components/buttons/sign-out';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-primary px-8 py-4 text-black">
      <h1>Commentful</h1>
      <nav>
        <ul className="flex items-center justify-evenly gap-8">
          {user ? (
            <li>
              <p>Welcome, {user.name}!</p>
              <p>Your email is: {user.email}</p>
            </li>
          ) : null}
          <li>{user ? <SignOutButton /> : <Link href="/api/auth/signin">Sign in</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

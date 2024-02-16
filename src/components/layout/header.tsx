import Link from 'next/link';

import { User } from 'next-auth';

import SignOutButton from '~/components/buttons/sign-out';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="py-4 px-8 flex justify-between items-center bg-primary sticky z-10 top-0 text-black">
      <h1>Commentful</h1>
      <nav>
        <ul className="flex justify-evenly items-center gap-8">
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

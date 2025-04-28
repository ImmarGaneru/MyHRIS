import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Vercel logomark"
                        width={120}
                        height={20}
                    />
                </Link>

                <nav className="flex items-center">
                    <Link href="/auth/login">
                        <Button variant="ghost" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button size="sm">
                            Register
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>

    )
}
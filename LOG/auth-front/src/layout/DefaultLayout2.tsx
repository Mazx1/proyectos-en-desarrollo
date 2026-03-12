import { Link } from "react-router-dom";
import type { ReactNode } from "react";


interface DefaultLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout2({ children}: DefaultLayoutProps) {
    return (
     <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </header>

        <main>{children}</main>
    </>
    );
}
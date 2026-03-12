import { Link } from "react-router-dom";
import type { ReactNode } from "react";


interface DefaultLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children}: DefaultLayoutProps) {
    return (
     <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
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
import Container from "./Container";

function Navbar() {
    return (
        <header className="py-6">
            <Container>
                <nav className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <span className="text-2xl">🌳</span>

                        <h1 className="text-2xl font-bold">
                            Grove
                        </h1>

                    </div>

                    <div className="hidden items-center gap-10 text-sm font-medium text-[var(--text-secondary)] md:flex">

                        <a
                            href="#features"
                            className="transition hover:text-[var(--primary)]"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="transition hover:text-[var(--primary)]"
                        >
                            How it works
                        </a>

                        <a
                            href="#about"
                            className="transition hover:text-[var(--primary)]"
                        >
                            About
                        </a>

                    </div>

                </nav>
            </Container>
        </header>
    );
}

export default Navbar;
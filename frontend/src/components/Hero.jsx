import Container from "./layout/Container";
import Input from "./ui/Input";
import Button from "./ui/Button";
import RepositoryPreview from "./repository/RepositoryPreview";

function Hero({repositoryUrl, setRepositoryUrl, onAnalyze, loading, error,}) {

    return (
        <section className="py-24">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    <span className="rounded-full bg-[var(--secondary)] px-4 py-2 text-sm text-[var(--primary)]">
                        Visualize. Understand. Ship faster.
                    </span>

                    <h1 className="mt-8 text-6xl font-bold leading-tight">
                        Understand any
                        <br />
                        GitHub repository
                        <br />
                        <span className="text-[var(--primary)]">
                            visually.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-[var(--text-secondary)]">
                        Paste any GitHub repository and instantly
                        explore its architecture, dependencies,
                        and file relationships.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <Input value={repositoryUrl} onChange={(e) =>setRepositoryUrl(e.target.value)} placeholder="https://github.com/facebook/react"/>

                        {error && (<p className="mt-2 text-sm text-red-500">
                            {error}
                            </p>)}

                        <Button onClick={onAnalyze} disabled={loading}>
                            {loading ? "Analyzing..." : "Analyze Repository"}
                        </Button>

                    </div>

                    <RepositoryPreview />

                </div>

                

            </Container>
        </section>

    );

}

export default Hero;
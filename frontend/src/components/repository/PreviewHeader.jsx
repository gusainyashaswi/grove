function PreviewHeader() {
    return (
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">

            <div>

                <h3 className="font-semibold">
                    Repository Preview
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                    facebook / react
                </p>

            </div>

            <span
                className="
                    rounded-full
                    bg-[var(--secondary)]
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-[var(--primary)]
                "
            >
                Live Preview
            </span>

        </div>
    );
}

export default PreviewHeader;
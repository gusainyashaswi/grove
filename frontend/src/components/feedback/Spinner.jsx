/**
 * Spinner — loading indicator
 */
import { Loader2 } from "lucide-react";

function Spinner({ size = 20, className = "" }) {
    return (
        <Loader2
            size={size}
            className={`animate-spin text-[var(--color-text-muted)] ${className}`}
            aria-hidden="true"
        />
    );
}

export default Spinner;

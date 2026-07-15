export function num(
    value: unknown,
    fallback = 0,
): number {
    try {
        const result = Number(value);

        if (Number.isNaN(result) || result === 0) {
            return fallback;
        }

        return result;
    } catch {
        return fallback;
    }
}
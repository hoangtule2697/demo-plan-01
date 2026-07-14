export function num(
    value: unknown,
    fallback = 0,
): number {
    try {
        const result = Number(value);

        return Number.isNaN(result)
            ? fallback
            : result;
    } catch {
        return fallback;
    }
}
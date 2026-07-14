export function num(
    value: unknown,
    fallback: number = 0,
): number {
    return typeof value === "number" && !Number.isNaN(value)
        ? value
        : fallback;
}
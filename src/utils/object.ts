export function reMapObject<
    T extends Record<string, any>,
    K extends keyof T,
>(
    list: (T | null | undefined)[] = [],
    key: K = "code" as K,
): Record<string, T> {
    const obj: Record<string, T> = {};

    for (const item of list) {
        if (!item) continue;

        obj[String(item[key])] = item;
    }

    return obj;
}
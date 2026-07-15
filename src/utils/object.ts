export const isObject = (val: any) => val !== null && typeof val === "object" && !Array.isArray(val);

export const reSortObjectByKeys = (input: any): any => {
    if (Array.isArray(input)) {
        return input.map((item) => reSortObjectByKeys(item));
    }

    if (isObject(input)) {
        return Object.keys(input)
            .sort()
            .reduce((acc: any, key) => {
                acc[key] = reSortObjectByKeys(input[key]);
                return acc;
            }, {});
    }

    return input;
};

// chuyển list thành object với key là field dùng để group
// isArray = false (mặc định)
export function reMapObject<
    T extends Record<PropertyKey, any>,
    K extends keyof T,
>(
    list?: T[],
    key?: K,
    options?: {
        isArray?: false;
        deleteUndefined?: boolean;
        noPushNull?: boolean;
    },
): Record<T[K] & PropertyKey, T>;

// isArray = true
export function reMapObject<
    T extends Record<PropertyKey, any>,
    K extends keyof T,
>(
    list: T[],
    key: K,
    options: {
        isArray: true;
        deleteUndefined?: boolean;
        noPushNull?: boolean;
    },
): Record<T[K] & PropertyKey, T[]>;

// implementation
export function reMapObject<
    T extends Record<PropertyKey, any>,
    K extends keyof T,
>(
    list: T[] = [],
    key: K = "code" as K,
    {
        isArray = false,
        deleteUndefined = false,
        noPushNull = false,
    }: {
        isArray?: boolean;
        deleteUndefined?: boolean;
        noPushNull?: boolean;
    } = {},
) {
    const obj: Record<PropertyKey, T | T[]> = {};

    for (const item of list.filter(Boolean)) {
        const mapKey = item[key] as PropertyKey;

        if (isArray) {
            obj[mapKey] ??= [];

            if (!noPushNull || item[key]) {
                (obj[mapKey] as T[]).push(item);
            }
        } else {
            obj[mapKey] = item;
        }
    }

    if (deleteUndefined) {
        delete obj.undefined;
    }

    return obj;
}
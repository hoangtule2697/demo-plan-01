import * as logic from "@logic";
import type { TypeSanPhamCanLam } from "@type";

export const getParamsFromUrl = (): Record<string, string> => {
    return Object.fromEntries(
        new URLSearchParams(window.location.search),
    );
};

export const genParamsFromUrl = (): { danhSachCanLam: TypeSanPhamCanLam[] } => {
    const { danhSachCanLam } = getParamsFromUrl();

    return {
        danhSachCanLam: logic.parseDanhSachCanLam(danhSachCanLam),
    };
};

export const updateUrlParams = (
    updateParams: Record<
        string,
        string | number | boolean | null | undefined
    >,
    {
        isReplace = false,
        sortPriority = [],
    }: {
        isReplace?: boolean;
        sortPriority?: string[];
    } = {},
): void => {
    try {
        if (!updateParams || !Object.keys(updateParams).length) return;

        const currentUrl = new URL(window.location.href);

        const newParams = {
            ...(isReplace ? {} : getParamsFromUrl()),
            ...updateParams,
        };

        const orderedKeys = [
            ...sortPriority.filter((key) => key in newParams),
            ...Object.keys(newParams).filter(
                (key) => !sortPriority.includes(key),
            ),
        ];

        const searchParams = new URLSearchParams();

        orderedKeys.forEach((key) => {
            const value = newParams[key];

            if (
                value !== null &&
                value !== undefined &&
                value !== "" &&
                value !== "null" &&
                value !== "undefined"
            ) {
                searchParams.set(key, String(value));
            }
        });

        const queryString = searchParams.toString();

        const newUrl =
            currentUrl.origin +
            currentUrl.pathname +
            (queryString ? `?${queryString}` : "");

        window.history.replaceState({}, "", newUrl);
    } catch {
        // ignore
    }
};
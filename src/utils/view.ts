export const displayCurrency = (
    p: number | undefined,
    {
        roundTo1000 = true,
    }: {
        roundTo1000?: boolean;
    } = {},
) => {
    if (p === undefined) return "0đ";

    let num = roundTo1000 ? Math.round(p / 1000) * 1000 : p;
    return `${(Math.round(num)).toLocaleString("vi-VN")}đ`;
};
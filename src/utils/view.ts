export const displayCurrency = (p: number | undefined) => {
    if (p === undefined) return "0đ";
    return `${(Math.round(p / 1000) * 1000).toLocaleString("vi-VN")}đ`;
};
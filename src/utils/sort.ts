import * as utils from "@utils";

export const sortByField = (sortBy: string, sortOrder: "asc" | "desc" = "asc",) => (a: any, b: any) => {
    return (utils.number.num(a?.[sortBy]) - utils.number.num(b?.[sortBy])) * (sortOrder === "asc" ? 1 : -1)
}
import { sanPhamData, sanPhamOpts } from "@data";
import type { TypeFullDataSanPham, TypeSanPhamCanLam } from "@type";
import * as utils from "@utils";

export const getFullData = (danhSachCanLam: TypeSanPhamCanLam[]): TypeFullDataSanPham => {
    const details = (danhSachCanLam || []).map((SanPhamCanLam) => {
        const sanPham = sanPhamOpts[SanPhamCanLam.sanPhamCode];
        const tongTienSanPham = utils.number.num(sanPham?.tienSanPham) * SanPhamCanLam.quantityBuy;
        return {
            ...SanPhamCanLam,
            ...sanPham,
            tongTienSanPham,
        };
    });

    const allVatLieuCanMua = details.filter((d) => d.quantityBuy)
        .map((d) =>
            d.vatLieu.map((vl) => ({
                ...vl,
                quantityBuy: d.quantityBuy * vl.quantityNeed,
            })),
        )
        .flat();

    const chiTietVatLieu = Object.values(
        allVatLieuCanMua.reduce((acc, item) => {
            //vật liệu trùng code và value tính là cùng 1 vật liệu nên cộng lại
            const key = `${item.keyVatLieu}`;

            if (!acc[key]) {
                acc[key] = { ...item };
            } else {
                acc[key].quantityBuy += item.quantityBuy;
            }

            return acc;
        }, {} as Record<string, typeof allVatLieuCanMua[number]>),
    ).map((v) => {
        return {
            ...v,
            tongTienVatLieu: utils.number.num(v.tienVatLieu) * v.quantityBuy,
        };
    }).sort((a, b) =>
        a.keyVatLieu.localeCompare(b.keyVatLieu, undefined, {
            sensitivity: "base",
        }),
    );

    const tongVatLieu = Object.values(
        chiTietVatLieu
            .map((v) => ({ ...v, quantity: 1 }))
            .reduce((acc, item) => {
                const key = `${item.vatLieuCode}`;

                if (!acc[key]) {
                    acc[key] = { ...item };
                } else {
                    acc[key].tongTienVatLieu += item.tongTienVatLieu;
                }

                return acc;
            }, {} as Record<string, typeof chiTietVatLieu[number]>),
    );

    // const tongTien = tongVatLieu.reduce(
    //     (sum, item) => sum + utils.number.num(item?.tongTienSanPham),
    //     0,
    // );

    const tongTien = 0;

    return {
        details,
        tongTien,
        chiTietVatLieu,
        tongVatLieu,
    };
};

export const getDefaultDanhSachCanLam = (): TypeSanPhamCanLam[] => {
    const codeOrder: Record<string, number> = {};
    sanPhamData.forEach((sp, index) => {
        codeOrder[sp.code] = index;
    });
    const url = utils.url.genParamsFromUrl();
    const dsCanLam = Object.values(
        [
            ...url.danhSachCanLam,
            ...sanPhamData.map((sp) => ({ sanPhamCode: sp.code, quantityBuy: 0 })),
        ].reduce((obj, item) => {
            obj[item.sanPhamCode] ??= {
                ...item,
                quantityBuy: 0,
            };
            obj[item.sanPhamCode].quantityBuy += item.quantityBuy;
            return obj;
        }, {} as Record<string, TypeSanPhamCanLam>),
    ).sort((a, b) => codeOrder[a.sanPhamCode] - codeOrder[b.sanPhamCode]);

    return dsCanLam;
};

export const parseDanhSachCanLam = (danhSachCanLamStr: string): TypeSanPhamCanLam[] => {
    if (danhSachCanLamStr && danhSachCanLamStr !== "") {
        try {
            const danhSachCanLam = danhSachCanLamStr.split("~").map((SanPhamCanLamStr) => {
                const [sanPhamCode, quantityBuy] = SanPhamCanLamStr.split(".");
                return { sanPhamCode, quantityBuy: utils.number.num(quantityBuy) };
            });
            return danhSachCanLam;
        } catch (error) {
            console.error("Error parsing danhSachCanLam:", error);
        }
    }
    return [];
};

export const stringifyDanhSachCanLam = (danhSachCanLam: TypeSanPhamCanLam[]): string => {
    if (danhSachCanLam?.length) {
        try {
            const strDscl = danhSachCanLam
                .map((SanPhamCanLam) => `${SanPhamCanLam.sanPhamCode}.${SanPhamCanLam.quantityBuy}`)
                .join("~");
            return strDscl;
        } catch (error) {
            console.error("Error stringifying danhSachCanLam:", error);
        }
    }
    return "";
};
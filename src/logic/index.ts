import { sanPhamData, sanPhamOpts } from "@data";
import type { TypeFullDataSanPham, TypeSanPhamCanLam } from "@type";
import * as utils from "@utils";

export const getFullData = (danhSachCanLam: TypeSanPhamCanLam[]): TypeFullDataSanPham => {
    const details = (danhSachCanLam || []).map((SanPhamCanLam) => {
        const sanPham = sanPhamOpts[SanPhamCanLam.sanPhamCode];
        const tongTienSanPham = utils.number.num(sanPham?.tienSanPham) * SanPhamCanLam.quantity;
        return {
            ...SanPhamCanLam,
            ...sanPham,
            tongTienSanPham,
        };
    });

    const allVatLieu = details
        .map((d) =>
            d.vatLieu.map((vl) => ({
                ...vl,
                quantity: d.quantity * vl.quantity,
                tienVatLieu: d.quantity * utils.number.num(vl.tienVatLieu),
            })),
        )
        .flat();

    const chiTietVatLieu = Object.values(
        allVatLieu.reduce((acc, item) => {
            const key = `${item.vatLieuCode}_${item.value}`;

            if (!acc[key]) {
                acc[key] = { ...item, tongTienVatLieu: item.tienVatLieu };
            } else {
                acc[key].quantity += item.quantity;
                acc[key].tongTienVatLieu += item.tienVatLieu;
            }

            return acc;
        }, {} as Record<string, typeof allVatLieu[number] & { tongTienVatLieu: number }>),
    );

    const tongVatLieu = Object.values(
        chiTietVatLieu
            .map((v) => ({ ...v, value: v.quantity * v.value, quantity: 1 }))
            .reduce((acc, item) => {
                const key = `${item.vatLieuCode}`;

                if (!acc[key]) {
                    acc[key] = { ...item };
                } else {
                    acc[key].tongTienVatLieu += item.tongTienVatLieu;
                    acc[key].value += item.value;
                }

                return acc;
            }, {} as Record<string, typeof chiTietVatLieu[number]>),
    ).map((v) => ({ ...v, value: Math.round(v.value * 10) / 10 }));

    const tongTien = details.reduce(
        (sum, item) => sum + item.tongTienSanPham,
        0,
    );

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
            ...sanPhamData.map((sp) => ({ sanPhamCode: sp.code, quantity: 0 })),
        ].reduce((obj, item) => {
            obj[item.sanPhamCode] ??= {
                ...item,
                quantity: 0,
            };
            obj[item.sanPhamCode].quantity += item.quantity;
            return obj;
        }, {} as Record<string, TypeSanPhamCanLam>),
    ).sort((a, b) => codeOrder[a.sanPhamCode] - codeOrder[b.sanPhamCode]);

    return dsCanLam;
};

export const parseDanhSachCanLam = (danhSachCanLamStr: string): TypeSanPhamCanLam[] => {
    if (danhSachCanLamStr && danhSachCanLamStr !== "") {
        try {
            const danhSachCanLam = danhSachCanLamStr.split("~").map((SanPhamCanLamStr) => {
                const [sanPhamCode, quantity] = SanPhamCanLamStr.split(".");
                return { sanPhamCode, quantity: Number(quantity) };
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
                .map((SanPhamCanLam) => `${SanPhamCanLam.sanPhamCode}.${SanPhamCanLam.quantity}`)
                .join("~");
            return strDscl;
        } catch (error) {
            console.error("Error stringifying danhSachCanLam:", error);
        }
    }
    return "";
};
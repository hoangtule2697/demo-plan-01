import { sanPhamData, sanPhamOpts } from "@data";
import type { TypeFullDataSanPham, TypeSanPhamCanLam, VatLieuCode } from "@type";
import * as utils from "@utils";

export const getFullData = (danhSachCanLam: TypeSanPhamCanLam[]): TypeFullDataSanPham => {
    const chiTietDanhSachSanPham = (danhSachCanLam || []).map((SanPhamCanLam) => {
        const sanPham = sanPhamOpts[SanPhamCanLam.sanPhamCode];
        const tongTienSanPham = utils.number.num(sanPham?.tienSanPham) * SanPhamCanLam.quantityBuy;
        return {
            ...SanPhamCanLam,
            ...sanPham,
            tongTienSanPham,
        };
    });

    const allVatLieuCanMua = chiTietDanhSachSanPham.filter((d) => d.quantityBuy)
        .map((d) =>
            d.vatLieu.map((vl) => ({
                ...vl,
                quantityNeedBuy: d.quantityBuy * vl.quantityNeed,
                quantityBuy: d.quantityBuy,
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
                acc[key].quantityNeedBuy += item.quantityNeedBuy;
            }

            return acc;
        }, {} as Record<string, typeof allVatLieuCanMua[number]>),
    ).map((v) => {
        return {
            ...v,
            tongTienVatLieu: utils.number.num(v.perTienVatLieu) * v.quantityNeedBuy,
        };
    }).sort((a, b) =>
        a.keyVatLieu.localeCompare(b.keyVatLieu, undefined, {
            sensitivity: "base",
        }),
    );

    const groupVatLieu = utils.object.reMapObject(chiTietVatLieu, "vatLieuCode", { isArray: true });
    let tongVatLieuCanMua = [];
    for (const vatLieuCode of Object.keys(groupVatLieu) as (keyof typeof groupVatLieu)[]) {
        const vlCanMua = getTongVatLieuCanMua(vatLieuCode, groupVatLieu[vatLieuCode]);
        if (vlCanMua) tongVatLieuCanMua.push(vlCanMua);
    }

    const tongTien = tongVatLieuCanMua.reduce(
        (sum, item) => sum + utils.number.num(item?.totalVatLieuCanMua),
        0,
    );

    return {
        chiTietDanhSachSanPham,
        tongTien,
        chiTietVatLieu,
        tongVatLieuCanMua,
    };
};

const getTongVatLieuCanMua = (
    vatLieuCode: VatLieuCode,
    dsVatLieu: TypeFullDataSanPham["chiTietVatLieu"],
) => {
    const vatLieuData = dsVatLieu[0]?.vatLieuData;
    if (!vatLieuData) throw new Error(`Không tìm thấy vật liệu với code: ${vatLieuCode}`);

    switch (vatLieuCode) {
        case "sat_hop_kem":
            let quantityNeedBuy = 0;
            let used = 0;
            const widthSatHop = utils.number.num(vatLieuData.width);
            const newDs = dsVatLieu.flatMap((d) => Array(d.quantityNeedBuy).fill(d.width)).sort((a, b) => b - a);

            for (const vl of newDs) {
                used += utils.number.num(vl.width);
                if (used >= widthSatHop) {
                    quantityNeedBuy++;
                    used = used - widthSatHop;
                }
            }
            return {
                vatLieuCode,
                quantityNeedBuy: utils.number.num(quantityNeedBuy, 1),
                totalVatLieuCanMua: utils.number.num(quantityNeedBuy, 1) * vatLieuData.price,
                vatLieuData
            };
    }

    //throw new Error(`Không tìm thấy vật liệu với code: ${vatLieuCode}`);
}

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
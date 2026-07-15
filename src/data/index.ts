import type { TypeCanThietVatLieu, TypeFullDataSanPham, TypePhuPhi, TypeSanPham, TypeVatLieu } from "@type";
import * as utils from "@utils";

export const danhSachPhuPhi = [
    {
        name: "Gia công khung kệ 3 tầng",
        code: "gia_cong_khung_ke_3_tang",
        price: 35000,
        unit: "cái",
        value: 1,
    },
    {
        name: "Sơn tỉnh điện",
        code: "son_tinh_dien",
        price: 15000,
        unit: "kg",
        value: 1,
    },
    {
        name: "dán viền 4 cạnh - ván ép",
        code: "dan_vien_4_canh_van_ep",
        price: 7000,
        unit: "m",
        value: 1,
    },
    //khoan mồi không tính phí
] as const satisfies TypePhuPhi[];
export const phuPhiOpts = utils.object.reMapObject(danhSachPhuPhi);

export const getTitleVatLieu = (item: TypeCanThietVatLieu, vatLieuData: TypeVatLieu) => {
    const vl = vatLieuOpts[item.vatLieuCode];
    if (!vl) throw new Error(`Không tìm thấy vật liệu với code: ${item.vatLieuCode}`);

    if (["sat_hop_den", "sat_hop_kem"].includes(item.vatLieuCode)) {
        return `${vatLieuData.unit} ${vatLieuData.name} dài ${item.width}${vatLieuData.unitPrice}`;
    }
    if (["van_go_vang_nhat", "van_go_nau_dam"].includes(item.vatLieuCode)) {
        return `${vatLieuData.unit} ${vatLieuData.name} ${item.width}${vatLieuData.unitPrice} x ${item.height}${vatLieuData.unitPrice}`;
    }
}

export const getTamTinhTienVatLieu = (item: TypeCanThietVatLieu) => {
    const vl = vatLieuOpts[item.vatLieuCode];
    if (!vl) throw new Error(`Không tìm thấy vật liệu với code: ${item.vatLieuCode}`);

    if (["sat_hop_den", "sat_hop_kem"].includes(item.vatLieuCode)) {
        return utils.number.num(item.width) * (vl.price / vl.width);
    }
    if (["van_go_vang_nhat", "van_go_nau_dam"].includes(item.vatLieuCode)) {
        const dienTichTam = utils.number.num((vl as any)?.width) * utils.number.num((vl as any)?.height);

        const dienTichItem =
            utils.number.num(item.width) *
            utils.number.num(item.height);

        return (
            (dienTichItem / dienTichTam) *
            vl.price
        );
    }
}

export const getTamTinhTienPhuPhi = (phuPhiData: TypePhuPhi, items: TypeFullDataSanPham["chiTietVatLieu"]) => {
    if (["dan_vien_4_canh_van_ep"].includes(phuPhiData.code)) {
        const totalMet = items.reduce((a, b) => a + (utils.number.num(b.width) + utils.number.num(b.height)) * 2 / 100 * utils.number.num(b.quantityNeedBuy), 0);
        const tongTienPhuPhi = totalMet * phuPhiData.price;
        return {
            tongTienPhuPhi,
            options: { totalMet }
        };
    }
    if (["son_tinh_dien"].includes(phuPhiData.code)) {
        const vatLieuData = items[0].vatLieuData;
        const totalMet = Math.round(items.reduce((a, b) => a + utils.number.num(b.width) / 100 * utils.number.num(b.quantityNeedBuy), 0) * 10) / 10;
        const totalWeight = Math.round((totalMet / 6) * utils.number.num(vatLieuData?.weight) * 10) / 10;
        const tongTienPhuPhi = totalWeight * phuPhiData.price;
        return {
            tongTienPhuPhi,
            options: { totalMet, totalWeight }
        };
    }
    return { tongTienPhuPhi: 0 };
}

export const danhSachVatLieu = [
    {
        name: "sắt hộp đen",
        code: "sat_hop_den",
        price: 60000,
        unit: "cây",
        width: 600,//cm
        unitPrice: "cm",
        weight: 3.54 //kg
    },
    {
        name: "sắt hộp kẽm",
        code: "sat_hop_kem",
        price: 60000,
        unit: "cây",
        width: 600,//cm
        unitPrice: "cm",
        weight: 3.54 //kg
        //dày: 0.9
    },
    {
        name: "ván gỗ - vàng nhạt",
        code: "van_go_vang_nhat",
        price: 360000,//đã bao gồm dán melamine 2 mặt
        unit: "tấm",//cmxcm
        width: 244,
        height: 122,
        unitPrice: "cm"
    },
    {
        name: "ván gỗ - nâu đậm",
        code: "van_go_nau_dam",
        price: 360000,//đã bao gồm dán melamine 2 mặt
        unit: "tấm",
        width: 244,
        height: 122,
        unitPrice: "cm"
    },
    // {
    //     name: "hộp đóng gói",
    //     code: "hop_dong_goi",
    //     price: 10000,
    //     unit: "hộp",
    // },
    // {
    //     name: "phụ kiện kệ bàn",
    //     code: "phu_kien_ke_ban",
    //     price: 20000,
    //     unit: "phần",
    // },
] as const satisfies TypeVatLieu[];

export const vatLieuOpts = utils.object.reMapObject(danhSachVatLieu);

export const sanPhamBaseData = [
    {
        name: "Kệ 2 tầng - gỗ vàng nhạt",
        code: "ke_2_tang_vang_nhat",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_35",
                quantityNeed: 4,
                width: 35,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_30x50",
                quantityNeed: 2,
                width: 50,//cm
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_10x50",
                quantityNeed: 1,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 2 tầng - gỗ nâu đậm",
        code: "ke_2_tang_nau_dam",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_35",
                quantityNeed: 4,
                width: 35,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_30x50",
                quantityNeed: 2,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_10x50",
                quantityNeed: 1,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 3 tầng - gỗ vàng nhạt",
        code: "ke_3_tang_vang_nhat",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_66.5",
                quantityNeed: 4,
                width: 66.5,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_30x50",
                quantityNeed: 3,
                width: 50,//cm
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_10x50",
                quantityNeed: 2,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 3 tầng - gỗ nâu đậm",
        code: "ke_3_tang_nau_dam",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_66.5",
                quantityNeed: 4,
                width: 66.5,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_30x50",
                quantityNeed: 3,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_10x50",
                quantityNeed: 2,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 4 tầng - gỗ vàng nhạt",
        code: "ke_4_tang_vang_nhat",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_100",
                quantityNeed: 4,
                width: 100,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_30x50",
                quantityNeed: 4,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_10x50",
                quantityNeed: 3,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 4 tầng - gỗ nâu đậm",
        code: "ke_4_tang_nau_dam",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_100",
                quantityNeed: 4,
                width: 100,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_30x50",
                quantityNeed: 4,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_10x50",
                quantityNeed: 3,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 5 tầng - gỗ vàng nhạt",
        code: "ke_5_tang_vang_nhat",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 4,
                width: 130,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_30x50",
                quantityNeed: 5,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_10x50",
                quantityNeed: 4,
                width: 50,
                height: 8
            },
        ],
    },
    {
        name: "Kệ 5 tầng - gỗ nâu đậm",
        code: "ke_5_tang_nau_dam",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 4,
                width: 130,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_30",
                quantityNeed: 4,
                width: 30,
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_30x50",
                quantityNeed: 5,
                width: 50,
                height: 30,
                phuPhiCodes: ["dan_vien_4_canh_van_ep"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_10x50",
                quantityNeed: 4,
                width: 50,
                height: 8
            },
        ],
    },
] as const satisfies TypeSanPham[];

export const danhSachSanPham: TypeSanPham[] = sanPhamBaseData.map((sanPham) => {
    const vatLieu = sanPham.vatLieu.map((vl) => {
        const vatLieuData = vatLieuOpts[vl.vatLieuCode];
        if (!vatLieuData) throw new Error(`Không tìm thấy vật liệu với code: ${vl.vatLieuCode}`);

        const title = getTitleVatLieu(vl, vatLieuData);
        const perTienVatLieu = utils.number.num(getTamTinhTienVatLieu(vl));

        return {
            ...vl,
            title,
            perTienVatLieu,
            tienVatLieu: perTienVatLieu * vl.quantityNeed,
            vatLieuData,
        };
    });

    const tienSanPham = vatLieu.reduce(
        (sum, item) => sum + utils.number.num(item.tienVatLieu),
        0,
    );

    return {
        ...sanPham,
        vatLieu,
        tienSanPham,
    };
});

export const sanPhamOpts = utils.object.reMapObject(danhSachSanPham);

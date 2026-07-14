import type { PhuPhi, SanPhamResult, VatLieu } from "@type";
import * as utils from "@utils";

export const phuPhiData: PhuPhi[] = [
    {
        name: "Sơn tỉnh điện",
        code: "son_tinh_dien",
        price: 10000,
        unit: "m2",
        value: 1,
    },
    {
        name: "dán melamine cho 4 cạnh viền ván ép",
        code: "dan_melamine_cho_4_canh_vien_van_ep",
        price: 10000,
        unit: "m",
        value: 1,
    },
];
export const phuPhiOpts = utils.object.reMapObject(phuPhiData);

export const vatLieuData: VatLieu[] = [
    {
        name: "sắt hộp đen",
        code: "sat_hop_den",
        price: 15000,
        unit: "m",
        value: 1,
        getTitle: (item) => `cây sắt hộp đen dài ${item.value * 100}cm`,
    },
    {
        name: "ván gỗ - vàng nhạt",
        code: "van_go_vang_nhat",
        price: 150000,
        unit: "m2",
        value: 1,
        getTitle: (item) =>
            `tấm ván gỗ - vàng nhạt ${item.width}cm x ${item.height}cm`,
    },
    {
        name: "ván gỗ - nâu đậm",
        code: "van_go_nau_dam",
        price: 150000,
        unit: "m2",
        value: 1,
        getTitle: (item) =>
            `tấm ván gỗ - nâu đậm ${item.width}cm x ${item.height}cm`,
    },
    {
        name: "hộp đóng gói",
        code: "hop_dong_goi",
        price: 10000,
        unit: "hộp",
        value: 1,
        getTitle: (item) => `hộp đóng gói ${item.width}cm x ${item.height}cm`,
    },
    {
        name: "phụ kiện kệ bàn",
        code: "phu_kien_ke_ban",
        price: 20000,
        unit: "phần",
        value: 1,
        getTitle: (item) => `phụ kiện kệ bàn`,
        description: "ốc vít, chân bàn, bọc, chống xóc",
    },
];
export const vatLieuOpts = utils.object.reMapObject(vatLieuData);

export const sanPhamData: SanPhamResult[] = [
    {
        name: "Kệ 3 tầng - gỗ vàng nhạt",
        code: "ke_3_tang_vang_nhat",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 0.6,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 2,
                width: 10,
                height: 50,
            },
        ],
    },
    {
        name: "Kệ 3 tầng - gỗ nâu đậm",
        code: "ke_3_tang_nau_dam",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 0.6,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_nau_dam",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 2,
                width: 10,
                height: 50,
            },
        ],
    },
    {
        name: "Kệ 4 tầng - gỗ vàng nhạt",
        code: "ke_4_tang_vang_nhat",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 1,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 10,
                height: 50,
            },
        ],
    },
    {
        name: "Kệ 4 tầng - gỗ nâu đậm",
        code: "ke_4_tang_nau_dam",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 1,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_nau_dam",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 10,
                height: 50,
            },
        ],
    },
    {
        name: "Kệ 5 tầng - gỗ vàng nhạt",
        code: "ke_5_tang_vang_nhat",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 1.3,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 5,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_vang_nhat",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 10,
                height: 50,
            },
        ],
    },
    {
        name: "Kệ 5 tầng - gỗ nâu đậm",
        code: "ke_5_tang_nau_dam",
        vatLieu: [
            {
                code: "sat_hop_den",
                value: 1.3,
                quantity: 4,
            },
            {
                code: "sat_hop_den",
                value: 0.3,
                quantity: 4,
            },
            {
                code: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 5,
                width: 30,
                height: 50,
            },
            {
                code: "van_go_nau_dam",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 10,
                height: 50,
            },
        ],
    },
].map((sanPham) => {
    const vatLieu = sanPham.vatLieu.map((vl) => {
        const vatLieuData = vatLieuOpts[vl.code];
        const title = vatLieuData.getTitle(vl);
        const tienVatLieu = vatLieuData.price * vl.value * vl.quantity;

        return {
            ...vatLieuData,
            ...vl,
            title,
            tienVatLieu,
        };
    });

    const tienSanPham = vatLieu.reduce(
        (sum, item) => sum + item.tienVatLieu,
        0,
    );

    return {
        ...sanPham,
        vatLieu,
        tienSanPham,
    };
});

export const sanPhamOpts = utils.object.reMapObject(sanPhamData);
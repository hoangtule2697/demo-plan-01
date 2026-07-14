import type { TypeCanThietVatLieu, TypePhuPhi, TypeSanPham, TypeVatLieu } from "@type";
import * as utils from "@utils";

export const phuPhiData: TypePhuPhi[] = [
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
];
export const phuPhiOpts = utils.object.reMapObject(phuPhiData);

const getTitleVatLieu = (item: TypeCanThietVatLieu) => {
    const vl = vatLieuOpts[item.vatLieuCode];
    if (!vl) throw new Error(`Không tìm thấy vật liệu với code: ${item.vatLieuCode}`);

    if (["sat_hop_kem"].includes(item.vatLieuCode)) {
        return `cây sắt hộp dài ${item.value * 100}cm`;
    }
    if (["van_go_vang_nhat", "van_go_nau_dam"].includes(item.vatLieuCode)) {
        return `tấm ván gỗ dài ${item.width}cm x ${item.height}cm`;
    }
}

const getTamTinhTienVatLieu = (item: TypeCanThietVatLieu) => {
    const vl = vatLieuOpts[item.vatLieuCode];
    if (!vl) throw new Error(`Không tìm thấy vật liệu với code: ${item.vatLieuCode}`);

    if (["sat_hop_kem"].includes(item.vatLieuCode)) {
        return (item.value * item.quantity) * (vl.price / vl.value);
    }
    if (["van_go_vang_nhat", "van_go_nau_dam"].includes(item.vatLieuCode)) {
        const dienTichTam = utils.number.num((vl as any)?.width) * utils.number.num((vl as any)?.height);

        const dienTichItem =
            utils.number.num(item.width) *
            utils.number.num(item.height);

        return (
            (dienTichItem / dienTichTam) *
            vl.price *
            item.quantity
        );
    }
}

export const vatLieuData = [
    {
        name: "sắt hộp kẽm",
        code: "sat_hop_kem",
        price: 60000,
        unit: "m",
        value: 6,
    },
    {
        name: "ván gỗ - vàng nhạt",
        code: "van_go_vang_nhat",
        price: 360000,
        unit: "tấm",
        value: 1,
        width: 2440,
        height: 1220,
    },
    {
        name: "ván gỗ - nâu đậm",
        code: "van_go_nau_dam",
        price: 360000,
        unit: "tấm",
        value: 1,
        width: 2440,
        height: 1220,
    },
    // {
    //     name: "hộp đóng gói",
    //     code: "hop_dong_goi",
    //     price: 10000,
    //     unit: "hộp",
    //     value: 1,
    // },
    // {
    //     name: "phụ kiện kệ bàn",
    //     code: "phu_kien_ke_ban",
    //     price: 20000,
    //     unit: "phần",
    //     value: 1,
    // },
] as const satisfies TypeVatLieu[];

export const vatLieuOpts = utils.object.reMapObject(vatLieuData);

export const sanPhamBaseData = [
    {
        name: "Kệ 3 tầng - gỗ vàng nhạt",
        code: "ke_3_tang_vang_nhat",
        vatLieu: [
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.6,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
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
                vatLieuCode: "sat_hop_kem",
                value: 0.6,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 3,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_nau_dam",
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
                vatLieuCode: "sat_hop_kem",
                value: 1,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
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
                vatLieuCode: "sat_hop_kem",
                value: 1,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_nau_dam",
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
                vatLieuCode: "sat_hop_kem",
                value: 1.3,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 5,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_vang_nhat",
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
                vatLieuCode: "sat_hop_kem",
                value: 1.3,
                quantity: 4,
            },
            {
                vatLieuCode: "sat_hop_kem",
                value: 0.3,
                quantity: 4,
            },
            {
                vatLieuCode: "van_go_nau_dam",
                value: 0.15, // 0.15 m2 = 30cm x 50cm
                quantity: 5,
                width: 30,
                height: 50,
            },
            {
                vatLieuCode: "van_go_nau_dam",
                value: 0.05, // 0.15 m2 = 30cm x 50cm
                quantity: 4,
                width: 10,
                height: 50,
            },
        ],
    },
] as const satisfies TypeSanPham[];

export const sanPhamData: TypeSanPham[] = sanPhamBaseData.map((sanPham) => {
    const vatLieu = sanPham.vatLieu.map((vl) => {
        const vatLieuData = vatLieuOpts[vl.vatLieuCode];
        if (!vatLieuData) throw new Error(`Không tìm thấy vật liệu với code: ${vl.vatLieuCode}`);

        const title = getTitleVatLieu(vl);
        const tienVatLieu = getTamTinhTienVatLieu(vl);

        return {
            ...vl,
            title,
            tienVatLieu,
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

export const sanPhamOpts = utils.object.reMapObject(sanPhamData);

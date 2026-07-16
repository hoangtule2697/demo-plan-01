import type { TypeCanThietVatLieu, TypeChiPhiSauKhiBan, TypeFullDataSanPham, TypePhuPhi, TypeSanPham, TypeVatLieu } from "@type";
import * as utils from "@utils";

const activeGiaCongKhungKe = true;
export const phuPhiBaseData = [
    {
        name: "Gia công khung kệ 1 tầng",
        code: "gia_cong_khung_ke_1_tang",
        price: 40000,
        unit: "cái",
        value: 1,
        active: activeGiaCongKhungKe
    },
    {
        name: "Gia công khung kệ 2 tầng",
        code: "gia_cong_khung_ke_2_tang",
        price: 40000,
        unit: "cái",
        value: 1,
        active: activeGiaCongKhungKe
    },
    {
        name: "Gia công khung kệ 3 tầng",
        code: "gia_cong_khung_ke_3_tang",
        price: 40000,
        unit: "cái",
        value: 1,
        active: activeGiaCongKhungKe
    },
    {
        name: "Gia công khung kệ 4 tầng",
        code: "gia_cong_khung_ke_4_tang",
        price: 40000,
        unit: "cái",
        value: 1,
        active: activeGiaCongKhungKe
    },
    {
        name: "Gia công khung kệ 5 tầng",
        code: "gia_cong_khung_ke_5_tang",
        price: 40000,
        unit: "cái",
        value: 1,
        active: activeGiaCongKhungKe
    },
    {
        name: "Sơn tỉnh điện",
        code: "son_tinh_dien",
        price: 12000,
        unit: "kg",
        value: 1,
        active: true
    },
    {
        name: "Dán viền 4 cạnh - ván ép",
        code: "dan_vien_4_canh_van_ep",
        price: 7000,
        unit: "m",
        value: 1,
        active: true
    },
    //khoan mồi không tính phí
    {
        name: "Phụ kiện kệ và đóng gói",
        code: "phu_kien_ke_va_dong_goi",
        price: 15000,
        unit: "cái",
        value: 1,
        active: true
    },
] as const satisfies TypePhuPhi[];

export const danhSachPhuPhi = phuPhiBaseData.filter(i => i.active);
export const phuPhiOpts = utils.object.reMapObject(danhSachPhuPhi);

export const danhSachChiPhiSauKhiBan = [
    {
        name: "Phí sàn shopee",
        code: "phi_san_shopee",
        value: 35,
        amountType: "%"
    },
    {
        name: "Phí vận chuyển hàng cồng kềnh",
        code: "phi_van_chuyen_hang_cong_kenh",
        value: 60000,
        amountType: "VND"
    },
    {
        name: "Phí vận chuyển hàng nhẹ",
        code: "phi_van_chuyen_hang_nhe",
        value: 20000,
        amountType: "VND"
    },
] as const satisfies TypeChiPhiSauKhiBan[];
export const chiPhiSauKhiBanOpts = utils.object.reMapObject(danhSachChiPhiSauKhiBan);

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
        const totalMet = Math.round(items.reduce((a, b) => a + (utils.number.num(b.width) + utils.number.num(b.height)) * 2 / 100 * utils.number.num(b.quantityNeedBuy, 1), 0) * 10) / 10;
        const tongTienPhuPhi = totalMet * phuPhiData.price;
        return {
            tongTienPhuPhi,
            options: { totalMet }
        };
    }
    if (["son_tinh_dien"].includes(phuPhiData.code)) {
        const vatLieuData = items[0].vatLieuData;
        const totalMet = Math.round(items.reduce((a, b) => a + utils.number.num(b.width) / 100 * utils.number.num(b.quantityNeedBuy, 1), 0) * 10) / 10;
        const totalWeight = Math.round((totalMet / 6) * utils.number.num(vatLieuData?.weight) * 10) / 10;
        const tongTienPhuPhi = totalWeight * phuPhiData.price;
        return {
            tongTienPhuPhi,
            options: { totalMet, totalWeight }
        };
    }

    //mặc định
    const quantityNeedDo = items.reduce((a, b) => a + utils.number.num(b.quantityNeedBuy, 1), 0);
    return {
        tongTienPhuPhi: phuPhiData.price * quantityNeedDo,
        options: { quantityNeedDo }
    };
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
        price: 460000,//đã bao gồm dán melamine 2 mặt
        unit: "tấm",//cmxcm
        width: 244,
        height: 122,
        unitPrice: "cm",
        description: "340k đã bao gồm dán melamine 2 mặt vân gỗ, mua lẻ +20k, cnc cắt gỗ + 100k, khoan mồi k tính"
    },
    {
        name: "ván gỗ - nâu đậm",
        code: "van_go_nau_dam",
        price: 460000,//đã bao gồm dán melamine 2 mặt
        unit: "tấm",
        width: 244,
        height: 122,
        unitPrice: "cm",
        description: "340k đã bao gồm dán melamine 2 mặt vân gỗ, mua lẻ +20k, cnc cắt gỗ + 100k, khoan mồi k tính"
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
        name: "Kệ 1 tầng - gỗ vàng nhạt",
        code: "ke_1_tang_vang_nhat",
        giaShopee: 150000,
        giaBan: 150000,
        phuPhiCodes: ["gia_cong_khung_ke_1_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_35",
            //     quantityNeed: 4,
            //     width: 35,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 2,
                width: 130,//35x30
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_vang_nhat",
                keyVatLieu: "van_go_vang_nhat_30x50",
                quantityNeed: 1,
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
        active: false
    },
    {
        name: "Kệ 1 tầng - gỗ nâu đậm",
        code: "ke_1_tang_nau_dam",
        giaShopee: 150000,
        giaBan: 150000,
        phuPhiCodes: ["gia_cong_khung_ke_1_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_35",
            //     quantityNeed: 4,
            //     width: 35,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 2,
                width: 130,//35x30
                phuPhiCodes: ["son_tinh_dien"]
            },
            {
                vatLieuCode: "van_go_nau_dam",
                keyVatLieu: "van_go_nau_dam_30x50",
                quantityNeed: 1,
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
        active: false
    },
    {
        name: "Kệ 2 tầng - gỗ vàng nhạt",
        code: "ke_2_tang_vang_nhat",
        giaShopee: 280000,
        giaBan: 280000,
        phuPhiCodes: ["gia_cong_khung_ke_2_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_35",
            //     quantityNeed: 4,
            //     width: 35,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 2,
                width: 130,//35x30
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
        active: true
    },
    {
        name: "Kệ 2 tầng - gỗ nâu đậm",
        code: "ke_2_tang_nau_dam",
        giaShopee: 280000,
        giaBan: 280000,
        phuPhiCodes: ["gia_cong_khung_ke_2_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_35",
            //     quantityNeed: 4,
            //     width: 35,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_130",
                quantityNeed: 2,
                width: 130,//35x30
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
        active: true
    },
    {
        name: "Kệ 3 tầng - gỗ vàng nhạt",
        code: "ke_3_tang_vang_nhat",
        giaShopee: 350000,
        giaBan: 350000,
        phuPhiCodes: ["gia_cong_khung_ke_3_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_66.5",
            //     quantityNeed: 4,
            //     width: 66.5,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_200",
                quantityNeed: 2,
                width: 200,//70x30
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
        active: true
    },
    {
        name: "Kệ 3 tầng - gỗ nâu đậm",
        code: "ke_3_tang_nau_dam",
        giaShopee: 350000,
        giaBan: 350000,
        phuPhiCodes: ["gia_cong_khung_ke_3_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_66.5",
            //     quantityNeed: 4,
            //     width: 66.5,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_200",
                quantityNeed: 2,
                width: 200,//70x30
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
        active: true
    },
    {
        name: "Kệ 4 tầng - gỗ vàng nhạt",
        code: "ke_4_tang_vang_nhat",
        giaShopee: 470000,
        giaBan: 470000,
        phuPhiCodes: ["gia_cong_khung_ke_4_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_100",
            //     quantityNeed: 4,
            //     width: 100,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_260",
                quantityNeed: 2,
                width: 260,//100x30
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
        active: true
    },
    {
        name: "Kệ 4 tầng - gỗ nâu đậm",
        code: "ke_4_tang_nau_dam",
        giaShopee: 470000,
        giaBan: 470000,
        phuPhiCodes: ["gia_cong_khung_ke_4_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_100",
            //     quantityNeed: 4,
            //     width: 100,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_260",
                quantityNeed: 2,
                width: 260,//100x30
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
        active: true
    },
    {
        name: "Kệ 5 tầng - gỗ vàng nhạt",
        code: "ke_5_tang_vang_nhat",
        giaShopee: 550000,
        giaBan: 550000,
        phuPhiCodes: ["gia_cong_khung_ke_5_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_130",
            //     quantityNeed: 4,
            //     width: 130,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_320",
                quantityNeed: 2,
                width: 320,//130x30
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
        active: true
    },
    {
        name: "Kệ 5 tầng - gỗ nâu đậm",
        code: "ke_5_tang_nau_dam",
        giaShopee: 550000,
        giaBan: 550000,
        phuPhiCodes: ["gia_cong_khung_ke_5_tang", "phu_kien_ke_va_dong_goi"],
        chiPhiSauKhiBanCodes: ["phi_san_shopee", "phi_van_chuyen_hang_cong_kenh"],
        vatLieu: [
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_130",
            //     quantityNeed: 4,
            //     width: 130,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            // {
            //     vatLieuCode: "sat_hop_kem",
            //     keyVatLieu: "sat_hop_kem_dai_30",
            //     quantityNeed: 4,
            //     width: 30,
            //     phuPhiCodes: ["son_tinh_dien"]
            // },
            {
                vatLieuCode: "sat_hop_kem",
                keyVatLieu: "sat_hop_kem_dai_320",
                quantityNeed: 2,
                width: 320,//130x30
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
        active: true
    },
] as const satisfies TypeSanPham[];

export const danhSachSanPham: TypeSanPham[] = sanPhamBaseData.filter(s => s.active).map((sanPham) => {
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

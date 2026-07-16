import type { danhSachChiPhiSauKhiBan, danhSachSanPham, danhSachVatLieu, phuPhiBaseData } from "@data";

export type Unit = "cm" | "m" | "m2" | "hộp" | "phần" | "kg" | "cái" | "tấm" | "cây";
export type AmountType = "%" | "VND";

export interface TypePhuPhi {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
    active: boolean;
}
export type PhuPhiCode = (typeof phuPhiBaseData)[number]["code"];

export interface TypeChiPhiSauKhiBan {
    name: string;
    code: string;
    value: number;
    amountType: AmountType;
}
export type ChiPhiSauKhiBanCode = (typeof danhSachChiPhiSauKhiBan)[number]["code"];

export interface TypeVatLieu {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    unitPrice: Unit;
    value?: number;
    width?: number;
    height?: number;
    weight?: number;
    description?: string;
    getTitle?: (item: TypeCanThietVatLieu) => string;
    getTamTinhTienVatLieu?: (item: TypeCanThietVatLieu) => number;
}

export type VatLieuCode = (typeof danhSachVatLieu)[number]["code"];

//vật liệu cần để tạo ra sản phẩm
export interface TypeCanThietVatLieu {
    //cần vật liệu nào
    vatLieuCode: VatLieuCode;
    //sl bao nhiêu
    quantityNeed: number;
    //keyVatLieu khi nào 2 vật liệu mới tính là giống nhau
    keyVatLieu: string;
    phuPhiCodes?: PhuPhiCode[];

    value?: number;
    width?: number;
    height?: number;
    title?: string;
    tienVatLieu?: number;
    perTienVatLieu?: number;
    vatLieuData?: TypeVatLieu;
}

export interface TypeSanPham {
    name: string;
    code: string;
    vatLieu: TypeCanThietVatLieu[];
    active: boolean;
    phuPhiCodes?: PhuPhiCode[];
    chiPhiSauKhiBanCodes?: ChiPhiSauKhiBanCode[];
    tienSanPham?: number;
    giaShopee?: number;
    giaBan: number;
}

export type SanPhamCode = (typeof danhSachSanPham)[number]["code"];

export interface TypeSanPhamCanLam {
    sanPhamCode: SanPhamCode;
    quantityBuy: number;
}

export type TypeFullDataSanPham = {
    chiTietDanhSachSanPham: (
        TypeSanPham & TypeSanPhamCanLam & {
            phuPhi: ({
                phuPhiCode: PhuPhiCode,
                phuPhiData: TypePhuPhi,
                tongTienPhuPhi: number,
                options?: any
            })[],
            tamTinhPhiNhapHang: number,
            danhSachChiPhiSauKhiBan: ({
                chiPhiSauKhiBanData: TypeChiPhiSauKhiBan,
                tongChiTietChiPhiSauKhiBan: number,
            })[],
            tongChiPhiSauKhiBan: number,
            soTienConLai: number,
        })[];
    chiTietVatLieu: (TypeCanThietVatLieu & { tongTienVatLieu: number, quantityBuy: number, quantityNeedBuy: number })[];
    chiTietVatLieuCanMua: ({
        vatLieuCode: VatLieuCode,
        totalVatLieuCanMua: number,
        quantityNeedBuy: number,
        vatLieuData: TypeVatLieu,
        //dùng cho cắt cây sắt
        options?: any
    })[];
    chiTietPhuPhi: ({
        phuPhiCode: PhuPhiCode,
        phuPhiData: TypePhuPhi,
        tongTienPhuPhi: number,
        options?: any
    })[];
    tongPhiNhapHang: number;
    tamTinhTongPhiNhapHang: number;
};
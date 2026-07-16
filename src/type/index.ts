import type { danhSachPhuPhi, danhSachSanPham, danhSachVatLieu } from "@data";

export type Unit = "cm" | "m" | "m2" | "hộp" | "phần" | "kg" | "cái" | "tấm" | "cây";

export interface TypePhuPhi {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
}

export type PhuPhiCode = (typeof danhSachPhuPhi)[number]["code"];

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
    phuPhiCodes?: PhuPhiCode[];
    tienSanPham?: number;
    giaShopee?: number;
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
            tongTien: number
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
    tongTien: number;
    tongTienTamTinh: number;
};
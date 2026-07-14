import type { sanPhamData, vatLieuData } from "@data";

export type Unit = "m" | "m2" | "hộp" | "phần" | "kg" | "cái" | "tấm";

export interface TypePhuPhi {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
}

export interface TypeVatLieu {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
    width?: number;
    height?: number;
    description?: string;
    getTitle?: (item: TypeCanThietVatLieu) => string;
    getTamTinhTienVatLieu?: (item: TypeCanThietVatLieu) => number;
}

export type VatLieuCode = (typeof vatLieuData)[number]["code"];

//vật liệu cần để tạo ra sản phẩm
export interface TypeCanThietVatLieu {
    //cần vật liệu nào
    vatLieuCode: VatLieuCode;
    //sl bao nhiêu
    quantityNeed: number;
    //keyVatLieu khi nào 2 vật liệu mới tính là giống nhau
    keyVatLieu: string;

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
    tienSanPham?: number;
}

export type SanPhamCode = (typeof sanPhamData)[number]["code"];

export interface TypeSanPhamCanLam {
    sanPhamCode: SanPhamCode;
    quantityBuy: number;
}

export type TypeFullDataSanPham = {
    details: (TypeSanPham & TypeSanPhamCanLam & { tongTienSanPham: number })[];
    chiTietVatLieu: (TypeCanThietVatLieu & { tongTienVatLieu: number })[];
    tongVatLieu: (TypeCanThietVatLieu & { tongTienVatLieu: number })[];
    tongTien: number;
};
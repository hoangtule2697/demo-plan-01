export type Unit = "m" | "m2" | "hộp" | "phần";

export interface PhuPhi {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
}

export interface VatLieu {
    name: string;
    code: string;
    price: number;
    unit: Unit;
    value: number;
    width?: number;
    height?: number;
    description?: string;
    getTitle: (item: VatLieuItem) => string;
}

export interface VatLieuItem {
    code: string;
    value: number;
    quantity: number;
    width?: number;
    height?: number;
}

export interface SanPham {
    name: string;
    code: string;
    vatLieu: VatLieuItem[];
}

export interface SanPhamVatLieu extends VatLieu, VatLieuItem {
    title: string;
    tienVatLieu: number;
}

export interface SanPhamResult
    extends Omit<SanPham, "vatLieu"> {
    vatLieu: SanPhamVatLieu[];
    tienSanPham: number;
}

export interface SanPhamCanLam {
    sanPhamCode: string;
    quantity: number;
}

export type GetFullDataResult = {
    details: ChiTietSanPham[];
    tongTien: number;
    chiTietVatLieu: ChiTietVatLieu[];
    tongVatLieu: TongVatLieu[];
};

export type ChiTietSanPham = SanPhamResult &
    SanPhamCanLam & {
        tongTienSanPham: number;
    };

export type ChiTietVatLieu = SanPhamVatLieu & {
    tongTienVatLieu: number;
};

export type TongVatLieu = ChiTietVatLieu;
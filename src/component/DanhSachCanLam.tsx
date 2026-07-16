import { BaseCard, BaseDrawer, QuantityButton } from "@component/base";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import useChiTietSanPham from "hook/component/useChiTietSanPham";

export default function DanhSachCanLam({
    chiTietDanhSachSanPham,
    tongTienTamTinh,
    onChangeSanPhamCanLam = () => { },
    onClearDanhSachCanLam = () => { },
}: {
    chiTietDanhSachSanPham: TypeFullDataSanPham["chiTietDanhSachSanPham"];
    tongTienTamTinh: TypeFullDataSanPham["tongTienTamTinh"];
    onChangeSanPhamCanLam?: (index: number, newQuantity: number) => void;
    onClearDanhSachCanLam?: () => void;
}) {

    return (
        <BaseCard
            title="Danh sách cần làm"
            actionHeader={
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClearDanhSachCanLam}
                >
                    X
                </Button>
            }
        >
            <List disablePadding sx={{ maxHeight: "80svh", overflowY: "auto" }}>
                {chiTietDanhSachSanPham.map((sanPhamDetail, indexSanPham) => (
                    <ChiTietSanPham
                        key={`dscl-${sanPhamDetail?.sanPhamCode}-${sanPhamDetail?.quantityBuy}`}
                        sanPhamDetail={sanPhamDetail}
                        indexSanPham={indexSanPham}
                        onChangeSanPhamCanLam={onChangeSanPhamCanLam}
                    />
                ))}
                <Grid sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        tổng tiền tạm tính: {utils.view.displayCurrency(tongTienTamTinh)}
                    </Typography>
                </Grid>
            </List>
        </BaseCard>
    );
};

const ChiTietSanPham = ({ sanPhamDetail, indexSanPham, onChangeSanPhamCanLam }: { sanPhamDetail: TypeFullDataSanPham["chiTietDanhSachSanPham"][0]; indexSanPham: number; onChangeSanPhamCanLam: (index: number, newQuantity: number) => void }) => {
    if (!sanPhamDetail) return null;
    const { ChiTietVatLieuSanPham, SummaryPriceSanPham } = useChiTietSanPham({ sanPhamDetail });
    const { name, quantityBuy } = sanPhamDetail;

    return (
        <ListItem
            disableGutters
            sx={{ py: 1 }}
        >
            <Grid sx={{ width: "100%", }}>
                <Grid
                    sx={{
                        xs: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Grid container spacing={1}>
                        <BaseDrawer
                            title="Chi tiết sản phẩm"
                            drawerProps={{ anchor: "left" }}
                            contentProps={{ sx: { p: 0, minWidth: "40svw" } }}
                            OpenButton={(p) => <Typography sx={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }} {...p}>{`${quantityBuy} cái ${name}`}</Typography>}
                            footer={<Grid container sx={{ justifyContent: "end" }}><SummaryPriceSanPham /></Grid>}
                        >
                            <ChiTietVatLieuSanPham />
                        </BaseDrawer>
                    </Grid>

                    <QuantityButton
                        defaultValue={quantityBuy}
                        onChange={(newQuantity) =>
                            onChangeSanPhamCanLam(indexSanPham, newQuantity)
                        }
                    />
                </Grid>
                <Grid sx={{ xs: 12 }}>
                    <SummaryPriceSanPham />
                </Grid>
            </Grid>
        </ListItem>
    )
}
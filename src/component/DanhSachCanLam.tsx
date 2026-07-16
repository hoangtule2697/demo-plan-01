import { BaseCard, BaseDrawer, QuantityButton } from "@component/base";
import { Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import useChiTietSanPham from "hook/component/useChiTietSanPham";

export default function DanhSachCanLam({
    chiTietDanhSachSanPham,
    tamTinhTongPhiNhapHang,
    onChangeSanPhamCanLam = () => { },
    onClearDanhSachCanLam = () => { },
}: {
    chiTietDanhSachSanPham: TypeFullDataSanPham["chiTietDanhSachSanPham"];
    tamTinhTongPhiNhapHang: TypeFullDataSanPham["tamTinhTongPhiNhapHang"];
    onChangeSanPhamCanLam?: (index: number, newQuantity: number) => void;
    onClearDanhSachCanLam?: () => void;
}) {

    return (
        <BaseCard
            title="Danh sách sản phẩm cần làm"
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
                <Grid sx={{ pt: 2, position: "sticky", bottom: 0, bgcolor: "#fff" }}>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        tổng phí nhập hàng tạm tính: {utils.view.displayCurrency(tamTinhTongPhiNhapHang)}
                    </Typography>
                </Grid>
            </List>
        </BaseCard>
    );
};

const ChiTietSanPham = ({ sanPhamDetail, indexSanPham, onChangeSanPhamCanLam }: { sanPhamDetail: TypeFullDataSanPham["chiTietDanhSachSanPham"][0]; indexSanPham: number; onChangeSanPhamCanLam: (index: number, newQuantity: number) => void }) => {
    if (!sanPhamDetail) return null;
    const { ChiTietVatLieuSanPham, SummaryPriceSanPham } = useChiTietSanPham({ sanPhamDetail });
    const { name, quantityBuy, danhSachChiPhiSauKhiBan, giaBan, tamTinhPhiNhapHang, soTienConLai } = sanPhamDetail;

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
                        // footer={<Grid container sx={{ justifyContent: "end" }}><SummaryPriceSanPham /></Grid>}
                        >
                            <ChiTietVatLieuSanPham />

                            <Grid container sx={{ justifyContent: "space-between", p: 0.5 }}>
                                <Grid>
                                    <Typography>Tổng phí làm sản phẩm</Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ fontWeight: "bold" }}>{utils.view.displayCurrency(tamTinhPhiNhapHang)}</Typography>
                                </Grid>
                            </Grid>

                            {/* <Grid container sx={{ justifyContent: "end" }}>
                                <SummaryPriceSanPham />
                            </Grid> */}

                            <Grid container sx={{ justifyContent: "space-between", p: 0.5, mt: 3 }}>
                                <Grid>
                                    <Typography sx={{ fontWeight: "bold" }}>Trừ phí sau khi bán 1 sp</Typography>
                                </Grid>
                                <Grid>
                                    <Typography color="success">bán: {utils.view.displayCurrency(giaBan)}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ justifyContent: "space-between", p: 0.5 }}>
                                <Grid>
                                    <Typography>Tổng phí làm sản phẩm</Typography>
                                </Grid>
                                <Grid>
                                    <Typography>- {utils.view.displayCurrency(tamTinhPhiNhapHang)}</Typography>
                                </Grid>
                            </Grid>

                            <Grid>
                                {(danhSachChiPhiSauKhiBan || []).map(({ chiPhiSauKhiBanData, tongChiTietChiPhiSauKhiBan }) => {
                                    return <Grid container sx={{ justifyContent: "space-between", p: 0.5 }}>
                                        <Grid>
                                            <Typography>{chiPhiSauKhiBanData.name} ({chiPhiSauKhiBanData.amountType === "%" ? `${chiPhiSauKhiBanData.value}%` : utils.view.displayCurrency(chiPhiSauKhiBanData.value)})</Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography>- {utils.view.displayCurrency(tongChiTietChiPhiSauKhiBan)}</Typography>
                                        </Grid>
                                    </Grid>
                                })}
                            </Grid>

                            <Divider sx={{ mt: 0.5, mb: 0.5 }} />

                            <Grid container sx={{ justifyContent: "space-between", p: 0.5 }}>
                                <Grid>
                                    <Typography>còn lại</Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ fontWeight: "bold" }} color={soTienConLai > 0 ? "success" : "error"}>{utils.view.displayCurrency(soTienConLai)}</Typography>
                                </Grid>
                            </Grid>
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
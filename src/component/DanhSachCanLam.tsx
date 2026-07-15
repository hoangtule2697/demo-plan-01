import { BaseCard, QuantityButton } from "@component/base";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import useChiTietSanPham from "hook/component/useChiTietSanPham";
import { useCollapse } from "hook/component/useCollapse";

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
            <List disablePadding>
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
    const { CollapseButton, CollapseContent } = useCollapse();
    const { ChiTietVatLieuSanPham, SummaryPriceSanPham } = useChiTietSanPham({ sanPhamDetail });

    const { sanPhamCode, name, quantityBuy } = sanPhamDetail;

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
                        <Typography>
                            {`${quantityBuy} cái ${name}`}
                        </Typography>
                        <CollapseButton collapseKey={`collapse-${sanPhamCode}-${quantityBuy}`} />
                    </Grid>


                    <QuantityButton
                        defaultValue={quantityBuy}
                        onChange={(newQuantity) =>
                            onChangeSanPhamCanLam(indexSanPham, newQuantity)
                        }
                    />
                </Grid>
                <Grid sx={{ xs: 12 }}>
                    <Grid>
                        <CollapseContent collapseKey={`collapse-${sanPhamCode}-${quantityBuy}`}>
                            <ChiTietVatLieuSanPham />
                        </CollapseContent>
                    </Grid>
                    <Grid>
                        <SummaryPriceSanPham />
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}
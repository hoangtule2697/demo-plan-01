import { BaseCard, QuantityButton } from "@component/base";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import type { ChiTietSanPham, GetFullDataResult } from "@type";
import useChiTietSanPham from "hook/component/useChiTietSanPham";
import { useCollapse } from "hook/component/useCollapse";

export default function DanhSachCanLam({
    details,
    onChangeSanPhamCanLam = () => { },
    onClearDanhSachCanLam = () => { },
}: {
    details: GetFullDataResult["details"];
    onChangeSanPhamCanLam?: (index: number, newQuantity: number) => void;
    onClearDanhSachCanLam?: () => void;
}) {

    return (
        <BaseCard
            header={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" id="title">
                        Danh sách cần làm
                    </Typography>

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onClearDanhSachCanLam}
                    >
                        X
                    </Button>
                </Box>
            }
        >
            <List disablePadding>
                {details.map((sanPhamDetail, indexSanPham) => (
                    <ChiTietSanPham
                        key={`dscl-${sanPhamDetail?.sanPhamCode}-${sanPhamDetail?.quantity}`}
                        sanPhamDetail={sanPhamDetail}
                        indexSanPham={indexSanPham}
                        onChangeSanPhamCanLam={onChangeSanPhamCanLam}
                    />
                ))}
            </List>
        </BaseCard>
    );
};

const ChiTietSanPham = ({ sanPhamDetail, indexSanPham, onChangeSanPhamCanLam }: { sanPhamDetail: ChiTietSanPham; indexSanPham: number; onChangeSanPhamCanLam: (index: number, newQuantity: number) => void }) => {
    if (!sanPhamDetail) return null;
    const { CollapseButton, CollapseContent } = useCollapse();
    const { ChiTietVatLieuSanPham, SummaryPriceSanPham } = useChiTietSanPham({ sanPhamDetail });

    const { sanPhamCode, name, quantity } = sanPhamDetail;

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
                            {`${quantity} cái ${name}`}
                        </Typography>
                        <CollapseButton collapseKey={`collapse-${sanPhamCode}-${quantity}`} />
                    </Grid>


                    <QuantityButton
                        defaultValue={quantity}
                        onChange={(newQuantity) =>
                            onChangeSanPhamCanLam(indexSanPham, newQuantity)
                        }
                    />
                </Grid>
                <Grid sx={{ xs: 12 }}>
                    <Grid>
                        <CollapseContent collapseKey={`collapse-${sanPhamCode}-${quantity}`}>
                            <ChiTietVatLieuSanPham /></CollapseContent>
                    </Grid>
                    <Grid>
                        <SummaryPriceSanPham />
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}
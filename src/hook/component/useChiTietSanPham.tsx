import {
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { viewOptions } from "component/TongPhuPhi";

export default function useChiTietSanPham({ sanPhamDetail }: { sanPhamDetail: TypeFullDataSanPham["chiTietDanhSachSanPham"][0] }) {
    const { name, vatLieu, phuPhi, tamTinhPhiNhapHang, giaShopee, giaBan, tongChiPhiSauKhiBan, soTienConLai } = sanPhamDetail;

    const ChiTietVatLieuSanPham = () => {
        return (
            <Box>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                >
                    {`Làm 1 cái ${name} cần:`}
                </Typography>

                <List disablePadding sx={{ ml: 2 }}>
                    {vatLieu.map((vl) => (
                        <ListItem key={`ctsp-vl-${vl.title}`} disableGutters sx={{ py: 1 }} >
                            <Grid sx={{ width: "100%" }}>
                                <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                    <Typography>
                                        {`- ${vl.quantityNeed} ${vl.title}`}
                                    </Typography>

                                    <Typography>
                                        {`${utils.view.displayCurrency(vl.perTienVatLieu)} x ${vl.quantityNeed} = ${utils.view.displayCurrency(vl.tienVatLieu)}`}
                                    </Typography>
                                </Grid>
                                <Divider sx={{ mt: 0.5 }} />
                            </Grid>
                        </ListItem>
                    ))}
                    {phuPhi.map((detailPhuPhi, idx) => (
                        <ListItem
                            key={`ctvl2-${idx}`}
                            disableGutters
                            sx={{ py: 1 }}
                        >
                            <Grid sx={{ width: "100%" }}>
                                <Grid container sx={{ justifyContent: "space-between" }}>
                                    <Typography>
                                        {`${detailPhuPhi.phuPhiData.name}`}
                                    </Typography>

                                    <Typography>
                                        {`${utils.view.displayCurrency(detailPhuPhi.tongTienPhuPhi)}`}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ ml: 4 }}>
                                        {viewOptions(detailPhuPhi)}
                                    </Typography>
                                </Grid>
                                <Divider sx={{ mt: 0.5 }} />
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    const SummaryPriceSanPham = () => {
        return (
            <Grid container sx={{ mt: 1, ml: 2, justifyContent: "space-between" }}>
                <Grid container spacing={1}>
                    <Grid>
                        {giaShopee && <Typography variant="body2" color="warning" sx={{ fontWeight: "bold" }}>
                            {`shopee: ${utils.view.displayCurrency(giaShopee)}`}
                        </Typography>}
                    </Grid>

                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {`nhập: ${utils.view.displayCurrency(tamTinhPhiNhapHang)}`}
                        </Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {`phí bán: ${utils.view.displayCurrency(tongChiPhiSauKhiBan)}`}
                        </Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="body2" color="success" sx={{ fontWeight: "bold" }}>
                            {`bán: ${utils.view.displayCurrency(giaBan)}`}
                        </Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="body2" color={soTienConLai > 0 ? "success" : "error"} sx={{ fontWeight: "bold" }}>
                            {`${soTienConLai > 0 ? "lãi" : "lỗ"}: ${utils.view.displayCurrency(soTienConLai)}`}
                        </Typography>
                    </Grid>

                    <Grid>
                        {/* {giaShopee && <Typography variant="body2" color={giaShopee - tongTien > 0 ? "success" : "error"} sx={{ fontWeight: "bold" }}>
                            {`= ${utils.view.displayCurrency(giaShopee - tongTien)} (${Math.round(tongTien * 100 / giaShopee)}%)`}
                        </Typography>} */}
                    </Grid>
                </Grid>
                {/* <Grid>
                    {quantityBuy > 1 && <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {quantityBuy > 1 ? `${quantityBuy} cái: ${utils.view.displayCurrency(tongTien * quantityBuy)}` : ""}
                    </Typography>}
                </Grid> */}
            </Grid>
        );
    }

    return { ChiTietVatLieuSanPham, SummaryPriceSanPham };
};

import {
    Box,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { viewOptions } from "component/TongPhuPhi";

export default function useChiTietSanPham({ sanPhamDetail }: { sanPhamDetail: TypeFullDataSanPham["chiTietDanhSachSanPham"][0] }) {
    const { name, quantityBuy, vatLieu, phuPhi, tongTien, giaShopee } = sanPhamDetail;

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
                            <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                <Typography>
                                    {`- ${vl.quantityNeed} ${vl.title}`}
                                </Typography>

                                <Typography>
                                    {`${utils.view.displayCurrency(vl.perTienVatLieu)} x ${vl.quantityNeed} = ${utils.view.displayCurrency(vl.tienVatLieu)}`}
                                </Typography>
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
                <Grid container>
                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {`giá tạm tính 1 cái: ${utils.view.displayCurrency(tongTien)}`}
                        </Typography>
                    </Grid>
                    <Grid>
                        {giaShopee && <Typography variant="body2" color="warning" sx={{ fontWeight: "bold", ml: 1 }}>
                            {` giá shopee: ${utils.view.displayCurrency(giaShopee)}`}
                        </Typography>}
                    </Grid>
                </Grid>
                <Grid>
                    {quantityBuy > 1 && <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
                        {quantityBuy > 1 ? `${quantityBuy} cái: ${utils.view.displayCurrency(tongTien * quantityBuy)}` : ""}
                    </Typography>}
                </Grid>
            </Grid>
        );
    }

    return { ChiTietVatLieuSanPham, SummaryPriceSanPham };
};

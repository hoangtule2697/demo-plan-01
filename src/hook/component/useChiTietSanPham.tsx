import {
    Box,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";

export default function useChiTietSanPham({ sanPhamDetail }: { sanPhamDetail: TypeFullDataSanPham["details"][0] }) {
    const { name, quantityBuy, vatLieu, tongTienSanPham } = sanPhamDetail;

    const ChiTietVatLieuSanPham = () => {
        return (
            <Box sx={{ ml: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                >
                    {`Làm 1 cái ${name} cần:`}
                </Typography>

                <List disablePadding sx={{ ml: 2 }}>
                    {vatLieu.map((vl) => (
                        <ListItem
                            key={`ctsp-vl-${vl.title}`}
                            disableGutters
                            sx={{ py: 1 }}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    width: "100%",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>
                                    {`- ${vl.quantity} ${vl.title}`}
                                </Typography>

                                <Typography>
                                    {utils.view.displayCurrency(
                                        vl.tienVatLieu,
                                    )}
                                </Typography>
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    const SummaryPriceSanPham = () => {
        if (!quantityBuy) return null;

        return (
            <Typography sx={{ mt: 1, fontWeight: "bold", ml: 2 }}>
                1 cái:{" "}
                {utils.view.displayCurrency(
                    tongTienSanPham /
                    quantityBuy,
                )}
                {" / "}
                tổng {quantityBuy} cái:{" "}
                {utils.view.displayCurrency(
                    tongTienSanPham,
                )}
            </Typography>
        );
    }

    return { ChiTietVatLieuSanPham, SummaryPriceSanPham };
};

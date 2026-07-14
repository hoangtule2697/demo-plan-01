import {
    Box,
    Divider,
    List,
    ListItem,
    Stack,
    Typography,
} from "@mui/material";
import type { GetFullDataResult } from "@type";
import * as utils from "@utils";

export default function ChiTietSanPham({ details }: { details: GetFullDataResult["details"] }) {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Chi tiết sản phẩm
            </Typography>

            {details
                .filter((d) => d.quantity)
                .map(
                    ({
                        name,
                        quantity,
                        vatLieu,
                        tongTienSanPham,
                    }) => (
                        <Box
                            key={`ctsp-${name}`}
                            sx={{ mb: 2 }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, mb: 1 }}
                            >
                                {`Làm 1 cái ${name} cần:`}
                            </Typography>

                            <List disablePadding>
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
                                                {`${vl.quantity} ${vl.title}`}
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

                            <Typography sx={{ textAlign: "right", mr: 1, mt: 1 }}>
                                1 cái:{" "}
                                {utils.view.displayCurrency(
                                    tongTienSanPham /
                                    quantity,
                                )}
                                {" / "}
                                tổng {quantity} cái:{" "}
                                {utils.view.displayCurrency(
                                    tongTienSanPham,
                                )}
                            </Typography>

                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ),
                )}
        </Box>
    );
};

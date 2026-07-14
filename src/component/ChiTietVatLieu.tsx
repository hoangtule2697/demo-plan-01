import {
    Grid,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function ChiTietVatLieu({ chiTietVatLieu }: { chiTietVatLieu: TypeFullDataSanPham["chiTietVatLieu"] }) {
    return (
        <BaseCard
            header={
                <Typography id="title">
                    Chi tiết vật liệu
                </Typography>
            }
        >
            <Grid>
                <Grid>
                    <List disablePadding>
                        {chiTietVatLieu
                            .filter((c) => c.quantityNeed)
                            .map(
                                (
                                    {
                                        title,
                                        quantityNeed,
                                        tongTienVatLieu,
                                    },
                                    idx,
                                ) => (
                                    <ListItem
                                        key={`ctvl-${idx}`}
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
                                                {`${quantityNeed} ${title}`}
                                            </Typography>

                                            <Typography>
                                                {utils.view.displayCurrency(
                                                    tongTienVatLieu,
                                                )}
                                            </Typography>
                                        </Stack>
                                    </ListItem>
                                ),
                            )}
                    </List>
                </Grid>
                <Grid>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        giá tạm tính
                    </Typography>
                </Grid>
            </Grid>
        </BaseCard>
    );
};
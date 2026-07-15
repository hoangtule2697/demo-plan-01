import { BaseCard } from "@component/base";
import { getTamTinhTienVatLieu, getTitleVatLieu, vatLieuData } from "@data";
import {
    Divider,
    Grid,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu } from "@type";
import * as utils from "@utils";

export default function BangGiaVatLieu() {

    return (
        <BaseCard
            title="Bảng giá vật liệu"
            isUseCollapse={true}
            defaultCollapse={false}
        >
            <List disablePadding>
                {vatLieuData
                    .map(
                        (vatLieu) => (
                            <Grid key={`vl-${vatLieu.code}`}>
                                <Grid>
                                    <ListItem
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
                                                {`1 ${getTitleVatLieu({ ...vatLieu, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu, vatLieu)}`}
                                            </Typography>

                                            <Typography>
                                                {utils.view.displayCurrency(getTamTinhTienVatLieu({ ...vatLieu, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu))}
                                            </Typography>
                                        </Stack>
                                    </ListItem>
                                </Grid>
                                <Grid sx={{ ml: 4 }}>
                                    <ListItem
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
                                                {`• 1 ${getTitleVatLieu({ ...vatLieu, width: 1, height: 1, value: 1, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu, vatLieu)}`}
                                            </Typography>

                                            <Typography>
                                                {utils.view.displayCurrency(getTamTinhTienVatLieu({ ...vatLieu, width: 1, height: 1, value: 1, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu), { roundTo1000: false })}
                                            </Typography>
                                        </Stack>
                                    </ListItem>
                                </Grid>
                                <Divider sx={{ mt: 0.5, mb: 1 }} />
                            </Grid>
                        ),
                    )}
            </List>
        </BaseCard>
    );
};
import { BaseDrawer } from "@component/base";
import { danhSachVatLieu, getTamTinhTienVatLieu, getTitleVatLieu } from "@data";
import {
    Divider,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu } from "@type";
import * as utils from "@utils";

export default function BangGiaVatLieu() {
    return (
        <BaseDrawer title="Bảng giá vật liệu" drawerProps={{ anchor: "left" }}>
            <List disablePadding>
                {danhSachVatLieu
                    .map(
                        (vatLieu) => (
                            <Grid key={`vl-${vatLieu.code}`}>
                                <Grid>
                                    <ListItem disableGutters sx={{ py: 1 }}>
                                        <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                            <Typography>
                                                {`1 ${getTitleVatLieu({ ...vatLieu, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu, vatLieu)}`}
                                            </Typography>

                                            <Typography>
                                                {utils.view.displayCurrency(getTamTinhTienVatLieu({ ...vatLieu, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu))}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid sx={{ ml: 4 }}>
                                    <ListItem disableGutters sx={{ py: 1 }}>
                                        <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                            <Typography>
                                                {`• 1 ${getTitleVatLieu({ ...vatLieu, width: 1, height: 1, value: 1, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu, vatLieu)}`}
                                            </Typography>

                                            <Typography>
                                                {utils.view.displayCurrency(getTamTinhTienVatLieu({ ...vatLieu, width: 1, height: 1, value: 1, vatLieuCode: vatLieu.code } as unknown as TypeCanThietVatLieu), { roundTo1000: false })}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid sx={{ ml: 4 }}>
                                    <Typography>
                                        {('description' in vatLieu) ? vatLieu.description : null}
                                    </Typography>
                                </Grid>
                                <Divider sx={{ mt: 0.5, mb: 1 }} />
                            </Grid>
                        )
                    )}
            </List>
        </BaseDrawer>
    );
};
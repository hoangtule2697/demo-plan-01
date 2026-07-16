import {
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function ChiTietVatLieu({ chiTietVatLieu }: { chiTietVatLieu: TypeFullDataSanPham["chiTietVatLieu"] }) {
    const tongTienChiTietVatLieu = chiTietVatLieu.reduce((acc, cur) => acc + utils.number.num(cur.tongTienVatLieu), 0);
    return (
        <BaseCard title="Chi tiết vật liệu" defaultOpen={false}>
            <Grid>
                <Grid>
                    <List disablePadding>
                        {chiTietVatLieu
                            .filter((c) => c.quantityNeedBuy)
                            .map(
                                (
                                    {
                                        title,
                                        quantityNeedBuy,
                                        tongTienVatLieu,
                                        perTienVatLieu
                                    },
                                    idx,
                                ) => (
                                    <ListItem key={`ctvl-${idx}`} disableGutters sx={{ py: 1 }} >
                                        <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                            <Typography>
                                                {`${quantityNeedBuy} ${title}`}
                                            </Typography>

                                            <Typography>
                                                {`${utils.view.displayCurrency(perTienVatLieu)} x ${quantityNeedBuy} = ${utils.view.displayCurrency(tongTienVatLieu)}`}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                ),
                            )}
                    </List>
                </Grid>
                <Grid>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        giá tạm tính: {utils.view.displayCurrency(tongTienChiTietVatLieu)}
                    </Typography>
                </Grid>
            </Grid>
        </BaseCard>
    );
};
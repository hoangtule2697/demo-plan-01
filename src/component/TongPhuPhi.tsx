import {
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function TongPhuPhi({ tongPhuPhi }: { tongPhuPhi: TypeFullDataSanPham["tongPhuPhi"] }) {
    const tongTienPhuPhi = tongPhuPhi.reduce((acc, cur) => acc + utils.number.num(cur.tongPhuPhi), 0);

    const viewOptions = ({ phuPhiCode, phuPhiData, options }: TypeFullDataSanPham["tongPhuPhi"][number]) => {
        switch (phuPhiCode) {
            case "dan_vien_4_canh_van_ep": {
                return `• ${options.totalMet}m - (${utils.view.displayCurrency(phuPhiData.price)} / 1m)`
            }
            case "son_tinh_dien": {
                return `• ${options.totalWeight}kg, ${options.totalMet}m - (${utils.view.displayCurrency(phuPhiData.price)} / 1kg)`
            }
        }
        return "";
    }

    return (
        <BaseCard title="Tổng phụ phí">
            <Grid>
                <Grid>
                    <List disablePadding>
                        {tongPhuPhi
                            .map((chiTietPhuPhi, idx) => (
                                <ListItem
                                    key={`ctvl-${idx}`}
                                    disableGutters
                                    sx={{ py: 1 }}
                                >
                                    <Grid sx={{ width: "100%" }}>
                                        <Grid container sx={{ justifyContent: "space-between" }}>
                                            <Typography>
                                                {`${chiTietPhuPhi.phuPhiData.name}`}
                                            </Typography>

                                            <Typography>
                                                {`${utils.view.displayCurrency(chiTietPhuPhi.tongPhuPhi)}`}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography sx={{ ml: 4 }}>
                                                {viewOptions(chiTietPhuPhi)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ),
                            )}
                    </List>
                </Grid>
                <Grid>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        giá tạm tính: {utils.view.displayCurrency(tongTienPhuPhi)}
                    </Typography>
                </Grid>
            </Grid>
        </BaseCard>
    );
};
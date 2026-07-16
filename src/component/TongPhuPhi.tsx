import {
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function TongPhuPhi({ chiTietPhuPhi }: { chiTietPhuPhi: TypeFullDataSanPham["chiTietPhuPhi"] }) {
    const tongTienPhuPhi = chiTietPhuPhi.reduce((acc, cur) => acc + utils.number.num(cur.tongTienPhuPhi), 0);

    return (
        <BaseCard title="Tổng phụ phí">
            <Grid>
                <Grid>
                    <List disablePadding>
                        {chiTietPhuPhi
                            .map((detailPhuPhi, idx) => (
                                <ListItem
                                    key={`ctvl-${idx}`}
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
                            ),
                            )}
                    </List>
                </Grid>
                <Grid>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        tổng tiền phụ phí: {utils.view.displayCurrency(tongTienPhuPhi)}
                    </Typography>
                </Grid>
            </Grid>
        </BaseCard>
    );
};

export const viewOptions = ({ phuPhiCode, phuPhiData, options }: TypeFullDataSanPham["chiTietPhuPhi"][number]) => {
    const optionDefault = () => `• ${options.quantityNeedDo > 1 ? `Làm ${options.quantityNeedDo} cái, ` : ""}${utils.view.displayCurrency(phuPhiData.price)} / 1cái`;
    switch (phuPhiCode) {
        case "dan_vien_4_canh_van_ep": {
            return `• ${options.totalMet}m - (${utils.view.displayCurrency(phuPhiData.price)} / 1m)`
        }
        case "son_tinh_dien": {
            return `• ${options.totalWeight}kg, ${options.totalMet}m - (${utils.view.displayCurrency(phuPhiData.price)} / 1kg)`
        }
        default: {
            return optionDefault();
        }
    }
}
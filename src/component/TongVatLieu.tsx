import { getTitleVatLieu } from "@data";
import {
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu, TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard, BaseDrawer } from "./base";

export default function TongVatLieu({ tongVatLieuCanMua }: { tongVatLieuCanMua: TypeFullDataSanPham["tongVatLieuCanMua"] }) {

    const viewOptions = ({ vatLieuCode, options }: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
        switch (vatLieuCode) {
            case "sat_hop_kem": {
                return `• Đã dùng ${options.totalUsed / 100}m / ${options.totalLength / 100}m, còn lại ${options.totalRemaining / 100}m`
            }
        }
        return null;
    }

    return (
        <BaseCard title="Tổng vật liệu">
            <List disablePadding>
                {tongVatLieuCanMua
                    .map(
                        (vatLieuCanMua) => {
                            const { vatLieuData, quantityNeedBuy, totalVatLieuCanMua } = vatLieuCanMua;

                            return <ListItem
                                key={`tvl-${name}`}
                                disableGutters
                                sx={{ py: 1 }}
                            >
                                <Grid sx={{ width: "100%" }}>
                                    <Grid container sx={{ justifyContent: "space-between" }} >
                                        <Grid>
                                            <Typography>
                                                {`${quantityNeedBuy} ${getTitleVatLieu({ ...vatLieuData, vatLieuCode: vatLieuData.code } as unknown as TypeCanThietVatLieu, vatLieuData)}`}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography>{utils.view.displayCurrency(totalVatLieuCanMua)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ justifyContent: "space-between" }}>
                                        <Grid>
                                            <Typography sx={{ ml: 4 }}>
                                                {viewOptions(vatLieuCanMua)}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <BaseDrawer title="Chi tiết bản vẽ" contentProps={{ sx: { p: 0, minWidth: "1300px" } }}>
                                                <ChiTietBanVe {...vatLieuCanMua} />
                                            </BaseDrawer>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        }
                    )}
            </List>
        </BaseCard>
    );
};

const ChiTietBanVe = (vatLieuCanMua: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
    switch (vatLieuCanMua.vatLieuCode) {
        case "sat_hop_kem": {
            return <ChiTietBanVeSatHop {...vatLieuCanMua} />
        }
    }
    return null;
};

const ChiTietBanVeSatHop = ({ options, vatLieuData }: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
    const { bars } = options;

    const BanVeHopSat = ({ fullWidth, cuts }: { fullWidth: number; cuts: number[] }) => {
        return <Grid>
            <Grid>
                <Typography>{`cắt ${cuts.length} đoạn`}</Typography>
            </Grid>
            <Grid data-testid="ban-ve-hop-sat" container sx={{ width: "100%", backgroundColor: "red", height: "40px" }}>
                {cuts.map((cut: number) => {
                    return <Grid container sx={{ width: `${Math.round((cut * 100) / fullWidth)}%`, backgroundColor: "#7cdf7c", height: "40px", borderRight: "4px dashed grey", alignItems: "center" }}>
                        <span style={{ textAlign: "center", width: "100%" }}>{cut}</span>
                    </Grid>
                })}
            </Grid>
        </Grid>;
    }

    return <Grid>
        <Grid sx={{ mb: 2 }}>
            <Typography>{`${vatLieuData.name} dài ${utils.number.num(vatLieuData.width) / 100}m`}</Typography>
        </Grid>
        {bars.map((bar: any) => {
            return <Grid sx={{ mb: 2 }}>
                <BanVeHopSat {...bar} />
            </Grid>
        })}
    </Grid>;
}
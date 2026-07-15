import { getTitleVatLieu } from "@data";
import {
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu, TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

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
                                <Grid
                                    container
                                    sx={{
                                        justifyContent: "space-between",
                                        width: "100%"
                                    }}
                                >
                                    <Grid>
                                        <Typography>
                                            {`${quantityNeedBuy} ${getTitleVatLieu({ ...vatLieuData, vatLieuCode: vatLieuData.code } as unknown as TypeCanThietVatLieu, vatLieuData)}`}
                                        </Typography>
                                        <Typography sx={{ ml: 4 }}>
                                            {viewOptions(vatLieuCanMua)}
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography>{utils.view.displayCurrency(totalVatLieuCanMua)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        }
                    )}
            </List>
        </BaseCard>
    );
};
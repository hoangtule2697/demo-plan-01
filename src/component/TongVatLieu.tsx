import { getTitleVatLieu } from "@data";
import {
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu, TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function TongVatLieu({ tongVatLieuCanMua }: { tongVatLieuCanMua: TypeFullDataSanPham["tongVatLieuCanMua"] }) {
    return (
        <BaseCard title="Tổng vật liệu">
            <List disablePadding>
                {tongVatLieuCanMua
                    .map(
                        ({
                            vatLieuData,
                            quantityNeedBuy,
                            totalVatLieuCanMua,
                        }) => (
                            <ListItem
                                key={`tvl-${name}`}
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
                                        {`${quantityNeedBuy} ${getTitleVatLieu({ ...vatLieuData, vatLieuCode: vatLieuData.code } as unknown as TypeCanThietVatLieu, vatLieuData)}`}
                                    </Typography>

                                    <Typography>
                                        {utils.view.displayCurrency(
                                            totalVatLieuCanMua,
                                        )}
                                    </Typography>
                                </Stack>
                            </ListItem>
                        ),
                    )}
            </List>
        </BaseCard>
    );
};
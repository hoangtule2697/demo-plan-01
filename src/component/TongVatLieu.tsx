import {
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function TongVatLieu({ tongVatLieu }: { tongVatLieu: TypeFullDataSanPham["tongVatLieu"] }) {
    return (
        <BaseCard title="Tổng vật liệu">
            <List disablePadding>
                {tongVatLieu
                    .filter((t) => t.value)
                    .map(
                        ({
                            value,
                            // unit,
                            // name,
                            tongTienVatLieu,
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
                                        {`${value}`}
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
        </BaseCard>
    );
};
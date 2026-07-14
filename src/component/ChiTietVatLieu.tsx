import {
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { GetFullDataResult } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function ChiTietVatLieu({ chiTietVatLieu }: { chiTietVatLieu: GetFullDataResult["chiTietVatLieu"] }) {
    return (
        <BaseCard
            header={
                <Typography id="title">
                    Chi tiết vật liệu
                </Typography>
            }
        >
            <List disablePadding>
                {chiTietVatLieu
                    .filter((c) => c.quantity)
                    .map(
                        (
                            {
                                title,
                                quantity,
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
                                        {`${quantity} ${title}`}
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
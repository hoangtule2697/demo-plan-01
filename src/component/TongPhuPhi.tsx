import {
    Grid,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import type { TypeFullDataSanPham } from "@type";
import * as utils from "@utils";
import { BaseCard } from "./base";

export default function TongPhuPhi({ tongPhuPhi }: { tongPhuPhi: TypeFullDataSanPham["tongPhuPhi"] }) {
    const tongTienPhuPhi = tongPhuPhi.reduce((acc, cur) => acc + utils.number.num(cur.tongPhuPhi), 0);

    const viewOptions = ({ phuPhiCode, options }: TypeFullDataSanPham["tongPhuPhi"][number]) => {
        switch (phuPhiCode) {
            case "dan_vien_4_canh_van_ep": {
                return ` - ${options.totalMet}m`
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
                                            {`${chiTietPhuPhi.phuPhiData.name} ${viewOptions(chiTietPhuPhi)}`}
                                        </Typography>

                                        <Typography>
                                            {`${utils.view.displayCurrency(chiTietPhuPhi.tongPhuPhi)}`}
                                        </Typography>
                                    </Stack>
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
import { BaseCard } from "@component/base";
import { danhSachPhuPhi } from "@data";
import {
    Divider,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import * as utils from "@utils";

export default function BangGiaPhuPhi() {
    return (
        <BaseCard
            title="Bảng giá phụ phí"
            isUseCollapse={true}
            defaultOpen={false}
        >
            <List disablePadding>
                {danhSachPhuPhi
                    .map(
                        (phuPhi) => (
                            <Grid key={`pp-${phuPhi.code}`}>
                                <Grid>
                                    <ListItem disableGutters sx={{ py: 1 }} >
                                        <Grid container sx={{ width: "100%", justifyContent: "space-between" }}>
                                            <Typography>
                                                {phuPhi.name}
                                            </Typography>

                                            <Typography>
                                                {`${utils.view.displayCurrency(phuPhi.price)} / ${phuPhi.value}${phuPhi.unit}`}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Divider sx={{ mt: 0.5, mb: 1 }} />
                            </Grid>
                        ),
                    )}
            </List>
        </BaseCard>
    );
};
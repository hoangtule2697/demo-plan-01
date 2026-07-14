import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    type CardProps,
} from "@mui/material";
import type { ReactNode } from "react";

const BaseCard = ({
    header,
    children,
    propsCard,
    propsHeader,
    propsContent,
}: CardProps & {
    header?: ReactNode;
    children?: ReactNode;
    propsCard?: CardProps;
    propsHeader?: any;
    propsContent?: any;
}) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                border: "1px solid",
                borderColor: "divider",
                p: 2
            }}
            {...propsCard}
        >
            {header && (
                <>
                    <CardHeader
                        title={header}
                        sx={{
                            py: 1.5,
                            px: 2,
                            "#title": {
                                fontSize: 20,
                                fontWeight: 600,
                            },
                            p: 0,
                        }}
                        {...propsHeader}
                    />
                    <Grid sx={{ mt: 1, mb: 1 }}>
                        <Divider />
                    </Grid>
                </>
            )}

            <CardContent sx={{ p: 0 }} {...propsContent}>
                {children}
            </CardContent>
        </Card>
    );
};

export default BaseCard;
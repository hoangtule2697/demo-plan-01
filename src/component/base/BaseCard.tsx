import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    type CardProps,
} from "@mui/material";
import { useCollapse } from "hook/component/useCollapse";
import type { ReactNode } from "react";

const BaseCard = ({
    isUseCollapse,
    defaultCollapse = true,
    title,
    actionHeader,
    header,
    children,
    propsCard,
    propsHeader,
    propsContent,
}: CardProps & {
    isUseCollapse?: boolean;
    defaultCollapse?: boolean;
    title?: string;
    header?: ReactNode;
    actionHeader?: ReactNode;
    children?: ReactNode;
    propsCard?: CardProps;
    propsHeader?: any;
    propsContent?: any;
}) => {
    const { CollapseButton, CollapseContent } = useCollapse({ "default-key": defaultCollapse });
    console.log("header || title || actionHeader", header || title || actionHeader)

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
            {!!(header || title || actionHeader) && (
                <>
                    <CardHeader
                        title={<Grid data-testid="base-card-header">
                            <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
                                <Grid container>
                                    <Grid sx={{ mr: 1 }}>
                                        {title && <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20 }}>{title}</Typography>}
                                    </Grid>
                                    <Grid>
                                        {isUseCollapse && <CollapseButton />}
                                    </Grid>
                                </Grid>
                                <Grid>{actionHeader}</Grid>
                            </Grid>
                            <Grid>{header}</Grid>
                        </Grid>}
                        sx={{
                            py: 1.5,
                            px: 2,
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
                <CollapseContent>
                    {children}
                </CollapseContent>
            </CardContent>
        </Card>
    );
};

export default BaseCard;
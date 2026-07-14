import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, IconButton } from "@mui/material";
import { useState } from "react";

export const useCollapse = (
    defaultCollapse: Record<string, boolean> = {},
) => {
    const [collapseMap, setCollapseMap] =
        useState<Record<string, boolean>>(
            defaultCollapse
        );

    const isCollapse = (
        key = "default-key",
    ) => collapseMap[key] ?? false;

    const toggleCollapse = (
        key = "default-key",
    ) => {
        setCollapseMap((prev) => ({
            ...prev,
            [key]: !(prev[key] ?? false),
        }));
    };

    const CollapseButton = ({
        collapseKey = "default-key",
    }: {
        collapseKey?: string;
    }) => (
        <IconButton
            color="primary"
            size="small"
            onClick={() =>
                toggleCollapse(collapseKey)
            }
        >
            {isCollapse(collapseKey) ? (
                <ExpandLessIcon />
            ) : (
                <ExpandMoreIcon />
            )}
        </IconButton>
    );

    const CollapseContent = ({
        collapseKey = "default-key",
        children,
    }: React.PropsWithChildren<{
        collapseKey?: string;
    }>) => (
        <Collapse
            in={isCollapse(collapseKey)}
            timeout="auto"
            unmountOnExit
        >
            {children}
        </Collapse>
    );

    return {
        toggleCollapse,
        CollapseButton,
        CollapseContent,
    };
};
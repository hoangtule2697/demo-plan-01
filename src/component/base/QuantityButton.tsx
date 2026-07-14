import { useState } from "react";

const QuantityButton = ({
    min = 0,
    max = 9999,
    defaultValue = 0,
    onChange = () => { },
}: {
    min?: number;
    max?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}) => {
    const clamp = (value: number) =>
        Math.min(max, Math.max(min, value));

    const [value, setValue] = useState<number | "">(
        clamp(defaultValue),
    );

    const updateValue = (newValue: number | string) => {
        const finalValue = clamp(Number(newValue) || 0);

        setValue(finalValue);
        onChange(finalValue);
    };

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const text = e.target.value;

        if (text === "") {
            setValue("");
            return;
        }

        if (!/^\d+$/.test(text)) {
            return;
        }

        setValue(Number(text));
    };

    const handleBlur = () => {
        updateValue(value);
    };

    return (
        <div className="input-group" style={{ width: 120 }}>
            <button
                className="btn btn-outline-secondary"
                disabled={value === "" || value <= min}
                onClick={() => updateValue(Number(value) - 1)}
            >
                −
            </button>

            <input
                type="text"
                className="form-control text-center"
                value={value}
                onChange={handleInput}
                onBlur={handleBlur}
            />

            <button
                className="btn btn-outline-secondary"
                disabled={value === "" || value >= max}
                onClick={() => updateValue(Number(value) + 1)}
            >
                +
            </button>
        </div>
    );
};

export default QuantityButton;
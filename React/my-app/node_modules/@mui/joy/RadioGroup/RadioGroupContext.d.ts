import * as React from 'react';
import { RadioProps } from '../Radio/RadioProps';
declare const RadioGroupContext: React.Context<(Pick<RadioProps, "overlay" | "size" | "disableIcon"> & {
    orientation?: "horizontal" | "vertical";
    name?: string;
    value?: unknown;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) | undefined>;
export default RadioGroupContext;

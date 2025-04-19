import * as React from 'react';
import { ModalDialogProps } from './ModalDialogProps';
declare const ModalDialogVariantColorContext: React.Context<(Pick<ModalDialogProps, "color" | "variant"> & {
    labelledBy?: string;
    describedBy?: string;
}) | undefined>;
export default ModalDialogVariantColorContext;

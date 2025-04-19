import * as React from 'react';
import type { SupportedColorScheme } from './types';
declare const CssVarsProvider: (props: React.PropsWithChildren<Partial<import("@mui/system").CssVarsProviderConfig<SupportedColorScheme>> & {
    theme?: {
        cssVarPrefix?: string;
        colorSchemes: Record<SupportedColorScheme, Record<string, any>>;
    } | {
        $$joy: {
            cssVarPrefix?: string;
            colorSchemes: Record<SupportedColorScheme, Record<string, any>>;
        };
    } | undefined;
    documentNode?: Document | null;
    colorSchemeNode?: Element | null;
    colorSchemeSelector?: string;
    storageWindow?: Window | null;
    disableNestedContext?: boolean;
    disableStyleSheetGeneration?: boolean;
}>) => React.JSX.Element, useColorScheme: () => import("@mui/system").ColorSchemeContextValue<SupportedColorScheme>;
/**
 * @deprecated use `InitColorSchemeScript` instead
 *
 * ```diff
 * - import { getInitColorSchemeScript } from '@mui/joy/styles';
 * + import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
 *
 * - getInitColorSchemeScript();
 * + <InitColorSchemeScript />;
 * ```
 */
export declare const getInitColorSchemeScript: typeof import("@mui/system/InitColorSchemeScript").default;
export { CssVarsProvider, useColorScheme };

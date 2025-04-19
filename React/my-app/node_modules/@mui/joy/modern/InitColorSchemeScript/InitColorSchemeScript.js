import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SystemInitColorSchemeScript from '@mui/system/InitColorSchemeScript';
import { jsx as _jsx } from "react/jsx-runtime";
export const defaultConfig = {
  attribute: 'data-joy-color-scheme',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'joy-mode'
};
export default (function InitColorSchemeScript(props) {
  return /*#__PURE__*/_jsx(SystemInitColorSchemeScript, _extends({}, defaultConfig, props));
});
import * as React from 'react';
import { OverrideProps, DefaultComponentProps } from '@mui/types';
import { SelectTypeMap } from './SelectProps';
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/joy-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/joy-ui/api/select/)
 */
declare const Select: SelectComponent;
interface SelectComponent {
    <OptionValue extends {}, C extends React.ElementType, Multiple extends boolean = false>(props: {
        /**
         * The component used for the root node.
         * Either a string to use a HTML element or a component.
         */
        component: C;
        multiple?: Multiple;
    } & OverrideProps<SelectTypeMap<OptionValue, Multiple>, C>): React.JSX.Element | null;
    <OptionValue extends {}, Multiple extends boolean = false>(props: {
        multiple?: Multiple;
    } & DefaultComponentProps<SelectTypeMap<OptionValue, Multiple>>): React.JSX.Element | null;
    propTypes?: any;
}
export default Select;

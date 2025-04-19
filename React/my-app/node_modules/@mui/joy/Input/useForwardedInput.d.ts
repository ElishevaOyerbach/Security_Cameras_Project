import { useInput } from '@mui/base/useInput';
import { FormControlContextValue } from '../FormControl/FormControlContext';
export default function useForwardedInput<Output>(props: any, classes: {
    disabled: string;
    error: string;
    focused: string;
    formControl: string;
}): {
    propsToForward: Record<string, any>;
    rootStateClasses: Record<string, any>;
    inputStateClasses: Record<string, any>;
} & ReturnType<typeof useInput> & Output & {
    formControl: FormControlContextValue;
};

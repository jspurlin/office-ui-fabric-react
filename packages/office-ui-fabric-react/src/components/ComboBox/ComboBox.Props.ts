import { IIconProps } from '../../Icon';
import { ISelectableOption } from '../../Utilities/selectableOption/SelectableOption.Props';
import { ISelectableDroppableTextProps } from '../../Utilities/selectableOption/SelectableDroppableText.Props';

export interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBoxProps> {

  /**
   * Collection of options for this ComboBox
   */
  options?: ISelectableOption[];

  /**
   * Callback issues when either:
   * 1) the selected option changes
   * 2) a manually edited value is submitted. In this case there may not be a matched option if allowFreeform is also true
   *    (and hence only value would be true, the other parameter would be null in this case)
   */
  onChanged?: (option?: ISelectableOption, index?: number, value?: string) => void;

  /**
   * Callback issued when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time
   */
  onResolveOptions?: (options: ISelectableOption[]) => ISelectableOption[] | PromiseLike<ISelectableOption[]>;

  /**
   * Whether the ComboBox is free form, meaning that the user input is not bound to provided items. Defaults to false.
   */
  allowFreeform?: boolean;

  /**
   * Whether the ComboBox auto completes. As the user is inputing text, it will be suggested potential matches from the list of items. If
   * the combo box is expanded, this will also scroll to the suggested item, and give it a selected style. Defaults to false.
   */
  autoComplete?: boolean;

  /**
   * Value to show in the input, does not have to map to a combobox option
   */
  value?: string;

  /**
   * The IconProps to use for the button aspect of the combobox
   */
  buttonIconProps?: IIconProps;
}

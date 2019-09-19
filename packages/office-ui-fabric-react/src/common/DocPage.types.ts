import { IStyleFunctionOrObject } from '../Utilities';
import { ITheme, IStyle } from '../Styling';

export interface IExample {
  /** Title of the example */
  title: string;

  /** Raw source code of the example */
  code: string;

  /** Working example of the example */
  view: JSX.Element;

  isScrollable?: boolean;

  /** JS String for codepen of the example */
  codepenJS?: string;

  /** Custom styles. Partial version of `IExampleCardProps['styles']`. */
  styles?: IStyleFunctionOrObject<{ theme?: ITheme }, { root: IStyle }>;
}

export interface IDocPageProps {
  /** Title that goes into the header */
  title: string;

  /** Name of the component being documented */
  componentName: string;

  /** URL of the checked in component, should be somewhere on github.com */
  componentUrl: string;

  /** Knobs that applies to all the examples */
  exampleKnobs?: JSX.Element;

  /** Array of examples, displayed in the order defined */
  examples?: IExample[];

  /** Properties table(s) as markdown string */
  propertiesTablesSources?: string[];

  /** Overview of the component as markdown string */
  overview?: string;

  /** Accessibility of the component as markdown string */
  accessibility?: string;

  /** DO's blurb as markdown string */
  dos?: string;

  /** DON'Ts blurb as markdown string */
  donts?: string;

  /** Best practice as markdown string */
  bestPractices?: string;

  /** Feedback section includes link to new issue page and displays Github issues */
  isFeedbackVisible?: boolean;

  /** Passed through header visibility flag from the demo component page component */
  isHeaderVisible: boolean;

  /** If true, the component accepts all native props from elements specified in `nativePropsElement` */
  allowNativeProps?: boolean;

  /** Override component name to use in the native props message */
  allowNativePropsForComponentName?: string;

  /**
   * Element(s) whose native props this component accepts (default div).
   * Only relevant if `allowNativeProps` is true.
   */
  nativePropsElement?: string | string[];

  /**
   * Related link
   * @deprecated No longer shown on ComponentPage
   */
  related?: JSX.Element;

  /** Pass through other sections for ComponentPage */
  otherSections?: {
    title: string;
    section: JSX.Element;
  }[];

  /**
   * JSON to populate the api reference tables
   */
  jsonDocs?: IPageJson;
}

/**
 * Used to keep track of where the page will live on the site
 */
export type PageKind = 'References' | 'Components';

/**
 * Excerpt token that is part of a type or extends block and may have a hyperlink
 */
export interface ILinkToken {
  text: string;
  hyperlinkedPage?: string;
  pageKind?: PageKind;
}

/**
 * Generic table row
 */
export interface ITableRowJson {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue?: string;
  description: string;
  deprecated: boolean;
  deprecatedMessage?: string;
  kind?: 'Method' | 'Property';
}

/**
 * Enum table row
 */
export type IEnumTableRowJson = Required<Pick<ITableRowJson, 'name' | 'description'>> & {
  value: string;
};

/**
 * Api table
 */
export interface ITableJson {
  kind: 'interface' | 'enum' | 'class' | 'typeAlias';
  name: string;
  extendsTokens: ILinkToken[];
  description: string;
  members: ITableRowJson[] | IEnumTableRowJson[];
}

/**
 * Structure of the page.json files
 */
export interface IPageJson {
  tables: ITableJson[];
  name: string;
}

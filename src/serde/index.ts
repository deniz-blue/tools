export type ValueOf<O extends Option> = O extends StringOption ? (string) : never;
export type ValueOfList<O extends OptionList> = { [P in keyof O]: ValueOf<O[P]> };

export type BaseOption = {
    name: string;
};

export type StringOption = {
    type: string;
};

export type Option = BaseOption & (
    StringOption
);

export type OptionList = Option[];

export interface Modifier<O extends OptionList = []> {
    name: string;
    options: O;
    run: (s: string, opts: ValueOfList<O>) => Promise<string> | string;
    isValidString?: (s: string) => Promise<boolean> | boolean;
}



interface IDocCookies {

    getItem(sKey: string): string;

    setItem(
        sKey: string,
        sValue: string,
        vEnd?: number | string | Date,
        sPath?: string,
        sDomain?: string,
        bSecure?: string,
    ): boolean;

    removeItem(sKey: string, sPath?: string, sDomain?: string): boolean;

    hasItem(sKey: string): boolean;

    keys(): string[];

    clear(sPath?: string, sDomain?: string): void;

}

declare var docCookies: IDocCookies;

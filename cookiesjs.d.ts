interface IDocCookies {

    getItem(sKey: string): string;

    setItem(
        sKey: string,
        sValue: string,
        vEnd?: number | string | Date,
        sPath?: string,
        sDomain?: string,
        bSecure?: boolean,
        vSameSite?: string | number
    ): boolean;

    removeItem(
        sKey: string,
        sPath?: string,
        sDomain?: string,
        bSecure?: boolean,
        vSameSite?: string | number
    ): boolean;

    hasItem(sKey: string): boolean;

    keys(): string[];

    clear(
        sPath?: string,
        sDomain?: string,
        bSecure?: boolean,
        vSameSite?: string | number
    ): void;

}

declare var docCookies: IDocCookies;

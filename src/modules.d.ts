declare module '*.png' {
    const content: string;
    export = content;
}
declare module '*.svg' {
    const content: string;
    export = content;
}
declare module '*.jpg' {
    const content: string;
    export = content;
}
declare module '*.gif' {
    const content: string;
    export = content;
}
declare module '*.css' {
    const content: {
        [key: string]: string
    }
    export = content;
}
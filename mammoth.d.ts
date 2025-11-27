declare module 'mammoth' {
    export interface MammothResult {
        value: string;
        messages: any[];
    }

    export interface MammothInput {
        arrayBuffer: ArrayBuffer;
    }

    export function extractRawText(input: MammothInput): Promise<MammothResult>;
    export function convertToHtml(input: MammothInput): Promise<MammothResult>;
}
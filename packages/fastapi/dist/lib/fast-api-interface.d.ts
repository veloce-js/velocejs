export interface FastApiInterface {
    $start(port?: number, host?: string): Promise<string>;
    $stop(): void;
}

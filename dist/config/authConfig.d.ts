declare const _default: (() => {
    jwtIssuer: string;
    jwtAccessSecret: string;
    jwtAccessTime: string;
    jwtRefreshSecret: string;
    jwtRefreshTime: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtIssuer: string;
    jwtAccessSecret: string;
    jwtAccessTime: string;
    jwtRefreshSecret: string;
    jwtRefreshTime: string;
}>;
export default _default;

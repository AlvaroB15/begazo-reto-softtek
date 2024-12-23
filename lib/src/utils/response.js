export const responseApi = (data, message, statusCode, error = false) => {
    return {
        status: statusCode,
        error: error,
        message,
        data,
    };
};
//# sourceMappingURL=response.js.map
export const responseApi = (data, message: string, statusCode: number, error = false) => {
	return {
		status: statusCode,
		error: error,
		message,
		data,
	};
};
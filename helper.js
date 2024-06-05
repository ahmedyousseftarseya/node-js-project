
module.exports = function jsonResponse(status, data = null, message = null) {
	return {
		status: status,
		data: data,
		message: message
	}
}

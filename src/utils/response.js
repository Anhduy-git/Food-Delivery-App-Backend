module.exports = class Response {
	constructor({ status, error = null, content = null }) {
		this.status = status;
		this.error = error;
		this.content = content;
	}
};

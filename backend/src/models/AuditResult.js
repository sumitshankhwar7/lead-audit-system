// Mock model for AuditResult
class AuditResult {
  constructor(data) {
    this.data = data;
    this.createdAt = new Date();
  }
}
module.exports = AuditResult;

const classTransferprogressPayloadRequest = (data) => {
  return {
    studentId: data.studentId,
    studentName: data.studentName,
    sessionId: data.newSessionId,
    classId: data.classId,
    className: data.className,
    levelCount: data.levelCount,
    levels: data.levels,
  };
};

module.exports = classTransferprogressPayloadRequest;

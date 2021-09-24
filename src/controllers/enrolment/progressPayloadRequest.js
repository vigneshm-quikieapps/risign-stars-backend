const progressPayloadRequest = (data) => {
  return {
    studentId: data.studentId,
    studentName: data.studentName,
    sessionId: data.sessionId,
    classId: data.classId,
    className: data.className,
    levelCount: data.levelCount,
    levels: data.levels,
  };
};

module.exports = progressPayloadRequest;
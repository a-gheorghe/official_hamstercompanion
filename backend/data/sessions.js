var timestamp = new Date('Thu Nov 30 2017 23:00:00 GMT-0800 (PST)');

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

module.exports = [
  {
    revolutions: 100,
    start_time: timestamp,
    end_time: addMinutes(timestamp, 5),
    mouseId: 1111111111,
    cageId: 1,
    treatmentGroupId: 1,
    experimentId: 1
  },
  {
    revolutions: 75,
    start_time: addMinutes(timestamp, 7),
    end_time: addMinutes(timestamp, 10),
    mouseId: 1111111112,
    cageId: 1,
    treatmentGroupId: 1,
    experimentId: 1
  },
  {
    revolutions: 150,
    start_time: addMinutes(timestamp, 20),
    end_time: addMinutes(timestamp, 27),
    mouseId: 1111111113,
    cageId: 1,
    treatmentGroupId: 1,
    experimentId: 1
  },
  {
    revolutions: 500,
    start_time: addMinutes(timestamp, 30),
    end_time: addMinutes(timestamp, 50),
    mouseId: 1111111114,
    cageId: 1,
    treatmentGroupId: 1,
    experimentId: 1
  },
  {
    revolutions: 100,
    start_time: addMinutes(timestamp, 15),
    end_time: addMinutes(timestamp, 21),
    mouseId: 1111111115,
    cageId: 2,
    treatmentGroupId: 1,
    experimentId: 1
  },
  {
    revolutions: 50,
    start_time: addMinutes(timestamp, 40),
    end_time: addMinutes(timestamp, 45),
    mouseId: 1111111116,
    cageId: 2,
    treatmentGroupId: 1,
    experimentId: 1
  }
];

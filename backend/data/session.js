var timestamp = new Date('Thu Nov 30 2017 23:00:00 GMT-0800 (PST)');

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default [
  {
    revolutions: 100,
    starte_time: timestamp,
    end_time: addMinutes(timestamp, 5),
    mouseId: 3
  },
  {
    revolutions: 75,
    starte_time: addMinutes(timestamp, 7),
    end_time: addMinutes(timestamp, 10),
    mouseId: 4
  },
  {
    revolutions: 150,
    starte_time: addMinutes(timestamp, 20),
    end_time: addMinutes(timestamp, 27),
    mouseId: 8
  },
  {
    revolutions: 500,
    starte_time: addMinutes(timestamp, 30),
    end_time: addMinutes(timestamp, 50),
    mouseId: 11
  },
  {
    revolutions: 100,
    starte_time: addMinutes(timestamp, 15),
    end_time: addMinutes(timestamp, 21),
    mouseId: 11
  },
  {
    revolutions: 50,
    starte_time: addMinutes(timestamp, 40),
    end_time: addMinutes(timestamp, 45),
    mouseId: 12
  }
];

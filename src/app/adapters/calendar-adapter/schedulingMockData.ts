import {Injectable} from '@angular/core';

// todo - it's a mock data - delete this .
@Injectable()
export class SchedulingMockData {
  public static availability = {
    availabilityGeneral: {
      2017: {
        9: {
          7: {
            16: true
          },
          8: {
            12: true
          },
          9: {
            10: true,
            15: true,
            17: true,
            18: true,
          },
          10: {
            10: true,
            11: true,
          },
          11: {
            9: true,
            10: true,
            12: true,
            16: true,
          },
        12: {
            13: true,
            16: true,
            17: true,
            19: true,
          }
        }
      }
    },
    uids: ['teacher1', 'teacher2']
  };
  public static mockPlan = {
    parts: [{
      startTime: Date.now(),
      endTime: Date.now() + (new Date().setDate(new Date().getDate() + 15)),
      topicsPerWeek: {
        1: 2,
        2: 1
      }
    },
      {
        startTime: (new Date().setDate(new Date().getDate() + 15)),
        endTime: (new Date().setDate(new Date().getDate() + 30)),
        topicsPerWeek: {
          1: 3,
          2: 4
        }
      }],
    initialSchedule: {
      1: [
        new Date(2017, 5, 19, 15).getTime(),
        false,
        new Date(2017, 5, 20, 15).getTime()
      ]
    }
  };
  public mockLessons = [];

  constructor() {
    let date = new Date();
    date.setDate(date.getDate() + 2);
    date.setUTCHours(14);
    this.mockLessons.push({
      id: '111',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Bob',
      educatorName: 'Bob',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 1);
    date.setUTCHours(16);
    this.mockLessons.push({
      id: '112',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Bob',
      educatorName: 'Bob wqeqweqweqwe',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 5);
    date.setUTCHours(13);
    this.mockLessons.push(
      {
        id: '113',
        planId: '3',
        date: date.getTime(),
        educatorId: 'Martin',
        educatorName: 'Martin',
        studentId: 'simplelogin1233',
        serviceId: '1',
        topic: '1',
        status: 1,
        educatorNotes: '',
        studentFeedback: '',
      });
    date = new Date();
    date.setDate(date.getDate() - 4);
    date.setUTCHours(19);
    this.mockLessons.push({
      id: '114',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 2);
    date.setUTCHours(12);
    this.mockLessons.push({
      id: '115',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 2,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 3);
    date.setUTCHours(9);
    this.mockLessons.push({
      id: '116',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Bob',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 4);
    date.setUTCHours(18);
    this.mockLessons.push({
      id: '117',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 6);
    date.setUTCHours(11);
    this.mockLessons.push({
      id: '118',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 2);
    date.setUTCHours(11);
    this.mockLessons.push({
      id: '119',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 4);
    date.setUTCHours(16);
    this.mockLessons.push({
      id: '120',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 1);
    date.setUTCHours(9);
    this.mockLessons.push({
      id: '172',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() - 5);
    date.setUTCHours(12);
    this.mockLessons.push({
      id: '1464',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 1,
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 3);
    date.setUTCHours(10);
    this.mockLessons.push({
      id: '32114',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
    });
    date = new Date();
    date.setDate(date.getDate() + 1);
    date.setUTCHours(11);
    this.mockLessons.push({
      id: '45314',
      planId: '3',
      date: date.getTime(),
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
      statusReason: 'Teacher unavailability'
    });
    date = new Date();
    date.setDate(date.getDate() + 2);
    date.setUTCHours(11);
    this.mockLessons.push({
      id: '11463',
      planId: '3',
      date: 1497096000000,
      educatorId: 'Alis',
      educatorName: 'Alis',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
      statusReason: 'Teacher unavailability'
    });
    date.setDate(date.getDate() - 2);
    date.setUTCHours(11);
    this.mockLessons.push({
      id: '118764',
      planId: '3',
      date: date.getTime() + 6713123123,
      educatorId: 'Alis',
      educatorName: 'Bob',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
      statusReason: 'Teacher unavailability'
    });
    this.mockLessons.push({
      id: '4321',
      planId: '3',
      date: date.getTime() + 600000,
      educatorId: 'Alis',
      educatorName: 'Bob',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '1',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
      statusReason: 'Teacher unavailability'
    });
    this.mockLessons.push({
      id: '432',
      planId: '3',
      date: date.getTime()+31231223,
      educatorId: 'Alis',
      educatorName: 'Bob',
      studentId: 'simplelogin1233',
      serviceId: '1',
      topic: '2',
      status: 'pendingSchedule',
      educatorNotes: '',
      studentFeedback: '',
      statusReason: 'Teacher unavailability'
    });
  }
}


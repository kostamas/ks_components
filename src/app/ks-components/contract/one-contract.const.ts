export const SEASONS_TYPES = {
  W: 'W',
  A: 'A'
};

export const DISCOUNTS_TYPES = {
  'payStay': 'payStay',
  'discount': 'discount',
  'NRFDiscount': 'NRFDiscount',
  'opaqueDiscount': 'opaqueDiscount',
  'otherSupplement': 'otherSupplement',
  'longStayDiscount': 'longStayDiscount',
  'HBGSelectDiscount': 'HBGSelectDiscount',
  'occupancySupplement': 'occupancySupplement',
  'earlyBookingDiscount': 'earlyBookingDiscount',
  'freeNights': 'freeNights'
};

export const contractToShow: any = {
  'contractData': {
    'contractHeader': {
      'contractType': 'BR',
      'commissionPercentage': null,
      'boardBase': {},
      'currency': {'id': null, 'name': null},
      'managementType': 'Office',
      'isVisibleWeb': false,
      'excludedCountries': null,
      'includedCountries': [{'name': 'Argentina', 'id': 'AR'}, {'name': 'Spain', 'id': 'ES'}, {
        'name': 'Afghanistan',
        'id': 'AF'
      }, {'name': 'American Samoa', 'id': 'AS'}, {'name': 'Australia', 'id': 'AU'}],
      'renewalType': 'N',
      'name': null,
      'supplier': {},
      'childAges': {}
    },
    'generalSupplements': {
      'discount': [{
        'guestApplicationType': {'id': 'I', 'name': null},
        'room': {'roomCode': 'Id-4', 'characteristicCode': 'C5'},
        'applicationType': 'Fixed Amount',
        'seasons': [{'value': 0, 'seasonCode': 'CP', 'travelWindow': null}]
      }],
      'occupancySupplements': [{
        'guestApplicationType': {'id': 'I', 'name': null},
        'room': {'roomCode': 'Id-2', 'characteristicCode': 'C2'},
        'applicationType': 'Room (%)',
        'seasons': [{'value': 4, 'seasonCode': 'CP', 'travelWindow': null}]
      }, {
        'guestApplicationType': {'id': 'I', 'name': null},
        'room': {'roomCode': 'Id-5', 'characteristicCode': 'C11'},
        'applicationType': 'Room and Board (%)',
        'seasons': [{'seasonCode': 'A', 'value': 5}, {'seasonCode': 'B WKDY', 'value': 4, 'travelWindow': null}, {
          'seasonCode': 'B WKND',
          'value': 5,
          'travelWindow': null
        }]
      }, {
        'guestApplicationType': {'id': 'I', 'name': null},
        'room': {'roomCode': 'Id-4', 'characteristicCode': 'C4'},
        'applicationType': 'Fixed Amount',
        'seasons': [{'value': '', 'seasonCode': 'SD', 'travelWindow': {'dateFrom': '2020-03-09', 'dateTo': '2020-04-05'}}, {
          'value': '',
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-03-20', 'dateTo': '2020-04-15'}
        }, {'value': '', 'seasonCode': 'SD', 'travelWindow': {'dateFrom': '2020-04-08', 'dateTo': '2020-04-23'}}]
      }],
      'otherSupplements': [{
        'supplementCode': 'DO',
        'guestApplicationType': {'id': 'I', 'name': null},
        'room': {'roomCode': 'Id-4', 'characteristicCode': 'C4'},
        'applicationType': 'Room (%)',
        'seasons': [{'value': 3, 'seasonCode': 'CP', 'travelWindow': null}]
      }],
      'NRFDiscount': [{
        'seasons': [{'seasonCode': 'CP', 'travelWindow': null, 'bookingWindow': null, 'value': 4}],
        'sharedAllotment': true
      }],
      'opaqueDiscount': [{
        'seasons': [{
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-03-02', 'dateTo': '2020-04-14'},
          'bookingWindow': {'dateFrom': '2020-03-10', 'dateTo': '2020-04-13'},
          'value': null
        }], 'sharedAllotment': true
      }],
      'HBGSelectDiscount': [{
        'seasons': [{
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-02-07', 'dateTo': '2020-03-12'},
          'bookingWindow': {'dateFrom': '2020-03-27', 'dateTo': '2020-04-30'},
          'value': 3
        }], 'sharedAllotment': true
      }],
      'earlyBookingDiscount': [{
        'daysBefore': '3',
        'stayNights': 5,
        'seasons': [{'value': '4', 'seasonCode': 'CP', 'travelWindow': null, 'bookingWindow': null}]
      }],
      'longStayDiscount': [{
        'isNRF': false,
        'stayNights': '3',
        'supplementCode': null,
        'seasons': [{'value': 4, 'seasonCode': 'CP', 'travelWindow': null, 'bookingWindow': null}]
      }]
    },
    'boardSupplements': [{
      'board': 'BB',
      'paxType': '1C',
      'room': {'roomCode': 'Id-4', 'characteristicCode': 'C4'},
      'seasons': [{'seasonCode': 'CP', 'value': 3}]
    }, {'paxType': null, 'room': {'roomCode': '', 'characteristicCode': ''}, 'seasons': [{'seasonCode': 'CP', 'value': null}]}],
    'rooms': [{
      'type': {'id': 'Id-2', 'name': ''},
      'characteristic': {'id': 'C2', 'name': ''},
      'sharedRoomCode': null,
      'sharedCharacteristicCode': null,
      'standard': null,
      'min': null,
      'max': null,
      'maxAdultsCapacity': null,
      'maxChildrenCapacity': null,
      'maxBabiesCapacity': null
    }, {
      'type': {'id': 'Id-4', 'name': ''},
      'characteristic': {'id': 'C4', 'name': ''},
      'sharedRoomCode': null,
      'sharedCharacteristicCode': null,
      'standard': null,
      'min': null,
      'max': null,
      'maxAdultsCapacity': null,
      'maxChildrenCapacity': null,
      'maxBabiesCapacity': null
    }, {
      'type': {'id': 'Id-4', 'name': ''},
      'characteristic': {'id': 'C5', 'name': ''},
      'sharedRoomCode': null,
      'sharedCharacteristicCode': null,
      'standard': null,
      'min': null,
      'max': null,
      'maxAdultsCapacity': null,
      'maxChildrenCapacity': null,
      'maxBabiesCapacity': null
    }, {
      'type': {'id': 'Id-5', 'name': ''},
      'characteristic': {'id': 'C11', 'name': ''},
      'sharedRoomCode': null,
      'sharedCharacteristicCode': null,
      'standard': null,
      'min': null,
      'max': null,
      'maxAdultsCapacity': null,
      'maxChildrenCapacity': null,
      'maxBabiesCapacity': null
    }],
    'rateData': {
      'rates': [{
        'roomCode': null,
        'characteristicCode': null,
        'type': [{'seasonCode': 'A', 'value': 3}, {'seasonCode': 'B WKDY', 'value': 5}, {
          'seasonCode': 'B WKND',
          'value': 4
        }, {'seasonCode': 'C', 'value': 4}]
      }, {
        'roomCode': null,
        'characteristicCode': null,
        'type': [{'seasonCode': 'A', 'value': 6}, {'seasonCode': 'B WKDY', 'value': 3}, {
          'seasonCode': 'B WKND',
          'value': 6
        }, {'seasonCode': 'C', 'value': 3}]
      }], 'vatIncluded': true, 'applicationType': 'Unit'
    },
    'seasons': [{
      'seasonCode': 'A',
      'travelWindow': {'dateFrom': '2020-03-17', 'dateTo': '2020-04-14'},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': true,
      'isSunday': true
    }, {
      'seasonCode': 'B WKDY',
      'travelWindow': {'dateFrom': '2020-04-15', 'dateTo': '2020-05-12'},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': false,
      'isSunday': false
    }, {
      'seasonCode': 'B WKND',
      'travelWindow': {'dateFrom': '2020-04-15', 'dateTo': '2020-05-12'},
      'isMonday': false,
      'isTuesday': false,
      'isWednesday': false,
      'isThursday': false,
      'isFriday': false,
      'isSaturday': true,
      'isSunday': true
    }, {
      'seasonCode': 'C',
      'travelWindow': {'dateFrom': '2020-05-13', 'dateTo': null},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': true,
      'isSunday': true
    }],
    'allotmentCeilingRestriction': [{
      'allotment': 'Min Allotment',
      'room': {'roomCode': 'Id-2', 'characteristicCode': 'C2'},
      'seasons': [{'seasonCode': 'CP', 'units': '3', 'nights': '4', 'price': '5'}]
    }, {
      'allotment': 'Security Allotment',
      'room': {'roomCode': 'Id-4', 'characteristicCode': 'C4'},
      'seasons': [{'seasonCode': 'CP', 'units': '3', 'nights': '4', 'price': null}]
    }, {
      'allotment': 'Min Allotment',
      'room': {'roomCode': 'Id-5', 'characteristicCode': 'C11'},
      'seasons': [{'seasonCode': 'CP', 'units': null, 'nights': null, 'price': null}]
    }],
    'cancellationPolicy': {
      'isNRF': false,
      'fees': [{
        'days': '2',
        'type': 'Full stay',
        'rule': 'ENTRY',
        'time': '01:00:00',
        'seasons': [{'seasonCode': 'B WKND'}, {'seasonCode': 'B WKDY'}]
      }]
    },
    'minimumStay': [{'room': {'roomCode': 'Id-2', 'characteristicCode': 'C2'}, 'seasons': [{'seasonCode': 'CP', 'value': '4'}]}],
    'free': [{
      'isNRF': false,
      'payNights': '3',
      'stayNights': '3',
      'seasons': [{'seasonCode': 'CP', 'bookingWindow': null, 'travelWindow': null}]
    }],
    'supplementCombination': [{
      'supplementCode': 'HBGSelectDiscount',
      'supplementCodeCombinable': ['earlyBookingDiscount'],
      'sharedAllotment': true,
      'totalDiscount': [{'value': 7}]
    }],
    'stopSales': [{
      'applicationDate': {'dateFrom': '2020-02-04', 'dateTo': '2020-02-05'},
      'room': {'roomCode': 'Id-4', 'characteristicCode': 'C4'}
    }],
    'overrides': [{'scale': {'from': '22', 'to': '33'}, 'totalSalesPercentage': null}]
  },
  'hotelData': {},
  'company': {},
  'office': {},
  'remarks': 'asdasd asdasd',
  'signatures': {'hotel': {}, 'hotelbeds': {}},
  'travelWindow': {'from': '2020-03-17', 'to': null}
};

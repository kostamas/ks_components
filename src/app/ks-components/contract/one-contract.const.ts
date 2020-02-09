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
      'commissionPercentage': '3',
      'recommendedSellingPrice': true,
      'boardBase': {'id': 'SC', 'name': 'Self-Catering'},
      'currency': {'id': 'USD', 'name': null},
      'paymentMode': 'M',
      'classification': 'NRF',
      'managementType': 'Office',
      'isVisibleWeb': false,
      'excludedCountries': null,
      'includedCountries': [{'name': 'Bermuda', 'id': 'BM'}, {'name': 'Belgium', 'id': 'BE'}, {
        'name': 'Spain',
        'id': 'ES'
      }, {'name': 'Israel', 'id': 'IL'}, {'name': 'Denmark', 'id': 'DK'}, {'name': 'United States', 'id': 'US'}, {
        'name': 'Brazil',
        'id': 'BR'
      }, {'name': 'American Samoa', 'id': 'AS'}, {'name': 'France', 'id': 'FR'}],
      'renewalType': 'N',
      'name': null,
      'supplier': {},
      'clientDistributionType': 'BB',
      'childAges': {'minimumAge': 3, 'maximumAge': 16}
    },
    'generalSupplements': {
      'discount': [{
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': 'Id-7', 'characteristicCode': 'C2'},
        'applicationType': 'Fixed Amount',
        'seasons': [{'value': 5, 'seasonCode': 'CP', 'travelWindow': null}]
      }, {
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
        'applicationType': 'Fixed Amount',
        'seasons': [{'value': 6, 'seasonCode': 'CP', 'travelWindow': null}]
      }],
      'occupancySupplements': [{
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
        'applicationType': 'Room (%)',
        'seasons': [{'value': 4, 'seasonCode': 'CP', 'travelWindow': null}]
      }, {
        'guestApplicationType': {'id': '2C1', 'name': null},
        'room': {'roomCode': 'Id-2', 'characteristicCode': 'C5'},
        'applicationType': 'Fixed Amount',
        'seasons': [{'seasonCode': 'A', 'value': 5}, {'seasonCode': 'B', 'value': 6}]
      }, {
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': '', 'characteristicCode': ''},
        'applicationType': null,
        'seasons': [{'value': '', 'seasonCode': 'SD', 'travelWindow': {'dateFrom': '2020-01-20', 'dateTo': '2020-01-20'}}, {
          'value': '',
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-01-20', 'dateTo': '2020-01-20'}
        }, {'value': '', 'seasonCode': 'SD', 'travelWindow': {'dateFrom': '2020-01-20', 'dateTo': '2020-01-20'}}]
      }],
      'otherSupplements': [{
        'supplementCode': '2',
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': 'Id-7', 'characteristicCode': 'C2'},
        'applicationType': 'Room (%)',
        'seasons': [{'value': 6, 'seasonCode': 'CP', 'travelWindow': null}]
      }, {
        'supplementCode': 'otherSupplement',
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': '', 'characteristicCode': ''},
        'applicationType': null,
        'seasons': [{'travelWindow': {'dateFrom': '2020-01-20', 'dateTo': '2020-01-20'}, 'value': '', 'seasonCode': 'SD'}]
      }, {
        'supplementCode': 'otherSupplement',
        'guestApplicationType': {'id': 'I1', 'name': null},
        'room': {'roomCode': '', 'characteristicCode': ''},
        'applicationType': null,
        'seasons': [{'seasonCode': 'A', 'value': 4}, {'seasonCode': 'B', 'value': 5}, {'seasonCode': 'C', 'value': 6}, {
          'seasonCode': 'D',
          'value': 7
        }]
      }],
      'NRFDiscount': [{
        'seasons': [{
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-03-24', 'dateTo': '2020-04-20'},
          'bookingWindow': {'dateFrom': '2020-03-02', 'dateTo': '2020-04-12'},
          'value': 5
        }], 'sharedAllotment': true
      }],
      'opaqueDiscount': [{
        'seasons': [{'seasonCode': 'CP', 'travelWindow': null, 'bookingWindow': null, 'value': 6}],
        'sharedAllotment': true
      }],
      'HBGSelectDiscount': [{
        'seasons': [{
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-03-10', 'dateTo': '2020-04-07'},
          'bookingWindow': {'dateFrom': '2020-03-10', 'dateTo': '2020-04-06'},
          'value': 5
        }], 'sharedAllotment': true
      }, {
        'seasons': [{
          'seasonCode': 'SD',
          'travelWindow': {'dateFrom': '2020-02-14', 'dateTo': '2020-04-14'},
          'bookingWindow': {'dateFrom': '2020-03-18', 'dateTo': '2020-04-14'},
          'value': null
        }], 'sharedAllotment': true
      }],
      'earlyBookingDiscount': [{
        'daysBefore': '6',
        'stayNights': 4,
        'isNRF': true,
        'seasons': [{'value': '54', 'seasonCode': 'CP', 'travelWindow': null, 'bookingWindow': null}]
      }],
      'longStayDiscount': [{
        'stayNights': '4',
        'supplementCode': null,
        'seasons': [{
          'value': 5,
          'seasonCode': 'SD',
          'bookingWindow': {'dateFrom': '2020-03-12', 'dateTo': '2020-04-14'},
          'travelWindow': {'dateFrom': '2020-03-10', 'dateTo': '2020-04-16'}
        }]
      }]
    },
    'boardSupplements': [{
      'board': 'B1',
      'paxType': '1C1',
      'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
      'seasons': [{'seasonCode': 'CP', 'value': 5}]
    }],
    'rooms': [{
      'type': {'id': 'Id-7', 'name': ''},
      'characteristic': {'id': 'C2', 'name': ''},
      'sharedRoomCode': 'Id-2',
      'sharedCharacteristicCode': 'C5',
      'standard': 12,
      'min': 4,
      'max': 7,
      'maxAdultsCapacity': 5,
      'maxChildrenCapacity': 6,
      'maxBabiesCapacity': 3
    }, {
      'type': {'id': 'Id-3', 'name': ''},
      'characteristic': {'id': 'C2', 'name': ''},
      'sharedRoomCode': 'Id-7',
      'sharedCharacteristicCode': 'C2',
      'standard': 1,
      'min': 4,
      'max': 8,
      'maxAdultsCapacity': 6,
      'maxChildrenCapacity': 7,
      'maxBabiesCapacity': null
    }, {
      'type': {'id': 'Id-2', 'name': ''},
      'characteristic': {'id': 'C5', 'name': ''},
      'sharedRoomCode': 'Id-3',
      'sharedCharacteristicCode': 'C2',
      'standard': 5,
      'min': 6,
      'max': 3,
      'maxAdultsCapacity': 3,
      'maxChildrenCapacity': 3,
      'maxBabiesCapacity': 6
    }, {
      'type': {'id': 'Id-2', 'name': ''},
      'characteristic': {'id': 'C3', 'name': ''},
      'sharedRoomCode': null,
      'sharedCharacteristicCode': null,
      'standard': 6,
      'min': 4,
      'max': null,
      'maxAdultsCapacity': 7,
      'maxChildrenCapacity': 8,
      'maxBabiesCapacity': 4
    }],
    'rateData': {
      'rates': [{
        'roomCode': 'Id-7',
        'characteristicCode': 'C2',
        'type': [{'seasonCode': 'A', 'value': 3}, {'seasonCode': 'B', 'value': 4}, {'seasonCode': 'C', 'value': 5}, {
          'seasonCode': 'D',
          'value': 6
        }]
      }, {
        'roomCode': 'Id-2',
        'characteristicCode': 'C5',
        'type': [{'seasonCode': 'A', 'value': 5}, {'seasonCode': 'B', 'value': 3}, {'seasonCode': 'C', 'value': 5}, {
          'seasonCode': 'D',
          'value': 3
        }]
      }, {
        'roomCode': 'Id-3',
        'characteristicCode': 'C4',
        'type': [{'seasonCode': 'A', 'value': 3}, {'seasonCode': 'B', 'value': 4}, {'seasonCode': 'C', 'value': 5}, {
          'seasonCode': 'D',
          'value': 5
        }]
      }], 'vatIncluded': true, 'applicationType': 'Unit'
    },
    'seasons': [{
      'seasonCode': 'A',
      'travelWindow': {'dateFrom': '2020-02-14', 'dateTo': '2020-03-10'},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': true,
      'isSunday': true
    }, {
      'seasonCode': 'B',
      'travelWindow': {'dateFrom': '2020-03-11', 'dateTo': '2020-04-15'},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': true,
      'isSunday': true
    }, {
      'seasonCode': 'C',
      'travelWindow': {'dateFrom': '2020-04-16', 'dateTo': '2020-05-12'},
      'isMonday': true,
      'isTuesday': true,
      'isWednesday': true,
      'isThursday': true,
      'isFriday': true,
      'isSaturday': true,
      'isSunday': true
    }, {
      'seasonCode': 'D',
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
      'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
      'seasons': [{'seasonCode': 'CP', 'units': '3', 'nights': '5', 'price': '6'}]
    }, {
      'allotment': 'Security Allotment',
      'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
      'seasons': [{'seasonCode': 'A', 'units': 3, 'nights': 3, 'price': 3}, {
        'seasonCode': 'B',
        'units': 4,
        'nights': 5,
        'price': null
      }, {'seasonCode': 'C', 'units': 5, 'nights': null, 'price': 3}, {'seasonCode': 'D', 'units': 6, 'nights': 6, 'price': null}]
    }],
    'cancellationPolicy': {'isNRF': true, 'fees': []},
    'minimumStay': [{
      'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'},
      'seasons': [{'seasonCode': 'CP', 'value': '5'}]
    }, {
      'room': {'roomCode': '', 'characteristicCode': ''},
      'seasons': [{'seasonCode': 'A', 'value': 3}, {'seasonCode': 'B', 'value': 4}, {'seasonCode': 'C', 'value': 6}, {
        'seasonCode': 'D',
        'value': 7
      }]
    }],
    'free': [{
      'payNights': '6',
      'stayNights': '4',
      'seasons': [{'seasonCode': 'SD', 'bookingWindow': {'dateFrom': '2020-03-03', 'dateTo': '2020-04-06'}, 'travelWindow': null}]
    }],
    'supplementCombination': [{
      'supplementCode': 'opaqueDiscount',
      'supplementCodeCombinable': ['earlyBookingDiscount', 'NRFDiscount', 'longStayDiscount'],
      'sharedAllotment': true,
      'totalDiscount': [{'value': 70}]
    }, {
      'supplementCode': 'earlyBookingDiscount',
      'supplementCodeCombinable': ['opaqueDiscount'],
      'sharedAllotment': true,
      'totalDiscount': [{'value': 60}]
    }, {
      'supplementCode': 'opaqueDiscount',
      'supplementCodeCombinable': ['NRFDiscount', 'earlyBookingDiscount'],
      'sharedAllotment': true,
      'totalDiscount': [{'value': 65}]
    }],
    'stopSales': [{
      'applicationDate': {'dateFrom': '2020-02-09', 'dateTo': '2020-02-10'},
      'room': {'roomCode': 'Id-3', 'characteristicCode': 'C2'}
    }, {'applicationDate': {'dateFrom': '2020-02-09', 'dateTo': '2020-02-10'}, 'room': {'roomCode': 'Id-2', 'characteristicCode': 'C3'}}],
    'overrides': [{'scale': {'from': '5', 'to': '6'}, 'totalSalesPercentage': null}]
  },
  'hotelData': {
    'categoryId': '5',
    'destination': {'name': 'madrid'},
    'zone': null,
    'country': {'id': null, 'name': 'Spain'},
    'postalCode': '4234242'
  },
  'company': {'id': '2', 'name': 'company 2'},
  'office': {'id': '2', 'name': 'office 2'},
  'remarks': 'dsff sdfsdf ewr  werwer',
  'signatures': {'hotel': {}, 'hotelbeds': {}},
  'travelWindow': {'from': '2020-02-14', 'to': null}
};

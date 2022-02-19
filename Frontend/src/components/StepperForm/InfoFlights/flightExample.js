const flightExample = {
  data: {
    type: 'flight-offers-pricing',
    flightOffers: [
      {
        type: 'flight-offer',
        id: '1',
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2020-08-04',
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: 'PT32H15M',
            segments: [
              {
                departure: {
                  iataCode: 'SYD',
                  terminal: '1',
                  at: '2021-02-01T19:15:00',
                },
                arrival: {
                  iataCode: 'SIN',
                  terminal: '1',
                  at: '2021-02-02T00:30:00',
                },
                carrierCode: 'TR',
                number: '13',
                aircraft: {
                  code: '789',
                },
                operating: {
                  carrierCode: 'TR',
                },
                duration: 'PT8H15M',
                id: '1',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: {
                  iataCode: 'SIN',
                  terminal: '1',
                  at: '2021-02-02T22:05:00',
                },
                arrival: {
                  iataCode: 'DMK',
                  terminal: '1',
                  at: '2021-02-02T23:30:00',
                },
                carrierCode: 'TR',
                number: '868',
                aircraft: {
                  code: '788',
                },
                operating: {
                  carrierCode: 'TR',
                },
                duration: 'PT2H25M',
                id: '2',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
          {
            duration: 'PT15H',
            segments: [
              {
                departure: {
                  iataCode: 'DMK',
                  terminal: '1',
                  at: '2021-02-05T23:15:00',
                },
                arrival: {
                  iataCode: 'SIN',
                  terminal: '1',
                  at: '2021-02-06T02:50:00',
                },
                carrierCode: 'TR',
                number: '867',
                aircraft: {
                  code: '788',
                },
                operating: {
                  carrierCode: 'TR',
                },
                duration: 'PT2H35M',
                id: '5',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: {
                  iataCode: 'SIN',
                  terminal: '1',
                  at: '2021-02-06T06:55:00',
                },
                arrival: {
                  iataCode: 'SYD',
                  terminal: '1',
                  at: '2021-02-06T18:15:00',
                },
                carrierCode: 'TR',
                number: '12',
                aircraft: {
                  code: '789',
                },
                operating: {
                  carrierCode: 'TR',
                },
                duration: 'PT8H20M',
                id: '6',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          total: '546.70',
          base: '334.00',
          fees: [
            {
              amount: '0.00',
              type: 'SUPPLIER',
            },
            {
              amount: '0.00',
              type: 'TICKETING',
            },
          ],
          grandTotal: '546.70',
        },
        pricingOptions: {
          fareType: ['PUBLISHED'],
          includedCheckedBagsOnly: true,
        },
        validatingAirlineCodes: ['HR'],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: {
              currency: 'EUR',
              total: '55.69',
              base: '44.00',
            },
            fareDetailsBySegment: [
              {
                segmentId: '41',
                cabin: 'ECONOMY',
                fareBasis: 'ADYO5L',
                brandedFare: 'LITE',
                class: 'A',
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
          },
          {
            travelerId: '2',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: {
              currency: 'EUR',
              total: '55.69',
              base: '44.00',
            },
            fareDetailsBySegment: [
              {
                segmentId: '41',
                cabin: 'ECONOMY',
                fareBasis: 'ADYO5L',
                brandedFare: 'LITE',
                class: 'A',
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
          },
          {
            travelerId: '3',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: {
              currency: 'EUR',
              total: '55.69',
              base: '44.00',
            },
            fareDetailsBySegment: [
              {
                segmentId: '41',
                cabin: 'ECONOMY',
                fareBasis: 'ADYO5L',
                brandedFare: 'LITE',
                class: 'A',
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
          },
          {
            travelerId: '4',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: {
              currency: 'EUR',
              total: '55.69',
              base: '44.00',
            },
            fareDetailsBySegment: [
              {
                segmentId: '41',
                cabin: 'ECONOMY',
                fareBasis: 'ADYO5L',
                brandedFare: 'LITE',
                class: 'A',
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export default flightExample;

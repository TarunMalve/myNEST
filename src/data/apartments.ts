export interface Flat {
  id: string;
  number: string;
  floor: number;
  buildingId: string;
  societyId: string;
  type: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Studio';
  area: number; // sq ft
  rent: number; // monthly ₹
  status: 'occupied' | 'vacant' | 'maintenance';
  tenantId?: string;
  ownerId?: string;
}

export interface Building {
  id: string;
  name: string;
  societyId: string;
  totalFloors: number;
  flats: Flat[];
}

export interface Society {
  id: string;
  name: string;
  cityId: string;
  address: string;
  type: 'Apartment Complex' | 'Gated Colony' | 'Independent' | 'Township';
  totalUnits: number;
  amenities: string[];
  maintenanceCharge: number; // ₹/month
  established: string;
  rwaContact: string;
  buildings: Building[];
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  areas: string[];
  societies: Society[];
}

export interface State {
  id: string;
  name: string;
  capitalCity: string;
  electricityBoard: string;
  cities: City[];
}

export const STATES: State[] = [
  {
    id: 'mp',
    name: 'Madhya Pradesh',
    capitalCity: 'Bhopal',
    electricityBoard: 'MPEB (Madhya Pradesh Electricity Board)',
    cities: [
      {
        id: 'indore',
        name: 'Indore',
        stateId: 'mp',
        areas: ['Vijay Nagar', 'Palasia', 'Scheme 54', 'LIG Colony', 'Bhawarkuan', 'Geeta Bhawan'],
        societies: [
          {
            id: 'soc-green-meadows',
            name: 'Green Meadows Residency',
            cityId: 'indore',
            address: 'Scheme 54, AB Road, Indore - 452010',
            type: 'Apartment Complex',
            totalUnits: 120,
            amenities: ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children Play Area', 'CCTV', '24/7 Security', 'Power Backup', 'Parking'],
            maintenanceCharge: 2500,
            established: '2018-03-01',
            rwaContact: '+91 98261 00001',
            buildings: [
              {
                id: 'bld-a',
                name: 'Block A',
                societyId: 'soc-green-meadows',
                totalFloors: 7,
                flats: [
                  { id: 'flat-a203', number: 'A-203', floor: 2, buildingId: 'bld-a', societyId: 'soc-green-meadows', type: '2BHK', area: 1050, rent: 18000, status: 'occupied', tenantId: 'u1', ownerId: 'u2' },
                  { id: 'flat-a301', number: 'A-301', floor: 3, buildingId: 'bld-a', societyId: 'soc-green-meadows', type: '3BHK', area: 1400, rent: 25000, status: 'vacant', ownerId: 'u2' },
                  { id: 'flat-a102', number: 'A-102', floor: 1, buildingId: 'bld-a', societyId: 'soc-green-meadows', type: '1BHK', area: 620, rent: 9500, status: 'occupied', tenantId: 'u4' },
                  { id: 'flat-a401', number: 'A-401', floor: 4, buildingId: 'bld-a', societyId: 'soc-green-meadows', type: '2BHK', area: 1100, rent: 19000, status: 'occupied' },
                  { id: 'flat-a502', number: 'A-502', floor: 5, buildingId: 'bld-a', societyId: 'soc-green-meadows', type: '3BHK', area: 1380, rent: 24000, status: 'maintenance' },
                ],
              },
              {
                id: 'bld-b',
                name: 'Block B',
                societyId: 'soc-green-meadows',
                totalFloors: 7,
                flats: [
                  { id: 'flat-b405', number: 'B-405', floor: 4, buildingId: 'bld-b', societyId: 'soc-green-meadows', type: '2BHK', area: 1100, rent: 20000, status: 'occupied', ownerId: 'u2' },
                  { id: 'flat-b101', number: 'B-101', floor: 1, buildingId: 'bld-b', societyId: 'soc-green-meadows', type: '1BHK', area: 650, rent: 10000, status: 'vacant' },
                  { id: 'flat-b602', number: 'B-602', floor: 6, buildingId: 'bld-b', societyId: 'soc-green-meadows', type: '3BHK', area: 1500, rent: 28000, status: 'occupied' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mh',
    name: 'Maharashtra',
    capitalCity: 'Mumbai',
    electricityBoard: 'MSEDCL (Maharashtra State Electricity Distribution Co. Ltd.)',
    cities: [
      {
        id: 'pune',
        name: 'Pune',
        stateId: 'mh',
        areas: ['Koregaon Park', 'Baner', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar'],
        societies: [
          {
            id: 'soc-river-heights',
            name: 'River Heights Society',
            cityId: 'pune',
            address: 'Koregaon Park Annexe, Pune - 411036',
            type: 'Gated Colony',
            totalUnits: 80,
            amenities: ['Rooftop Garden', 'Gym', 'Community Hall', 'EV Charging', 'Garden', '24/7 Security'],
            maintenanceCharge: 3500,
            established: '2020-06-15',
            rwaContact: '+91 77540 00002',
            buildings: [
              {
                id: 'bld-c',
                name: 'Tower C',
                societyId: 'soc-river-heights',
                totalFloors: 10,
                flats: [
                  { id: 'flat-c101', number: 'C-101', floor: 1, buildingId: 'bld-c', societyId: 'soc-river-heights', type: '2BHK', area: 980, rent: 28000, status: 'occupied', tenantId: 'u4' },
                  { id: 'flat-c802', number: 'C-802', floor: 8, buildingId: 'bld-c', societyId: 'soc-river-heights', type: '3BHK', area: 1600, rent: 45000, status: 'occupied' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dl',
    name: 'Delhi',
    capitalCity: 'New Delhi',
    electricityBoard: 'BSES Rajdhani / Tata Power Delhi',
    cities: [
      {
        id: 'delhi',
        name: 'New Delhi',
        stateId: 'dl',
        areas: ['Dwarka', 'Rohini', 'Vasant Kunj', 'Saket', 'Greater Kailash', 'Lajpat Nagar'],
        societies: [],
      },
    ],
  },
];

export const getAllSocieties = (): Society[] =>
  STATES.flatMap(s => s.cities.flatMap(c => c.societies));

export const getSocietyById = (id: string): Society | undefined =>
  getAllSocieties().find(s => s.id === id);

export const getAllFlats = (): Flat[] =>
  getAllSocieties().flatMap(s => s.buildings.flatMap(b => b.flats));

export type BookingType = 'maintenance_visit' | 'society_meeting' | 'facility_booking' | 'vendor_visit' | 'inspection';
export type BookingStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  title: string;
  type: BookingType;
  date: string;
  timeSlot: string;
  duration: string;
  status: BookingStatus;
  userId: string;
  flatId?: string;
  location: string;
  description?: string;
  attendees?: string[];
  reminderSet: boolean;
}

export const BOOKINGS: Booking[] = [
  {
    id: 'bk1',
    title: 'Plumber Visit — Kitchen Sink Repair',
    type: 'maintenance_visit',
    date: '2026-03-29',
    timeSlot: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    status: 'confirmed',
    userId: 'u1',
    flatId: 'flat-a203',
    location: 'Flat A-203, Block A',
    description: 'Ramesh Plumber will fix the kitchen sink leakage. Ticket TKT-2026-001.',
    reminderSet: true,
  },
  {
    id: 'bk2',
    title: 'RWA General Body Meeting — April',
    type: 'society_meeting',
    date: '2026-04-05',
    timeSlot: '6:30 PM - 8:00 PM',
    duration: '1.5 hours',
    status: 'scheduled',
    userId: 'u1',
    location: 'Clubhouse, Ground Floor',
    description: 'Monthly RWA meeting — FY2026 accounts, security upgrade, maintenance schedule.',
    attendees: ['Arjun Sharma', 'Priya Verma', 'Rajesh Patel', 'Sunita Kumari', '40+ residents'],
    reminderSet: true,
  },
  {
    id: 'bk3',
    title: 'Swimming Pool — Saturday Slot',
    type: 'facility_booking',
    date: '2026-03-30',
    timeSlot: '7:00 AM - 8:00 AM',
    duration: '1 hour',
    status: 'confirmed',
    userId: 'u1',
    location: 'Society Swimming Pool',
    reminderSet: false,
  },
  {
    id: 'bk4',
    title: 'Annual Flat Inspection',
    type: 'inspection',
    date: '2026-04-10',
    timeSlot: '11:00 AM - 12:30 PM',
    duration: '1.5 hours',
    status: 'scheduled',
    userId: 'u1',
    flatId: 'flat-a203',
    location: 'Flat A-203',
    description: 'Annual inspection by owner. Please ensure flat is accessible.',
    reminderSet: true,
  },
  {
    id: 'bk5',
    title: 'AC Technician Visit',
    type: 'vendor_visit',
    date: '2026-04-02',
    timeSlot: '2:00 PM - 4:00 PM',
    duration: '2 hours',
    status: 'scheduled',
    userId: 'u1',
    flatId: 'flat-a203',
    location: 'Flat A-203, Master Bedroom',
    description: 'Technician to check split AC cooling issue. Ticket TKT-2026-002.',
    reminderSet: true,
  },
];

export const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  maintenance_visit: 'Maintenance Visit',
  society_meeting: 'Society Meeting',
  facility_booking: 'Facility Booking',
  vendor_visit: 'Vendor Visit',
  inspection: 'Flat Inspection',
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  scheduled: 'badge-info',
  confirmed: 'badge-success',
  completed: 'badge-neutral',
  cancelled: 'badge-danger',
};

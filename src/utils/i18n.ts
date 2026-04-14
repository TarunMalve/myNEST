export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    expenses: 'Expenses',
    documents: 'Documents',
    complaints: 'Complaints',
    society: 'Society',
    bookings: 'Bookings',
    community: 'Community',
    insights: 'Insights',
    logout: 'Logout',
    settings: 'Settings',

    // Dashboard
    good_morning: 'Good Morning',
    good_afternoon: 'Good Afternoon',
    good_evening: 'Good Evening',
    welcome_back: 'Welcome back',
    monthly_expenses: 'Monthly Expenses',
    pending_dues: 'Pending Dues',
    active_tickets: 'Active Tickets',
    total_paid: 'Total Paid',
    quick_actions: 'Quick Actions',
    pay_rent: 'Pay Rent',
    raise_complaint: 'Raise Complaint',
    view_documents: 'View Documents',
    recent_activity: 'Recent Activity',

    // Common
    view_all: 'View All',
    add_new: 'Add New',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    filter: 'Filter',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    description: 'Description',
    submit: 'Submit',
    pending: 'Pending',
    resolved: 'Resolved',
    in_progress: 'In Progress',
    paid: 'Paid',
    overdue: 'Overdue',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    expenses: 'खर्च',
    documents: 'दस्तावेज़',
    complaints: 'शिकायतें',
    society: 'सोसाइटी',
    bookings: 'बुकिंग',
    community: 'समुदाय',
    insights: 'विश्लेषण',
    logout: 'लॉग आउट',
    settings: 'सेटिंग्स',

    // Dashboard
    good_morning: 'सुप्रभात',
    good_afternoon: 'नमस्ते',
    good_evening: 'शुभ संध्या',
    welcome_back: 'वापस स्वागत है',
    monthly_expenses: 'मासिक खर्च',
    pending_dues: 'बकाया राशि',
    active_tickets: 'सक्रिय टिकट',
    total_paid: 'कुल भुगतान',
    quick_actions: 'त्वरित कार्य',
    pay_rent: 'किराया भरें',
    raise_complaint: 'शिकायत दर्ज करें',
    view_documents: 'दस्तावेज़ देखें',
    recent_activity: 'हाल की गतिविधि',

    // Common
    view_all: 'सभी देखें',
    add_new: 'नया जोड़ें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    download: 'डाउनलोड',
    upload: 'अपलोड',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    status: 'स्थिति',
    date: 'तारीख़',
    amount: 'राशि',
    description: 'विवरण',
    submit: 'जमा करें',
    pending: 'लंबित',
    resolved: 'हल किया गया',
    in_progress: 'प्रगति में',
    paid: 'भुगतान हो गया',
    overdue: 'बकाया',
  },
};

export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (language: 'en' | 'hi') => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  return { t };
};

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export const getGreeting = (language: 'en' | 'hi'): string => {
  const hour = new Date().getHours();
  if (language === 'hi') {
    if (hour < 12) return 'सुप्रभात 🌅';
    if (hour < 17) return 'नमस्ते 🌞';
    return 'शुभ संध्या 🌙';
  }
  if (hour < 12) return 'Good Morning 🌅';
  if (hour < 17) return 'Good Afternoon 🌞';
  return 'Good Evening 🌙';
};

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');

export const getDaysUntilDue = (dueDate: string): number => {
  const due = new Date(dueDate);
  const today = new Date();
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

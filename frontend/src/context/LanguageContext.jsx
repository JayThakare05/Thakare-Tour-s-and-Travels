import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Nav
    navHome: 'Home',
    navCars: 'Our Cars',
    navBook: 'Book Now',
    navAdmin: 'Admin',
    navContact: 'Contact',

    // Hero
    heroTitle: 'Thakare Tours & Travels',
    heroSubtitle: 'Bhisegaon, Tal. Karjat, Dist. Raigad',
    heroTagline: 'Comfortable · Sanitized · Affordable',
    heroDesc: 'Innova, Ertiga, Eeco — Your perfect travel partner for every journey.',
    heroCta1: 'Book a Ride',
    heroCta2: 'View Cars',

    // Cars Section
    carsTitle: 'Our Fleet',
    carsSubtitle: 'Choose your perfect ride for every journey',
    available: 'Available',
    notAvailable: 'Not Available',
    pricePerKm: '/km',
    capacity: 'Seater',
    btnBook: 'Book Now',
    btnCall: 'Call Now',

    // Booking Form
    bookTitle: 'Book Your Ride',
    bookSubtitle: 'Fill in the details and we\'ll get back to you shortly',
    fieldName: 'Your Name',
    fieldPhone: 'Phone Number',
    fieldPickup: 'Pickup City',
    fieldDest: 'Destination City',
    fieldDate: 'Travel Date',
    fieldTrip: 'Trip Type',
    fieldCar: 'Preferred Car',
    fieldPassengers: 'Passengers',
    fieldNotes: 'Additional Notes (Optional)',
    tripOneWay: 'One Way',
    tripRound: 'Round Trip',
    tripLocal: 'Local',
    carAny: 'Any Available',
    btnSubmit: 'Send Booking Request',
    submitting: 'Sending...',
    successMsg: '🎉 Booking request sent! We will contact you soon.',
    errorMsg: '❌ Failed to send. Please call us directly.',

    // Fare Calculator
    calcTitle: 'Fare Calculator',
    calcSubtitle: 'Estimate your trip cost instantly',
    calcDistance: 'Distance (km)',
    calcCar: 'Select Car',
    calcEstimate: 'Estimated Fare',
    calcNote: '* Actual fare may vary based on route and conditions',

    // About / Trust
    trustTitle: 'Why Choose Us?',
    trust1Title: 'Sanitized Vehicles',
    trust1Desc: 'All vehicles thoroughly cleaned and sanitized before every trip.',
    trust2Title: 'Experienced Drivers',
    trust2Desc: 'Professional, courteous drivers with years of experience.',
    trust3Title: 'Affordable Pricing',
    trust3Desc: 'Best rates with no hidden charges. Pay only what\'s quoted.',
    trust4Title: 'Always Available',
    trust4Desc: '24/7 availability for your emergency and planned travels.',

    // Location
    locationTitle: 'Our Location',
    locationAddr: 'Bhisegaon, Tal. Karjat, Dist. Raigad, Maharashtra',
    contactName: 'Shri. Naresh Suresh Thakare',
    contactPhone: '+91 8169063703',

    // Footer
    footerTagline: 'New, Sanitized and Budget Cars',
    footerRights: '© 2024 Thakare Tours and Travels. All rights reserved.',

    // Admin
    adminTitle: 'Admin Dashboard',
    adminCars: 'Cars',
    adminBookings: 'Bookings',
    adminAddCar: 'Add Car',
    adminStatus: 'Status',
    adminActions: 'Actions',
    toggleAvailability: 'Toggle',
    statusPending: 'Pending',
    statusContacted: 'Contacted',
    statusConfirmed: 'Confirmed',
    statusCancelled: 'Cancelled',
    langToggle: 'मराठी',
  },
  mr: {
    navHome: 'मुख्यपृष्ठ',
    navCars: 'आमच्या गाड्या',
    navBook: 'बुकिंग करा',
    navAdmin: 'प्रशासन',
    navContact: 'संपर्क',

    heroTitle: 'ठाकरे टूर्स अँड ट्रॅव्हल्स',
    heroSubtitle: 'भिसेगाव, ता. कर्जत, जि. रायगड',
    heroTagline: 'आरामदायी · स्वच्छ · परवडणारे',
    heroDesc: 'इनोवा, एर्टिगा, इको — प्रत्येक प्रवासासाठी आदर्श साथी.',
    heroCta1: 'बुकिंग करा',
    heroCta2: 'गाड्या पाहा',

    carsTitle: 'आमच्या गाड्या',
    carsSubtitle: 'तुमच्या प्रवासासाठी योग्य गाडी निवडा',
    available: 'उपलब्ध',
    notAvailable: 'उपलब्ध नाही',
    pricePerKm: '/किमी',
    capacity: 'सीटर',
    btnBook: 'बुकिंग करा',
    btnCall: 'कॉल करा',

    bookTitle: 'गाडी बुक करा',
    bookSubtitle: 'माहिती भरा, आम्ही लवकरच संपर्क करू',
    fieldName: 'तुमचे नाव',
    fieldPhone: 'फोन नंबर',
    fieldPickup: 'सुरुवात ठिकाण',
    fieldDest: 'गंतव्य ठिकाण',
    fieldDate: 'प्रवासाची तारीख',
    fieldTrip: 'प्रवास प्रकार',
    fieldCar: 'पसंतीची गाडी',
    fieldPassengers: 'प्रवासी संख्या',
    fieldNotes: 'अतिरिक्त टीप (ऐच्छिक)',
    tripOneWay: 'एकेरी',
    tripRound: 'परत-फेरत',
    tripLocal: 'स्थानिक',
    carAny: 'कोणतीही उपलब्ध',
    btnSubmit: 'बुकिंग विनंती पाठवा',
    submitting: 'पाठवत आहे...',
    successMsg: '🎉 बुकिंग विनंती पाठवली! आम्ही लवकरच संपर्क करू.',
    errorMsg: '❌ पाठवण्यात अयशस्वी. कृपया थेट कॉल करा.',

    calcTitle: 'भाडे कॅल्क्युलेटर',
    calcSubtitle: 'तुमच्या प्रवासाचे अंदाजे भाडे जाणून घ्या',
    calcDistance: 'अंतर (किमी)',
    calcCar: 'गाडी निवडा',
    calcEstimate: 'अंदाजे भाडे',
    calcNote: '* मार्ग आणि परिस्थितीनुसार वास्तविक भाडे बदलू शकते',

    trustTitle: 'आम्हीच का?',
    trust1Title: 'स्वच्छ वाहने',
    trust1Desc: 'प्रत्येक प्रवासापूर्वी वाहने पूर्णपणे स्वच्छ केली जातात.',
    trust2Title: 'अनुभवी चालक',
    trust2Desc: 'वर्षांच्या अनुभवासह व्यावसायिक आणि विनम्र चालक.',
    trust3Title: 'परवडणारे दर',
    trust3Desc: 'कोणतेही छुपे शुल्क नाही. सांगितलेले भाडे द्या.',
    trust4Title: 'नेहमी उपलब्ध',
    trust4Desc: 'आपत्कालीन आणि नियोजित प्रवासासाठी २४/७ उपलब्ध.',

    locationTitle: 'आमचे ठिकाण',
    locationAddr: 'भिसेगाव, ता. कर्जत, जि. रायगड, महाराष्ट्र',
    contactName: 'श्री. नरेश सुरेश ठाकरे',
    contactPhone: '+91 8169063703',

    footerTagline: 'नवीन, स्वच्छ आणि किफायतशीर गाड्या',
    footerRights: '© २०२४ ठाकरे टूर्स अँड ट्रॅव्हल्स. सर्व हक्क राखीव.',

    adminTitle: 'प्रशासन डॅशबोर्ड',
    adminCars: 'गाड्या',
    adminBookings: 'बुकिंग',
    adminAddCar: 'गाडी जोडा',
    adminStatus: 'स्थिती',
    adminActions: 'क्रिया',
    toggleAvailability: 'बदला',
    statusPending: 'प्रलंबित',
    statusContacted: 'संपर्क झाला',
    statusConfirmed: 'पक्के',
    statusCancelled: 'रद्द',
    langToggle: 'English',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] || translations['en'][key] || key;
  const toggleLang = () => setLang(l => l === 'en' ? 'mr' : 'en');
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

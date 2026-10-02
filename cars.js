/* ===== LOCO.com: YOUR CARS LIVE HERE =====
   To add a car: copy one block { ... }, paste it after the last one, change the values.
   To hide a car: set  active: false   (or delete the block).
   To change the price: edit price_per_day.
   Photos: upload the picture to the same place as this file, then write "your-photo.jpg" below (the drawings are placeholders until you add real photos).
   Booked dates: add { from: "2026-10-10", to: "2026-10-14" } to booked when you approve a booking.
   Keep every comma and quote exactly as in the examples. */
window.CARS = [
  {
    id: "car-economy-sedan",
    name: "Economy Sedan",
    description: "Comfortable 5-seat sedan. Clean, fuel efficient, and easy to drive. Great for city trips and daily use.",
    price_per_day: 55,
    images: ["car-economy-sedan.svg"],   // replace with your real photo file names, e.g. ["my-car-1.jpg", "my-car-2.jpg"]
    active: true,
    booked: []
  },
  {
    id: "car-family-suv",
    name: "Family SUV",
    description: "Roomy SUV with space for luggage and the whole family. Smooth ride for long highway trips.",
    price_per_day: 85,
    images: ["car-family-suv.svg"],   // replace with your real photo file names, e.g. ["my-car-1.jpg", "my-car-2.jpg"]
    active: true,
    booked: []
  },
  {
    id: "car-pickup-truck",
    name: "Pickup Truck",
    description: "Strong and practical pickup with a large bed for moving, hauling, and work trips.",
    price_per_day: 95,
    images: ["car-pickup-truck.svg"],   // replace with your real photo file names, e.g. ["my-car-1.jpg", "my-car-2.jpg"]
    active: true,
    booked: []
  },
  {
    id: "car-sport-coupe",
    name: "Sport Coupe",
    description: "Stylish two-door coupe for weekend drives and special occasions. Turn heads on the road.",
    price_per_day: 140,
    images: ["car-sport-coupe.svg"],   // replace with your real photo file names, e.g. ["my-car-1.jpg", "my-car-2.jpg"]
    active: true,
    booked: []
  }
];
/* Booking requests are emailed to you through Formspree (free). Paste your form link here, e.g. "https://formspree.io/f/abcd1234" */
window.FORM_ENDPOINT = "https://formspree.io/f/mjykqjle";
window.CONTACT = {
  emails: ["mattewgross85@gmail.com", "alexander22gate@gmail.com"],
  phones: ["(201) 619-8112", "(303) 616-0578"]
};

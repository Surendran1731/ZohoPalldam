class TrainBookingSystem {
     constructor() {
       this.seats = new Array(8).fill(null); // 8 seats, initially empty
       this.waitingList = []; // Waiting list for up to 2 passengers
       this.pnrCounter = 1; // PNR number starts from 1
       this.bookings = []; // List of all bookings
     }
   
     // Function to book tickets
     bookTicket(source, destination, noOfTickets) {
       let availableSeats = this.getAvailableSeats();
       if (availableSeats.length >= noOfTickets) {
         let seatNumbers = availableSeats.slice(0, noOfTickets);
         this.fillSeats(seatNumbers, source, destination);
         this.bookings.push({
           pnr: this.pnrCounter,
           source,
           destination,
           seatNumbers,
           status: 'Confirmed',
         });
         this.logOutput(`Booking successful! PNR: ${this.pnrCounter}`);
         this.pnrCounter++;
       } else {
         if (this.waitingList.length + noOfTickets <= 2) {
           this.waitingList.push({ source, destination, noOfTickets, pnr: this.pnrCounter });
           this.logOutput(`Added to waiting list. PNR: ${this.pnrCounter}`);
           this.bookings.push({
             pnr: this.pnrCounter,
             source,
             destination,
             seatNumbers: 'WL',
             status: 'Waiting',
           });
           this.pnrCounter++;
         } else {
           this.logOutput('No seats available, and waiting list is full.');
         }
       }
     }
   
     // Function to cancel ticket
     cancelTicket(pnr, noOfSeats) {
       let booking = this.bookings.find(b => b.pnr === pnr);
       if (booking && booking.status === 'Confirmed') {
         let seatsToCancel = booking.seatNumbers.splice(0, noOfSeats);
         this.clearSeats(seatsToCancel);
         if (this.waitingList.length > 0) {
           this.confirmWaitingListSeats();
         }
         this.logOutput(`Cancelled ${noOfSeats} seat(s) from PNR: ${pnr}`);
       } else {
         this.logOutput('Invalid PNR or ticket is not confirmed.');
       }
     }
   
     // Helper functions
     getAvailableSeats() {
       let availableSeats = [];
       for (let i = 0; i < this.seats.length; i++) {
         if (!this.seats[i]) {
           availableSeats.push(i + 1);
         }
       }
       return availableSeats;
     }
   
     fillSeats(seatNumbers, source, destination) {
       seatNumbers.forEach(seat => {
         this.seats[seat - 1] = { source, destination };
       });
     }
   
     clearSeats(seatNumbers) {
       seatNumbers.forEach(seat => {
         this.seats[seat - 1] = null;
       });
     }
   
     confirmWaitingListSeats() {
       let waiting = this.waitingList.shift(); // Get the first waiting list entry
       let availableSeats = this.getAvailableSeats();
       if (availableSeats.length >= waiting.noOfTickets) {
         let seatNumbers = availableSeats.slice(0, waiting.noOfTickets);
         this.fillSeats(seatNumbers, waiting.source, waiting.destination);
         let booking = this.bookings.find(b => b.pnr === waiting.pnr);
         booking.seatNumbers = seatNumbers;
         booking.status = 'Confirmed';
         this.logOutput(`Waiting list PNR ${waiting.pnr} is now confirmed.`);
       }
     }
   
     // Function to print the seat chart
     printChart() {
       this.logOutput('Booking Summary & Seat Chart:');
       console.table(this.bookings);
       this.logOutput('Seats: ' + JSON.stringify(this.seats));
     }
   
     logOutput(message) {
       let outputElement = document.getElementById("output");
       outputElement.textContent += message + "\n";
     }
   }
   
   // Create an instance of the booking system
   let system = new TrainBookingSystem();
   
   // Start booking process with user input
   function startBooking() {
     let action = prompt("Enter action (book/cancel/chart/exit):").toLowerCase();
   
     while (action !== "exit") {
       if (action === "book") {
         let source = prompt("Enter source station (A/B/C/D/E):").toUpperCase();
         let destination = prompt("Enter destination station (A/B/C/D/E):").toUpperCase();
         let noOfTickets = parseInt(prompt("Enter number of tickets:"));
         system.bookTicket(source, destination, noOfTickets);
       } else if (action === "cancel") {
         let pnr = parseInt(prompt("Enter PNR number:"));
         let noOfSeats = parseInt(prompt("Enter number of seats to cancel:"));
         system.cancelTicket(pnr, noOfSeats);
       } else if (action === "chart") {
         system.printChart();
       } else {
         alert("Invalid action! Try again.");
       }
   
       action = prompt("Enter action (book/cancel/chart/exit):").toLowerCase();
     }
   
     system.logOutput("Booking system exited.");
   }
   
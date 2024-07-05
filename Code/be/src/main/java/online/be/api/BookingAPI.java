package online.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.be.entity.Booking;
import online.be.enums.BookingType;
import online.be.model.Request.BookingRequest;
import online.be.model.Request.FlexibleBookingRequest;
import online.be.model.Response.BookingResponse;
import online.be.model.Response.TimeSlotAvabilityResponse;
import online.be.service.BookingService;
import online.be.service.TimeSlotPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/booking")
@SecurityRequirement(name = "api")
public class BookingAPI {
    @Autowired
    BookingService bookingService;

    @Autowired
    TimeSlotPriceService timeSlotPriceService;

    @PostMapping
    public ResponseEntity<BookingResponse> createFlexibleBooking(@RequestBody FlexibleBookingRequest bookingRequest){
        BookingResponse createdBooking = bookingService.createFlexibleBooking(bookingRequest);
        return ResponseEntity.ok(createdBooking);
    }

//    @GetMapping("/{bookingId}")
//    public ResponseEntity<Booking> getBookingById(@PathVariable long bookingId){
//        Booking Booking = bookingService.getBookingById(bookingId);
//        return ResponseEntity.ok().body(Booking);
//    }
//
//
//    @GetMapping
//    public ResponseEntity<List<Booking>> getAllBookings(){
//        List<Booking> Bookings = bookingService.getAllBookings();
//        return ResponseEntity.ok().body(Bookings);
//    }
//
//    @GetMapping("/availability")
//    public ResponseEntity getAvailableTimeSlots(@RequestParam BookingType bookingType){
//        List<TimeSlotAvabilityResponse> avabilityResponses = timeSlotPriceService.getAvailableTimeSlotForBookingType(bookingType);
//        return ResponseEntity.ok(avabilityResponses);
//    }
}

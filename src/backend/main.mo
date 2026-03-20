import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    age : Nat;
    rating : Nat;
    review : Text;
    transformation : Text;
  };

  module Testimonial {
    public func compareByRating(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Nat.compare(t1.rating, t2.rating);
    };
  };

  // Maps
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let testimonials = Map.empty<Nat, Testimonial>();

  var nextContactId = 0;
  var nextTestimonialId = 0;

  // Seed Testimonials
  public shared ({ caller }) func init() : async () {
    let sampleTestimonials : [Testimonial] = [
      {
        id = 0;
        name = "Alice";
        age = 30;
        rating = 5;
        review = "Great program!";
        transformation = "Lost 20lbs";
      },
      {
        id = 1;
        name = "Bob";
        age = 25;
        rating = 4;
        review = "Highly recommended";
        transformation = "Gained muscle";
      },
    ];

    for (t in sampleTestimonials.values()) {
      testimonials.add(t.id, t);
    };
    nextTestimonialId := sampleTestimonials.size();
  };

  // Query all testimonials by rating
  public query ({ caller }) func getAllTestimonialsByRating() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareByRating);
  };

  public query ({ caller }) func getTestimonial(id : Nat) : async Testimonial {
    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("No testimonial with Id " # id.toText()) };
      case (?testimonial) { testimonial };
    };
  };
};

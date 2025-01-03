"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { useParams } from "next/navigation";
// import JoinQueue from "@/components/JoinQueue";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useStorageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import EventCard from "@/components/event-card";
import JoinQueue from "@/components/join-queue";

export default function EventPage() {
  const { user } = useUser();
  const params = useParams();
  const event = useQuery(api.events.getEventById, {
    eventId: params.eventId as Id<"events">,
  });
  const availability = useQuery(api.events.getEventAvailability, {
    eventId: params.eventId as Id<"events">,
  });
  const imageUrl = useStorageUrl(event?.imageStorageId);

  if (!event || !availability) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader message="Loading event details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {imageUrl && (
            <div className="aspect-[21/9] relative w-full">
              <Image
                src={imageUrl}
                alt={event.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Event Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {event.name}
                  </h1>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <CalendarDays className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-sm font-medium">Date</span>
                    </div>
                    <p className="text-gray-900 font-bold">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-gray-900 font-bold">{event.location}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Ticket className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <p className="text-gray-900 font-bold">
                      ${event.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Users className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="text-sm font-medium">Availability</span>
                    </div>
                    <p className="text-gray-900 font-bold">
                      {availability.totalTickets -
                        availability.purchasedTickets}{" "}
                      / {availability.totalTickets} left
                    </p>
                  </div>
                </div>

                {/* Additional Event Information */}
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    Event Information
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Please arrive 30 minutes before the event starts</li>
                    <li>• Tickets are non-refundable</li>
                    <li>• Age restriction: 18+</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Ticket Purchase Card */}
              <div>
                <div className="sticky top-8 space-y-4">
                  <EventCard eventId={params.eventId as Id<"events">} />

                  {user ? (
                    <JoinQueue
                      eventId={params.eventId as Id<"events">}
                      userId={user.id}
                    />
                  ) : (
                    <SignInButton>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Sign in to buy tickets
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

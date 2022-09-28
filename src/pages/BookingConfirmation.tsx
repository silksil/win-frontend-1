import React from 'react';
import { BookingDetails } from 'src/containers/booking-confirmation/BookingDetails';
import { BookingRewards } from 'src/containers/booking-confirmation/BookingRewards';
import MainLayout from 'src/layouts/main';

export const BookingConfirmation = () => {
  return (
    <MainLayout maxWidth="md">
      <BookingDetails />
      <BookingRewards />
    </MainLayout>
  );
};

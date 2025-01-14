import type { RoomTypes } from '@windingtree/glider-types/dist/win';
import type { OfferRecord } from 'src/store/types';
import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RoomInformation } from '../RoomInformation';

export interface FacilityGalleryProps {
  offer: OfferRecord;
  room: RoomTypes;
}

export const RoomCardGroup: React.FC<{
  room: RoomTypes;
  offer: OfferRecord;
  index: number;
}> = ({ offer, room, index }) => {
  const { register } = useFormContext();
  const price = `${offer.price.currency} ${Number(offer.price.public).toFixed(2)}`;

  return (
    <Box mb={5}>
      <Divider />
      <Box py={5}>
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <RoomInformation room={room} />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={1} alignItems="flex-end" sx={{ textAlign: 'end' }}>
              <Typography>Select rooms</Typography>
              <TextField
                sx={{ width: 80 }}
                {...register(`offers.${index}.quantity`)}
                size="small"
                type="number"
                InputProps={{
                  type: 'number',
                  inputMode: 'numeric',
                  inputProps: {
                    min: 0
                  }
                }}
              />
              <Typography variant="body2">{`${price} per night`}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

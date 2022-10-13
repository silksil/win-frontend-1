import { CSSProperties, forwardRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Card, useTheme, useMediaQuery } from '@mui/material';
import Iconify from './Iconify';
import { AccommodationWithId } from '../hooks/useAccommodationsAndOffers/helpers';
import { ImageCarousel } from './ImageCarousel';
import { buildAccommodationAddress } from '../utils/accommodation';
import {
  EventInfo,
  useAccommodationsAndOffers
} from '../hooks/useAccommodationsAndOffers';
import { currencySymbolMap } from '../utils/currencies';

export interface SearchCardProps {
  facility: AccommodationWithId;
  isSelected?: boolean;
  numberOfDays: number;
  mapCard?: boolean;
  focusedEvent?: EventInfo[];
}

export const SearchCard = forwardRef<HTMLDivElement, SearchCardProps>(
  ({ mapCard, facility, focusedEvent }, ref) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { isGroupMode } = useAccommodationsAndOffers();
    const medium = useMediaQuery(theme.breakpoints.down('md'));

    const responsiveStyle: CSSProperties =
      medium || mapCard
        ? {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }
        : {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          };

    const smallCardStyle: CSSProperties = mapCard
      ? {
          minWidth: '360px',
          marginBottom: '0px',
          minHeight: '128px',
          maxWidth: '100vw'
        }
      : {
          marginBottom: '8px'
        };

    const prices = useMemo(
      () => facility.offers.map((o) => Number(o.price.public)),
      [facility]
    );

    if (facility.offers.length < 1) {
      return null;
    }

    return (
      <Card ref={ref} style={{ ...smallCardStyle }}>
        <Stack sx={{ ...responsiveStyle }}>
          <Stack
            minWidth={theme.spacing(mapCard || medium ? 16 : 36)}
            minHeight={theme.spacing(mapCard || medium ? 16 : 24)}
            width={theme.spacing(mapCard || medium ? 16 : 36)}
            height={theme.spacing(mapCard || medium ? 16 : 24)}
          >
            <ImageCarousel
              size={mapCard || medium ? 'small' : 'large'}
              media={facility.media}
            />
          </Stack>
          <Stack
            // fill={true}
            onClick={() => navigate(`/facility/${facility.id}`)}
            justifyContent="space-between"
            width="100%"
            // minWidth={theme.spacing(27)}
            spacing={0.5}
            sx={{ p: 1, mt: 0, cursor: 'pointer' }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Typography
                maxWidth={theme.spacing(20)}
                noWrap
                overflow={'hidden'}
                variant="subtitle1"
              >
                {facility.name}
              </Typography>
              <Stack sx={{ color: 'text.secondary' }} direction="row" alignItems="center">
                <Iconify mr={0.5} icon={'clarity:star-solid'} width={12} height={12} />
                <Typography variant="caption">{facility.rating}</Typography>
              </Stack>
            </Stack>

            {!mapCard && (
              <Stack direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                <Typography variant="caption" maxWidth={theme.spacing(25)}>
                  {buildAccommodationAddress(facility)}
                </Typography>
              </Stack>
            )}

            {focusedEvent?.length ? (
              <Stack
                direction="row"
                alignItems="center"
                sx={{ color: 'text.secondary', marginTop: '-8px' }}
              >
                <Typography variant="caption">
                  {`Approx.  ${Math.ceil(
                    focusedEvent[0].durationInMinutes
                  )}min walking distance, ${focusedEvent[0].distance.toFixed(1)}km from ${
                    focusedEvent[0].eventName
                  } `}
                </Typography>
              </Stack>
            ) : null}

            <Stack
              direction={medium || mapCard ? 'row-reverse' : 'row'}
              alignItems="end"
              justifyContent={'space-between'}
            >
              <Stack
                direction={medium || mapCard ? 'column' : 'row'}
                alignItems={medium || mapCard ? 'end' : 'center'}
                justifyContent="space-between"
                spacing={mapCard ? 0 : 0.5}
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    textAlign="center"
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    From
                  </Typography>
                  <Typography variant="subtitle2">
                    {facility.lowestPrice &&
                      currencySymbolMap[facility.lowestPrice.currency]}
                    {facility.lowestPrice && facility.lowestPrice.price.toFixed(2)}/night
                  </Typography>
                </Stack>

                {!(medium || mapCard) && !isGroupMode && <Typography>|</Typography>}
                {!mapCard && !isGroupMode && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      alignItems="center"
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {facility.lowestPrice &&
                        currencySymbolMap[facility.lowestPrice.currency]}
                      {Math.min(...prices).toFixed(2)} total
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {!mapCard && (
                <Iconify icon="eva:info-outline" mb={0.5} width={16} height={16} />
              )}
            </Stack>
            {isGroupMode && <Typography variant="subtitle2">Select Rooms</Typography>}
          </Stack>
        </Stack>
      </Card>
    );
  }
);

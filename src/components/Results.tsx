import { Box } from 'grommet';
import { createRef, useCallback, useEffect, useMemo } from 'react';
import { useAccommodationsAndOffers } from 'src/hooks/useAccommodationsAndOffers.tsx';
import { useWindowsDimension } from '../hooks/useWindowsDimension';
import { MessageBox } from './MessageBox';
import { SearchResult } from './SearchResult';
import { useAppState, useAppDispatch } from '../store';

export const Results: React.FC = () => {
  const { accommodations, error, isFetching } = useAccommodationsAndOffers();
  const { winWidth } = useWindowsDimension();
  const { selectedFacilityId } = useAppState();
  const dispatch = useAppDispatch();

  const handleFacilitySelection = useCallback(
    (facilityId: string) => {
      dispatch({
        type: 'SET_SELECTED_FACILITY_ID',
        payload: facilityId
      });
    },
    [dispatch]
  );

  const searchResultsRefs = useMemo(
    () =>
      accommodations?.reduce((refs, facility) => {
        const ref = createRef<HTMLDivElement>();
        return { ...refs, [facility.id]: ref };
      }, {}),
    [accommodations]
  );

  // scroll to searchResult
  useEffect(() => {
    searchResultsRefs &&
      selectedFacilityId &&
      searchResultsRefs[selectedFacilityId]?.current?.scrollIntoView();
  }, [selectedFacilityId, searchResultsRefs]);

  if (!accommodations || accommodations.length === 0) {
    return null;
  }

  return (
    <Box
      pad="medium"
      fill={true}
      overflow="hidden"
      style={{
        position: 'absolute',
        zIndex: '1',
        width: winWidth < 900 ? '100%' : '20rem',
        maxWidth: '100%',
        height: winWidth < 900 ? '40%' : '86%',
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }}
    >
      <Box flex={true} overflow="auto">
        <Box>
          <MessageBox
            loading
            type="info"
            show={!isFetching && !error && accommodations?.length === 0}
          >
            Could not find place
          </MessageBox>
        </Box>
        <Box gap="0.5rem" flex={false}>
          {/* TODO: Currenlty we are displaying all accomdations, but this may need to be changed to only the accommodations with offers */}
          {accommodations.map((facility, idx) => (
            <SearchResult
              key={facility.id}
              facility={facility}
              isSelected={facility.id === selectedFacilityId}
              onSelect={handleFacilitySelection}
              ref={searchResultsRefs[idx]}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

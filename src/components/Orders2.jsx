import * as React from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

const Orders_better = () => {
  const [offers, setOffers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the cookie from session storage
        const cookie = sessionStorage.getItem('session');

        // Check if cookie exists before making the request
        if (!cookie) {
          //console.error('Cookie not found in session storage');
          console.log('Cookie not found in session storage');
          //return;
        }

        // Make the request to the API endpoint with the cookie
        const response = await axios.get(`/api/getMessages/davide`);
        setOffers(response.data.offers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Clean-up function to cancel any ongoing requests (if necessary)
    return () => {
      // You can perform cleanup here if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <React.Fragment>
      <Title>Available Offers</Title>
      <Stack spacing={2}>
        {offers === null ? (
          <Paper>
            <Typography>No offers available for you</Typography>
          </Paper>
        ) : (
          offers.map((offer, index) => (
             <Paper
              key={index}
              sx={{
                borderRadius: 8,
                width: '100%', // Make the card wider
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  backgroundColor: 'lightblue' // Add shadow on hover
                },
              }}
            >
              <Typography variant="h6">Offer Token: {offer.offer_token}</Typography>
              <Typography>Departure Location: {offer.departure_location}</Typography>
              <Typography>Departure Time: {offer.departure_time}</Typography>
              <Typography>Arrival Location: {offer.arrival_location}</Typography>
              <Typography>Offer Price: {offer.offer_price}</Typography>
              <Typography>Is Valid: {offer.is_valid ? 'Yes' : 'No'}</Typography>
            </Paper>
          ))
        )}
      </Stack>
    </React.Fragment>
  );
};

export default Orders_better;

import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

const YourComponent = () => {
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
      <Title>Recent Orders</Title>
      {offers === null ? (
        <p>No offers available for you</p>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Offer Token</TableCell>
              <TableCell>Departure Location</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Location</TableCell>
              <TableCell>Offer Price</TableCell>
              <TableCell>Is Valid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => (
              <TableRow key={index}>
                <TableCell>{offer.offer_token}</TableCell>
                <TableCell>{offer.departure_location}</TableCell>
                <TableCell>{offer.departure_time}</TableCell>
                <TableCell>{offer.arrival_location}</TableCell>
                <TableCell>{offer.offer_price}</TableCell>
                <TableCell>{offer.is_valid ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default YourComponent;

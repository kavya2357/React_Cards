import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, TextField, Grid } from '@mui/material';
import "./App.css"

function App() {
  const [beers, setBeers] = useState([]);
  const [Query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data));
  }, []);

  const handleSearch = event => {
    setQuery(event.target.value);
  };

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(Query.toLowerCase())
  );

  return (
    <div>
      <TextField
        id="search"
        label="Search for a beer..."
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
        style={{borderColor:"black", marginLeft:'50px', width:'600px'}}
      />

      <Grid container spacing={2} style={{marginTop:'10px'}}>
        {filteredBeers.map(beer => (
          <Grid item xs={12} sm={6} md={4} key={beer.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={beer.image_url || 'placeholder-image-url'}
                alt={beer.name}
                className="cardImage"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {beer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {beer.tagline}
                </Typography>
                {/* <Typography variant="body4" color="text.secondary">
                  {beer.description}
                </Typography> */}
                <Typography variant="body1">
                  ABV: {beer.abv}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;

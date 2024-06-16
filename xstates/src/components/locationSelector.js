import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        // Fetch countries on initial render
        axios.get('https://crio-location-selector.onrender.com/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Fetch states when a country is selected
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => {
                    setStates(response.data);
                    setCities([]); // Clear cities when country changes
                })
                .catch(error => {
                    console.error("Error fetching states:", error);
                });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            // Fetch cities when a state is selected
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => {
                    setCities(response.data);
                })
                .catch(error => {
                    console.error("Error fetching cities:", error);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState]);

    return (
        <div>
            <h1 style={{display:"flex", justifyContent:"center"}}>Select Location</h1>
            <div style={{display:"flex",justifyContent:"center",}}>
            <div style={{marginRight:"20px"}}>
                <label>Select Country:</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="" disabled>Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div >
                <label>Select State:</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
                    <option value="" disabled>Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div style={{marginLeft:"20px"}}>
                <label>Select City:</label>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            </div>
            
            {selectedCity && selectedState && selectedCountry && (
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h2>You Selected {selectedCity}, {selectedState}, {selectedCountry}</h2>
                </div>
            )}
        </div>
    );
};

export default LocationSelector;

// src/utils.js

// Function to get a random place from the places array
export const getRandomPlace = (places) => {
  if (!places || places.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * places.length);
  return places[randomIndex];
};

// Function to find a place by ID
export const findPlaceById = (places, id) => {
  return places.find(place => place.id === id) || null;
};

// Function to find an exploration by ID
export const findExplorationById = (explorations, id) => {
  return explorations.find(exp => exp.id === id) || null;
};

// Function to find an exhibit by ID
export const findExhibitById = (exhibits, id) => {
    return exhibits.find(ex => ex.id === id) || null;
};

// Function to get places for a specific exhibit
export const getPlacesForExhibit = (exhibit, allPlaces) => {
    if (!exhibit || !exhibit.places || !allPlaces) return [];
    return exhibit.places.map(placeId => findPlaceById(allPlaces, placeId)).filter(Boolean);
};

// Function to get places for a specific exploration
export const getPlacesForExploration = (exploration, allPlaces) => {
    if (!exploration || !exploration.stops || !allPlaces) return [];
    // Sort stops by their 'order' property
    const sortedStops = exploration.stops.sort((a, b) => a.order - b.order);
    return sortedStops.map(stop => findPlaceById(allPlaces, stop.placeId)).filter(Boolean);
};

// Function to get the current stop index in an exploration
export const getCurrentStopIndex = (exploration, currentPlaceId) => {
    if (!exploration || !exploration.stops) return -1;
    const stopIndex = exploration.stops.findIndex(stop => stop.placeId === currentPlaceId);
    return stopIndex !== -1 ? stopIndex : -1;
};
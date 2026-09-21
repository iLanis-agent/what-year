/* what-year engine: event bank + scoring + round picking (pure, node-testable) */
var EVENTS = [
  {y:1440, t:'Gutenberg sets up his movable-type printing press in Mainz', c:'invention'},
  {y:1492, t:'Columbus reaches the Americas', c:'exploration'},
  {y:1517, t:'Martin Luther nails his 95 theses to the church door', c:'history'},
  {y:1609, t:'Galileo turns a telescope to the night sky', c:'science'},
  {y:1687, t:'Newton publishes the Principia', c:'science'},
  {y:1776, t:'The US Declaration of Independence is signed', c:'history'},
  {y:1789, t:'The French Revolution begins', c:'history'},
  {y:1804, t:'The first steam locomotive runs on rails in Wales', c:'invention'},
  {y:1859, t:'Darwin publishes On the Origin of Species', c:'science'},
  {y:1869, t:'The Suez Canal opens', c:'engineering'},
  {y:1876, t:'Bell patents the telephone', c:'invention'},
  {y:1879, t:'Edison demonstrates a practical light bulb', c:'invention'},
  {y:1886, t:'Benz patents the first true automobile', c:'invention'},
  {y:1903, t:'The Wright brothers fly at Kitty Hawk', c:'invention'},
  {y:1905, t:'Einstein publishes his special theory of relativity', c:'science'},
  {y:1912, t:'The Titanic sinks on its maiden voyage', c:'history'},
  {y:1914, t:'World War I begins', c:'history'},
  {y:1927, t:'The Jazz Singer brings synchronized sound to film', c:'culture'},
  {y:1928, t:'Fleming discovers penicillin', c:'science'},
  {y:1939, t:'World War II begins', c:'history'},
  {y:1945, t:'World War II ends', c:'history'},
  {y:1947, t:'The transistor is demonstrated at Bell Labs', c:'invention'},
  {y:1953, t:'Watson and Crick publish the structure of DNA', c:'science'},
  {y:1955, t:'Rosa Parks refuses to give up her bus seat', c:'history'},
  {y:1957, t:'Sputnik 1 becomes the first artificial satellite', c:'space'},
  {y:1960, t:'The first laser is built', c:'science'},
  {y:1963, t:'Martin Luther King Jr. delivers "I Have a Dream"', c:'history'},
  {y:1964, t:'The Beatles play The Ed Sullivan Show', c:'culture'},
  {y:1967, t:'The first successful human heart transplant', c:'science'},
  {y:1969, t:'Apollo 11 lands humans on the Moon', c:'space'},
  {y:1969, t:'ARPANET, the ancestor of the internet, goes live', c:'tech'},
  {y:1971, t:'The first email is sent between networked computers', c:'tech'},
  {y:1973, t:'The first mobile phone call is made', c:'tech'},
  {y:1977, t:'Star Wars premieres in theaters', c:'culture'},
  {y:1980, t:'Pac-Man debuts in arcades', c:'culture'},
  {y:1981, t:'IBM launches the personal computer', c:'tech'},
  {y:1983, t:'Motorola sells the first handheld mobile phone', c:'tech'},
  {y:1986, t:'The Chernobyl nuclear disaster', c:'history'},
  {y:1986, t:'Space Shuttle Challenger breaks apart after launch', c:'space'},
  {y:1989, t:'The Berlin Wall falls', c:'history'},
  {y:1989, t:'Tim Berners-Lee proposes the World Wide Web', c:'tech'},
  {y:1990, t:'The Hubble Space Telescope launches', c:'space'},
  {y:1991, t:'The Soviet Union dissolves', c:'history'},
  {y:1994, t:'The first PlayStation launches in Japan', c:'culture'},
  {y:1997, t:'Deep Blue beats Kasparov at chess', c:'tech'},
  {y:1998, t:'Google is founded', c:'tech'},
  {y:2001, t:'Wikipedia launches', c:'tech'},
  {y:2003, t:'The Human Genome Project is declared complete', c:'science'},
  {y:2004, t:'Facebook launches from a Harvard dorm', c:'tech'},
  {y:2005, t:'The first video is uploaded to YouTube', c:'tech'},
  {y:2007, t:'Apple introduces the iPhone', c:'tech'},
  {y:2008, t:'The Bitcoin whitepaper is published', c:'tech'},
  {y:2010, t:'Instagram launches', c:'tech'},
  {y:2012, t:'The Higgs boson is confirmed at CERN', c:'science'},
  {y:2012, t:'Curiosity rover lands on Mars', c:'space'},
  {y:2015, t:'Gravitational waves are detected for the first time', c:'science'},
  {y:2016, t:'AlphaGo beats Lee Sedol at Go', c:'tech'},
  {y:2019, t:'The first image of a black hole is released', c:'science'},
  {y:2020, t:'COVID-19 is declared a pandemic', c:'history'},
  {y:2021, t:'The James Webb Space Telescope launches', c:'space'},
  {y:2022, t:'ChatGPT launches and goes viral', c:'tech'}
];
function scoreGuess(actual, guess){
  var d = Math.abs(actual-guess);
  var pts = Math.max(0, 100-d);
  if (d===0) pts += 25;
  return pts;
}
function pickRound(events, n, rng){
  rng = rng || Math.random;
  var idx = events.map(function(_,i){return i;});
  for (var i=idx.length-1;i>0;i--){
    var j = Math.floor(rng()*(i+1));
    var t=idx[i]; idx[i]=idx[j]; idx[j]=t;
  }
  return idx.slice(0,n);
}
function grade(total, rounds){
  var avg = total/rounds;
  if (avg>=95) return 'Time traveler';
  if (avg>=80) return 'Historian';
  if (avg>=60) return 'Solid memory';
  if (avg>=40) return 'Ballpark guesser';
  return 'Lost in time';
}
if (typeof module !== 'undefined' && module.exports){
  module.exports = { EVENTS:EVENTS, scoreGuess:scoreGuess, pickRound:pickRound, grade:grade };
}

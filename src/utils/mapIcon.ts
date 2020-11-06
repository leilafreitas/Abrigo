import L from 'leaflet';
import '../styles/pages/newshelter.css';
import SvgIcon from '@material-ui/core/SvgIcon';


import mapMarkerImg from '../images/marker.svg';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})
export default happyMapIcon;
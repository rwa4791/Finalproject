import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#9b65bb",
    primary2Color: "#744193",
    primary3Color: "#bd9ad2",
    accent1Color: "#85bb65",
    accent2Color: "#afd29a",
    accent3Color: "#5f9341",
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};

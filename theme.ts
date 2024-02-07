
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  interface PalettePrimaryOverrides {
    1000: true;
    1222: true;
  }
}


const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "1000": "#fff"
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "1222": "#000"
        }
      }
    }
  }
})

export default theme;
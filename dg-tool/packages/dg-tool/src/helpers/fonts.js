const WEBFONTAPI = "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
export const FontsList = [
  {
    name: "Source Sans Pro",
    face: "Source Sans Pro",
    style: {
      fontFamily: "Source Sans Pro",
      fontWeight: 900,
    }
  },
  {
    name: "Quattrocento Sans",
    face: "Quattrocento Sans",
    style: {
      fontFamily: "Quattrocento Sans",
      fontWeight: 700
    }
  },
  {
    name: "Ubuntu",
    face: "Ubuntu",
    style: {
      fontFamily: "Ubuntu",
      fontWeight: 700
    }
  },
  {
    name: "Arizonia",
    face: "Arizonia",
    style: {
      fontFamily: "Arizonia",
      fontWeight: 400
    }
  },
  {
    name: "Lora",
    face: "Lora",
    style: {
      fontFamily: "Lora",
      fontWeight: 700
    }
  },
  {
    name: "Sansita One",
    face: "Sansita One",
    style: {
      fontFamily: "Sansita One",
      fontWeight: 400
    }
  },
  {
    name: "Armata",
    face: "Armata",
    style: {
      fontFamily: "Armata",
      fontWeight: 400
    }
  },
  {
    name: "Black Ops One",
    face: "Black Ops One",
    style: {
      fontFamily: "Black Ops One",
      fontWeight: 400
    }
  },
  {
    name: "Russo One",
    face: "Russo One",
    style: {
      fontFamily: "Russo One",
      fontWeight: 400
    }
  },
  {
    name: "Righteous",
    face: "Righteous",
    style: {
      fontFamily: "Righteous",
      fontWeight: 400
    }
  },
  {
    name: "Basic",
    face: "Basic",
    style: {
      fontFamily: "Basic",
      fontWeight: 400
    }
  },
  {
    name: "Courgette",
    face: "Courgette",
    style: {
      fontFamily: "Courgette",
      fontWeight: 400
    }
  },
  {
    name: "Satisfy",
    face: "Satisfy",
    style: {
      fontFamily: "Satisfy",
      fontWeight: 400
    }
  },
  {
    name: "Vidaloka",
    face: "Vidaloka",
    style: {
      fontFamily: "Vidaloka",
      fontWeight: 400
    }
  },
  {
    name: "Permanent Marker",
    face: "Permanent Marker",
    style: {
      fontFamily: "Permanent Marker",
      fontWeight: 400
    }
  },
  {
    name: "Piedra",
    face: "Piedra",
    style: {
      fontFamily: "Piedra",
      fontWeight: 400
    }
  },
  {
    name: "Cinzel",
    face: "Cinzel",
    style: {
      fontFamily: "Cinzel",
      fontWeight: 700
    }
  },
  {
    name: "Alegreya",
    face: "Alegreya",
    style: {
      fontFamily: "Alegreya",
      fontWeight: 400
    }
  },
  {
    name: "Ruda",
    face: "Ruda",
    style: {
      fontFamily: "Ruda",
      fontWeight: 700
    }
  }
];

export const loadFonts = () => {
  if (window.fontsLoaded) return;
  const WebFontConfig = {
    google: {
      families: []
    }
  };
  FontsList.forEach(font => {
    WebFontConfig.google.families.push(font.face);

    const wf = document.createElement("script");
    if (document.location.protocol === "https:") {
      wf.src = `https:${WEBFONTAPI}`;
    } else {
      wf.src = `http:${WEBFONTAPI}`;
    }
    wf.type = "text/javascript";
    wf.async = "true";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(wf, s);
  });
  window.fontsLoaded = true;
};

const WEBFONTAPI = "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
export const FontsList = [
  {
    name: "Source Sans Pro",
    face: "Source+Sans+Pro:900italic",
    style: {
      fontFamily: "Source Sans Pro",
      fontWeight: 900,
      fontStyle: "italic"
    }
  },
  {
    name: "Quattrocento Sans",
    face: "Quattrocento+Sans",
    style: {
      fontFamily: "Quattrocento Sans"
    }
  },
  {
    name: "Ubuntu",
    face: "Ubuntu:700",
    style: {
      fontFamily: "Ubuntu"
    }
  },
  {
    name: "Arizonia",
    face: "Arizonia",
    style: {
      fontFamily: "Arizonia"
    }
  },
  {
    name: "Lora",
    face: "Lora:700",
    style: {
      fontFamily: "Lora",
      fontWeight: 700
    }
  },
  {
    name: "Sansita One",
    face: "Sansita+One",
    style: {
      fontFamily: "Sansita One"
    }
  },
  {
    name: "Armata",
    face: "Armata",
    style: {
      fontFamily: "Armata"
    }
  },
  {
    name: "Black Ops One",
    face: "Black+Ops+One",
    style: {
      fontFamily: "Black Ops One"
    }
  },
  {
    name: "Russo One",
    face: "Russo+One",
    style: {
      fontFamily: "Russo One"
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

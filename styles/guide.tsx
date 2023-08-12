export const styleGuide = {
  corner: {
    lg: {
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    sm: {
      borderRadius: 12,
    },
    smAlt: {
      borderBottomLeftRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
  },
  color: {
    white: "#fff",
    black: "#1A1A1A",
    active: "#A8FF76",
    error: "#FF445A",
    plum: {
      "700": "#390273",
      "500": "#5603ad",
      "300": "#993afc",
      "100": "#c692fd",
    },
    blue: {
      "500": "#5603ad",
      "300": "#b6defd",
      "100": "#f0f8ff",
    },
    gray: {
      "500": "#9fa2b2",
      "300": "#bfc1cc",
      "100": "#d9dae0",
    },
  },
  text: {
    heading: {
      "1": {
        fontFamily: "PoppinsBold",
        fontSize: 32,
      },
      "2": {
        fontFamily: "PoppinsBold",
        fontSize: 28,
      },
      "3": {
        fontFamily: "PoppinsMedium",
        fontSize: 15,
      },
      "4": {
        fontFamily: "PoppinsBold",
        fontSize: 15,
      },
    },
    button: {
      fontFamily: "PoppinsRegular",
      fontSize: 16,
      letterSpacing: 1,
    },
    label: {
      fontFamily: "PoppinsRegular",
      fontSize: 15,
      letterSpacing: 1,
    },
    title: {
      fontFamily: "PoppinsRegular",
      fontSize: 15,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "SFCompact",
      fontSize: 13,
      lineHeight: 20,
    },
    body: {
      fontFamily: "SFCompact",
      fontSize: 14,
    },
    special: {
      fontFamily: "SF Compact Text, sans-serif",
      fontSize: 12,
      lineHeight: 16,
    },
  },
};

export const topBarStyle = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  paddingTop: 61,
  paddingBottom: 24,
  paddingHorizontal: 20,
  backgroundColor: styleGuide.color.blue["300"],
  ...styleGuide.corner.lg,
};

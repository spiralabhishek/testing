import plugin from "tailwindcss/plugin";

export default plugin(({ addComponents, theme }) =>
  addComponents({
    ".dashboard_header": {
      padding: "0px 37px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "77px",
      background: theme("colors.primary-blue"),
      borderRadius: "15px",
    },
    ".dashboard_label": {
      width: "73px",
      height: "43.5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme("colors.white"),
      borderRadius: "15px",
    },
    ".dashboard_infoBox": {
      width: "218px",
      height: "144px",
      borderRadius: "25px",
      direction: "rtl",
    },
    ".dashboard_entry": {
      color: "black",
      backgroundColor: "#fafafa",
      width: "100%",
      height: "47px",
      borderRadius: "15px",
      padding: "0 2rem",
    },
    ".dashboard_entry ul": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      direction: "rtl",
      gap: "0 40px",
      fontWeight: 'lighter'
    },
    ".dashboard_entry ul li": {
      fontSize: "13px",
    },
    ".professional_dashboard_entry": {
      color: "black",
      backgroundColor: "#fafafa",
      width: "100%",
      // height: "47px",
      borderRadius: "15px",
      padding: "0 2rem",
    },
    ".professional_dashboard_entry ul": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      direction: "rtl",
      gap: "0 40px",
      fontWeight: 'lighter'
    },
    ".professional_dashboard_entry ul li": {
      fontSize: "13px",
    },
  })
);

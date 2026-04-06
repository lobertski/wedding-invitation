import { useState, useEffect, useCallback } from "react";
import heroVideo from "./assets/heroVideo.mov";
import couple1 from "./assets/couple/20250329_095610.jpg";
import couple2 from "./assets/couple/20250329_095616.jpg";
import couple3 from "./assets/couple/20250329_095852.jpg";
import couple4 from "./assets/couple/20250329_141957(0).jpg";
import couple5 from "./assets/couple/20250329_142015.jpg";

const GALLERY_PHOTOS = [couple1, couple2, couple3, couple4, couple5];
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PlaceIcon from "@mui/icons-material/Place";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./App.css";

const tropicalTheme = createTheme({
  palette: {
    primary: { main: "#2C553D", contrastText: "#fff" },
    secondary: { main: "#E76F51", contrastText: "#fff" },
    background: { default: "#FFF8F0" },
  },
  typography: {
    fontFamily: '"Lato", "Roboto", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 30, textTransform: "none" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5C9E7B",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2C553D",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2C553D",
          },
        },
      },
    },
  },
});

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Our Story", id: "our-story" },
  { label: "Details", id: "details" },
  { label: "Dress Code", id: "dress-code" },
  { label: "Stay", id: "stay" },
  { label: "Gallery", id: "gallery" },
  { label: "RSVP", id: "rsvp" },
];

const STAY_PLACES = [
  {
    icon: "🏖️",
    name: "Kota Beach Resort",
    location: "Santa Fe, Bantayan Island",
    desc: "A popular beachfront resort with crystal-clear waters and a relaxed tropical atmosphere — a short drive from the reception venue.",
  },
  {
    icon: "🌊",
    name: "Ogtong Cave Resort",
    location: "Santa Fe, Bantayan Island",
    desc: "Features a natural cave pool and scenic beachfront cottages. A unique island experience with beautiful surroundings.",
  },
  {
    icon: "🌅",
    name: "Sugar Beach Resort",
    location: "Santa Fe, Bantayan Island",
    desc: "Tucked on a pristine stretch of white sand, Sugar Beach offers a peaceful tropical retreat close to the venues.",
  },
  {
    icon: "🌺",
    name: "Santa Fe Beach Club",
    location: "Santa Fe, Bantayan Island",
    desc: "Beachfront villas and rooms with stunning ocean views. Walking distance from the reception at Sorana Island Villas.",
  },
  {
    icon: "🌴",
    name: "Bantayan Island Nature Park and Resort",
    location: "Bantayan, Cebu",
    desc: "Closest to the ceremony venue in Bantayan town. Spacious grounds with a relaxing tropical setting.",
  },
  {
    icon: "🐚",
    name: "Yolanda Beach Resort",
    location: "Bantayan Island, Cebu",
    desc: "A cozy resort with comfortable rooms and direct beach access. Great value for island accommodation.",
  },
];

const SLIPPER_SIZES_WOMEN = ["35", "36", "37", "38", "39", "40", "41"];
const SLIPPER_SIZES_MEN = ["38", "39", "40", "41", "42", "43", "44", "45"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    slipperSize: "",
    attendance: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = new Date("2026-09-26T10:00:00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveSlide((index + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => goTo(activeSlide + 1), 4000);
    return () => clearInterval(id);
  }, [activeSlide, goTo]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addToCalendar = () => {
    // Download an .ics file — works with Google Calendar, Apple Calendar, Outlook
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Christian & Vanessa Wedding//EN',
      'BEGIN:VEVENT',
      'UID:christian-vanessa-wedding-2026@bantayan',
      'DTSTART:20260926T020000Z',
      'DTEND:20260926T140000Z',
      'SUMMARY:Christian & Vanessa\'s Wedding',
      'DESCRIPTION:⛪ Ceremony: St. Peter the Apostle Parish\\, Bantayan\\, Cebu — 10:00 AM\\n🥂 Reception: Sorana Island Villas\\, Santa Fe\\, Bantayan Island\\, Cebu — 12:00 PM',
      'LOCATION:St. Peter the Apostle Parish\\, Bantayan\\, Cebu\\, Philippines',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'christian-vanessa-wedding.ics'
    a.click()
    URL.revokeObjectURL(url)

    // Also open Google Calendar as a fallback
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: "Christian & Vanessa's Wedding",
      dates: '20260926T020000Z/20260926T140000Z',
      details: '⛪ Ceremony: St. Peter the Apostle Parish, Bantayan, Cebu — 10:00 AM\n🥂 Reception: Sorana Island Villas, Santa Fe, Bantayan Island, Cebu — 12:00 PM',
      location: 'St. Peter the Apostle Parish, Bantayan, Cebu, Philippines',
    })
    window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      // await emailjs.send(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   {
      //     to_name: form.fullName,
      //     to_email: form.email,
      //     contact_number: form.contactNumber,
      //     slipper_size: form.slipperSize || "Not specified",
      //     attendance: form.attendance,
      //   },
      //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      // );
      setSubmitted(true);
      if (form.attendance === 'yes') addToCalendar();
    } catch {
      setSendError(
        "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <ThemeProvider theme={tropicalTheme}>
      <CssBaseline />

      {/* ── NAVBAR ─────────────────────────────────── */}
      <AppBar
        position="fixed"
        className={scrolled ? "navbar-solid" : "navbar-transparent"}
        elevation={0}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Typography
            sx={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "2rem",
              color: "#fff",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => scrollTo("home")}
          >
            C & V
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {NAV_LINKS.map(({ label, id }) => (
              <Button
                key={id}
                className="nav-link-btn"
                onClick={() => scrollTo(id)}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { md: "none" }, color: "#fff" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 240, pt: 2, background: "#1a3d2b", height: "100%" }}>
          <Typography
            sx={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "2rem",
              color: "#fff",
              textAlign: "center",
              mb: 2,
            }}
          >
            C & V
          </Typography>
          <List>
            {NAV_LINKS.map(({ label, id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  onClick={() => scrollTo(id)}
                  sx={{ "&:hover": { background: "rgba(255,255,255,0.1)" } }}
                >
                  <ListItemText
                    primary={label}
                    slotProps={{
                      primary: {
                        sx: {
                          color: "#fff",
                          letterSpacing: 1.5,
                          fontSize: "0.85rem",
                          textTransform: "uppercase",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ── HERO ───────────────────────────────────── */}
      <Box id="home" className="hero-section">
        {/* Full-cover background video */}
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlay so text stays readable */}
        <Box className="hero-overlay" />

        <Box className="hero-content">
          <Typography
            sx={{
              fontFamily: "'Lato',sans-serif",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: 8,
              textTransform: "uppercase",
              fontSize: "0.95rem",
              fontWeight: 300,
              mb: 1.5,
            }}
          >
            Together Forever
          </Typography>
          <Typography
            className="hero-names-animate"
            sx={{
              fontFamily: "'Great Vibes',cursive",
              color: "#fff",
              fontSize: { xs: "5rem", sm: "7rem", md: "9.5rem" },
              lineHeight: 1.1,
              textShadow: "0 6px 40px rgba(0,0,0,0.4)",
              mb: 2.5,
            }}
          >
            Christian{" "}
            <Box component="span" sx={{ color: "#F4A261" }}>
              &
            </Box>{" "}
            Vanessa
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond',serif",
              color: "rgba(255,255,255,0.92)",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              letterSpacing: 5,
              mb: 0.75,
            }}
          >
            September 26, 2026
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.65)",
              fontSize: { xs: "0.8rem", md: "0.95rem" },
              letterSpacing: 4,
              textTransform: "uppercase",
              mb: 0,
            }}
          >
            Bantayan Island, Cebu
          </Typography>

          {/* Countdown */}
          <Box className="countdown-wrap">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <Box key={label} className="countdown-box">
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {String(value).padStart(2, "0")}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.65rem",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    mt: 0.5,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── OUR STORY ──────────────────────────────── */}
      <Box id="our-story" sx={{ py: 10, background: "#FFF8F0" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🌺</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#2C553D",
              }}
            >
              Our Story
            </Typography>
            <Box className="section-divider" />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 3,
            }}
          >
            {[
              {
                icon: "💫",
                title: "How We Met",
                text: "Every great love story has a beginning. Ours started with a chance encounter that neither of us could have planned, yet it felt like the universe had been writing it all along.",
              },
              {
                icon: "🌺",
                title: "The Journey",
                text: "Through laughter and adventures, quiet moments and shared dreams, we discovered in each other a love that feels like home — warm, true, and endlessly beautiful.",
              },
              {
                icon: "💍",
                title: "The Proposal",
                text: "When the moment finally came, it was everything — surrounded by the beauty of the islands, under open skies, he asked the question that would change everything forever.",
              },
            ].map(({ icon, title, text }) => (
              <Paper key={title} className="story-card">
                <Typography sx={{ fontSize: "3rem", mb: 2 }}>{icon}</Typography>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#2C553D",
                    mb: 1.5,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    color: "#6B5744",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── WEDDING DETAILS ─────────────────────────── */}
      <Box id="details" sx={{ py: 10, background: "#F0F7F4" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🌴</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#2C553D",
              }}
            >
              Wedding Details
            </Typography>
            <Box className="section-divider" />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            {/* Ceremony */}
            <Paper className="venue-card" elevation={0}>
              <Box
                sx={{
                  background: "linear-gradient(135deg,#2C553D,#5C9E7B)",
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>⛪</Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    mb: 0.5,
                  }}
                >
                  Ceremony
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  St. Peter the Apostle Parish
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 18, color: "#8B7355" }} />
                  <Typography sx={{ color: "#8B7355", fontSize: "0.9rem" }}>
                    Bantayan, Cebu
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "#E76F51",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    mb: 2,
                  }}
                >
                  September 26, 2026 · 10:00 AM
                </Typography>
                <Box className="map-container" sx={{ mb: 1.5 }}>
                  <iframe
                    src="https://maps.google.com/maps?q=St+Peter+the+Apostle+Parish+Bantayan+Cebu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="240"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    title="Ceremony Venue Map"
                  />
                </Box>
                <Box
                  component="a"
                  href="https://maps.google.com/maps?q=St+Peter+the+Apostle+Parish+Bantayan+Cebu"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#2C553D",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    "&:hover": { color: "#E76F51" },
                  }}
                >
                  Get Directions <OpenInNewIcon sx={{ fontSize: 14 }} />
                </Box>
              </Box>
            </Paper>

            {/* Reception */}
            <Paper className="venue-card" elevation={0}>
              <Box
                sx={{
                  background: "linear-gradient(135deg,#1b4a6b,#0d6b8c)",
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🥂</Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    mb: 0.5,
                  }}
                >
                  Reception
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  Sorana Island Villas
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 18, color: "#8B7355" }} />
                  <Typography sx={{ color: "#8B7355", fontSize: "0.9rem" }}>
                    Santa Fe, Bantayan Island, Cebu
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "#E76F51",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    mb: 2,
                  }}
                >
                  September 26, 2026 · 12:00 PM
                </Typography>
                <Box className="map-container" sx={{ mb: 1.5 }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Sorana+Island+Villas+Santa+Fe+Bantayan+Cebu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="240"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    title="Reception Venue Map"
                  />
                </Box>
                <Box
                  component="a"
                  href="https://maps.google.com/maps?q=Sorana+Island+Villas+Santa+Fe+Bantayan+Cebu"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#2C553D",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    "&:hover": { color: "#E76F51" },
                  }}
                >
                  Get Directions <OpenInNewIcon sx={{ fontSize: 14 }} />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* ── DRESS CODE ──────────────────────────────── */}
      <Box id="dress-code" sx={{ py: 10, background: "#FFF8F0" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>👗</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#2C553D",
              }}
            >
              Dress Code
            </Typography>
            <Box className="section-divider" />
            <Typography
              sx={{
                color: "#8B7355",
                fontStyle: "italic",
                mt: 2,
                fontSize: "0.95rem",
              }}
            >
              Semi-Formal · Summer Chic · Tropical
            </Typography>
          </Box>

          {/* ── Entourage ── */}
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#2C553D",
              mb: 3,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Entourage
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" },
              gap: 2.5,
              mb: 7,
            }}
          >
            {[
              {
                role: "Principal Sponsors",
                gender: "Girls",
                color: "Emerald Green",
                icon: "💚",
                detail: "Emerald green formal gown",
              },
              {
                role: "Principal Sponsors",
                gender: "Boys",
                color: "Barong",
                icon: "🤵",
                detail: "Traditional Filipino Barong Tagalog",
              },
              {
                role: "Secondary Sponsors",
                gender: "Girls",
                color: "Magenta",
                icon: "💗",
                detail: "Magenta formal gown",
              },
              {
                role: "Secondary Sponsors",
                gender: "Boys",
                color: "Barong",
                icon: "🤵",
                detail: "Traditional Filipino Barong Tagalog",
              },
            ].map(({ role, gender, color, icon, detail }) => (
              <Paper
                key={role + gender}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid rgba(92,158,123,0.2)",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    background:
                      color === "Emerald Green"
                        ? "linear-gradient(135deg,#1a6b3a,#2d9e55)"
                        : color === "Magenta"
                          ? "linear-gradient(135deg,#b5006b,#e0409a)"
                          : "linear-gradient(135deg,#3d2b1f,#6b4c35)",
                    py: 3,
                  }}
                >
                  <Typography sx={{ fontSize: "2.5rem" }}>{icon}</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 600,
                      color: "#2C553D",
                      fontSize: "1rem",
                      mb: 0.5,
                    }}
                  >
                    {role}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8B7355",
                      fontSize: "0.78rem",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      mb: 1,
                    }}
                  >
                    {gender}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#3D2B1F",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      mb: 0.5,
                    }}
                  >
                    {color}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8B7355",
                      fontSize: "0.82rem",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                    }}
                  >
                    {detail}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* ── Guests ── */}
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#2C553D",
              mb: 3,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Guests
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            {/* Women */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(92,158,123,0.2)",
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg,#C8956C,#F4A261)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                  }}
                >
                  Women
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.8rem",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    mt: 0.5,
                  }}
                >
                  Semi-Formal · Summer Chic
                </Typography>
              </Box>
              <Box className="dress-image-slot">
                <img
                  src="/dress-women.jpg"
                  alt="Women's dress code — Semi-Formal Summer Chic"
                />
              </Box>
              <Box sx={{ p: 3 }}>
                <Box
                  component="ul"
                  sx={{
                    pl: 2,
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                  }}
                >
                  {[
                    "Please refrain from wearing white, black, or dark green — reserved for the wedding party",
                    "Summer colors and patterns encouraged",
                    "Midi or floor-length dresses or jumpsuits",
                    "Lightweight materials encouraged",
                    "Dressy sandals okay",
                  ].map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{
                        color: "#6B5744",
                        fontSize: "0.88rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>

            {/* Men */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(92,158,123,0.2)",
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg,#2C553D,#5C9E7B)",
                  p: 2.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                  }}
                >
                  Men
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.8rem",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    mt: 0.5,
                  }}
                >
                  Tropical Smart Casual
                </Typography>
              </Box>
              <Box className="dress-image-slot">
                <img
                  src="/dress-men.jpg"
                  alt="Men's dress code — Tropical Smart Casual"
                />
              </Box>
              <Box sx={{ p: 3 }}>
                <Box
                  component="ul"
                  sx={{
                    pl: 2,
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                  }}
                >
                  {[
                    "Linen or lightweight button-down shirts in pastel or tropical tones",
                    "Slacks or chino trousers preferred",
                    "Avoid plain white shirts or dark formal suits",
                    "Loafers, boat shoes, or dressy sandals encouraged",
                    "Barong Tagalog also welcome",
                  ].map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{
                        color: "#6B5744",
                        fontSize: "0.88rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* ── WHERE TO STAY ───────────────────────────── */}
      <Box
        id="stay"
        sx={{
          py: 10,
          background: "linear-gradient(135deg,#2C553D 0%,#1b4a6b 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🏝️</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Where to Stay
            </Typography>
            <Box className="section-divider" />
            <Typography
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontStyle: "italic",
                mt: 2,
                fontSize: "0.95rem",
              }}
            >
              Recommended accommodations on Bantayan Island
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3,1fr)",
              },
              gap: 3,
            }}
          >
            {STAY_PLACES.map(({ icon, name, location, desc }) => (
              <Box key={name} className="stay-card">
                <Typography sx={{ fontSize: "2.5rem", mb: 1.5 }}>
                  {icon}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#fff",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 14, color: "#F4A261" }} />
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.82rem",
                    }}
                  >
                    {location}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── PHOTO GALLERY ───────────────────────────── */}
      <Box id="gallery" sx={{ py: 10, background: "#F0F7F4" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📷</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#2C553D",
              }}
            >
              Photo Gallery
            </Typography>
            <Box className="section-divider" />
          </Box>

          {/* ── Slider ── */}
          <Box className="slider-wrap">
            {/* Slides */}
            <Box className="slider-track">
              {GALLERY_PHOTOS.map((src, i) => (
                <Box
                  key={i}
                  className={`slide ${i === activeSlide ? "slide-active" : "slide-hidden"}`}
                  component="img"
                  src={src}
                  alt={`Christian and Vanessa photo ${i + 1}`}
                />
              ))}
            </Box>

            {/* Dot indicators */}
            <Box className="slider-dots">
              {GALLERY_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot ${i === activeSlide ? "slider-dot-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── RSVP ────────────────────────────────────── */}
      <Box
        id="rsvp"
        sx={{ py: 10, background: "linear-gradient(135deg,#FFF8F0,#FFF0E6)" }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>💌</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "#2C553D",
              }}
            >
              RSVP
            </Typography>
            <Box className="section-divider" />
            <Typography sx={{ color: "#8B7355", fontStyle: "italic", mt: 2 }}>
              Kindly respond by August 1, 2026
            </Typography>
          </Box>

          <Paper
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 6 },
              boxShadow: "0 16px 64px rgba(0,0,0,0.1)",
            }}
          >
            {submitted ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography sx={{ fontSize: "4rem", mb: 2 }}>🌺</Typography>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "2rem",
                    color: "#2C553D",
                    mb: 1,
                  }}
                >
                  Thank you!
                </Typography>
                <Typography sx={{ color: "#6B5744" }}>
                  We've received your RSVP. We can't wait to celebrate with you
                  on our special day!
                </Typography>
              </Box>
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="Your full name"
                />

                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  type="tel"
                  value={form.contactNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="e.g. 09xxxxxxxxx"
                />

                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="your@email.com"
                />

                <FormControl fullWidth>
                  <InputLabel id="slipper-label">Slipper Size</InputLabel>
                  <Select
                    labelId="slipper-label"
                    label="Slipper Size"
                    name="slipperSize"
                    value={form.slipperSize}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        slipperSize: e.target.value,
                      }))
                    }
                    sx={{ borderRadius: 2.5 }}
                  >
                    <MenuItem value="">
                      <em>Select your size</em>
                    </MenuItem>
                    {SLIPPER_SIZES_WOMEN.map((s) => (
                      <MenuItem key={`w${s}`} value={`Women's ${s}`}>
                        Women's {s}
                      </MenuItem>
                    ))}
                    {SLIPPER_SIZES_MEN.map((s) => (
                      <MenuItem key={`m${s}`} value={`Men's ${s}`}>
                        Men's {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box>
                  <FormLabel
                    sx={{
                      color: "#3D2B1F",
                      fontWeight: 500,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Will you be attending? *
                  </FormLabel>
                  <RadioGroup
                    name="attendance"
                    value={form.attendance}
                    onChange={handleChange}
                    sx={{ gap: 0.5 }}
                  >
                    {[
                      { value: "yes", label: "Yes, I will be there! 🎉" },
                      { value: "no", label: "No, unable to attend" },
                      { value: "maybe", label: "Maybe" },
                    ].map(({ value, label }) => (
                      <Box key={value}>
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            sx={{
                              color: "#5C9E7B",
                              "&.Mui-checked": { color: "#2C553D" },
                            }}
                          />
                        }
                        label={label}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                      {value === 'yes' && form.attendance === 'yes' && (
                        <Typography sx={{ fontSize: '0.8rem', color: '#5C9E7B', ml: 4.5, mt: -0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          📅 A calendar invite will be added after you submit
                        </Typography>
                      )}
                      </Box>
                    ))}
                  </RadioGroup>
                </Box>

                {sendError && (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    {sendError}
                  </Typography>
                )}

                <Button
                  type="submit"
                  className="rsvp-submit-btn"
                  size="large"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send RSVP 🌺"}
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>

      {/* ── FOOTER ──────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#1a3d2b,#0d2d4a)",
          color: "#fff",
          textAlign: "center",
          py: 8,
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Great Vibes',cursive",
            color: "#fff",
            fontSize: "3.5rem",
            mb: 1,
          }}
        >
          Christian & Vanessa
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 2,
            fontSize: "0.85rem",
            mb: 0.5,
          }}
        >
          September 26, 2026
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 2,
            fontSize: "0.85rem",
            mb: 2,
          }}
        >
          Bantayan Island, Cebu, Philippines
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            color: "#F4A261",
            fontSize: "1.2rem",
          }}
        >
          Forever begins here 🌺
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

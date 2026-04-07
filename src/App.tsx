import { useState, useEffect, useCallback, useRef } from "react";
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
    primary: { main: "#5a4230", contrastText: "#fff" },
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
              borderColor: "#c4a882",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5a4230",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5a4230",
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
    mapUrl: "https://maps.google.com/maps?q=Kota+Beach+Resort+Santa+Fe+Bantayan+Island+Cebu",
    tag: "Beachfront",
  },
  {
    icon: "🌊",
    name: "Ogtong Cave Resort",
    location: "Santa Fe, Bantayan Island",
    desc: "Features a natural cave pool and scenic beachfront cottages. A unique island experience with beautiful surroundings.",
    mapUrl: "https://maps.google.com/maps?q=Ogtong+Cave+Resort+Santa+Fe+Bantayan+Island+Cebu",
    tag: "Cave Pool",
  },
  {
    icon: "🌅",
    name: "Sugar Beach Resort",
    location: "Santa Fe, Bantayan Island",
    desc: "Tucked on a pristine stretch of white sand, Sugar Beach offers a peaceful tropical retreat close to the venues.",
    mapUrl: "https://maps.google.com/maps?q=Sugar+Beach+Resort+Santa+Fe+Bantayan+Island+Cebu",
    tag: "White Sand",
  },
  {
    icon: "🌺",
    name: "Santa Fe Beach Club",
    location: "Santa Fe, Bantayan Island",
    desc: "Beachfront villas and rooms with stunning ocean views. Walking distance from the reception at Sorana Island Villas.",
    mapUrl: "https://maps.google.com/maps?q=Santa+Fe+Beach+Club+Bantayan+Island+Cebu",
    tag: "Ocean View",
  },
  {
    icon: "🌴",
    name: "Bantayan Island Nature Park and Resort",
    location: "Bantayan, Cebu",
    desc: "Closest to the ceremony venue in Bantayan town. Spacious grounds with a relaxing tropical setting.",
    mapUrl: "https://maps.google.com/maps?q=Bantayan+Island+Nature+Park+and+Resort+Cebu",
    tag: "Near Ceremony",
  },
  {
    icon: "🐚",
    name: "Yolanda Beach Resort",
    location: "Bantayan Island, Cebu",
    desc: "A cozy resort with comfortable rooms and direct beach access. Great value for island accommodation.",
    mapUrl: "https://maps.google.com/maps?q=Yolanda+Beach+Resort+Bantayan+Island+Cebu",
    tag: "Great Value",
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
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiAnimRef = useRef<number>(0);

  useEffect(() => {
    if (!showConfetti) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = [
      "#5a4230",
      "#E76F51",
      "#F4A261",
      "#c4a882",
      "#FFD700",
      "#FF69B4",
      "#87CEEB",
      "#fff",
    ];
    const pieces = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height * 0.6,
      w: 8 + Math.random() * 8,
      h: 4 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      speed: 2.5 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 0.18,
      drift: (Math.random() - 0.5) * 1.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of pieces) {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) {
        confettiAnimRef.current = requestAnimationFrame(draw);
      } else {
        setShowConfetti(false);
      }
    };
    confettiAnimRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(confettiAnimRef.current);
  }, [showConfetti]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = new Date("2026-09-26T15:00:00");
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

  const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.attendance) {
      setSendError("Please select whether you will be attending.");
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const body = new URLSearchParams({
        name: form.fullName,
        contact: form.contactNumber,
        email: form.email,
        slipperSize: form.slipperSize || "",
        attendance: form.attendance,
      });
      await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body });
      setSubmitted(true);
      if (form.attendance === "yes") {
        setShowConfetti(true);
      }
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

      {showConfetti && (
        <canvas
          ref={confettiCanvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      )}

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
              fontSize: "2.2rem",
              color: "#fff",
              flexGrow: 1,
              cursor: "pointer",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
              letterSpacing: 2,
              "& span": { color: "#F4A261" },
            }}
            onClick={() => scrollTo("home")}
          >
            C<Box component="span" sx={{ mx: 0.5, color: "#F4A261", fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem" }}>&</Box>V
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
        <Box sx={{ width: 240, pt: 2, background: "#2b1f14", height: "100%" }}>
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
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay so text stays readable */}
        <Box className="hero-overlay" />

        <Box className="hero-content">
          <Typography
            sx={{
              fontFamily: "'Lato',sans-serif",
              color: "rgba(255,255,255,0.92)",
              letterSpacing: 8,
              textTransform: "uppercase",
              fontSize: "0.95rem",
              fontWeight: 400,
              mb: 1.5,
              textShadow: "0 2px 12px rgba(0,0,0,0.7)",
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
              textShadow: "0 4px 24px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.5)",
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
              color: "#fff",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              letterSpacing: 5,
              mb: 0.75,
              textShadow: "0 2px 16px rgba(0,0,0,0.65)",
            }}
          >
            September 26, 2026
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.88)",
              fontSize: { xs: "0.8rem", md: "0.95rem" },
              letterSpacing: 4,
              textTransform: "uppercase",
              mb: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.65)",
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
      <Box
        id="our-story"
        sx={{
          py: 10,
          background: "#FFF7E8",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.8rem", mb: 0.5, lineHeight: 1 }}>🌴</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                fontWeight: 700,
                color: "#5a4230",
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              Our Story
            </Typography>
            {/* Tropical divider */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mt: 1.5 }}>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, transparent, #c4a882)", borderRadius: 2 }} />
              <Typography sx={{ fontSize: "1.1rem", lineHeight: 1 }}>🌺</Typography>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, #F4A261, transparent)", borderRadius: 2 }} />
            </Box>
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
              <Paper key={title} className="story-card" elevation={0}>
                <Box className="story-card-inner">
                  <Box className="story-icon-wrap">
                    <span style={{ fontSize: "2rem" }}>{icon}</span>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.55rem",
                      fontWeight: 700,
                      color: "#5a4230",
                      mb: 1.5,
                      letterSpacing: 0.5,
                    }}
                  >
                    {title}
                  </Typography>
                  <Box sx={{ width: 32, height: 2, background: "linear-gradient(90deg,#F4A261,#E76F51)", borderRadius: 2, mx: "auto", mb: 2 }} />
                  <Typography
                    sx={{
                      color: "#5a4535",
                      lineHeight: 1.85,
                      fontSize: "0.93rem",
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── WEDDING DETAILS ─────────────────────────── */}
      <Box
        id="details"
        sx={{
          py: 12,
          background: "#FFF7E8",
          position: "relative",
          overflow: "hidden",
        }}
      >


        <Container maxWidth="lg" sx={{ position: "relative" }}>

          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box sx={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              border: "1px solid rgba(90,66,48,0.2)", borderRadius: 3, px: 4, py: 2, mb: 4,
              background: "rgba(90,66,48,0.05)",
            }}>
              <Typography sx={{ color: "#5a4230", fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, mb: 0.5 }}>
                Saturday
              </Typography>
              <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", color: "#b5620a", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1, letterSpacing: 2 }}>
                26
              </Typography>
              <Typography sx={{ color: "#9a8872", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", mt: 0.5 }}>
                September · 2026
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2.4rem", md: "3.4rem" },
                fontWeight: 700,
                color: "#3b2f1e",
                letterSpacing: 1,
                lineHeight: 1.1,
              }}
            >
              Wedding Details
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
              <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #c4a882)", borderRadius: 2 }} />
              <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>🌺</Typography>
              <Box sx={{ width: 60, height: 2, background: "linear-gradient(90deg, #F4A261, transparent)", borderRadius: 2 }} />
            </Box>
            <Typography sx={{ color: "#9a8872", fontSize: "0.82rem", mt: 2, letterSpacing: 2, textTransform: "uppercase" }}>
              Bantayan Island, Cebu, Philippines
            </Typography>
          </Box>

          {/* Venue Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

            {/* Ceremony Card */}
            <Paper className="venue-card" elevation={0}
              sx={{ background: "#fff !important", border: "1px solid rgba(90,66,48,0.15) !important", boxShadow: "0 4px 24px rgba(90,66,48,0.1) !important" }}
            >
              <Box className="venue-info-panel">
                <Box className="venue-type-tag" sx={{ background: "rgba(90,66,48,0.08)", borderColor: "rgba(90,66,48,0.2)" }}>
                  <Typography sx={{ fontSize: "0.85rem" }}>⛪</Typography>
                  <Typography sx={{ color: "#5a4230", fontSize: "0.68rem", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
                    Ceremony
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#3b2f1e",
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    mb: 2.5,
                  }}
                >
                  St. Peter the Apostle Parish
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PlaceIcon sx={{ fontSize: 16, color: "#5a4230" }} />
                    <Typography sx={{ color: "#6b5e4f", fontSize: "0.85rem" }}>
                      Bantayan, Cebu
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography sx={{ fontSize: "0.9rem", width: 16, textAlign: "center" }}>🕒</Typography>
                    <Typography sx={{ color: "#b5620a", fontSize: "0.9rem", fontWeight: 700, letterSpacing: 0.5 }}>
                      3:00 PM
                    </Typography>
                  </Box>
                </Box>
                <Box component="a"
                  href="https://maps.google.com/maps?q=St+Peter+the+Apostle+Parish+Bantayan+Cebu"
                  target="_blank" rel="noopener noreferrer"
                  className="venue-directions-btn"
                  sx={{
                    color: "#5a4230",
                    borderColor: "rgba(90,66,48,0.35) !important",
                    background: "rgba(90,66,48,0.06) !important",
                    "&:hover": { background: "rgba(90,66,48,0.12) !important", borderColor: "#5a4230 !important" },
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 14 }} /> Get Directions <OpenInNewIcon sx={{ fontSize: 12 }} />
                </Box>
              </Box>
              <Box className="venue-map-panel">
                <iframe
                  src="https://maps.google.com/maps?q=St+Peter+the+Apostle+Parish+Bantayan+Cebu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, display: "block", filter: "saturate(0.85) contrast(1.05)" }}
                  allowFullScreen loading="lazy"
                  title="Ceremony Venue Map"
                />
              </Box>
            </Paper>

            {/* Reception Card */}
            <Paper className="venue-card" elevation={0}
              sx={{ background: "#fff !important", border: "1px solid rgba(90,66,48,0.15) !important", boxShadow: "0 4px 24px rgba(90,66,48,0.1) !important" }}
            >
              <Box className="venue-info-panel">
                <Box className="venue-type-tag" sx={{ background: "rgba(181,98,10,0.08)", borderColor: "rgba(181,98,10,0.25)" }}>
                  <Typography sx={{ fontSize: "0.85rem" }}>🥂</Typography>
                  <Typography sx={{ color: "#b5620a", fontSize: "0.68rem", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
                    Reception
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#3b2f1e",
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    mb: 2.5,
                  }}
                >
                  Sorana Island Villas
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PlaceIcon sx={{ fontSize: 16, color: "#5a4230" }} />
                    <Typography sx={{ color: "#6b5e4f", fontSize: "0.85rem" }}>
                      Santa Fe, Bantayan Island, Cebu
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography sx={{ fontSize: "0.9rem", width: 16, textAlign: "center" }}>🕕</Typography>
                    <Typography sx={{ color: "#b5620a", fontSize: "0.9rem", fontWeight: 700, letterSpacing: 0.5 }}>
                      6:00 PM
                    </Typography>
                  </Box>
                </Box>
                <Box component="a"
                  href="https://maps.google.com/maps?q=Sorana+Island+Villas+Santa+Fe+Bantayan+Cebu"
                  target="_blank" rel="noopener noreferrer"
                  className="venue-directions-btn"
                  sx={{
                    color: "#b5620a",
                    borderColor: "rgba(181,98,10,0.35) !important",
                    background: "rgba(181,98,10,0.06) !important",
                    "&:hover": { background: "rgba(181,98,10,0.12) !important", borderColor: "#b5620a !important" },
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 14 }} /> Get Directions <OpenInNewIcon sx={{ fontSize: 12 }} />
                </Box>
              </Box>
              <Box className="venue-map-panel">
                <iframe
                  src="https://maps.google.com/maps?q=Sorana+Island+Villas+Santa+Fe+Bantayan+Cebu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, display: "block", filter: "saturate(0.85) contrast(1.05)" }}
                  allowFullScreen loading="lazy"
                  title="Reception Venue Map"
                />
              </Box>
            </Paper>
          </Box>

          {/* Day-of Timeline */}
          <Box className="day-timeline">
            {[
              { emoji: "⛪", time: "3:00 PM", label: "Ceremony", color: "#5a4230" },
              { emoji: "🌺", time: "", label: "", color: "#F4A261", small: true },
              { emoji: "🥂", time: "6:00 PM", label: "Reception", color: "#b5620a" },
              { emoji: "🌅", time: "", label: "", color: "#F4A261", small: true },
              { emoji: "🎉", time: "Evening", label: "Celebration", color: "#c2185b" },
            ].map((item, i) =>
              item.small ? (
                <Box key={i} className="day-timeline-line" />
              ) : (
                <Box key={i} className="day-timeline-item">
                  <Box className="day-timeline-dot" sx={{ background: `${item.color}14`, border: `1.5px solid ${item.color}44` }}>
                    <span>{item.emoji}</span>
                  </Box>
                  <Typography sx={{ color: item.color, fontWeight: 700, fontSize: "0.8rem", letterSpacing: 0.5 }}>
                    {item.time}
                  </Typography>
                  <Typography sx={{ color: "#9a8872", fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase" }}>
                    {item.label}
                  </Typography>
                </Box>
              )
            )}
          </Box>

        </Container>
      </Box>

      {/* ── DRESS CODE ──────────────────────────────── */}
      <Box
        id="dress-code"
        sx={{
          py: 12,
          position: "relative",
          overflow: "hidden",
          background: "#FFF7E8",
        }}
      >


        <Container maxWidth="md" sx={{ position: "relative" }}>

          {/* ── Section Header ── */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Typography sx={{ color: "#9a8872", fontSize: "0.7rem", letterSpacing: 4, textTransform: "uppercase", fontWeight: 500, mb: 1.5 }}>
              What to Wear
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2.4rem", md: "3.6rem" },
                fontWeight: 300,
                color: "#3b2f1e",
                lineHeight: 1.1,
              }}
            >
              Dress Code
            </Typography>
            <Box sx={{ width: 40, height: 1, background: "#c4a882", mx: "auto", mt: 2, mb: 2 }} />
            <Typography sx={{ color: "#6b5e4f", fontSize: { xs: "0.85rem", md: "0.95rem" }, fontStyle: "italic" }}>
              Semi-Formal &middot; Tropical Vibe &middot; Summer Chic
            </Typography>
          </Box>

          {/* ── Color Palette (horizontal ribbon) ── */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 3.5 }, mb: { xs: 2, md: 3 }, flexWrap: "wrap" }}>
            {[
              { name: "Deep Green", hex: "#1f6b3a" },
              { name: "Soft Beige", hex: "#d8cfc0" },
              { name: "Coral", hex: "#f56a2a" },
              { name: "Berry", hex: "#c2185b" },
              { name: "Gold", hex: "#f5a623" },
            ].map(({ name, hex }) => (
              <Box key={hex} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>
                <Box
                  sx={{
                    width: { xs: 44, md: 52 },
                    height: { xs: 44, md: 52 },
                    borderRadius: "50%",
                    background: hex,
                    border: "3px solid #FFF7E8",
                    boxShadow: `0 0 0 1px ${hex}35`,
                    transition: "transform 0.25s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                />
                <Typography sx={{ fontSize: "0.68rem", color: "#6b5e4f", fontWeight: 500, letterSpacing: 0.3 }}>
                  {name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ textAlign: "center", color: "#9a8872", fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase", mb: { xs: 6, md: 8 } }}>
            Please dress within these colors
          </Typography>

          {/* ── Entourage Section ── */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                fontWeight: 300,
                color: "#3b2f1e",
                mb: 0.5,
              }}
            >
              Entourage
            </Typography>
            <Box sx={{ width: 30, height: 1, background: "#c4a882", mx: "auto" }} />
          </Box>

          {/* Sponsors */}
          <Typography sx={{ color: "#9a8872", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", textAlign: "center", mb: 2.5 }}>
            Sponsors &mdash; Own Attire
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 0, mb: 5 }}>
            {[
              { role: "Principal Sponsors", items: [
                { gender: "Female", emoji: "💃", attire: "Deep Green", detail: "Semi-Formal · Tropical Vibe", colorHex: "#1f6b3a" },
                { gender: "Male", emoji: "🤵", attire: "Barong Tagalog", detail: "Traditional Filipino Formal", colorHex: null },
              ]},
              { role: "Secondary Sponsors", items: [
                { gender: "Female", emoji: "💃", attire: "Berry", detail: "Semi-Formal · Tropical Vibe", colorHex: "#c2185b" },
                { gender: "Male", emoji: "🤵", attire: "Barong Tagalog", detail: "Traditional Filipino Formal", colorHex: null },
              ]},
            ].map(({ role, items }) => (
              <Box key={role}>
                <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "#3b2f1e", textAlign: "center", mb: 2, mt: 1 }}>
                  {role}
                </Typography>
                {items.map(({ gender, emoji, attire, detail, colorHex }) => (
                  <Box
                    key={gender}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 1.5,
                      px: 2,
                      mx: { xs: 0, sm: 1 },
                      borderBottom: "1px solid rgba(90,66,48,0.08)",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.3rem", lineHeight: 1 }}>{emoji}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                        <Typography sx={{ color: "#3b2f1e", fontSize: "0.85rem", fontWeight: 600 }}>{gender}</Typography>
                        {colorHex && <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: colorHex }} />}
                      </Box>
                      <Typography sx={{ color: "#9a8872", fontSize: "0.72rem" }}>{attire} &middot; {detail}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>

          {/* Entourage Members */}
          <Typography sx={{ color: "#9a8872", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", textAlign: "center", mb: 2.5 }}>
            Entourage Members &mdash; Attire Provided
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: { xs: 6, md: 8 } }}>
            {[
              { title: "Girls", emoji: "💃", style: "Semi-Formal · Tropical Vibe", desc: "Attire will be coordinated from the event color palette — no additional outfit needed." },
              { title: "Boys", emoji: "🤵", style: "Barong Tagalog", desc: "Entourage gentlemen will wear the traditional Filipino Barong Tagalog — fully coordinated and provided." },
            ].map(({ title, emoji, style, desc }) => (
              <Box key={title} sx={{ textAlign: "center", py: 3, px: 2 }}>
                <Typography sx={{ fontSize: "1.6rem", lineHeight: 1, mb: 0.75 }}>{emoji}</Typography>
                <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", color: "#3b2f1e", fontSize: "1.2rem", fontWeight: 600 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: "#b5620a", fontSize: "0.62rem", letterSpacing: 1.5, textTransform: "uppercase", mt: 0.5, mb: 1.5 }}>
                  {style}
                </Typography>
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, background: "rgba(181,98,10,0.08)", borderRadius: 10, px: 1.5, py: 0.4, mb: 1.5 }}>
                  <Typography sx={{ fontSize: "0.75rem" }}>🎁</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#b5620a", fontWeight: 600 }}>Provided</Typography>
                </Box>
                <Typography sx={{ color: "#6b5e4f", fontSize: "0.8rem", lineHeight: 1.7, maxWidth: 300, mx: "auto" }}>
                  {desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* ── Guests Section ── */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                fontWeight: 300,
                color: "#3b2f1e",
                mb: 0.5,
              }}
            >
              Guests
            </Typography>
            <Box sx={{ width: 30, height: 1, background: "#c4a882", mx: "auto", mb: 1 }} />
            <Typography sx={{ color: "#9a8872", fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase" }}>
              Attire not provided &mdash; dress within the color palette
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 6 } }}>
            {/* Women */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                <Typography sx={{ fontSize: "1.5rem", lineHeight: 1 }}>👒</Typography>
                <Box>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", color: "#3b2f1e", fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2 }}>
                    Women
                  </Typography>
                  <Typography sx={{ color: "#b5620a", fontSize: "0.6rem", letterSpacing: 1.5, textTransform: "uppercase" }}>
                    Semi-Formal · Summer Chic
                  </Typography>
                </Box>
              </Box>
              {[
                "Semi-formal, summer chic style",
                "Dress within the event color palette",
                "Please avoid white — reserved for the bride",
                "Midi or floor-length dresses or jumpsuits",
                "Lightweight, breathable fabrics encouraged",
                "Dressy sandals are perfectly fine",
              ].map((text) => (
                <Box key={text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.2 }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#c4a882", mt: "8px", flexShrink: 0 }} />
                  <Typography sx={{ color: "#6b5e4f", fontSize: "0.85rem", lineHeight: 1.65 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Men */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                <Typography sx={{ fontSize: "1.5rem", lineHeight: 1 }}>👔</Typography>
                <Box>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", color: "#3b2f1e", fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2 }}>
                    Men
                  </Typography>
                  <Typography sx={{ color: "#b5620a", fontSize: "0.6rem", letterSpacing: 1.5, textTransform: "uppercase" }}>
                    Smart Casual · Resort Formal
                  </Typography>
                </Box>
              </Box>
              {[
                "Smart casual or resort formal style",
                "Dress within the event color palette",
                "Linen or lightweight button-down shirts in tropical tones",
                "Slacks or chino trousers preferred",
                "Loafers, boat shoes, or dressy sandals encouraged",
              ].map((text) => (
                <Box key={text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.2 }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#c4a882", mt: "8px", flexShrink: 0 }} />
                  <Typography sx={{ color: "#6b5e4f", fontSize: "0.85rem", lineHeight: 1.65 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── WHERE TO STAY ───────────────────────────── */}
      <Box
        id="stay"
        sx={{
          py: 12,
          background: "#FFF7E8",
          position: "relative",
          overflow: "hidden",
        }}
      >


        <Container maxWidth="lg" sx={{ position: "relative" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography sx={{ fontSize: "2.8rem", mb: 0.5, lineHeight: 1 }}>🏝️</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                fontWeight: 700,
                color: "#3b2f1e",
                letterSpacing: 1,
              }}
            >
              Where to Stay
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mt: 1.5 }}>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, transparent, #c4a882)", borderRadius: 2 }} />
              <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>🌺</Typography>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, #F4A261, transparent)", borderRadius: 2 }} />
            </Box>
            <Typography sx={{ color: "#9a8872", fontSize: "0.85rem", mt: 2, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Recommended accommodations on Bantayan Island
            </Typography>
          </Box>

          {/* Cards grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3,1fr)" },
              gap: 3,
            }}
          >
            {STAY_PLACES.map(({ icon, name, location, desc, mapUrl, tag }) => (
              <Box key={name} className="stay-card">
                {/* Top row: icon + tag */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(196,168,130,0.15), rgba(244,162,97,0.1))",
                    border: "1px solid rgba(90,66,48,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem", flexShrink: 0,
                  }}>
                    {icon}
                  </Box>
                  <Box sx={{
                    px: 1.5, py: 0.5, borderRadius: "100px",
                    background: "rgba(244,162,97,0.15)",
                    border: "1px solid rgba(244,162,97,0.35)",
                  }}>
                    <Typography sx={{ color: "#b5620a", fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                      {tag}
                    </Typography>
                  </Box>
                </Box>

                {/* Name */}
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: "#3b2f1e",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    mb: 0.75,
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </Typography>

                {/* Location */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                  <PlaceIcon sx={{ fontSize: 13, color: "#5a4230" }} />
                  <Typography sx={{ color: "#9a8872", fontSize: "0.78rem", letterSpacing: 0.3 }}>
                    {location}
                  </Typography>
                </Box>

                {/* Divider */}
                <Box sx={{ width: "100%", height: "1px", background: "rgba(90,66,48,0.1)", mb: 1.5 }} />

                {/* Description */}
                <Typography sx={{ color: "#6b5e4f", fontSize: "0.875rem", lineHeight: 1.75, flexGrow: 1, mb: 2.5 }}>
                  {desc}
                </Typography>

                {/* Google Maps button */}
                <Box
                  component="a"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 2,
                    py: 1,
                    borderRadius: "100px",
                    border: "1px solid rgba(90,66,48,0.3)",
                    background: "rgba(90,66,48,0.06)",
                    color: "#5a4230",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "rgba(90,66,48,0.12)",
                      borderColor: "#5a4230",
                    },
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 13 }} />
                  View on Maps
                  <OpenInNewIcon sx={{ fontSize: 11 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── PHOTO GALLERY ───────────────────────────── */}
      <Box
        id="gallery"
        sx={{
          py: 12,
          background: "#FFF7E8",
          position: "relative",
          overflow: "hidden",
        }}
      >


        <Container maxWidth="lg" sx={{ position: "relative" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography sx={{ fontSize: "2.8rem", mb: 0.5, lineHeight: 1 }}>📸</Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                fontWeight: 700,
                color: "#5a4230",
                letterSpacing: 1,
              }}
            >
              Our Moments
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mt: 1.5 }}>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, transparent, #c4a882)", borderRadius: 2 }} />
              <Typography sx={{ fontSize: "1.1rem", lineHeight: 1 }}>🌺</Typography>
              <Box sx={{ width: 48, height: 2, background: "linear-gradient(90deg, #F4A261, transparent)", borderRadius: 2 }} />
            </Box>
            <Typography sx={{ color: "#9a8272", fontSize: "0.88rem", mt: 2, fontStyle: "italic", letterSpacing: 0.5 }}>
              A glimpse of our love story
            </Typography>
          </Box>

          {/* Masonry Grid */}
          <Box className="gallery-grid">
            {GALLERY_PHOTOS.map((src, i) => (
              <Box key={i} className={`gallery-item ${i === 0 ? "gallery-item-hero" : ""}`}>
                <img src={src} alt={`Christian and Vanessa photo ${i + 1}`} />
                <Box className="gallery-item-overlay">
                  <span className="gallery-heart">🤍</span>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Bottom caption */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond',serif",
                color: "#9a8272",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                fontStyle: "italic",
                letterSpacing: 1,
              }}
            >
              "Every love story is beautiful, but ours is my favorite."
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── RSVP ────────────────────────────────────── */}
      <Box
        id="rsvp"
        sx={{
          py: { xs: 6, md: 12 },
          background: "#FFF7E8",
          position: "relative",
          overflow: "hidden",
        }}
      >


        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}>

            {/* ── Left panel ── */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 0.5, lineHeight: 1 }}>💌</Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: { xs: "2.2rem", md: "4rem" },
                  fontWeight: 700,
                  color: "#3b2f1e",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                Join Us
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: { xs: "1.1rem", md: "1.6rem" },
                  color: "#b5620a",
                  fontStyle: "italic",
                  mb: { xs: 2, md: 3 },
                }}
              >
                Christian & Vanessa
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: { xs: 2, md: 4 } }}>
                {[
                  { emoji: "📅", text: "September 26, 2026" },
                  { emoji: "📍", text: "Bantayan Island, Cebu" },
                  { emoji: "⏰", text: "3:00 PM – Ceremony" },
                  { emoji: "🥂", text: "6:00 PM – Reception" },
                ].map(({ emoji, text }) => (
                  <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: { xs: "center", md: "flex-start" } }}>
                    <Box sx={{ width: { xs: 30, md: 36 }, height: { xs: 30, md: 36 }, borderRadius: "10px", background: "rgba(90,66,48,0.08)", border: "1px solid rgba(90,66,48,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: { xs: "0.85rem", md: "1rem" }, flexShrink: 0 }}>
                      {emoji}
                    </Box>
                    <Typography sx={{ color: "#6b5e4f", fontSize: { xs: "0.82rem", md: "0.9rem" } }}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Deadline badge */}
              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 1,
                px: 2, py: 1, borderRadius: "100px",
                border: "1px solid rgba(181,98,10,0.3)",
                background: "rgba(181,98,10,0.07)",
              }}>
                <Typography sx={{ fontSize: "0.8rem" }}>🗓️</Typography>
                <Typography sx={{ color: "#b5620a", fontSize: { xs: "0.75rem", md: "0.8rem" }, fontWeight: 700, letterSpacing: 0.5 }}>
                  Kindly respond by June 30, 2026
                </Typography>
              </Box>
            </Box>

            {/* ── Right panel — Form ── */}
            <Paper
              sx={{
                borderRadius: { xs: "16px", md: "24px" },
                p: { xs: 2.5, md: 5 },
                background: "#fff",
                boxShadow: "0 8px 40px rgba(90,66,48,0.12), 0 2px 8px rgba(90,66,48,0.06)",
              }}
            >
              {submitted ? (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <Typography sx={{ fontSize: "4rem", mb: 2 }}>🌺</Typography>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", color: "#5a4230", fontWeight: 700, mb: 1 }}>
                    Thank you!
                  </Typography>
                  <Typography sx={{ color: "#7a6555", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    We've received your RSVP. We can't wait to celebrate with you on our special day! 🎉
                  </Typography>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

                  <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#5a4230", mb: 0.5 }}>
                    Your Details
                  </Typography>

                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Your full name"
                    size="small"
                  />
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <TextField
                      label="Contact Number"
                      name="contactNumber"
                      type="tel"
                      value={form.contactNumber}
                      onChange={handleChange}
                      required
                      fullWidth
                      placeholder="09xxxxxxxxx"
                      size="small"
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
                      size="small"
                    />
                  </Box>

                  <Box>
                    <FormControl fullWidth size="small">
                      <InputLabel id="slipper-label">Slipper Size</InputLabel>
                      <Select
                        labelId="slipper-label"
                        label="Slipper Size"
                        name="slipperSize"
                        value={form.slipperSize}
                        onChange={(e) => setForm((prev) => ({ ...prev, slipperSize: e.target.value }))}
                        sx={{ borderRadius: 2.5 }}
                      >
                        <MenuItem value=""><em>Select your size</em></MenuItem>
                        {SLIPPER_SIZES_WOMEN.map((s) => (
                          <MenuItem key={`w${s}`} value={`Women's ${s}`}>Women's {s}</MenuItem>
                        ))}
                        {SLIPPER_SIZES_MEN.map((s) => (
                          <MenuItem key={`m${s}`} value={`Men's ${s}`}>Men's {s}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography sx={{ fontSize: "0.75rem", color: "#9a8272", mt: 0.7, ml: 0.5, fontStyle: "italic" }}>
                      🩴 A small touch to keep you comfortable as we celebrate.
                    </Typography>
                  </Box>

                  {/* Custom attendance cards */}
                  <Box>
                    <Typography sx={{ color: "#3D2B1F", fontWeight: 600, fontSize: "0.88rem", mb: 1.5, letterSpacing: 0.3 }}>
                      Will you be attending? *
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {[
                        { value: "yes", emoji: "🎉", label: "Yes, I'll be there!" },
                        { value: "no", emoji: "😢", label: "Unable to attend" },
                      ].map(({ value, emoji, label }) => (
                        <Box
                          key={value}
                          className={`rsvp-attendance-card ${form.attendance === value ? (value === "yes" ? "selected-yes" : "selected-no") : ""}`}
                          onClick={() => setForm((prev) => ({ ...prev, attendance: value }))}
                        >
                          <Typography sx={{ fontSize: "1.6rem", mb: 0.5 }}>{emoji}</Typography>
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#3D2B1F" }}>{label}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {sendError && (
                    <Typography sx={{ color: "#d32f2f", fontSize: "0.85rem", textAlign: "center", background: "rgba(211,47,47,0.06)", p: 1.5, borderRadius: 2 }}>
                      {sendError}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    className="rsvp-submit-btn"
                    size="large"
                    disabled={sending}
                    sx={{ mt: 0.5 }}
                  >
                    {sending ? "Sending…" : "Send RSVP 🌺"}
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* ── FOOTER ──────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#2b1f14,#1a140d)",
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

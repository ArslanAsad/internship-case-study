import { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// sample event data
const sampleEvents = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2024-06-05",
    time: "10:00 AM",
    location: "FAST-NUCES, Islamabad, Pakistan",
    description:
      "Join industry leaders for the latest in technology trends and innovations.",
    category: "Technology",
  },
  {
    id: 2,
    name: "Music Festival",
    date: "2025-06-22",
    time: "06:00 PM",
    location: "H-8, Islamabad, Pakistan",
    description:
      "Experience amazing live performances from top artists across multiple genres.",
    category: "Entertainment",
  },
  {
    id: 3,
    name: "Food Expo",
    date: "2025-07-15",
    time: "04:00 PM",
    location: "F-9 Park, Bolan Gate 2, F-10 Markaz, Islamabad, Pakistan",
    description:
      "Taste exquisite dishes and wines from renowned chefs and vineyards.",
    category: "Food",
  },
  {
    id: 4,
    name: "Museum Opening",
    date: "2025-07-05",
    time: "07:00 PM",
    location: "PNCA, F-5, Islamabad, Pakistan",
    description:
      "Discover contemporary art pieces from emerging and established artists.",
    category: "Arts",
  },
  {
    id: 5,
    name: "Business Networking",
    date: "2025-08-20",
    time: "05:30 PM",
    location: "Main Lobby, PC Hotel, Rawalpindi, Pakistan",
    description: "Connect with professionals and expand your business network.",
    category: "Business",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNavBg, setShowNavBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // filter events based on search input
  const filteredEvents = useMemo(() => {
    if (!searchTerm) return sampleEvents;
    return sampleEvents.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // handle scroll for navbar bg
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavBg(true);
      } else {
        setShowNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRegister = (eventName) => {
    alert(`Registration for "${eventName}" - Feature coming soon!`);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // simulating sending form data to server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);

    // reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          showNavBg ? "navbar-light bg-white shadow-sm" : "navbar-dark"
        }`}
      >
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            <span className="text-primary">Event</span>Hub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              mobileMenuOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero d-flex align-items-center text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInUp">
                Discover Events Near You
              </h1>
              <p className="lead mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                Find amazing events happening in your area and connect with your
                community
              </p>
              <a
                href="#events"
                className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow animate__animated animate__fadeInUp animate__delay-2s"
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="featured-events py-5">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-lg-6 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-3">Featured Events</h2>
              <p className="text-muted">
                Discover and register for exciting events happening near you
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="row mb-5">
            <div className="col-md-6 mx-auto">
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search events by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="row g-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm event-card">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                          {event.category}
                        </span>
                        <small className="text-muted">
                          {new Date(event.date).toLocaleDateString()}
                        </small>
                      </div>
                      <h3 className="card-title h5 fw-bold mb-3">
                        {event.name}
                      </h3>
                      <div className="mb-3">
                        <div className="d-flex align-items-center text-muted mb-2">
                          <i className="bi bi-clock me-2"></i>
                          <small>{event.time}</small>
                        </div>
                        <div className="d-flex align-items-center text-muted">
                          <i className="bi bi-geo-alt me-2"></i>
                          <small>{event.location}</small>
                        </div>
                      </div>
                      <p className="card-text text-muted mb-4">
                        {event.description}
                      </p>
                      <button
                        className="btn btn-outline-primary w-100 rounded-pill"
                        onClick={() => handleRegister(event.name)}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">
                  No events found matching "{searchTerm}"
                </p>
                <button
                  className="btn btn-outline-secondary mt-3"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact py-5 bg-light">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-lg-6 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-3">Contact Us</h2>
              <p className="text-muted">
                Have questions about events? Get in touch with our team
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4">
                {/* Contact Info */}
                <div className="col-md-4">
                  <div className="card border-0 shadow h-100">
                    <div className="card-body p-4 text-center">
                      <div className="contact-icon-box mb-3">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <h5 className="fw-bold">Email</h5>
                      <p className="text-muted">info@eventhub.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow h-100">
                    <div className="card-body p-4 text-center">
                      <div className="contact-icon-box mb-3">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <h5 className="fw-bold">Phone</h5>
                      <p className="text-muted">+92 330 1234567</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow h-100">
                    <div className="card-body p-4 text-center">
                      <div className="contact-icon-box mb-3">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <h5 className="fw-bold">Address</h5>
                      <p className="text-muted">
                        Gulberg Greens, Islamabad, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="row mt-5">
                <div className="col-12">
                  <div className="card border-0 shadow">
                    <div className="card-body p-4 p-md-5">
                      <h3 className="text-center mb-4">Send us a Message</h3>
                      {formSubmitted ? (
                        <div
                          className="alert alert-success text-center"
                          role="alert"
                        >
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Thank you for your message! We'll get back to you
                          soon.
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label htmlFor="name" className="form-label">
                                Name *
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="email" className="form-label">
                                Email *
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="message" className="form-label">
                                Message *
                              </label>
                              <textarea
                                className="form-control form-control-lg"
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleFormChange}
                                required
                              ></textarea>
                            </div>
                            <div className="col-12 text-center">
                              <button
                                type="submit"
                                className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                              >
                                <i className="bi bi-send me-2"></i>
                                Send Message
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">&copy; 2025 EventHub. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="social-links">
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

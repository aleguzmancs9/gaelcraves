import React from "react";
import Navbar from "../components/ui/navigation/Navbar";

const HomePage = () => {
  const scrollToOrdering = () => {
    const orderingSection = document.getElementById("ordering-section");
    if (orderingSection) {
      orderingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with GIF and Text */}
      <section className="hero-section position-relative">
        {/* Background GIF */}
        <div className="hero-background">
          <img
            src="/GaelCravesGif.gif"
            alt="Delicious GaelCraves Food"
            className="hero-gif"
          />
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Text Content */}
        <div className="hero-content">
          <h1 className="hero-title">Fix Your Cravings</h1>
          <p className="hero-subtitle">A Healthier Way</p>
          <p className="hero-description">
            Delicious, nutritious meals crafted with fresh ingredients and bold
            flavors
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToOrdering}>
              Order Now
            </button>
          </div>
        </div>

        {/* Wave Transition */}
        <div className="wave-transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="wave-svg"
          >
            <path
              fill="#273036"
              fillOpacity="1"
              d="M0,64L48,96C96,128,192,192,288,229.3C384,267,480,277,576,256C672,235,768,181,864,160C960,139,1056,149,1152,170.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Ordering Section with Menu Categories */}
      <section id="ordering-section" className="ordering-section">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center text-white mb-5">
              <h2 className="ordering-title">Start Your Order Here</h2>
              <p className="ordering-subtitle">
                Choose from our delicious menu categories
              </p>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="menu-categories">
            {/* Chicken Sandwiches Category */}
            <div className="menu-category mb-5">
              <div className="category-header">
                <h3 className="category-title">&#127831; Chicken Sandwiches</h3>
                <p className="category-description">
                  Crispy, juicy, and packed with flavor
                </p>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="menu-item-card">
                    <div className="menu-item-image">
                      <img
                        src="/api/placeholder/300/200"
                        alt="Classic Crispy Chicken"
                        className="item-image"
                      />
                      <div className="item-price">$12</div>
                    </div>
                    <div className="menu-item-content">
                      <h4 className="item-name">Combo #1</h4>
                      <p className="item-description">
                        Spicy or original sandwich w/ waffle fries
                      </p>
                      <div className="item-actions">
                        <button className="btn btn-primary btn-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="menu-item-card">
                    <div className="menu-item-image">
                      <img
                        src="/api/placeholder/300/200"
                        alt="Spicy Buffalo Chicken"
                        className="item-image"
                      />
                      <div className="item-price">$16</div>
                    </div>
                    <div className="menu-item-content">
                      <h4 className="item-name">Combo #2</h4>
                      <p className="item-description">
                        2 spicy or original (or mixed) sandwiches
                      </p>
                      <div className="item-actions">
                        <button className="btn btn-primary btn-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="menu-item-card">
                    <div className="menu-item-image">
                      <img
                        src="/api/placeholder/300/200"
                        alt="BBQ Ranch Chicken"
                        className="item-image"
                      />
                      <div className="item-price">$19</div>
                    </div>
                    <div className="menu-item-content">
                      <h4 className="item-name">Combo #3</h4>
                      <p className="item-description">
                        2 spicy or original (or mixed) sandwiches w/ waffle
                        fries
                      </p>
                      <div className="item-actions">
                        <button className="btn btn-primary btn-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protein Bowls Category */}
            <div className="menu-category">
              <div className="category-header">
                <h3 className="category-title">&#128019; Protein Bowls</h3>
                <p className="category-description">
                  Nutritious bowls packed with protein and fresh ingredients
                </p>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="menu-item-card">
                    <div className="menu-item-image">
                      <img
                        src="/api/placeholder/300/200"
                        alt="Power Protein Bowl"
                        className="item-image"
                      />
                      <div className="item-price">$13</div>
                    </div>
                    <div className="menu-item-content">
                      <h4 className="item-name">Chicken Mac Protein Bowl</h4>
                      <p className="item-description">
                        Crispy fries, mac & cheese, chicken tenders, drizzled
                        with signature sauce and red chili powder
                      </p>
                      <div className="item-actions">
                        <button className="btn btn-primary btn-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

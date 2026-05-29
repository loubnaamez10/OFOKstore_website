import "./Home.css";

export default function Home() {
	return (
			<>
				<section className="home-hero" aria-labelledby="home-hero-title">
			<div className="home-hero__content">
				<div className="home-hero__copy">
					<p className="home-hero__eyebrow">Delivery Available To 69 Provinces In Algeria 🇩🇿.</p>
					<h1 id="home-hero-title">Books that inspire minds <br /> &amp; hearts</h1>
					<p className="home-hero__subtitle">
						Your Algerian library is here!
						<span className="home-hero__subtitle-break">Discover a wide collection of English, Arabic &amp; French titles, knowledge for every journey.</span>
					</p>
				</div>
			</div>
			</section>
			{/* decorative image/banner under hero - replace src with your image path */}

			{/* stats row */}
			<section className="home-stats" aria-hidden>
			<div className="home-stats__inner">
				<div className="stat">
					<div className="stat__num">+35K</div>
					<div className="stat__label">Followers</div>
				</div>
				<div className="stat">
					<div className="stat__num">+2000</div>
					<div className="stat__label">Books</div>
				</div>
				<div className="stat">
					<div className="stat__num">69</div>
					<div className="stat__label">Provinces</div>
				</div>
				<div className="stat">
					<div className="stat__num">24h</div>
					<div className="stat__label">Delivery</div>
				</div>
			</div>
			</section>
		</>
	);
}

import '../assests/scss/about.scss'
function AboutUs() {
    return(
        <div className="about-container">
            <h1>About us</h1>
            <p>Welcome to <strong>CarPlace</strong>, your trusted partner for seamless and<br/>
                 reliable car rentals. Whether you're planning a road trip, need a <br/>
                 ride for business travel, or simply want the convenience of your own vehicle for a <br/>
                 short time, we've got you covered!
            </p>
            <h2 className="heading2">Who We Are</h2>
            <p>At <strong>CarPlace</strong>, we’re passionate about connecting people<br/>
                 with the perfect car for every journey. Our team is dedicated<br/> 
                 to providing an exceptional rental experience that is simple,<br/>
                  flexible, and tailored to your needs. With a fleet of well-maintained vehicles<br/> 
                ranging from compact cars to luxury rides, we ensure you’ll always find a vehicle that<br/> 
                suits your lifestyle and budget.
            </p>
            <h2 className="heading2">Our Mission</h2>
            <p>
            Our mission is to make car rentals effortless, accessible, and enjoyable for everyone.<br/>
            We believe in empowering our customers with the freedom <br/>
            to travel at their own pace, supported by technology that streamlines the entire rental process from booking to return.
            </p>

            <h2 className="heading2">Why Choose Us?</h2>
                <ul type="disk">
                    <li><strong>Wide Selection of Vehicles:</strong> Choose from a diverse range of vehicles, <br/>
                    including sedans, SUVs, sports cars, and more.</li>
                    <li><strong>Affordable Pricing:</strong> Transparent pricing with no hidden fees to <br/>
                    ensure you get great value for your money.</li>
                    <li><strong>Easy Booking:</strong> Our intuitive app and website make it simple to <br/>
                    browse, compare, and book in just a few clicks.</li>
                    <li><strong>Exceptional Support:</strong> Need assistance? Our friendly customer <br/>
                    service team is available to help you every step of the way.</li>
                    
                </ul>
            
        </div>
    );
}
export default AboutUs;
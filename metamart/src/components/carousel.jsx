import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

 const slides = [
  {
    id: 1,
    title: "Welcome to MetaMart",
    subtitle: "Your one-stop shop for everything!",
    image: "/headphone.jpg",
  },
  {
    id: 2,
    title: "Exclusive Deals",
    subtitle: "Shop now and save big!",
    image: "/phone.jpg",
  },
  {
    id: 3,
    title: "Quality Products",
    subtitle: "Top-rated items just for you!",
    image: "/shoes.jpg",
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] bg-black overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentIndex ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.9 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-black/60 z-10"></div>{" "}
              {/* Overlay without opacity change */}
              <div className="relative z-20 text-white flex-col flex justify-center items-center">
                <h1 className="text-4xl font-bold">{slide.title}</h1>
                <p className="mt-2 text-lg">{slide.subtitle}</p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCarousel;

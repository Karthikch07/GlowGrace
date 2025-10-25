import spaImage1 from "@assets/stock_images/spa_massage_therapy__0dc874f5.jpg";
import spaImage2 from "@assets/stock_images/hot_stone_massage_6c34b301.jpg";
import barbershopImage1 from "@assets/stock_images/modern_barbershop_in_ed205b41.jpg";
import barbershopImage2 from "@assets/stock_images/breadgrooming.jpg";
import fitnessImage1 from "@assets/stock_images/Personal Training.jpeg";
import fitnessImage2 from "@assets/stock_images/yoga_fitness_class_51fa1f1f.jpg";
import medspaImage1 from "@assets/stock_images/Botox Treatment.jpeg";
import medspaImage2 from "@assets/stock_images/facial_treatment_spa_63f161b3.jpg";
import salonImage from "@assets/stock_images/hair_salon_styling_c_a9b33900.jpg";

import product1 from "@assets/stock_images/hydratingserum.jpg";
import product2 from "@assets/stock_images/instaglownightcream.jpg";
import product3 from "@assets/stock_images/facemaskset.jpg";
import product4 from "@assets/stock_images/velvettouchblush.jpeg";
import product5 from "@assets/stock_images/eyecream.jpeg";
import product6 from "@assets/stock_images/Cleanser.jpeg";
import product8 from "@assets/stock_images/makeup_beauty_produc_554f7469.jpg";
import product9 from "@assets/stock_images/Vitamin C Serum.jpeg";

export const allServices = [
  { id: 1, image: spaImage1, category: "Spa", name: "Relaxation Massage", description: "Full body massage with aromatherapy", duration: "60 min", price: "1150" },
  { id: 2, image: spaImage2, category: "Spa", name: "Hot Stone Therapy", description: "Deep tissue massage with heated stones", duration: "90 min", price: "1450" },
  { id: 3, image: barbershopImage1, category: "Barbershop", name: "Classic Haircut", description: "Traditional cut with hot towel finish", duration: "30 min", price: "149" },
  { id: 4, image: barbershopImage2, category: "Barbershop", name: "Beard Grooming", description: "Trim, shape and conditioning", duration: "20 min", price: "99" },
  { id: 5, image: fitnessImage1, category: "Fitness", name: "Personal Training", description: "One-on-one fitness coaching", duration: "60 min", price: "99" },
  { id: 6, image: fitnessImage2, category: "Fitness", name: "Yoga Class", description: "Group yoga session for all levels", duration: "45 min", price: "125" },
  { id: 7, image: medspaImage1, category: "MedSpa", name: "Botox Treatment", description: "Professional wrinkle reduction", duration: "30 min", price: "1350" },
  { id: 8, image: salonImage, category: "Salon", name: "Hair Styling", description: "Professional styling for any occasion", duration: "45 min", price: "285" },
];

export const serviceCategories = ["All", "Spa", "Barbershop", "Fitness", "MedSpa", "Salon"];

export const allProducts = [
  { image: product1, brand: "Luxe Beauty", name: "Hydrating Serum", category: "Skincare", rating: 4.8, reviews: 234, price: 499, originalPrice: 799 },
  { image: product2, brand: "Glow Essentials", name: "Night Cream", category: "Skincare", rating: 4.9, reviews: 189, price: 399 },
  { image: product3, brand: "Pure Radiance", name: "Face Mask Set", category: "Skincare", rating: 4.7, reviews: 312, price: 349, originalPrice: 499 },
  { image: product4, brand: "Velvet Touch", name: "Lip Treatment", category: "Makeup", rating: 4.6, reviews: 156, price: 149 },
  { image: product5, brand: "Luxe Beauty", name: "Eye Cream", category: "Skincare", rating: 4.8, reviews: 198, price: 499 },
  { image: product6, brand: "Glow Essentials", name: "Cleanser", category: "Skincare", rating: 4.7, reviews: 276, price: 299, originalPrice: 399 },
  { image: product8, brand: "Velvet Touch", name: "Toner", category: "Makeup", rating: 4.5, reviews: 167, price: 329 },
  { image: product9, brand: "Radiant Glow", name: "Vitamin C Serum", category: "Makeup", rating: 4.9, reviews: 398, price: 349 },
];

export const productCategories = ["All", "Skincare", "Makeup"];

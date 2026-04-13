require('dotenv').config()
const mongoose = require('mongoose')
const Watch = require('../models/Watch')
const connectDB = require('../config/database')

const watches = [
  {
    name: "Rolex Submariner",
    brand: "Rolex",
    description: "The iconic Submariner with ceramic bezel and automatic movement. Perfect for diving and everyday wear.",
    price: 8500,
    originalPrice: 9500,
    category: "diving",
    images: ["/images/rolex-submariner.jpg"],
    features: ["Automatic Movement", "Ceramic Bezel", "300m Water Resistance", "Date Display"],
    specifications: {
      movement: "Automatic",
      caseMaterial: "904L Stainless Steel",
      caseDiameter: "41mm",
      waterResistance: "300m",
      strapMaterial: "Oyster Steel",
      warranty: "5 years"
    },
    stock: 5,
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: "Omega Speedmaster",
    brand: "Omega",
    description: "The legendary Moonwatch with manual winding movement. First watch on the moon.",
    price: 6200,
    category: "sport",
    images: ["/images/omega-speedmaster.jpg"],
    features: ["Manual Movement", "Tachymetric Scale", "Chronograph", "Lume Dial"],
    specifications: {
      movement: "Manual",
      caseMaterial: "Stainless Steel",
      caseDiameter: "42mm",
      waterResistance: "50m",
      strapMaterial: "Leather",
      warranty: "5 years"
    },
    stock: 8,
    rating: 4.9,
    reviewCount: 89
  },
  {
    name: "Tag Heuer Carrera",
    brand: "Tag Heuer",
    description: "Elegant chronograph with automatic movement. Inspired by racing heritage.",
    price: 3200,
    originalPrice: 3800,
    category: "sport",
    images: ["/images/tag-carrera.jpg"],
    features: ["Automatic Movement", "Chronograph", "Date Display", "Sapphire Crystal"],
    specifications: {
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      caseDiameter: "41mm",
      waterResistance: "100m",
      strapMaterial: "Stainless Steel",
      warranty: "2 years"
    },
    stock: 12,
    rating: 4.6,
    reviewCount: 67
  },
  {
    name: "Seiko Presage",
    brand: "Seiko",
    description: "Japanese craftsmanship meets classic design. Automatic movement with enamel dial.",
    price: 450,
    category: "classic",
    images: ["/images/seiko-presage.jpg"],
    features: ["Automatic Movement", "Enamel Dial", "Day-Date Display", "Hardlex Crystal"],
    specifications: {
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      caseDiameter: "40.5mm",
      waterResistance: "50m",
      strapMaterial: "Leather",
      warranty: "1 year"
    },
    stock: 20,
    rating: 4.4,
    reviewCount: 45
  },
  {
    name: "Casio G-Shock",
    brand: "Casio",
    description: "Tough and reliable digital watch with multiple complications. Shock resistant.",
    price: 120,
    category: "sport",
    images: ["/images/casio-gshock.jpg"],
    features: ["Digital Display", "Shock Resistant", "200m Water Resistance", "LED Light"],
    specifications: {
      movement: "Quartz",
      caseMaterial: "Resin",
      caseDiameter: "45mm",
      waterResistance: "200m",
      strapMaterial: "Resin",
      warranty: "1 year"
    },
    stock: 30,
    rating: 4.2,
    reviewCount: 156
  },
  {
    name: "IWC Pilot's Watch",
    brand: "IWC",
    description: "Aviation-inspired chronograph with automatic movement. Precision and elegance.",
    price: 5800,
    category: "luxury",
    images: ["/images/iwc-pilot.jpg"],
    features: ["Automatic Movement", "Chronograph", "Pilot Design", "Sapphire Crystal"],
    specifications: {
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      caseDiameter: "41mm",
      waterResistance: "60m",
      strapMaterial: "Leather",
      warranty: "5 years"
    },
    stock: 3,
    rating: 4.7,
    reviewCount: 32
  }
]

const seedDB = async () => {
  try {
    await connectDB()
    await Watch.deleteMany({})
    await Watch.insertMany(watches)
    console.log('Database seeded successfully!')
    process.exit()
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDB()
const mongoose = require('mongoose');
const lineSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    State: String,
    'Consumption (kWh)': String,
    'Renewable Energy %': String,
    'Population (millions)': String,
    'Average Household Size': String,
    'Median Household Income (USD)': String,
    Avg: {
      'Total CO2 Emissions (metric tons)': String,
      'Total Revenue from Electricity Sales (USD)': String,
      'Total Electricity Generation (GWh)': String
    }
  });
  const Line = mongoose.model('Line', lineSchema);

  module.exports = Line;
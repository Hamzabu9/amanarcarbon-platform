/**
 * Carbon Calculator Component
 * 
 * An interactive carbon footprint calculator that helps users understand their
 * emissions and the potential for carbon offset purchases. This serves both
 * as a lead generation tool and educational resource.
 * 
 * Features:
 * - Multi-category emission calculations
 * - Real-time results with visual feedback
 * - Offset cost estimation
 * - Actionable recommendations
 * - Data export capabilities
 * 
 * The calculator uses industry-standard emission factors and provides
 * transparent methodology for all calculations.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Zap, Car, Plane, Home, Factory, Download, ArrowRight } from 'lucide-react';
import { CalculationInput, CalculationResult } from '../types';

// Emission factors (kg CO2e per unit) - based on EPA and IPCC guidelines
const emissionFactors = {
  electricity: { factor: 0.4, unit: 'kWh', label: 'Electricity Usage' },
  naturalGas: { factor: 2.0, unit: 'therms', label: 'Natural Gas' },
  gasoline: { factor: 8.9, unit: 'gallons', label: 'Gasoline' },
  diesel: { factor: 10.2, unit: 'gallons', label: 'Diesel' },
  flights: { factor: 0.2, unit: 'miles', label: 'Air Travel' },
  shipping: { factor: 0.1, unit: 'packages', label: 'Shipping/Delivery' }
};

export default function CarbonCalculator() {
  const [inputs, setInputs] = useState<CalculationInput[]>([
    { category: 'electricity', subcategory: 'electricity', amount: 0, unit: 'kWh' },
    { category: 'naturalGas', subcategory: 'naturalGas', amount: 0, unit: 'therms' },
    { category: 'gasoline', subcategory: 'gasoline', amount: 0, unit: 'gallons' },
    { category: 'flights', subcategory: 'flights', amount: 0, unit: 'miles' }
  ]);

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  const calculateEmissions = useCallback(() => {
    let totalEmissions = 0;
    const breakdown = inputs.map(input => {
      const factor = emissionFactors[input.category as keyof typeof emissionFactors];
      const emissions = input.amount * factor.factor * (timeframe === 'yearly' ? 12 : 1);
      totalEmissions += emissions;
      return {
        category: factor.label,
        emissions,
        percentage: 0 // Will be calculated after total is known
      };
    });

    // Calculate percentages
    breakdown.forEach(item => {
      item.percentage = totalEmissions > 0 ? (item.emissions / totalEmissions) * 100 : 0;
    });

    // Generate recommendations based on highest emission sources
    const recommendations = generateRecommendations(breakdown);
    
    // Estimate offset cost (assuming $15-25 per tonne CO2e)
    const offsetCost = (totalEmissions / 1000) * 20; // Convert kg to tonnes, multiply by $20/tonne

    setResult({
      totalEmissions,
      breakdown: breakdown.filter(item => item.emissions > 0),
      recommendations,
      offsetCost
    });
  }, [inputs, timeframe]);

  // Calculate emissions in real-time as inputs change
  useEffect(() => {
    calculateEmissions();
  }, [calculateEmissions]);

  const generateRecommendations = (breakdown: { category: string; emissions: number; percentage: number }[]) => {
    const recommendations = [];
    const sortedBreakdown = [...breakdown].sort((a, b) => b.emissions - a.emissions);
    
    if (sortedBreakdown[0]?.category === 'Electricity Usage' && sortedBreakdown[0].emissions > 500) {
      recommendations.push('Consider switching to renewable energy or improving home energy efficiency');
    }
    const airTravel = sortedBreakdown.find(item => item.category === 'Air Travel');
    if (airTravel && airTravel.emissions > 1000) {
      recommendations.push('Reduce air travel or choose direct flights when possible');
    }
    const gasoline = sortedBreakdown.find(item => item.category === 'Gasoline');
    if (gasoline && gasoline.emissions > 800) {
      recommendations.push('Consider electric or hybrid vehicles, or use public transportation');
    }
    
    recommendations.push('Offset remaining emissions through verified carbon credit projects');
    
    return recommendations;
  };

  const updateInput = (index: number, amount: number) => {
    const newInputs = [...inputs];
    newInputs[index].amount = Math.max(0, amount);
    setInputs(newInputs);
  };

  const exportResults = () => {
    if (!result) return;
    
    const data = {
      timeframe,
      totalEmissions: result.totalEmissions,
      breakdown: result.breakdown,
      recommendations: result.recommendations,
      offsetCost: result.offsetCost,
      calculatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carbon-footprint-${timeframe}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white mb-6">
              <Calculator className="size-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
              Carbon Footprint Calculator
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Calculate your carbon emissions and discover how carbon credits can help you 
              achieve net-zero goals. Get personalized recommendations and offset estimates.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Calculate Your Footprint</h2>
                <div className="flex rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setTimeframe('monthly')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      timeframe === 'monthly' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeframe('yearly')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      timeframe === 'yearly' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {inputs.map((input, index) => {
                  const factor = emissionFactors[input.category as keyof typeof emissionFactors];
                  const icons = {
                    electricity: Zap,
                    naturalGas: Home,
                    gasoline: Car,
                    flights: Plane
                  };
                  const Icon = icons[input.category as keyof typeof icons] || Factory;

                  return (
                    <div key={input.category} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                        <Icon className="size-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {factor.label}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={input.amount || ''}
                            onChange={(e) => updateInput(index, parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="0"
                          />
                          <span className="text-sm text-gray-500 min-w-0 w-16">
                            {factor.unit}/{timeframe === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="bg-gradient-to-br from-emerald-50 to-gray-50 rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Your Carbon Footprint</h2>
              
              {result && result.totalEmissions > 0 ? (
                <div className="space-y-6">
                  {/* Total Emissions */}
                  <div className="text-center p-6 bg-white rounded-xl">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {result.totalEmissions.toFixed(1)}
                    </div>
                    <div className="text-gray-600">
                      kg CO₂e per {timeframe === 'monthly' ? 'month' : 'year'}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Equivalent to {(result.totalEmissions / 1000).toFixed(2)} tonnes CO₂e
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Emissions Breakdown</h3>
                    <div className="space-y-2">
                      {result.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{item.emissions.toFixed(1)} kg</div>
                            <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Offset Cost */}
                  <div className="p-4 bg-emerald-600 text-white rounded-xl">
                    <div className="text-sm opacity-90 mb-1">Estimated offset cost</div>
                    <div className="text-2xl font-bold">${result.offsetCost.toFixed(2)}</div>
                    <div className="text-sm opacity-90">per {timeframe === 'monthly' ? 'month' : 'year'}</div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <ArrowRight className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={exportResults}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Download className="size-4" />
                      Export Results
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                      Purchase Offsets <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="size-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your usage data to see your carbon footprint</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Understanding Your Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn more about carbon emissions and how high-quality carbon credits can help you achieve your climate goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3">What are Carbon Credits?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Carbon credits represent verified reductions or removals of greenhouse gases from the atmosphere. 
                Each credit equals one tonne of CO₂ equivalent.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3">Quality Matters</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Not all carbon credits are equal. Look for projects with strong additionality, 
                permanence, and third-party verification to ensure real climate impact.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3">Beyond Offsetting</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                While offsets are important, the priority should be reducing emissions first. 
                Use offsets for unavoidable emissions as part of a comprehensive climate strategy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
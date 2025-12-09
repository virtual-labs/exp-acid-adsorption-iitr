/**
 * Calculations Module
 * Replaces Master.php backend calculations with pure JavaScript
 * Handles all titration calculations and data generation
 */

class TitrationCalculations {
  constructor() {
    this.results = {};
  }

  /**
   * Solve for N2 using iterative Newton's method
   * Replaces PHP solveForN2() function
   */
  solveForN2(N1, k, n) {
    let N2 = 1.0;
    const tolerance = 1e-6;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const N2_prev = N2;
      N2 = N1 / (1 + (k / 3) * Math.pow(N2, 1 / n - 1));

      if (Math.abs(N2 - N2_prev) < tolerance) {
        break;
      }
    }

    return N2;
  }

  /**
   * Initialize all calculations for 5 samples
   * Replaces Master.php main calculation logic
   */
  initializeExperiment() {
    // Generate random values like PHP rand()
    const m = (Math.floor(Math.random() * 61) + 30) / 100; // rand(30,90)/100
    const k = (Math.floor(Math.random() * 99) + 102) / 100; // rand(102,200)/100
    const n = 1 / m;

    // Constants
    const N_Titrant = 0.1; // In burette
    const V_Titrant = 10; // Present in flask
    const C = [0.1, 0.2, 0.3, 0.4, 0.5]; // Sample concentrations

    const Ce = [];
    const logxDm = [];
    const logCe = [];
    const results_data = [];

    // Calculate for each sample
    C.forEach((concentration, index) => {
      const N2 = this.solveForN2(concentration, k, n);
      Ce[index] = N2;

      const logxDmValue = Math.log10(k) + m * Math.log10(N2);
      const logCeValue = Math.log10(N2);

      logxDm[index] = logxDmValue;
      logCe[index] = logCeValue;

      // Store complete results for each sample
      results_data[index] = {
        sample: index + 1,
        N1: concentration,
        Ce: N2,
        logCe: logCeValue,
        N_diff: concentration - N2,
        w: 3 * (concentration - N2),
        w_by_m: (3 * (concentration - N2)) / 1,
        log_w_by_m: Math.log10((3 * (concentration - N2)) / 1),
        V_Titrate: N2 * V_Titrant / N_Titrant,
      };
    });

    // Store all results in object
    this.results = {
      m: m,
      k: k,
      n: n,
      logK: Math.log10(k),
      N_Titrant: N_Titrant,
      V_Titrant: V_Titrant,
      Ce: Ce,
      logxDm: logxDm,
      logCe: logCe,
      results_data: results_data,
    };

    return this.results;
  }

  /**
   * Get all stored results
   */
  getResults() {
    return this.results;
  }

  /**
   * Get results for specific sample
   */
  getSampleResults(sampleIndex) {
    return this.results.results_data[sampleIndex];
  }

  /**
   * Get data for graph plotting
   */
  getGraphData() {
    return {
      labels: this.results.logCe.map((val) => val.toFixed(2)),
      salesData: this.results.logxDm,
    };
  }

  /**
   * Round to specified decimal places
   */
  round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}

// Create global instance
const titrationCalc = new TitrationCalculations();

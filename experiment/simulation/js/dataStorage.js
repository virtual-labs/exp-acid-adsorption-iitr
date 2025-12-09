/**
 * Data Storage Module
 * Replaces PHP $_SESSION with localStorage/sessionStorage
 * Provides centralized data management across pages
 */

class DataStorage {
  constructor(useSessionStorage = true) {
    this.storage = useSessionStorage ? sessionStorage : localStorage;
    this.storageKey = "titrationExperiment";
  }

  /**
   * Save all experiment data
   */
  saveExperimentData(data) {
    try {
      const serialized = JSON.stringify(data);
      this.storage.setItem(this.storageKey, serialized);
      console.log("Experiment data saved:", data);
      return true;
    } catch (error) {
      console.error("Error saving experiment data:", error);
      return false;
    }
  }

  /**
   * Load all experiment data
   */
  loadExperimentData() {
    try {
      const serialized = this.storage.getItem(this.storageKey);
      if (!serialized) {
        console.warn("No experiment data found in storage");
        return null;
      }
      const data = JSON.parse(serialized);
      console.log("Experiment data loaded:", data);
      return data;
    } catch (error) {
      console.error("Error loading experiment data:", error);
      return null;
    }
  }

  /**
   * Save individual value (replaces $_SESSION['key'] = value)
   */
  setValue(key, value) {
    try {
      const data = this.loadExperimentData() || {};
      data[key] = value;
      this.saveExperimentData(data);
      return true;
    } catch (error) {
      console.error("Error setting value:", error);
      return false;
    }
  }

  /**
   * Get individual value (replaces $_SESSION['key'])
   */
  getValue(key) {
    try {
      const data = this.loadExperimentData();
      return data ? data[key] : null;
    } catch (error) {
      console.error("Error getting value:", error);
      return null;
    }
  }

  /**
   * Clear all data
   */
  clearAll() {
    try {
      this.storage.removeItem(this.storageKey);
      console.log("All experiment data cleared");
      return true;
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  }

  /**
   * Check if data exists
   */
  hasData() {
    return this.storage.getItem(this.storageKey) !== null;
  }

  /**
   * Debug: Print all stored data
   */
  printAll() {
    const data = this.loadExperimentData();
    console.log("All stored data:", data);
  }
}

// Create global instance using sessionStorage (clears on browser close)
const dataStorage = new DataStorage(true);

export function getMonitorFlickerIntensity(time: number): number {
  // Subtle screen flicker using sine wave
  const baseIntensity = 0.3;
  const flickerAmount = 0.05;
  const flickerSpeed = 2;
  
  return baseIntensity + Math.sin(time * flickerSpeed) * flickerAmount;
}

export function getLightPulseIntensity(time: number, baseIntensity: number): number {
  // Very subtle light pulse
  const pulseAmount = 0.05;
  const pulseSpeed = 0.5;
  
  return baseIntensity + Math.sin(time * pulseSpeed) * pulseAmount;
}

export function getPlantSwayRotation(time: number): number {
  // Gentle plant sway
  const swayAmount = 0.02;
  const swaySpeed = 1;
  
  return Math.sin(time * swaySpeed) * swayAmount;
}

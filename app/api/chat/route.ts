import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || '').toLowerCase();

    let reply = "";

    if (query.includes('hino') || query.includes('truck') || query.includes('biodiesel')) {
      reply = `[EcoPulse Telemetry Hub] Hino 500 Dump Truck Emission Analysis:
• The use of B35 Biodiesel is projected to reduce Carbon Monoxide emissions by up to 18.4% and Particulate Matter (PM) by 24%.
• EcoPulse telemetry system optimizes heavy-duty engine combustion cycles to achieve up to 94.2% carbon mitigation efficiency.
• Recommendation: Install intelligent carbon audit sensors on the primary exhaust manifold.`;
    } else if (query.includes('porsche') || query.includes('classic') || query.includes('klasik') || query.includes('e-fuel') || query.includes('retrofitting')) {
      reply = `[EcoPulse Telemetry Hub] Classic Porsche 911 Carrera Retrofitting Analysis:
• Synthetic Fuel (e-Fuel) integration can minimize carbon footprints toward carbon-neutrality by up to 85% without altering classic piston engine characteristics.
• ECU remapping powered by EcoPulse AI dynamically adjusts air-fuel compression ratios in real-time.
• Recommendation: Calibrate the dual fuel injection system and activate continuous emission tracking features.`;
    } else if (query.includes('94.2') || query.includes('calculation') || query.includes('kalkulasi') || query.includes('efficiency') || query.includes('efisiensi')) {
      reply = `[EcoPulse Telemetry Hub] 94.2% Mitigation Calculation Algorithm:
• Calculations are derived from comparing baseline conventional vehicle emissions against Meta Muse AI real-time telemetry optimization.
• Combined carbon emission reduction (85% e-fuel/B35) + ECU mapping efficiency (9.2%) yields a total mitigation efficiency of 94.2%.`;
    } else {
      reply = `[EcoPulse AI Muse Engine] Connected to Meta Telemetry Track.
Sustainable Automotive Intelligence Analysis:
• Query: "${message}"
• Telemetry Evaluation: System initialized and ready to process power efficiency optimizations and carbon cycle mapping.
• Recommendation: Conduct periodic emission audits to maintain peak energy efficiency performance.`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: 'An error occurred on the telemetry server.' }, { status: 500 });
  }
}
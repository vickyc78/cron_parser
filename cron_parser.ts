class CronParser { 
  private cronString: string; 
  private fieldNames: string[] = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"]; 
  
  constructor(cronString: string) { 
    this.cronString = cronString.trim(); 
  } 
  
  public parse(): string { 
    const fields = this.cronString.split(" "); 
    if (fields.length !== 6) { 
      throw new Error("Invalid cron string. It must have 5 time fields followed by a command."); 
    } 
    
    const output: string[] = fields.slice(0, 5).map((field, index) => { 
      const expandedTimes = this.expandField(field, index);
      return `${this.fieldNames[index].padEnd(14)} ${expandedTimes}`; 
    }); return output.join('\n'); 
  } 
  
  private expandField(field: string, index: number): string {
    const rangeSet = new Set<string>();
    const [min, max] = this.getMinMax(index);
    const parts = field.split(',').map(part => part.trim());

    for (const part of parts) {
        if (part === '*') {
            for (let i = min; i <= max; i++) {
                rangeSet.add(i.toString());
            }
        } else if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = Math.max(start, min); i <= Math.min(end, max); i++) {
                rangeSet.add(i.toString());
            }
        } else if (part.includes('/')) {
            const [basePart, stepStr] = part.split('/');
            const step = Number(stepStr);
            const start = basePart.includes('*') ? min : Number(basePart);

            for (let i = Math.max(start, min); i <= max; i += step) {
                rangeSet.add(i.toString());
            }
        } else {
            const num = Number(part);
            if (num >= min && num <= max) {
                rangeSet.add(part);
            }
        }
    }

    return Array.from(rangeSet)
        .sort((a, b) => Number(a) - Number(b))
        .join(' ');
}

  
  private getMinMax(index: number): [number, number] { 
    switch (index) { 
      case 0: return [0, 59]; // Minute 
      case 1: return [0, 23]; // Hour 
      case 2: return [1, 31]; // Day of Month 
      case 3: return [1, 12]; // Month 
      case 4: return [0, 6]; // Day of Week (0=Sun) 
      default: return [0, 0]; 
    } 
  } 
} 

export default CronParser;
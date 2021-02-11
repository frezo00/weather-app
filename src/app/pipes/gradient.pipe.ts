import { Pipe, PipeTransform } from '@angular/core';

type GradientColor = {
  color: string;
  percentage: number;
};

@Pipe({ name: 'gradient' })
export class GradientPipe implements PipeTransform {
  gradientColors: GradientColor[] = [
    { color: '#102F7E', percentage: 0 },
    { color: '#0C8DD6', percentage: 12.5 },
    { color: '#1AA0EC', percentage: 25 },
    { color: '#60C6FF', percentage: 37.5 },
    { color: '#9BDBFF', percentage: 50 },
    { color: '#B4DEDA', percentage: 62.5 },
    { color: '#FFD66B', percentage: 75 },
    { color: '#FFC178', percentage: 87.5 },
    { color: '#FE9255', percentage: 100 }
  ];

  maxTemperature = 40;
  temperatureRange = this.maxTemperature * 2;

  // NOTE: There is probably some reasonable logic/algorithm to determine which gradient colors to use
  //       based on the temperature and given palette of colors, but I'm not avare of it, although this solution works just fine 🎉
  transform(temperature: number): string {
    if (!temperature) {
      return '';
    }
    const tempPercent = ((temperature + this.maxTemperature) / this.temperatureRange) * 100;
    const closestGradients = this._getClosestGradients(tempPercent, this.gradientColors);

    let result = 'linear-gradient(119.25deg, ';
    closestGradients.forEach((gradient, i) => {
      const { color, percentage } = gradient;
      result += `${color} ${percentage.toFixed(2)}%`;
      if (i !== closestGradients.length - 1) {
        result += `, `;
      }
    });

    return `${result})`;
  }

  private _getClosestGradients(percentage: number, gradientColors: GradientColor[]): GradientColor[] {
    const theClosest = gradientColors.reduce((a, b) =>
      Math.abs(b.percentage - percentage) < Math.abs(a.percentage - percentage) ? b : a
    );

    const indices = this._getIndices(gradientColors.indexOf(theClosest), gradientColors.length - 1);

    return indices
      .map(index => gradientColors[index])
      .map(gradient => ({ ...gradient, percentage: (gradient.percentage - percentage) * 6.4 + 50 }));
  }

  private _getIndices(current: number, max: number): number[] {
    switch (current) {
      case 0: // If the closest is -40 temperature
        return [0, 1];

      case max: // If the closest is +40 temperature
        return [max - 1, max];

      default:
        return [current - 1, current, current + 1];
    }
  }
}

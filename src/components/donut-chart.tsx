"use client"

const data = [
  { name: "Desktop", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 25, color: "hsl(var(--chart-3))" },
]

export function DonutChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const createPath = (percentage: number, cumulativePercentage: number) => {
    const startAngle = cumulativePercentage * 3.6 - 90
    const endAngle = (cumulativePercentage + percentage) * 3.6 - 90

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = percentage > 50 ? 1 : 0

    const x1 = 50 + 40 * Math.cos(startAngleRad)
    const y1 = 50 + 40 * Math.sin(startAngleRad)
    const x2 = 50 + 40 * Math.cos(endAngleRad)
    const y2 = 50 + 40 * Math.sin(endAngleRad)

    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const path = createPath(percentage, cumulativePercentage)
            cumulativePercentage += percentage

            return (
              <path
                key={item.name}
                d={path}
                fill={`hsl(${210 + index * 30}, 70%, ${50 + index * 10}%)`}
                className="hover:opacity-80 transition-opacity"
              />
            )
          })}
          <circle cx="50" cy="50" r="20" fill="hsl(var(--background))" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{total}%</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      <div className="ml-6 space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: `hsl(${210 + index * 30}, 70%, ${50 + index * 10}%)` }}
            />
            <span className="text-sm">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

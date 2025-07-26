"use client"

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 1800 },
  { name: "Jun", total: 2200 },
  { name: "Jul", total: 2800 },
  { name: "Aug", total: 2100 },
  { name: "Sep", total: 2600 },
  { name: "Oct", total: 3200 },
  { name: "Nov", total: 2900 },
  { name: "Dec", total: 3400 },
]

export function OverviewChart() {
  const maxValue = Math.max(...data.map((item) => item.total))

  return (
    <div className="w-full h-full">
      <div className="flex items-end justify-between h-full space-x-2 px-2">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center flex-1">
            <div className="w-full flex items-end justify-center mb-2" style={{ height: "160px" }}>
              <div
                className="bg-primary rounded-t-sm transition-all duration-300 hover:opacity-80 w-full max-w-8"
                style={{
                  height: `${(item.total / maxValue) * 100}%`,
                  minHeight: "4px",
                }}
                title={`${item.name}: $${item.total.toLocaleString()}`}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

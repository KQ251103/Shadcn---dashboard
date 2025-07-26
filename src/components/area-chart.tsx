"use client"

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

export function AreaChart() {
  const maxValue = Math.max(...data.flatMap((item) => [item.desktop, item.mobile]))

  return (
    <div className="w-full h-full">
      <div className="flex items-end justify-between h-full space-x-1">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center justify-end mb-2" style={{ height: "120px" }}>
              <div
                className="bg-blue-500 rounded-t-sm w-full max-w-6 opacity-70"
                style={{
                  height: `${(item.desktop / maxValue) * 100}%`,
                  minHeight: "2px",
                }}
                title={`Desktop: ${item.desktop}`}
              />
              <div
                className="bg-green-500 rounded-t-sm w-full max-w-6 opacity-70 -mt-1"
                style={{
                  height: `${(item.mobile / maxValue) * 100}%`,
                  minHeight: "2px",
                }}
                title={`Mobile: ${item.mobile}`}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded opacity-70"></div>
          <span className="text-xs text-muted-foreground">Desktop</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded opacity-70"></div>
          <span className="text-xs text-muted-foreground">Mobile</span>
        </div>
      </div>
    </div>
  )
}

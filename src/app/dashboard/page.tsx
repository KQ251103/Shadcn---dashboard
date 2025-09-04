"use client"

import {
  CalendarDays,
  Download,
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSign,
  Activity,
  Users,
  CreditCard,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect } from "react"

// Datos de métricas
const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Subscriptions",
    value: "+2350",
    change: "+180.1%",
    changeType: "positive" as const,
    icon: Users,
    description: "from last month",
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: CreditCard,
    description: "from last month",
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201",
    changeType: "positive" as const,
    icon: Activity,
    description: "from last hour",
  },
]

// Datos de ventas recientes
const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    initials: "SD",
  },
]

// Datos de órdenes
const orders = [
  {
    id: "ORD001",
    customer: "Liam Johnson",
    email: "liam@example.com",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    id: "ORD002",
    customer: "Olivia Smith",
    email: "olivia@example.com",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    id: "ORD003",
    customer: "Noah Williams",
    email: "noah@example.com",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    id: "ORD004",
    customer: "Emma Brown",
    email: "emma@example.com",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$450.00",
  },
  {
    id: "ORD005",
    customer: "Liam Johnson",
    email: "liam@example.com",
    status: "Fulfilled",
    date: "2023-06-27",
    amount: "$550.00",
  },
]

// Datos del gráfico
const chartData = [
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


export default function Dashboard() {
  const maxValue = Math.max(...chartData.map((item) => item.total))
  
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return;
  }
  fetch("http://localhost:5000/api/usuario/dashboard", {
  headers: { Authorization: `Bearer ${token}` },
})
  .then(res => res.json())
  .then(data => {
    if (data.message !== "Acceso concedido al dashboard") {
      localStorage.removeItem("token"); // token inválido → borrar
      window.location.href = "/";
    }
  })
  .catch(err => {
    console.error("Error al acceder al dashboard:", err);
    // No borramos token, solo logueamos el error
  });
}, []);
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Heppening with your business today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Jan 20, 2024 - Feb 09, 2024
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {metric.changeType === "positive" ? (
                    <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={metric.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {metric.change}
                  </span>
                  <span className="ml-1">{metric.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="w-full h-full">
                <div className="flex items-end justify-between h-full space-x-2 px-2">
                  {chartData.map((item) => (
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
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{sale.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de órdenes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>A list of your recent orders and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{order.customer}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{order.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Fulfilled" ? "default" : "destructive"}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
